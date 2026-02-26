"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { ChatMessage } from "./ChatMessage";
import { ChatInput } from "./ChatInput";
import { Weeks, UserProfile } from "@/data/types";

interface Message {
  role: "user" | "assistant";
  content: string;
}

interface ChatOnboardingProps {
  onComplete: (profile: UserProfile, routine: Weeks) => void;
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

export function ChatOnboarding({ onComplete }: ChatOnboardingProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isStreaming, setIsStreaming] = useState(false);
  const [routineReady, setRoutineReady] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const hasStarted = useRef(false);

  const scrollToBottom = useCallback(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  // Send initial greeting — include the hidden user message in state
  // so that subsequent calls have the full conversation history
  useEffect(() => {
    if (hasStarted.current) return;
    hasStarted.current = true;
    const initialMessage: Message = { role: "user", content: "Hi, I'd like to create a custom workout routine." };
    setMessages([initialMessage]);
    sendToAPI([initialMessage]);
  }, []);

  async function sendToAPI(messagesToSend: Message[]) {
    setIsStreaming(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: messagesToSend }),
      });

      if (!response.ok) {
        throw new Error("Failed to get response");
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

      // Check if routine was generated
      const updatedMessages = [...messagesToSend, { role: "assistant" as const, content: fullContent }];
      const result = extractRoutineFromMessages(updatedMessages);
      if (result) {
        setRoutineReady(true);
      }
    } catch (error) {
      console.error("Chat error:", error);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "Sorry, I ran into an issue. Please try again or refresh the page.",
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
        <h1 style={{ fontFamily: "var(--font-syne), 'Syne', sans-serif" }}>
          Your Workout
        </h1>
        <p>Let&apos;s build your plan</p>
      </div>
      <div className="chat-messages" ref={scrollRef}>
        {messages
          .filter((m) => !(m.role === "user" && m === messages[0] && m.content === "Hi, I'd like to create a custom workout routine."))
          .map((msg, i) => (
            <ChatMessage key={i} role={msg.role} content={msg.content} />
          ))}
        {isStreaming && (
          <div className="chat-typing">
            <span />
            <span />
            <span />
          </div>
        )}
        {routineReady && !isStreaming && (
          <div className="chat-action">
            <button className="chat-start-btn" onClick={handleStartRoutine}>
              Start My Routine &#10148;
            </button>
          </div>
        )}
      </div>
      <ChatInput
        onSend={handleSend}
        disabled={isStreaming}
        placeholder={
          routineReady
            ? "Routine ready! Click the button above to start."
            : "Tell me about yourself..."
        }
      />
    </div>
  );
}
