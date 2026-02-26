"use client";

interface ChatMessageProps {
  role: "user" | "assistant";
  content: string;
}

export function ChatMessage({ role, content }: ChatMessageProps) {
  // Strip JSON blocks from display - user sees just the conversational text
  // Also strip incomplete JSON blocks during streaming (opening ``` without closing ```)
  const displayContent = content
    .replace(/```json[\s\S]*?```/g, "")
    .replace(/```json[\s\S]*$/g, "")
    .trim();

  if (!displayContent) return null;

  return (
    <div className={`chat-msg chat-msg-${role}`}>
      <div className={`chat-bubble chat-bubble-${role}`}>
        {displayContent.split("\n").map((line, i) => (
          <span key={i}>
            {line.includes("**") ? (
              <span
                dangerouslySetInnerHTML={{
                  __html: line.replace(
                    /\*\*(.*?)\*\*/g,
                    "<strong>$1</strong>"
                  ),
                }}
              />
            ) : (
              line
            )}
            {i < displayContent.split("\n").length - 1 && <br />}
          </span>
        ))}
      </div>
    </div>
  );
}
