import { NextRequest, NextResponse } from "next/server";
import { ChatMessage, getEditConversationSystemPrompt } from "@/lib/ai-provider";
import { AIConfig } from "@/lib/ai-config";
import { getProvider } from "@/lib/provider-factory";

// Run as Edge Function for longer timeout + native streaming
export const runtime = "edge";

export async function POST(request: NextRequest) {
  try {
    const { messages, routine, profile, aiConfig } = await request.json() as {
      messages: ChatMessage[];
      routine: Record<string, unknown>;
      profile: Record<string, unknown>;
      aiConfig?: AIConfig;
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

    const provider = getProvider(aiConfig);
    const systemPrompt = getEditConversationSystemPrompt(
      JSON.stringify(routine, null, 2),
      JSON.stringify(profile, null, 2)
    );
    const stream = await provider.chat(messages, systemPrompt);

    return new Response(stream, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "no-cache",
      },
    });
  } catch (error) {
    console.error("Chat edit API error:", error);
    const message = error instanceof Error ? error.message : "Failed to generate response";
    return NextResponse.json(
      { error: message },
      { status: 500 }
    );
  }
}
