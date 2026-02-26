import { NextRequest, NextResponse } from "next/server";
import { AIProvider, ChatMessage, getEditSystemPrompt } from "@/lib/ai-provider";
import { MockProvider } from "@/lib/providers/mock";

function getProvider(): AIProvider {
  const provider = process.env.AI_PROVIDER || "mock";

  switch (provider) {
    case "gemini": {
      const { GeminiProvider } = require("@/lib/providers/gemini");
      return new GeminiProvider();
    }
    case "anthropic": {
      const { AnthropicProvider } = require("@/lib/providers/anthropic");
      return new AnthropicProvider();
    }
    case "mock":
    default:
      return new MockProvider();
  }
}

export async function POST(request: NextRequest) {
  try {
    const { messages, routine, profile } = await request.json() as {
      messages: ChatMessage[];
      routine: Record<string, unknown>;
      profile: Record<string, unknown>;
    };

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json(
        { error: "Messages array is required" },
        { status: 400 }
      );
    }

    if (!routine || !profile) {
      return NextResponse.json(
        { error: "Routine and profile are required for edit mode" },
        { status: 400 }
      );
    }

    const provider = getProvider();
    const systemPrompt = getEditSystemPrompt(
      JSON.stringify(routine, null, 2),
      JSON.stringify(profile, null, 2)
    );
    const stream = await provider.chat(messages, systemPrompt);

    return new Response(stream, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Transfer-Encoding": "chunked",
        "Cache-Control": "no-cache",
      },
    });
  } catch (error) {
    console.error("Chat edit API error:", error);
    return NextResponse.json(
      { error: "Failed to generate response" },
      { status: 500 }
    );
  }
}
