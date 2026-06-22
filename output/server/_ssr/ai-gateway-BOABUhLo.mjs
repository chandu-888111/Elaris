import { c as createOpenAICompatible } from "../_libs/ai-sdk__openai-compatible.mjs";
import { c as createGoogleGenerativeAI } from "../_libs/ai-sdk__google.mjs";
import { c as createAnthropic } from "../_libs/ai-sdk__anthropic.mjs";
import { c as createCohere } from "../_libs/ai-sdk__cohere.mjs";
import require$$0$1 from "fs";
import require$$0 from "path";
import { s as streamText, g as generateText, a as generateObject } from "../_libs/ai.mjs";
try {
  const envPath = require$$0.resolve(process.cwd(), ".env.local");
  if (require$$0$1.existsSync(envPath)) {
    const envContent = require$$0$1.readFileSync(envPath, "utf-8");
    envContent.split("\n").forEach((line) => {
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
}
function getResourceProviders() {
  const providers = [];
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
          "X-Title": "ProjectSpark"
        } : void 0
      });
      providers.push({
        name: "perplexity-resource",
        model: client(isOR ? "perplexity/sonar" : "sonar")
      });
    } catch (e) {
      console.error("[AI Gateway] Failed to init resource provider:", e);
    }
  }
  return providers;
}
function getAvailableProviders() {
  const providers = [];
  if (process.env.NVIDIA_API_KEY) {
    try {
      const nvidia = createOpenAICompatible({
        name: "nvidia",
        apiKey: process.env.NVIDIA_API_KEY,
        baseURL: "https://integrate.api.nvidia.com/v1"
      });
      providers.push({
        name: "nvidia",
        model: nvidia("meta/llama-3.1-70b-instruct")
      });
    } catch (e) {
      console.error("[AI Gateway] Failed to init NVIDIA provider:", e);
    }
  }
  try {
    const deepseekKey = "8e5a79d68f5752cb1ba96ed5f5cfbeab";
    const formattedKey = deepseekKey.startsWith("sk-") ? deepseekKey : `sk-${deepseekKey}`;
    const deepseek = createOpenAICompatible({
      name: "deepseek",
      apiKey: formattedKey,
      baseURL: "https://api.deepseek.com"
    });
    providers.push({
      name: "deepseek-secondary",
      model: deepseek("deepseek-chat")
    });
  } catch (e) {
    console.error("[AI Gateway] Failed to init DeepSeek secondary provider:", e);
  }
  if (process.env.COHERE_API_KEY) {
    try {
      const cohere = createCohere({
        apiKey: process.env.COHERE_API_KEY
      });
      providers.push({
        name: "cohere",
        model: cohere("command-r-08-2024")
      });
    } catch (e) {
      console.error("[AI Gateway] Failed to init Cohere provider:", e);
    }
  }
  if (process.env.OPENAI_API_KEY) {
    try {
      const openai = createOpenAICompatible({
        name: "openai",
        apiKey: process.env.OPENAI_API_KEY,
        baseURL: "https://api.openai.com/v1"
      });
      providers.push({
        name: "openai",
        model: openai("gpt-4o-mini")
      });
    } catch (e) {
      console.error("[AI Gateway] Failed to init OpenAI provider:", e);
    }
  }
  const geminiKey = process.env.GEMINI_API_KEY || process.env.PROJECTSPARK_API_KEY;
  if (geminiKey && (geminiKey.startsWith("AIzaSy") || geminiKey.startsWith("AQ"))) {
    try {
      const google = createGoogleGenerativeAI({ apiKey: geminiKey });
      providers.push({
        name: "google-gemini",
        model: google("gemini-2.5-flash")
      });
    } catch (e) {
      console.error("[AI Gateway] Failed to init Google provider:", e);
    }
  }
  if (process.env.ANTHROPIC_API_KEY) {
    try {
      const anthropic = createAnthropic({
        apiKey: process.env.ANTHROPIC_API_KEY
      });
      providers.push({
        name: "anthropic",
        model: anthropic("claude-3-5-sonnet-latest")
      });
    } catch (e) {
      console.error("[AI Gateway] Failed to init Anthropic provider:", e);
    }
  }
  if (process.env.XAI_API_KEY) {
    try {
      const xai = createOpenAICompatible({
        name: "xai",
        apiKey: process.env.XAI_API_KEY,
        baseURL: "https://api.x.ai/v1"
      });
      providers.push({
        name: "xai",
        model: xai("grok-2")
      });
    } catch (e) {
      console.error("[AI Gateway] Failed to init X.ai provider:", e);
    }
  }
  if (process.env.OPENROUTER_API_KEY) {
    try {
      const openrouter = createOpenAICompatible({
        name: "openrouter",
        apiKey: process.env.OPENROUTER_API_KEY,
        baseURL: "https://openrouter.ai/api/v1",
        headers: {
          "HTTP-Referer": "https://projectspark.dev",
          "X-Title": "ProjectSpark"
        },
        fetch: async (url, init) => {
          if (init && init.body) {
            try {
              const body = JSON.parse(init.body);
              if (!body.max_tokens || body.max_tokens > 8e3) {
                body.max_tokens = 8e3;
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
        model: openrouter("google/gemini-2.5-flash")
      });
    } catch (e) {
      console.error("[AI Gateway] Failed to init OpenRouter provider:", e);
    }
  }
  if (process.env.GROQ_API_KEY) {
    try {
      const groq = createOpenAICompatible({
        name: "groq",
        apiKey: process.env.GROQ_API_KEY,
        baseURL: "https://api.groq.com/openai/v1"
      });
      providers.push({
        name: "groq",
        model: groq("llama-3.1-8b-instant")
      });
    } catch (e) {
      console.error("[AI Gateway] Failed to init Groq provider:", e);
    }
  }
  const projectSparkKey = process.env.PROJECTSPARK_API_KEY;
  if (projectSparkKey && !projectSparkKey.startsWith("AIzaSy") && !projectSparkKey.startsWith("AQ")) {
    try {
      const projectSpark = createOpenAICompatible({
        name: "project-spark",
        baseURL: "https://ai.gateway.projectspark.dev/v1",
        headers: {
          "ProjectSpark-API-Key": projectSparkKey,
          "X-ProjectSpark-AIG-SDK": "vercel-ai-sdk"
        }
      });
      providers.push({
        name: "project-spark-gateway",
        model: projectSpark("google/gemini-3-flash-preview")
      });
    } catch (e) {
      console.error("[AI Gateway] Failed to init ProjectSpark provider:", e);
    }
  }
  if (providers.length === 0) {
    console.warn("[AI Gateway] No real AI providers configured. Using mock provider.");
    providers.push({
      name: "mock",
      model: {
        async generateText(_args) {
          return { text: "[Mock AI response]" };
        },
        async streamText(_args) {
          async function* generator() {
            yield { text: "[Mock AI streaming response]" };
          }
          return { text: "[Mock AI response]", stream: generator() };
        }
      }
    });
  }
  return providers;
}
const providerCooldowns = /* @__PURE__ */ new Map();
function isCoolingDown(name) {
  const expiresAt = providerCooldowns.get(name);
  if (!expiresAt) return false;
  if (Date.now() > expiresAt) {
    providerCooldowns.delete(name);
    return false;
  }
  return true;
}
function setCooldown(name) {
  console.warn(`[AI Gateway] Provider ${name} has failed and is cooling down for 5 minutes.`);
  providerCooldowns.set(name, Date.now() + 5 * 60 * 1e3);
}
async function generateTextResilient(options) {
  const providers = getAvailableProviders();
  console.log("[AI Gateway] Available providers count:", providers.length);
  if (providers.length === 0) {
    throw new Error(
      "No AI API Keys configured. Please set GEMINI_API_KEY, OPENAI_API_KEY, OPENROUTER_API_KEY, or GROQ_API_KEY in your .env file."
    );
  }
  const activeProviders = providers.filter((p) => !isCoolingDown(p.name));
  const providersToTry = activeProviders.length > 0 ? activeProviders : providers;
  let lastError;
  for (const prov of providersToTry) {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => {
      console.warn(`[AI Resilient] Provider ${prov.name} timed out after 60000ms`);
      controller.abort();
    }, 6e4);
    try {
      console.log(`[AI Resilient] Attempting generation with provider: ${prov.name}`);
      const { model, ...restOptions } = options;
      const result = await generateText({
        ...restOptions,
        model: prov.model,
        abortSignal: options.abortSignal && typeof AbortSignal.any === "function" ? AbortSignal.any([options.abortSignal, controller.signal]) : controller.signal
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
async function generateResourceObjectResilient(options) {
  let providers = getResourceProviders();
  if (providers.length === 0) {
    console.warn(
      "[AI Gateway] No Perplexity API Key configured for resources, falling back to general providers."
    );
    providers = getAvailableProviders();
  }
  const activeProviders = providers.filter((p) => !isCoolingDown(p.name));
  const providersToTry = activeProviders.length > 0 ? activeProviders : providers;
  let lastError;
  for (const prov of providersToTry) {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => {
      console.warn(`[AI Resilient Resource] Provider ${prov.name} timed out after 60000ms`);
      controller.abort();
    }, 6e4);
    try {
      console.log(`[AI Resilient Resource] Attempting generation with provider: ${prov.name}`);
      const { model, ...restOptions } = options;
      const result = await generateObject({
        ...restOptions,
        model: prov.model,
        abortSignal: options.abortSignal && typeof AbortSignal.any === "function" ? AbortSignal.any([options.abortSignal, controller.signal]) : controller.signal
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
async function streamTextResilient(options) {
  const providers = getAvailableProviders();
  if (providers.length === 0) {
    throw new Error(
      "No AI API Keys configured. Please set GEMINI_API_KEY, OPENAI_API_KEY, OPENROUTER_API_KEY, or GROQ_API_KEY in your .env file."
    );
  }
  const activeProviders = providers.filter((p) => !isCoolingDown(p.name));
  const providersToTry = activeProviders.length > 0 ? activeProviders : providers;
  let lastError;
  for (const prov of providersToTry) {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => {
      console.warn(`[AI Resilient Stream] Provider ${prov.name} timed out after 30000ms`);
      controller.abort();
    }, 3e4);
    try {
      console.log(`[AI Resilient Stream] Attempting streaming with provider: ${prov.name}`);
      const { model, ...restOptions } = options;
      const result = await streamText({
        ...restOptions,
        model: prov.model,
        abortSignal: options.abortSignal && typeof AbortSignal.any === "function" ? AbortSignal.any([options.abortSignal, controller.signal]) : controller.signal
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
export {
  generateResourceObjectResilient as a,
  generateTextResilient as g,
  streamTextResilient as s
};
