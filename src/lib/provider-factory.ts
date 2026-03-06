import { AIProvider } from "./ai-provider";
import { AIConfig, DEFAULT_MODELS } from "./ai-config";
import { MockProvider } from "./providers/mock";
import { GeminiProvider } from "./providers/gemini";
import { AnthropicProvider } from "./providers/anthropic";
import { OpenAICompatibleProvider } from "./providers/openai-compatible";

/**
 * Create an AI provider instance.
 * If a user-provided AIConfig is given (with enabled=true and a valid key),
 * it creates a provider using the user's key.
 * Otherwise falls back to server-side env var config.
 */
export function getProvider(aiConfig?: AIConfig): AIProvider {
  // User-provided config takes priority
  if (aiConfig?.enabled && aiConfig.provider !== "default" && aiConfig.apiKey) {
    switch (aiConfig.provider) {
      case "gemini":
        return new GeminiProvider(aiConfig.apiKey);
      case "openai":
        return new OpenAICompatibleProvider(
          aiConfig.apiKey,
          aiConfig.modelName || DEFAULT_MODELS.openai
        );
      case "anthropic":
        return new AnthropicProvider(aiConfig.apiKey);
      case "custom":
        return new OpenAICompatibleProvider(
          aiConfig.apiKey,
          aiConfig.modelName || "gpt-4o-mini",
          aiConfig.customEndpoint
        );
    }
  }

  // Fall back to server-side env var config
  const provider = process.env.AI_PROVIDER || "mock";
  switch (provider) {
    case "gemini":
      return new GeminiProvider();
    case "anthropic":
      return new AnthropicProvider();
    case "mock":
    default:
      return new MockProvider();
  }
}
