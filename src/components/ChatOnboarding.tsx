"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { ChatMessage } from "./ChatMessage";
import { ChatInput } from "./ChatInput";
import { AISettings } from "./AISettings";
import { Weeks, UserProfile } from "@/data/types";
import { AIConfig, AI_CONFIG_KEY } from "@/lib/ai-config";

interface Message {
  role: "user" | "assistant";
  content: string;
}

interface ChatOnboardingProps {
  onComplete: (profile: UserProfile, routine: Weeks) => void;
  mode?: "create" | "edit";
  currentRoutine?: Weeks;
  currentProfile?: UserProfile;
}

function extractRoutineFromMessages(messages: Message[]): {
  profile: UserProfile;
  routine: Weeks;
} | null {
  // Look through assistant messages for the JSON block
  for (let i = messages.length - 1; i >= 0; i--) {
    const msg = messages[i];
    if (msg.role !== "assistant") continue;

    const jsonMatch = msg.content.match(/```json\s*([\s\S]*?)\s*```/);
    if (jsonMatch) {
      try {
        const parsed = JSON.parse(jsonMatch[1]);
        if (parsed.routine && parsed.profile) {
          const profile: UserProfile = {
            height: parsed.profile.height || "",
            weight: Number(parsed.profile.weight) || 0,
            weightUnit: parsed.profile.weightUnit || "lb",
            age: Number(parsed.profile.age) || 0,
            sex: parsed.profile.sex || "other",
            equipment: parsed.profile.equipment || [],
            goals: parsed.profile.goals || [],
            constraints: parsed.profile.constraints || [],
            createdAt: new Date().toISOString(),
          };

          // Convert routine keys to numbers
          const routine: Weeks = {};
          for (const key in parsed.routine) {
            routine[Number(key)] = parsed.routine[key];
          }

          return { profile, routine };
        }
      } catch {
        // JSON parse failed, continue searching
      }
    }
  }
  return null;
}

function isReadyToGenerate(content: string): boolean {
  const lower = content.toLowerCase();
  const readyMarkers = [
    "i have everything i need to build your routine",
    "got it, generating your updated routine now",
  ];
  // Also catch common variants the AI might say
  const fallbackMarkers = [
    "i have everything i need",
    "i've got everything i need",
    "let me build your routine",
    "let me generate your routine",
    "generating your personalized",
  ];
  return (
    readyMarkers.some((m) => lower.includes(m)) ||
    fallbackMarkers.some((m) => lower.includes(m))
  );
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

export function ChatOnboarding({ onComplete, mode = "create", currentRoutine, currentProfile }: ChatOnboardingProps) {
  const isEdit = mode === "edit";
  const initialContent = isEdit
    ? "Hi, I'd like to make some changes to my current workout routine."
    : "Hi, I'd like to create a custom workout routine.";
  const [messages, setMessages] = useState<Message[]>([]);
  const [isStreaming, setIsStreaming] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [routineReady, setRoutineReady] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const hasStarted = useRef(false);
  const generationAttempts = useRef(0);
  const MAX_GENERATION_ATTEMPTS = 2;

  const scrollToBottom = useCallback(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  // Send initial greeting
  useEffect(() => {
    if (hasStarted.current) return;
    hasStarted.current = true;

    if (isEdit) {
      setMessages([
        { role: "assistant", content: "I have your current routine loaded and ready to tweak. Describe the changes you'd like — for example:\n\n• \"Replace rest days with leg workouts\"\n• \"My shoulder hurts, swap out overhead presses\"\n• \"Add more core work on Wednesdays\"\n\nI'll make the changes and generate your updated routine right away." },
      ]);
    } else {
      const initialMessage: Message = { role: "user", content: initialContent };
      setMessages([initialMessage]);
      sendToAPI([initialMessage]);
    }
  }, []);

  async function generateRoutine(conversationMessages: Message[]) {
    setIsGenerating(true);

    try {
      const aiConfig = getAIConfig();
      const body: Record<string, unknown> = {
        messages: isEdit
          ? conversationMessages.slice(1) // skip static greeting
          : conversationMessages,
      };

      if (isEdit && currentRoutine && currentProfile) {
        body.mode = "edit";
        body.routine = currentRoutine;
        body.profile = currentProfile;
      }

      if (aiConfig) {
        body.aiConfig = aiConfig;
      }

      const response = await fetch("/api/chat/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        throw new Error(errorData?.error || "Generation failed");
      }

      const reader = response.body?.getReader();
      if (!reader) throw new Error("No stream reader");

      const decoder = new TextDecoder();
      let fullContent = "";

      // Add empty assistant message to stream the generation into
      // (ChatMessage already strips JSON blocks from display)
      setMessages((prev) => [...prev, { role: "assistant", content: "" }]);

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        fullContent += chunk;

        setMessages((prev) => {
          const updated = [...prev];
          updated[updated.length - 1] = {
            role: "assistant",
            content: fullContent,
          };
          return updated;
        });
      }

      // Extract the routine from the generation response
      const result = extractRoutineFromMessages([
        { role: "assistant", content: fullContent },
      ]);
      if (result) {
        setRoutineReady(true);
      } else {
        // Generation failed to produce valid JSON — retry
        generationAttempts.current += 1;
        if (generationAttempts.current < MAX_GENERATION_ATTEMPTS) {
          setMessages((prev) => [
            ...prev,
            {
              role: "assistant",
              content: "Let me try generating that again...",
            },
          ]);
          await generateRoutine(conversationMessages);
        } else {
          setMessages((prev) => [
            ...prev,
            {
              role: "assistant",
              content:
                "Sorry, I had trouble generating your routine. Please try refreshing the page and starting over.",
            },
          ]);
        }
      }
    } catch (error) {
      console.error("Generation error:", error);
      const errorMsg = error instanceof Error ? error.message : "Unknown error";
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: `Sorry, I ran into an issue generating your routine: ${errorMsg}`,
        },
      ]);
    } finally {
      setIsGenerating(false);
    }
  }

  async function sendToAPI(messagesToSend: Message[]) {
    setIsStreaming(true);

    try {
      const aiConfig = getAIConfig();
      const endpoint = isEdit ? "/api/chat/edit" : "/api/chat";
      // In edit mode, skip the static assistant greeting (index 0) —
      // Gemini requires the first message to have role "user"
      const apiMessages = isEdit ? messagesToSend.slice(1) : messagesToSend;
      const body: Record<string, unknown> = { messages: apiMessages };
      if (isEdit && currentRoutine && currentProfile) {
        body.routine = currentRoutine;
        body.profile = currentProfile;
      }
      if (aiConfig) {
        body.aiConfig = aiConfig;
      }

      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        throw new Error(errorData?.error || "Failed to get response");
      }

      const reader = response.body?.getReader();
      if (!reader) throw new Error("No stream reader");

      const decoder = new TextDecoder();
      let fullContent = "";

      // Add empty assistant message that we'll stream into
      setMessages((prev) => [...prev, { role: "assistant", content: "" }]);

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        fullContent += chunk;

        setMessages((prev) => {
          const updated = [...prev];
          updated[updated.length - 1] = {
            role: "assistant",
            content: fullContent,
          };
          return updated;
        });
      }

      // Check if the AI is ready to generate
      const updatedMessages = [...messagesToSend, { role: "assistant" as const, content: fullContent }];

      // Defensive: check if the AI somehow included JSON directly
      const result = extractRoutineFromMessages(updatedMessages);
      if (result) {
        setRoutineReady(true);
      } else if (isReadyToGenerate(fullContent)) {
        // AI has gathered all info — trigger separate generation call
        setIsStreaming(false);
        generationAttempts.current = 0;
        await generateRoutine(updatedMessages);
        return; // skip the finally setIsStreaming(false) since we already did it
      }
    } catch (error) {
      console.error("Chat error:", error);
      const errorMsg = error instanceof Error ? error.message : "Unknown error";
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: `Sorry, I ran into an issue: ${errorMsg}`,
        },
      ]);
    } finally {
      setIsStreaming(false);
    }
  }

  function handleSend(text: string) {
    const userMessage: Message = { role: "user", content: text };
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    sendToAPI(updatedMessages);
  }

  function handleStartRoutine() {
    const result = extractRoutineFromMessages(messages);
    if (result) {
      onComplete(result.profile, result.routine);
    }
  }

  return (
    <div className="chat-container">
      <div className="chat-header">
        <div>
          <h1 style={{ fontFamily: "var(--font-syne), 'Syne', sans-serif" }}>
            {isEdit ? "Edit Routine" : "Your Workout"}
          </h1>
          <p>{isEdit ? "What would you like to change?" : "Let\u0027s build your plan"}</p>
        </div>
        <button
          className="settings-gear"
          onClick={() => setShowSettings(true)}
          title="AI Settings"
        >
          &#9881;
        </button>
      </div>
      <div className="chat-messages" ref={scrollRef}>
        {messages
          .filter((m) => !(m.role === "user" && m === messages[0] && !isEdit && m.content === initialContent))
          .map((msg, i) => (
            <ChatMessage key={i} role={msg.role} content={msg.content} />
          ))}
        {isStreaming && !isGenerating && (
          <div className="chat-typing">
            <span />
            <span />
            <span />
          </div>
        )}
        {isGenerating && (
          <div className="chat-typing">
            <span className="generating-label">Generating your routine...</span>
          </div>
        )}
        {routineReady && !isStreaming && !isGenerating && (
          <div className="chat-action">
            <button className="chat-start-btn" onClick={handleStartRoutine}>
              {isEdit ? "Save Changes" : "Start My Routine"} &#10148;
            </button>
          </div>
        )}
      </div>
      <ChatInput
        onSend={handleSend}
        disabled={isStreaming || isGenerating}
        placeholder={
          routineReady
            ? isEdit
              ? "Changes ready! Click above to save."
              : "Routine ready! Click the button above to start."
            : isEdit
              ? "Describe what you'd like to change..."
              : "Tell me about yourself..."
        }
      />
      {showSettings && <AISettings onClose={() => setShowSettings(false)} />}
    </div>
  );
}
