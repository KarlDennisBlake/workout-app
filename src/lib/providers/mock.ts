import { AIProvider, ChatMessage } from "../ai-provider";

const MOCK_RESPONSES = [
  "Hey! I'm excited to help you build a custom workout routine. Let's start with the basics — what's your height, weight, and age? And are you male or female?",
  "Got it! Now, what equipment do you have access to at home? Things like dumbbells (what weights?), a bench, resistance bands, pull-up bar, etc. Or are you working with bodyweight only?",
  "Nice setup! What are your main fitness goals? For example: build muscle, lose fat, improve endurance, get stronger, general fitness — pick whatever resonates most.",
  "Almost there! A couple more things:\n\n1. Any constraints I should know about? Injuries, living in an apartment (no jumping), time limits, exercises you don't like?\n2. How many days per week can you work out, and roughly how much time per session?",
];

export class MockProvider implements AIProvider {
  name = "mock";

  async chat(
    messages: ChatMessage[],
    _systemPrompt: string
  ): Promise<ReadableStream<Uint8Array>> {
    const userMessages = messages.filter((m) => m.role === "user");
    const turnIndex = userMessages.length - 1;

    let response: string;

    if (turnIndex < MOCK_RESPONSES.length) {
      response = MOCK_RESPONSES[turnIndex];
    } else {
      // Final turn — generate the routine
      response = `Great, I have everything I need! Let me build your custom routine...

\`\`\`json
${JSON.stringify(MOCK_ROUTINE, null, 2)}
\`\`\`

Your 4-week plan is ready! It's tailored to your goals and equipment. Hit **Start My Routine** to begin!`;
    }

    const encoder = new TextEncoder();
    const words = response.split(" ");
    // Use faster streaming for the routine JSON (it's huge)
    const isRoutineResponse = turnIndex >= MOCK_RESPONSES.length;
    const delay = isRoutineResponse ? 5 : 30;

    return new ReadableStream({
      async start(controller) {
        for (let i = 0; i < words.length; i++) {
          const word = (i === 0 ? "" : " ") + words[i];
          controller.enqueue(encoder.encode(word));
          await new Promise((r) => setTimeout(r, delay));
        }
        controller.close();
      },
    });
  }
}

const MOCK_ROUTINE = {
  profile: {
    height: "5'6\"",
    weight: "140",
    weightUnit: "lb",
    age: 30,
    sex: "male",
    equipment: ["dumbbells", "bench"],
    goals: ["build_muscle", "general_fitness"],
    constraints: [],
  },
  routine: {
    "1": {
      label: "Week 1 — Build the Base",
      desc: "Light-medium loads. Learn the patterns. Focus on form.",
      pill: "Foundation",
      days: [
        {
          name: "Monday", tag: "home", tagLabel: "Home Day",
          blocks: [
            { label: "Warm-Up", time: "~5 min", exercises: [
              { name: "Arm Circles", detail: "2×15" },
              { name: "Cat-Cow Stretch", detail: "2×10" },
            ]},
            { label: "Upper Body Push", time: "~12 min", exercises: [
              { name: "Push-Ups", detail: "3×15" },
              { name: "DB Flat Press", detail: "3×12" },
              { name: "DB Shoulder Press", detail: "3×10" },
            ]},
            { label: "Core", time: "~8 min", exercises: [
              { name: "Plank Hold", detail: "3×30s" },
              { name: "Sit-Ups", detail: "3×15" },
            ]},
          ],
          pushupNote: "Focus on controlled form over speed.",
        },
        {
          name: "Tuesday", tag: "rest", tagLabel: "Rest",
          restDay: true, restMsg: "Light stretching or a walk. Let your muscles recover.",
        },
        {
          name: "Wednesday", tag: "home", tagLabel: "Home Day",
          blocks: [
            { label: "Warm-Up", time: "~5 min", exercises: [
              { name: "Hip Circles", detail: "2×10 ea" },
              { name: "Shoulder Rolls", detail: "2×15" },
            ]},
            { label: "Upper Body Pull + Back", time: "~12 min", exercises: [
              { name: "DB Row", detail: "3×12 ea" },
              { name: "DB Rear Delt Fly", detail: "3×12" },
              { name: "Superman Hold", detail: "3×10" },
            ]},
            { label: "Arms", time: "~10 min", exercises: [
              { name: "DB Curl", detail: "3×12" },
              { name: "Tricep Kickback", detail: "3×12" },
            ]},
          ],
          pushupNote: "Squeeze at the top of every curl.",
        },
        {
          name: "Thursday", tag: "rest", tagLabel: "Rest",
          restDay: true, restMsg: "Recovery day. Hydrate well.",
        },
        {
          name: "Friday", tag: "home", tagLabel: "Home Day",
          blocks: [
            { label: "Warm-Up", time: "~5 min", exercises: [
              { name: "Leg Swings", detail: "2×10 ea" },
              { name: "Deep Squat Hold", detail: "2×20s" },
            ]},
            { label: "Full Body", time: "~15 min", exercises: [
              { name: "Push-Ups", detail: "3×15" },
              { name: "DB Flat Press", detail: "3×12" },
              { name: "DB Arnold Press", detail: "3×10" },
              { name: "DB Curl", detail: "3×10" },
            ]},
            { label: "Core Finisher", time: "~8 min", exercises: [
              { name: "Sit-Ups", detail: "3×20" },
              { name: "Leg Raises", detail: "3×12" },
              { name: "Plank Hold", detail: "3×40s" },
            ]},
          ],
          pushupNote: "End of week 1 — you're building the habit!",
        },
        {
          name: "Saturday", tag: "rest", tagLabel: "Rest",
          restDay: true, restMsg: "Active rest. Go for a walk or do light stretching.",
        },
        {
          name: "Sunday", tag: "rest", tagLabel: "Rest",
          restDay: true, restMsg: "Full rest. You earned it. Muscles grow on rest days.",
        },
      ],
    },
    "2": {
      label: "Week 2 — Add Volume",
      desc: "Add a rep or set to each exercise. Push a little harder.",
      pill: "Progress",
      days: [
        {
          name: "Monday", tag: "home", tagLabel: "Home Day",
          blocks: [
            { label: "Warm-Up", time: "~5 min", exercises: [
              { name: "Arm Circles", detail: "2×20" },
              { name: "Cat-Cow", detail: "2×10" },
            ]},
            { label: "Upper Body Push", time: "~14 min", exercises: [
              { name: "Push-Ups", detail: "4×15" },
              { name: "DB Flat Press", detail: "4×12" },
              { name: "DB Incline Press", detail: "3×12" },
            ]},
            { label: "Core", time: "~8 min", exercises: [
              { name: "Plank Hold", detail: "3×40s" },
              { name: "Sit-Ups", detail: "4×15" },
            ]},
          ],
          pushupNote: "Try to do every rep with full range of motion.",
        },
        { name: "Tuesday", tag: "rest", tagLabel: "Rest", restDay: true, restMsg: "Stretch and foam roll if you have one." },
        {
          name: "Wednesday", tag: "home", tagLabel: "Home Day",
          blocks: [
            { label: "Warm-Up", time: "~5 min", exercises: [
              { name: "Thoracic Rotations", detail: "2×10 ea" },
              { name: "Band Pull-Aparts or Towel Rows", detail: "2×15" },
            ]},
            { label: "Pull + Back", time: "~14 min", exercises: [
              { name: "DB Row", detail: "4×12 ea" },
              { name: "Rear Delt Fly", detail: "4×12" },
              { name: "Good Mornings", detail: "3×12" },
            ]},
            { label: "Arms", time: "~10 min", exercises: [
              { name: "Hammer Curl", detail: "3×12" },
              { name: "Overhead Tricep Extension", detail: "3×12" },
            ]},
          ],
          pushupNote: "Controlled negatives = more strength.",
        },
        { name: "Thursday", tag: "rest", tagLabel: "Rest", restDay: true, restMsg: "Walk for 20 minutes if you can." },
        {
          name: "Friday", tag: "home", tagLabel: "Home Day",
          blocks: [
            { label: "Warm-Up", time: "~5 min", exercises: [
              { name: "Leg Swings", detail: "2×12 ea" },
              { name: "Bodyweight Squats", detail: "1×15" },
            ]},
            { label: "Full Body", time: "~15 min", exercises: [
              { name: "Push-Ups", detail: "4×15" },
              { name: "DB Shoulder Press", detail: "4×10" },
              { name: "DB Curl + Press Combo", detail: "3×12" },
            ]},
            { label: "Core", time: "~8 min", exercises: [
              { name: "Sit-Ups", detail: "4×20" },
              { name: "V-Hold", detail: "3×20s" },
              { name: "Side Plank", detail: "2×25s ea" },
            ]},
          ],
          pushupNote: "Week 2 done. You're stronger than you were 7 days ago.",
        },
        { name: "Saturday", tag: "rest", tagLabel: "Rest", restDay: true, restMsg: "Stretch your chest and shoulders." },
        { name: "Sunday", tag: "rest", tagLabel: "Rest", restDay: true, restMsg: "Full rest. Prep for week 3." },
      ],
    },
    "3": {
      label: "Week 3 — Intensity",
      desc: "Slower tempos and heavier loads. Push your limits.",
      pill: "Intensity",
      days: [
        {
          name: "Monday", tag: "home", tagLabel: "Home Day",
          blocks: [
            { label: "Warm-Up", time: "~6 min", exercises: [
              { name: "Arm Circles + Chest Opener", detail: "3 min" },
              { name: "Downward Dog", detail: "5 breaths" },
            ]},
            { label: "Push (slow tempo)", time: "~14 min", exercises: [
              { name: "Push-Ups (3s down)", detail: "4×12" },
              { name: "DB Flat Press", detail: "4×12" },
              { name: "DB Incline Press", detail: "4×10" },
            ]},
            { label: "Core", time: "~10 min", exercises: [
              { name: "Plank Hold", detail: "3×50s" },
              { name: "Hollow Body Hold", detail: "3×20s" },
              { name: "Sit-Ups", detail: "4×20" },
            ]},
          ],
          pushupNote: "Slow tempo = more time under tension = more growth.",
        },
        { name: "Tuesday", tag: "rest", tagLabel: "Rest", restDay: true, restMsg: "Active recovery. Light walk." },
        {
          name: "Wednesday", tag: "home", tagLabel: "Home Day",
          blocks: [
            { label: "Warm-Up", time: "~5 min", exercises: [
              { name: "Shoulder Mobility Flow", detail: "3 min" },
            ]},
            { label: "Pull + Shoulders", time: "~14 min", exercises: [
              { name: "DB Row (heavy)", detail: "5×10 ea" },
              { name: "DB Lateral Raise", detail: "4×15" },
              { name: "Rear Delt Fly", detail: "4×12" },
            ]},
            { label: "Arms", time: "~10 min", exercises: [
              { name: "Concentration Curl", detail: "3×10 ea" },
              { name: "Skull Crushers", detail: "3×12" },
            ]},
          ],
          pushupNote: "Focus on the squeeze at peak contraction.",
        },
        { name: "Thursday", tag: "rest", tagLabel: "Rest", restDay: true, restMsg: "Rest well. You're in the hard part now." },
        {
          name: "Friday", tag: "home", tagLabel: "Home Day",
          blocks: [
            { label: "Warm-Up", time: "~5 min", exercises: [
              { name: "Hip Flexor Stretch", detail: "1×30s ea" },
              { name: "Torso Rotations", detail: "2×10 ea" },
            ]},
            { label: "Full Body Power", time: "~15 min", exercises: [
              { name: "Push-Ups (max set)", detail: "AMRAP" },
              { name: "DB Press", detail: "4×12" },
              { name: "DB Curl", detail: "4×10" },
              { name: "DB Shoulder Press", detail: "3×12" },
            ]},
            { label: "Core Finisher", time: "~8 min", exercises: [
              { name: "Sit-Ups", detail: "4×25" },
              { name: "Plank Hold", detail: "3×60s" },
            ]},
          ],
          pushupNote: "AMRAP test — write down your number. You'll beat it next week.",
        },
        { name: "Saturday", tag: "rest", tagLabel: "Rest", restDay: true, restMsg: "Stretch everything. You've earned it." },
        { name: "Sunday", tag: "rest", tagLabel: "Rest", restDay: true, restMsg: "Full rest. Sleep well tonight." },
      ],
    },
    "4": {
      label: "Week 4 — Peak & Reflect",
      desc: "Peak effort. Test yourself. Prepare for your next block.",
      pill: "Peak",
      days: [
        {
          name: "Monday", tag: "home", tagLabel: "Home Day",
          blocks: [
            { label: "Warm-Up", time: "~6 min", exercises: [
              { name: "Full Body Stretch", detail: "5 min" },
            ]},
            { label: "Push (peak)", time: "~15 min", exercises: [
              { name: "Push-Ups (slow)", detail: "4×15" },
              { name: "DB Flat Press", detail: "5×10" },
              { name: "DB Incline Press", detail: "4×12" },
            ]},
            { label: "Core", time: "~10 min", exercises: [
              { name: "Sit-Ups", detail: "5×20" },
              { name: "Plank Hold", detail: "3×60s" },
              { name: "Hollow Body Hold", detail: "3×25s" },
            ]},
          ],
          pushupNote: "Peak week. Every rep counts.",
        },
        { name: "Tuesday", tag: "rest", tagLabel: "Rest", restDay: true, restMsg: "Light stretching only." },
        {
          name: "Wednesday", tag: "home", tagLabel: "Home Day",
          blocks: [
            { label: "Warm-Up", time: "~5 min", exercises: [
              { name: "Shoulder Circles", detail: "2×15" },
            ]},
            { label: "Pull + Shoulders (max)", time: "~15 min", exercises: [
              { name: "DB Row", detail: "5×12 ea" },
              { name: "DB Shoulder Press", detail: "5×10" },
              { name: "Lateral Raise", detail: "5×15" },
            ]},
            { label: "Arms", time: "~10 min", exercises: [
              { name: "DB Curl", detail: "4×12" },
              { name: "Overhead Tricep Extension", detail: "4×10" },
            ]},
          ],
          pushupNote: "Last pull day of the block. Leave nothing on the table.",
        },
        { name: "Thursday", tag: "rest", tagLabel: "Rest", restDay: true, restMsg: "Rest up for Friday's test." },
        {
          name: "Friday", tag: "home", tagLabel: "Home Day",
          blocks: [
            { label: "Warm-Up", time: "~6 min", exercises: [
              { name: "Dynamic Stretching", detail: "5 min" },
            ]},
            { label: "Final Test", time: "~15 min", exercises: [
              { name: "Max Push-Ups (unbroken)", detail: "1 set AMRAP" },
              { name: "Rest 5 min, then:", detail: "" },
              { name: "DB Press", detail: "4×12" },
              { name: "DB Curl + Press Combo", detail: "3×12" },
            ]},
            { label: "Core Finisher", time: "~8 min", exercises: [
              { name: "Sit-Ups", detail: "5×25" },
              { name: "V-Hold", detail: "3×30s" },
              { name: "Side Plank", detail: "2×35s ea" },
            ]},
          ],
          pushupNote: "Beat your Week 3 number. This is your new baseline.",
        },
        { name: "Saturday", tag: "rest", tagLabel: "Rest", restDay: true, restMsg: "Congratulations on finishing Block 1!" },
        { name: "Sunday", tag: "rest", tagLabel: "Rest", restDay: true, restMsg: "Reflect on what felt hard and easy. Plan your next block." },
      ],
    },
  },
};
