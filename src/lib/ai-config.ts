export type ProviderType = "default" | "gemini" | "openai" | "anthropic" | "custom";

export interface AIConfig {
  provider: ProviderType;
  apiKey: string;
  customEndpoint?: string;  // For OpenAI-compatible endpoints (Ollama, LM Studio, etc.)
  modelName?: string;       // Optional model override
  enabled: boolean;         // Whether to use this config vs server default
}

export const AI_CONFIG_KEY = "workout_ai_config";

export const DEFAULT_AI_CONFIG: AIConfig = {
  provider: "default",
  apiKey: "",
  customEndpoint: "",
  modelName: "",
  enabled: false,
};

export const PROVIDER_LABELS: Record<ProviderType, string> = {
  default: "Default (Server)",
  gemini: "Google Gemini",
  openai: "OpenAI",
  anthropic: "Anthropic (Claude)",
  custom: "Custom Endpoint",
};

export const DEFAULT_MODELS: Partial<Record<ProviderType, string>> = {
  gemini: "gemini-2.5-flash",
  openai: "gpt-4o-mini",
  anthropic: "claude-sonnet-4-20250514",
};
