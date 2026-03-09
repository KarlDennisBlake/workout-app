import { NextRequest, NextResponse } from "next/server";
import { IntakeData } from "@/data/types";
import { AIConfig } from "@/lib/ai-config";
import { getIntakeGenerateSystemPrompt } from "@/lib/ai-provider";
import { getProvider } from "@/lib/provider-factory";

export const runtime = "edge";

function buildPromptFromIntake(intake: IntakeData): string {
  const equipmentLine = intake.equipmentDetails
    ? `${intake.equipment.join(", ")} (${intake.equipmentDetails})`
    : intake.equipment.join(", ");

  const goalsLine = intake.goalsDetails
    ? `${intake.goals.join(", ")} (${intake.goalsDetails})`
    : intake.goals.join(", ");

  return `Generate a personalized 4-week workout routine for this person:

PROFILE:
- Height: ${intake.height}
- Weight: ${intake.weight} ${intake.weightUnit}
- Age: ${intake.age}
- Sex: ${intake.sex}

AVAILABLE EQUIPMENT: ${equipmentLine}

FITNESS GOALS: ${goalsLine}

CONSTRAINTS/PREFERENCES: ${intake.constraints || "None"}

SCHEDULE: ${intake.daysPerWeek} days per week, ${intake.timePerSession} per session

Generate the complete 4-week routine following the JSON structure specified in the system prompt.`;
}

export async function POST(request: NextRequest) {
  try {
    const { intake, aiConfig } = (await request.json()) as {
      intake: IntakeData;
      aiConfig?: AIConfig;
    };

    if (!intake) {
      return NextResponse.json(
        { error: "Intake data is required" },
        { status: 400 }
      );
    }

    const provider = getProvider(aiConfig);
    const systemPrompt = getIntakeGenerateSystemPrompt();
    const userPrompt = buildPromptFromIntake(intake);

    // Use JSON generation if available (Gemini JSON mode), else fall back to chat
    const stream = provider.generateJSON
      ? await provider.generateJSON(userPrompt, systemPrompt)
      : await provider.chat(
          [{ role: "user", content: userPrompt }],
          systemPrompt
        );

    return new Response(stream, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "no-cache",
      },
    });
  } catch (error) {
    console.error("Generate API error:", error);
    const message =
      error instanceof Error ? error.message : "Failed to generate routine";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
