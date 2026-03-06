"use client";

import { useState, useEffect } from "react";
import {
  AIConfig,
  DEFAULT_AI_CONFIG,
  AI_CONFIG_KEY,
  ProviderType,
  PROVIDER_LABELS,
  DEFAULT_MODELS,
} from "@/lib/ai-config";

interface AISettingsProps {
  onClose: () => void;
}

export function AISettings({ onClose }: AISettingsProps) {
  const [config, setConfig] = useState<AIConfig>(DEFAULT_AI_CONFIG);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(AI_CONFIG_KEY);
      if (stored) {
        setConfig({ ...DEFAULT_AI_CONFIG, ...JSON.parse(stored) });
      }
    } catch {
      // Use defaults
    }
  }, []);

  function handleProviderChange(provider: ProviderType) {
    setConfig((prev) => ({
      ...prev,
      provider,
      enabled: provider !== "default",
      // Pre-fill model name for known providers
      modelName: DEFAULT_MODELS[provider] || prev.modelName || "",
    }));
    setSaved(false);
  }

  function handleSave() {
    try {
      localStorage.setItem(AI_CONFIG_KEY, JSON.stringify(config));
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    } catch {
      // localStorage full
    }
  }

  function handleClear() {
    setConfig(DEFAULT_AI_CONFIG);
    try {
      localStorage.removeItem(AI_CONFIG_KEY);
    } catch {
      // ignore
    }
    setSaved(false);
  }

  const showApiKey = config.provider !== "default";
  const showEndpoint = config.provider === "custom";
  const showModel = config.provider === "openai" || config.provider === "custom";

  return (
    <div className="settings-overlay" onClick={onClose}>
      <div className="settings-modal" onClick={(e) => e.stopPropagation()}>
        <div className="settings-header">
          <h2 style={{ fontFamily: "var(--font-syne), 'Syne', sans-serif" }}>
            AI Settings
          </h2>
          <button className="settings-close" onClick={onClose} aria-label="Close">
            &times;
          </button>
        </div>

        <div className="settings-body">
          <div className="settings-field">
            <label className="settings-label">AI Provider</label>
            <select
              className="settings-select"
              value={config.provider}
              onChange={(e) => handleProviderChange(e.target.value as ProviderType)}
            >
              {(Object.keys(PROVIDER_LABELS) as ProviderType[]).map((key) => (
                <option key={key} value={key}>
                  {PROVIDER_LABELS[key]}
                </option>
              ))}
            </select>
            <span className="settings-hint">
              {config.provider === "default"
                ? "Uses the server's built-in AI — no setup needed."
                : config.provider === "custom"
                  ? "Any OpenAI-compatible API (Ollama, LM Studio, Together AI, etc.)"
                  : `Provide your own ${PROVIDER_LABELS[config.provider]} API key.`}
            </span>
          </div>

          {showApiKey && (
            <div className="settings-field">
              <label className="settings-label">API Key</label>
              <input
                type="password"
                className="settings-input"
                value={config.apiKey}
                onChange={(e) => {
                  setConfig((prev) => ({ ...prev, apiKey: e.target.value }));
                  setSaved(false);
                }}
                placeholder={
                  config.provider === "gemini"
                    ? "AIza..."
                    : config.provider === "openai"
                      ? "sk-..."
                      : config.provider === "anthropic"
                        ? "sk-ant-..."
                        : "API key"
                }
              />
              <span className="settings-hint">
                Stored locally in your browser. Never sent to our servers.
              </span>
            </div>
          )}

          {showEndpoint && (
            <div className="settings-field">
              <label className="settings-label">Endpoint URL</label>
              <input
                type="url"
                className="settings-input"
                value={config.customEndpoint || ""}
                onChange={(e) => {
                  setConfig((prev) => ({ ...prev, customEndpoint: e.target.value }));
                  setSaved(false);
                }}
                placeholder="http://localhost:11434"
              />
              <span className="settings-hint">
                Base URL for OpenAI-compatible API (e.g., Ollama at localhost:11434)
              </span>
            </div>
          )}

          {showModel && (
            <div className="settings-field">
              <label className="settings-label">Model Name</label>
              <input
                type="text"
                className="settings-input"
                value={config.modelName || ""}
                onChange={(e) => {
                  setConfig((prev) => ({ ...prev, modelName: e.target.value }));
                  setSaved(false);
                }}
                placeholder={
                  config.provider === "custom" ? "llama3.1" : DEFAULT_MODELS[config.provider] || ""
                }
              />
              <span className="settings-hint">
                {config.provider === "custom"
                  ? "Model name as configured in your endpoint"
                  : "Leave blank for the recommended default"}
              </span>
            </div>
          )}
        </div>

        <div className="settings-actions">
          {config.provider !== "default" && (
            <button className="settings-btn-clear" onClick={handleClear}>
              Reset to Default
            </button>
          )}
          <div className="settings-actions-right">
            <button className="settings-btn-cancel" onClick={onClose}>
              Cancel
            </button>
            <button
              className="settings-btn-save"
              onClick={handleSave}
              disabled={showApiKey && !config.apiKey}
            >
              {saved ? "Saved!" : "Save"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
