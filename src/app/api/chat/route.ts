import { NextRequest, NextResponse } from "next/server";
import { AIProvider, ChatMessage, getSystemPrompt } from "@/lib/ai-provider";
import { MockProvider } from "@/lib/providers/mock";
import { GeminiProvider } from "@/lib/providers/gemini";

// Run as Edge Function for longer timeout + native streaming
export const runtime = "edge";

function getProvider(): AIProvider {
  const provider = process.env.AI_PROVIDER || "mock";

  switch (provider) {
    case "gemini":
      return new GeminiProvider();
    case "mock":
    default:
      return new MockProvider();
  }
}

export async function POST(request: NextRequest) {
  try {
    const { messages } = (await request.json()) as { messages: ChatMessage[] };

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json(
        { error: "Messages array is required" },
        { status: 400 }
      );
    }

    const provider = getProvider();
    const systemPrompt = getSystemPrompt();
    const stream = await provider.chat(messages, systemPrompt);

    return new Response(stream, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "no-cache",
      },
    });
  } catch (error) {
    console.error("Chat API error:", error);
    return NextResponse.json(
      { error: "Failed to generate response" },
      { status: 500 }
    );
  }
}
