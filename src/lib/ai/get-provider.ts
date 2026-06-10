import { AIProvider } from "./provider";
import { MockAIProvider } from "./mock-provider";

export function getAIProvider(): AIProvider {
  const provider = process.env.AI_PROVIDER || "mock";

  if (
    provider === "openai-compatible" &&
    process.env.OPENAI_COMPATIBLE_API_KEY &&
    process.env.OPENAI_COMPATIBLE_BASE_URL
  ) {
    // Dynamic import to avoid errors when the module is not available
    try {
      const { OpenAICompatibleProvider } = require("./openai-compatible-provider");
      return new OpenAICompatibleProvider();
    } catch {
      console.warn("Failed to load OpenAI-compatible provider, falling back to mock");
      return new MockAIProvider();
    }
  }

  return new MockAIProvider();
}