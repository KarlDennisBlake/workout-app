import { GoogleGenerativeAI } from "@google/generative-ai";
import { AIProvider, ChatMessage } from "../ai-provider";

export class GeminiProvider implements AIProvider {
  name = "gemini";
  private client: GoogleGenerativeAI;

  constructor() {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) throw new Error("GEMINI_API_KEY environment variable is required");
    this.client = new GoogleGenerativeAI(apiKey);
  }

  async chat(
    messages: ChatMessage[],
    systemPrompt: string
  ): Promise<ReadableStream<Uint8Array>> {
    // Disable thinking/reasoning to speed up response time —
    // routine JSON generation doesn't need chain-of-thought.
    // The SDK types don't include thinkingConfig yet, so we cast.
    const generationConfig = {
      thinkingConfig: { thinkingBudget: 0 },
    } as Parameters<typeof this.client.getGenerativeModel>[0]["generationConfig"];

    const model = this.client.getGenerativeModel({
      model: "gemini-2.5-flash",
      systemInstruction: systemPrompt,
      generationConfig,
    });

    const history = messages.slice(0, -1).map((m) => ({
      role: m.role === "assistant" ? "model" as const : "user" as const,
      parts: [{ text: m.content }],
    }));

    const chat = model.startChat({ history });
    const lastMessage = messages[messages.length - 1];
    const result = await chat.sendMessageStream(lastMessage.content);

    const encoder = new TextEncoder();
    return new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of result.stream) {
            const text = chunk.text();
            if (text) {
              controller.enqueue(encoder.encode(text));
            }
          }
          controller.close();
        } catch (err) {
          controller.error(err);
        }
      },
    });
  }
}
