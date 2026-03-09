"use client";

import { useState } from "react";
import { AISettings } from "./AISettings";
import { UserProfile, Weeks, IntakeData } from "@/data/types";
import { AIConfig, AI_CONFIG_KEY } from "@/lib/ai-config";
import {
  EQUIPMENT_OPTIONS,
  GOAL_OPTIONS,
  DAYS_PER_WEEK_OPTIONS,
  TIME_PER_SESSION_OPTIONS,
} from "@/data/presets";

interface IntakeFormProps {
  onComplete: (profile: UserProfile, routine: Weeks) => void;
}

function getAIConfig(): AIConfig | undefined {
  try {
    const stored = localStorage.getItem(AI_CONFIG_KEY);
    if (stored) {
      const config = JSON.parse(stored) as AIConfig;
      if (config.enabled && config.provider !== "default" && config.apiKey) {
        return config;
      }
    }
  } catch {
    // ignore
  }
  return undefined;
}

const DEFAULT_FORM: IntakeData = {
  height: "",
  weight: 0,
  weightUnit: "lb",
  age: 0,
  sex: "male",
  equipment: [],
  equipmentDetails: "",
  goals: [],
  goalsDetails: "",
  constraints: "",
  daysPerWeek: 4,
  timePerSession: "45 min",
};

export function IntakeForm({ onComplete }: IntakeFormProps) {
  const [form, setForm] = useState<IntakeData>({ ...DEFAULT_FORM });
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showSettings, setShowSettings] = useState(false);
  const [touched, setTouched] = useState(false);

  function updateField<K extends keyof IntakeData>(key: K, value: IntakeData[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function toggleChip(key: "equipment" | "goals", id: string) {
    setForm((prev) => {
      const current = prev[key];
      const next = current.includes(id)
        ? current.filter((v) => v !== id)
        : [...current, id];
      return { ...prev, [key]: next };
    });
  }

  function validate(): string | null {
    if (!form.height.trim()) return "Please enter your height";
    if (!form.weight || form.weight <= 0) return "Please enter your weight";
    if (!form.age || form.age <= 0) return "Please enter your age";
    if (form.equipment.length === 0) return "Please select at least one equipment option";
    if (form.goals.length === 0) return "Please select at least one goal";
    return null;
  }

  async function handleSubmit() {
    setTouched(true);
    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }

    setError(null);
    setIsGenerating(true);

    try {
      const aiConfig = getAIConfig();
      const body: Record<string, unknown> = { intake: form };
      if (aiConfig) body.aiConfig = aiConfig;

      const response = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        throw new Error(errorData?.error || "Generation failed");
      }

      // Read the full response (no need for streaming display — we show a spinner)
      const fullContent = await response.text();

      // Parse JSON — try raw first (Gemini JSON mode), then markdown fences (other providers)
      let routineData;
      try {
        routineData = JSON.parse(fullContent);
      } catch {
        const match = fullContent.match(/```json\s*([\s\S]*?)\s*```/);
        if (match) {
          routineData = JSON.parse(match[1]);
        } else {
          throw new Error("Could not parse routine from AI response");
        }
      }

      // Handle both formats: { "1": {...} } or { routine: { "1": {...} }, profile: {...} }
      const weeks = routineData.routine || routineData;

      const routine: Weeks = {};
      for (const key in weeks) {
        routine[Number(key)] = weeks[key];
      }

      // Validate we got 4 weeks
      if (Object.keys(routine).length < 4) {
        throw new Error("Generated routine is incomplete — please try again");
      }

      // Build profile from form data
      const profile: UserProfile = {
        height: form.height,
        weight: form.weight,
        weightUnit: form.weightUnit,
        age: form.age,
        sex: form.sex,
        equipment: form.equipment,
        goals: form.goals,
        constraints: form.constraints
          ? form.constraints.split(",").map((s) => s.trim()).filter(Boolean)
          : [],
        createdAt: new Date().toISOString(),
      };

      onComplete(profile, routine);
    } catch (err) {
      console.error("Generation error:", err);
      setError(
        err instanceof Error ? err.message : "Failed to generate routine"
      );
      setIsGenerating(false);
    }
  }

  if (isGenerating) {
    return (
      <div className="intake-container">
        <div className="chat-header">
          <div>
            <h1 style={{ fontFamily: "var(--font-syne), 'Syne', sans-serif" }}>
              Build Your Routine
            </h1>
            <p>Generating your plan</p>
          </div>
        </div>
        <div className="intake-generating">
          <div className="intake-spinner" />
          <h2>Building your 4-week plan...</h2>
          <p>
            Our AI is crafting a personalized routine based on your goals,
            equipment, and schedule.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="intake-container">
      <div className="chat-header">
        <div>
          <h1 style={{ fontFamily: "var(--font-syne), 'Syne', sans-serif" }}>
            Build Your Routine
          </h1>
          <p>Tell us about yourself</p>
        </div>
        <button
          className="settings-gear"
          onClick={() => setShowSettings(true)}
          title="AI Settings"
        >
          &#9881;
        </button>
      </div>

      <div className="intake-body">
        {error && <div className="intake-error">{error}</div>}

        {/* About You */}
        <div className="intake-section">
          <h3>About You</h3>
          <div className="intake-row">
            <div className={`intake-field${touched && !form.height.trim() ? " has-error" : ""}`}>
              <label>Height</label>
              <input
                type="text"
                placeholder="5'10&quot; or 178 cm"
                value={form.height}
                onChange={(e) => updateField("height", e.target.value)}
              />
            </div>
            <div className={`intake-field${touched && (!form.weight || form.weight <= 0) ? " has-error" : ""}`}>
              <label>Weight</label>
              <div className="intake-weight-row">
                <input
                  type="number"
                  placeholder="180"
                  value={form.weight || ""}
                  onChange={(e) =>
                    updateField("weight", Number(e.target.value))
                  }
                />
                <div className="intake-unit-toggle">
                  <button
                    type="button"
                    className={`intake-unit-btn${form.weightUnit === "lb" ? " active" : ""}`}
                    onClick={() => updateField("weightUnit", "lb")}
                  >
                    LB
                  </button>
                  <button
                    type="button"
                    className={`intake-unit-btn${form.weightUnit === "kg" ? " active" : ""}`}
                    onClick={() => updateField("weightUnit", "kg")}
                  >
                    KG
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="intake-row" style={{ marginTop: "0.75rem" }}>
            <div className={`intake-field${touched && (!form.age || form.age <= 0) ? " has-error" : ""}`}>
              <label>Age</label>
              <input
                type="number"
                placeholder="30"
                value={form.age || ""}
                onChange={(e) => updateField("age", Number(e.target.value))}
              />
            </div>
            <div className="intake-field">
              <label>Sex</label>
              <select
                value={form.sex}
                onChange={(e) =>
                  updateField(
                    "sex",
                    e.target.value as "male" | "female" | "other"
                  )
                }
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>
        </div>

        {/* Equipment */}
        <div className="intake-section">
          <h3>Equipment</h3>
          <div
            className={`intake-chips${touched && form.equipment.length === 0 ? " has-error" : ""}`}
          >
            {EQUIPMENT_OPTIONS.map((opt) => (
              <button
                key={opt.id}
                type="button"
                className={`intake-chip${form.equipment.includes(opt.id) ? " selected" : ""}`}
                onClick={() => toggleChip("equipment", opt.id)}
              >
                {opt.label}
              </button>
            ))}
          </div>
          {form.equipment.length > 0 && (
            <div className="intake-field" style={{ marginTop: "0.6rem" }}>
              <input
                type="text"
                placeholder="Details: e.g., 2x 25lb dumbbells, doorframe pull-up bar"
                value={form.equipmentDetails}
                onChange={(e) => updateField("equipmentDetails", e.target.value)}
              />
            </div>
          )}
        </div>

        {/* Goals */}
        <div className="intake-section">
          <h3>Goals</h3>
          <div
            className={`intake-chips${touched && form.goals.length === 0 ? " has-error" : ""}`}
          >
            {GOAL_OPTIONS.map((opt) => (
              <button
                key={opt.id}
                type="button"
                className={`intake-chip${form.goals.includes(opt.id) ? " selected" : ""}`}
                onClick={() => toggleChip("goals", opt.id)}
              >
                {opt.label}
              </button>
            ))}
          </div>
          {form.goals.length > 0 && (
            <div className="intake-field" style={{ marginTop: "0.6rem" }}>
              <input
                type="text"
                placeholder="Details: e.g., focus on upper body, training for a 5K"
                value={form.goalsDetails}
                onChange={(e) => updateField("goalsDetails", e.target.value)}
              />
            </div>
          )}
        </div>

        {/* Constraints */}
        <div className="intake-section">
          <h3>Constraints (optional)</h3>
          <div className="intake-field">
            <textarea
              placeholder="Any injuries, limitations, or preferences? (e.g., bad knees, apartment = no jumping, prefer morning workouts)"
              value={form.constraints}
              onChange={(e) => updateField("constraints", e.target.value)}
            />
          </div>
        </div>

        {/* Schedule */}
        <div className="intake-section">
          <h3>Schedule</h3>
          <div className="intake-field" style={{ marginBottom: "0.75rem" }}>
            <label>Days per week</label>
            <div className="intake-day-chips">
              {DAYS_PER_WEEK_OPTIONS.map((n) => (
                <button
                  key={n}
                  type="button"
                  className={`intake-day-chip${form.daysPerWeek === n ? " selected" : ""}`}
                  onClick={() => updateField("daysPerWeek", n)}
                >
                  {n}
                </button>
              ))}
            </div>
          </div>
          <div className="intake-field">
            <label>Time per session</label>
            <select
              value={form.timePerSession}
              onChange={(e) => updateField("timePerSession", e.target.value)}
            >
              {TIME_PER_SESSION_OPTIONS.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="intake-footer">
        <button
          className="intake-submit"
          onClick={handleSubmit}
          disabled={isGenerating}
        >
          Generate My Routine &#10148;
        </button>
      </div>

      {showSettings && <AISettings onClose={() => setShowSettings(false)} />}
    </div>
  );
}
