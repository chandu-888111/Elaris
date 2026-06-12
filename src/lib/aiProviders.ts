// src/lib/aiProviders.ts

/**
 * Centralized AI provider wrapper.
 * Supports OpenAI (ChatGPT) and Google Gemini.
 * Exported functions return a configured model instance that can be used
 * throughout the application for text generation, summarisation, etc.
 */

import { OpenAI } from "openai";
import { GoogleGenerativeAI } from "@google/generative-ai";

// Load API keys from environment variables. The project already uses Vercel env,
// but we fall back to process.env for local dev.
const OPENAI_API_KEY = process.env.OPENAI_API_KEY ?? "";
const GEMINI_API_KEY = process.env.GEMINI_API_KEY ?? "";

/**
 * Returns an OpenAI client instance.
 * Caller must ensure the key is present.
 */
export function getOpenAIClient() {
  if (!OPENAI_API_KEY) {
    throw new Error("OpenAI API key not configured");
  }
  return new OpenAI({ apiKey: OPENAI_API_KEY });
}

/**
 * Returns a Gemini client instance.
 */
export function getGeminiClient() {
  if (!GEMINI_API_KEY) {
    throw new Error("Gemini API key not configured");
  }
  return new GoogleGenerativeAI(GEMINI_API_KEY);
}

/**
 * Simple utility to call the appropriate provider based on a string.
 * `provider` can be "openai" or "gemini".
 */
export async function generateText(
  provider: "openai" | "gemini",
  prompt: string,
  options?: { maxTokens?: number }
): Promise<string> {
  if (provider === "openai") {
    const client = getOpenAIClient();
    const response = await client.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
      max_tokens: options?.maxTokens,
    });
    return response.choices[0].message.content ?? "";
  }

  // Gemini implementation – use the first model for text generation.
  const gemini = getGeminiClient();
  const model = gemini.getGenerativeModel({ model: "gemini-1.5-flash" });
  const result = await model.generateContent(prompt);
  const text = await result.response?.text();
  return text ?? "";
}
