import { createOpenAICompatible } from "@ai-sdk/openai-compatible";
import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { createAnthropic } from "@ai-sdk/anthropic";
import { createCohere } from "@ai-sdk/cohere";
import fs from "fs";
import path from "path";
import { generateText as originalGenerateText, streamText as originalStreamText, generateObject as originalGenerateObject } from "ai";

// Fallback to manually load .env.local if the framework/Vite didn't expose non-VITE_ variables to process.env
try {
  const envPath = path.resolve(process.cwd(), ".env.local");
  if (fs.existsSync(envPath)) {
    const envContent = fs.readFileSync(envPath, "utf-8");
    envContent.split("\n").forEach(line => {
      const match = line.match(/^\s*([\w.-]+)\s*=\s*(.*)?\s*$/);
      if (match) {
        const key = match[1];
        let value = match[2] || "";
        if (value.startsWith('"') && value.endsWith('"')) value = value.slice(1, -1);
        if (value.startsWith("'") && value.endsWith("'")) value = value.slice(1, -1);
        if (!process.env[key]) process.env[key] = value;
      }
    });
  }
} catch (e) {
  // ignore
}

export function getResourceProviders() {
  const providers: Array<{ name: string; model: any }> = [];
  const key = process.env.PERPLEXITY_API_KEY;
  if (key) {
    try {
      const isOR = key.startsWith("sk-or-");
      const client = createOpenAICompatible({
        name: "perplexity-resource",
        apiKey: key,
        baseURL: isOR ? "https://openrouter.ai/api/v1" : "https://api.perplexity.ai",
        headers: isOR ? {
          "HTTP-Referer": "https://projectspark.dev",
          "X-Title": "ProjectSpark",
        } : undefined,
      });
      providers.push({
        name: "perplexity-resource",
        model: client(isOR ? "perplexity/sonar" : "sonar"),
      });
    } catch (e) {
      console.error("[AI Gateway] Failed to init resource provider:", e);
    }
  }
  return providers;
}

export const createProjectSparkAiGatewayProvider = (apiKey: string) => {
  console.log("[AI Gateway] apiKey length:", apiKey?.length, "starts with AIzaSy/AQ:", apiKey?.startsWith("AIzaSy") || apiKey?.startsWith("AQ"), "prefix:", apiKey?.substring(0, 6));
  if (apiKey && (apiKey.startsWith("AIzaSy") || apiKey.startsWith("AQ"))) {
    const google = createGoogleGenerativeAI({
      apiKey,
    });
    return (modelId: string) => {
      return google("gemini-2.5-flash");
    };
  }

  return createOpenAICompatible({
    name: "project-spark",
    baseURL: "https://ai.gateway.projectspark.dev/v1",
    headers: {
      "ProjectSpark-API-Key": apiKey,
      "X-ProjectSpark-AIG-SDK": "vercel-ai-sdk",
    },
  });
};

export function getAvailableProviders() {
  const providers: Array<{ name: string; model: any }> = [];

  // -1. NVIDIA (via NVIDIA_API_KEY) - Super/Ultra primary API
  if (process.env.NVIDIA_API_KEY) {
    try {
      const nvidia = createOpenAICompatible({
        name: "nvidia",
        apiKey: process.env.NVIDIA_API_KEY,
        baseURL: "https://integrate.api.nvidia.com/v1",
      });
      providers.push({
        name: "nvidia",
        model: nvidia("meta/llama-3.1-70b-instruct"),
      });
    } catch (e) {
      console.error("[AI Gateway] Failed to init NVIDIA provider:", e);
    }
  }

  // 0. DeepSeek Secondary API Key (Provided by User)
  try {
    const deepseekKey = "8e5a79d68f5752cb1ba96ed5f5cfbeab";
    // DeepSeek API requires 'sk-' prefix; automatically format it if user pasted raw hex
    const formattedKey = deepseekKey.startsWith("sk-") ? deepseekKey : `sk-${deepseekKey}`;
    const deepseek = createOpenAICompatible({
      name: "deepseek",
      apiKey: formattedKey,
      baseURL: "https://api.deepseek.com",
    });
    providers.push({
      name: "deepseek-secondary",
      model: deepseek("deepseek-chat"),
    });
  } catch (e) {
    console.error("[AI Gateway] Failed to init DeepSeek secondary provider:", e);
  }

  // 0.5 Cohere (via COHERE_API_KEY) - Prioritized because it is the only active API key with quota!
  if (process.env.COHERE_API_KEY) {
    try {
      const cohere = createCohere({
        apiKey: process.env.COHERE_API_KEY,
      });
      providers.push({
        name: "cohere",
        model: cohere("command-r-08-2024"),
      });
    } catch (e) {
      console.error("[AI Gateway] Failed to init Cohere provider:", e);
    }
  }

  // 1. OpenAI (via OPENAI_API_KEY) - Prioritized first to avoid free-tier quotas
  if (process.env.OPENAI_API_KEY) {
    try {
      const openai = createOpenAICompatible({
        name: "openai",
        apiKey: process.env.OPENAI_API_KEY,
        baseURL: "https://api.openai.com/v1",
      });
      providers.push({
        name: "openai",
        model: openai("gpt-4o-mini"),
      });
    } catch (e) {
      console.error("[AI Gateway] Failed to init OpenAI provider:", e);
    }
  }

  // 2. Google Gemini (via GEMINI_API_KEY or PROJECTSPARK_API_KEY starting with AIzaSy/AQ)
  const geminiKey = process.env.GEMINI_API_KEY || process.env.PROJECTSPARK_API_KEY;
  if (geminiKey && (geminiKey.startsWith("AIzaSy") || geminiKey.startsWith("AQ"))) {
    try {
      const google = createGoogleGenerativeAI({ apiKey: geminiKey });
      providers.push({
        name: "google-gemini",
        model: google("gemini-2.5-flash"),
      });
    } catch (e) {
      console.error("[AI Gateway] Failed to init Google provider:", e);
    }
  }

  // 2.5. Anthropic (via ANTHROPIC_API_KEY)
  if (process.env.ANTHROPIC_API_KEY) {
    try {
      const anthropic = createAnthropic({
        apiKey: process.env.ANTHROPIC_API_KEY,
      });
      providers.push({
        name: "anthropic",
        model: anthropic("claude-3-5-sonnet-latest"),
      });
    } catch (e) {
      console.error("[AI Gateway] Failed to init Anthropic provider:", e);
    }
  }

  // 2.6. X.ai (via XAI_API_KEY)
  if (process.env.XAI_API_KEY) {
    try {
      const xai = createOpenAICompatible({
        name: "xai",
        apiKey: process.env.XAI_API_KEY,
        baseURL: "https://api.x.ai/v1",
      });
      providers.push({
        name: "xai",
        model: xai("grok-2"),
      });
    } catch (e) {
      console.error("[AI Gateway] Failed to init X.ai provider:", e);
    }
  }



  // 3. OpenRouter (via OPENROUTER_API_KEY)
  if (process.env.OPENROUTER_API_KEY) {
    try {
      const openrouter = createOpenAICompatible({
        name: "openrouter",
        apiKey: process.env.OPENROUTER_API_KEY,
        baseURL: "https://openrouter.ai/api/v1",
        headers: {
          "HTTP-Referer": "https://projectspark.dev",
          "X-Title": "ProjectSpark",
        },
        fetch: async (url, init) => {
          if (init && init.body) {
            try {
              const body = JSON.parse(init.body as string);
              if (!body.max_tokens || body.max_tokens > 8000) {
                body.max_tokens = 8000;
                init.body = JSON.stringify(body);
              }
            } catch (e) {
              console.error("[OpenRouter Interceptor] Error:", e);
            }
          }
          return fetch(url, init);
        }
      });
      providers.push({
        name: "openrouter",
        model: openrouter("google/gemini-2.5-flash"),
      });
    } catch (e) {
      console.error("[AI Gateway] Failed to init OpenRouter provider:", e);
    }
  }

  // 4. Groq (via GROQ_API_KEY)
  if (process.env.GROQ_API_KEY) {
    try {
      const groq = createOpenAICompatible({
        name: "groq",
        apiKey: process.env.GROQ_API_KEY,
        baseURL: "https://api.groq.com/openai/v1",
      });
      providers.push({
        name: "groq",
        model: groq("llama-3.1-8b-instant"),
      });
    } catch (e) {
      console.error("[AI Gateway] Failed to init Groq provider:", e);
    }
  }

  // 5. ProjectSpark (via non-Gemini PROJECTSPARK_API_KEY)
  const projectSparkKey = process.env.PROJECTSPARK_API_KEY;
  if (projectSparkKey && !projectSparkKey.startsWith("AIzaSy") && !projectSparkKey.startsWith("AQ")) {
    try {
      const projectSpark = createOpenAICompatible({
        name: "project-spark",
        baseURL: "https://ai.gateway.projectspark.dev/v1",
        headers: {
          "ProjectSpark-API-Key": projectSparkKey,
          "X-ProjectSpark-AIG-SDK": "vercel-ai-sdk",
        },
      });
      providers.push({
        name: "project-spark-gateway",
        model: projectSpark("google/gemini-3-flash-preview"),
      });
    } catch (e) {
      console.error("[AI Gateway] Failed to init ProjectSpark provider:", e);
    }
  }

  // Fallback mock provider for development when no real API keys are set
  if (providers.length === 0) {
    console.warn("[AI Gateway] No real AI providers configured. Using mock provider.");
    providers.push({
      name: "mock",
      model: {
        async generateText(_args: any) {
          return { text: "[Mock AI response]" };
        },
        async streamText(_args: any) {
          async function* generator() {
            yield { text: "[Mock AI streaming response]" };
          }
          return { text: "[Mock AI response]", stream: generator() };
        },
      },
    });
  }
  return providers;
}

const providerCooldowns = new Map<string, number>();

function isCoolingDown(name: string): boolean {
  const expiresAt = providerCooldowns.get(name);
  if (!expiresAt) return false;
  if (Date.now() > expiresAt) {
    providerCooldowns.delete(name);
    return false;
  }
  return true;
}

function setCooldown(name: string) {
  console.warn(`[AI Gateway] Provider ${name} has failed and is cooling down for 5 minutes.`);
  providerCooldowns.set(name, Date.now() + 5 * 60 * 1000);
}

export async function generateTextResilient(
  options: Omit<Parameters<typeof originalGenerateText>[0], "model"> & { model?: any }
) {
  const providers = getAvailableProviders();
  console.log('[AI Gateway] Available providers count:', providers.length);
  if (providers.length === 0) {
    throw new Error(
      "No AI API Keys configured. Please set GEMINI_API_KEY, OPENAI_API_KEY, OPENROUTER_API_KEY, or GROQ_API_KEY in your .env file."
    );
  }

  const activeProviders = providers.filter(p => !isCoolingDown(p.name));
  const providersToTry = activeProviders.length > 0 ? activeProviders : providers;

  let lastError: unknown;
  for (const prov of providersToTry) {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => {
      console.warn(`[AI Resilient] Provider ${prov.name} timed out after 60000ms`);
      controller.abort();
    }, 60000);

    try {
      console.log(`[AI Resilient] Attempting generation with provider: ${prov.name}`);
      const result = await originalGenerateText({
        ...(options as any),
        model: prov.model,
        abortSignal: options.abortSignal && typeof AbortSignal.any === "function"
          ? AbortSignal.any([options.abortSignal, controller.signal])
          : controller.signal,
      });
      return result;
    } catch (e) {
      console.error(`[AI Resilient] Provider ${prov.name} failed:`, e);
      setCooldown(prov.name);
      lastError = e;
    } finally {
      clearTimeout(timeoutId);
    }
  }
  throw lastError || new Error("All AI providers failed.");
}

export async function generateObjectResilient(
  options: Omit<Parameters<typeof originalGenerateObject>[0], "model"> & { model?: any }
) {
  const providers = getAvailableProviders();
  if (providers.length === 0) {
    throw new Error("No AI API Keys configured.");
  }

  const activeProviders = providers.filter(p => !isCoolingDown(p.name));
  const providersToTry = activeProviders.length > 0 ? activeProviders : providers;

  let lastError: unknown;
  for (const prov of providersToTry) {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => {
      console.warn(`[AI Resilient Object] Provider ${prov.name} timed out after 60000ms`);
      controller.abort();
    }, 60000);

    try {
      console.log(`[AI Resilient Object] Attempting generation with provider: ${prov.name}`);
      const result = await originalGenerateObject({
        ...(options as any),
        model: prov.model,
        abortSignal: options.abortSignal && typeof AbortSignal.any === "function"
          ? AbortSignal.any([options.abortSignal, controller.signal])
          : controller.signal,
      });
      return result;
    } catch (e) {
      console.error(`[AI Resilient Object] Provider ${prov.name} failed:`, e);
      setCooldown(prov.name);
      lastError = e;
    } finally {
      clearTimeout(timeoutId);
    }
  }
  throw lastError || new Error("All AI providers failed.");
}

export async function generateResourceObjectResilient(
  options: Omit<Parameters<typeof originalGenerateObject>[0], "model"> & { model?: any }
) {
  let providers = getResourceProviders();
  if (providers.length === 0) {
    console.warn("[AI Gateway] No Perplexity API Key configured for resources, falling back to general providers.");
    providers = getAvailableProviders();
  }

  const activeProviders = providers.filter(p => !isCoolingDown(p.name));
  const providersToTry = activeProviders.length > 0 ? activeProviders : providers;

  let lastError: unknown;
  for (const prov of providersToTry) {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => {
      console.warn(`[AI Resilient Resource] Provider ${prov.name} timed out after 60000ms`);
      controller.abort();
    }, 60000);

    try {
      console.log(`[AI Resilient Resource] Attempting generation with provider: ${prov.name}`);
      const result = await originalGenerateObject({
        ...(options as any),
        model: prov.model,
        abortSignal: options.abortSignal && typeof AbortSignal.any === "function"
          ? AbortSignal.any([options.abortSignal, controller.signal])
          : controller.signal,
      });
      return result;
    } catch (e) {
      console.error(`[AI Resilient Resource] Provider ${prov.name} failed:`, e);
      setCooldown(prov.name);
      lastError = e;
    } finally {
      clearTimeout(timeoutId);
    }
  }
  throw lastError || new Error("All AI providers failed for resource generation.");
}

export async function streamTextResilient(
  options: Omit<Parameters<typeof originalStreamText>[0], "model"> & { model?: any }
) {
  const providers = getAvailableProviders();
  if (providers.length === 0) {
    throw new Error(
      "No AI API Keys configured. Please set GEMINI_API_KEY, OPENAI_API_KEY, OPENROUTER_API_KEY, or GROQ_API_KEY in your .env file."
    );
  }

  const activeProviders = providers.filter(p => !isCoolingDown(p.name));
  const providersToTry = activeProviders.length > 0 ? activeProviders : providers;

  let lastError: unknown;
  for (const prov of providersToTry) {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => {
      console.warn(`[AI Resilient Stream] Provider ${prov.name} timed out after 30000ms`);
      controller.abort();
    }, 30000);

    try {
      console.log(`[AI Resilient Stream] Attempting streaming with provider: ${prov.name}`);
      const result = await originalStreamText({
        ...(options as any),
        model: prov.model,
        abortSignal: options.abortSignal && typeof AbortSignal.any === "function"
          ? AbortSignal.any([options.abortSignal, controller.signal])
          : controller.signal,
      });
      return result;
    } catch (e) {
      console.error(`[AI Resilient Stream] Provider ${prov.name} failed:`, e);
      setCooldown(prov.name);
      lastError = e;
    } finally {
      clearTimeout(timeoutId);
    }
  }
  throw lastError || new Error("All AI providers failed.");
}
