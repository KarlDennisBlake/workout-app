import { NextRequest, NextResponse } from "next/server";
import { ChatMessage, getGenerateSystemPrompt, getEditGenerateSystemPrompt } from "@/lib/ai-provider";
import { AIConfig } from "@/lib/ai-config";
import { getProvider } from "@/lib/provider-factory";

// Run as Edge Function for longer timeout + native streaming
export const runtime = "edge";

export async function POST(request: NextRequest) {
  try {
    const { messages, mode, routine, profile, aiConfig } = (await request.json()) as {
      messages: ChatMessage[];
      mode?: "create" | "edit";
      routine?: Record<string, unknown>;
      profile?: Record<string, unknown>;
      aiConfig?: AIConfig;
    };

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json(
        { error: "Messages array is required" },
        { status: 400 }
      );
    }

    const provider = getProvider(aiConfig);
    let systemPrompt: string;

    if (mode === "edit" && routine && profile) {
      systemPrompt = getEditGenerateSystemPrompt(
        JSON.stringify(routine, null, 2),
        JSON.stringify(profile, null, 2)
      );
    } else {
      systemPrompt = getGenerateSystemPrompt();
    }

    const stream = await provider.chat(messages, systemPrompt);

    return new Response(stream, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "no-cache",
      },
    });
  } catch (error) {
    console.error("Generate API error:", error);
    const message = error instanceof Error ? error.message : "Failed to generate routine";
    return NextResponse.json(
      { error: message },
      { status: 500 }
    );
  }
}
