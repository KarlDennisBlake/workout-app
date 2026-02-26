import { Weeks } from "./types";

export const defaultWeeks: Weeks = {
  1: {
    label: "Week 1 — Build the Base",
    desc: "Light-medium loads. Learn the patterns. Pushup goal: 4×25 consistently.",
    pill: "Foundation",
    days: [
      {
        name: "Monday", tag: "home", tagLabel: "Home Day",
        blocks: [
          {
            label: "Morning Warm-Up", time: "~8 min",
            exercises: [
              { name: "Arm Circles + Shoulder Rolls", detail: "2×20" },
              { name: "Cat-Cow Stretch", detail: "2×10" },
              { name: "Standing Hip Circles", detail: "2×10 ea" },
            ]
          },
          {
            label: "Block 1 — Chest & Push", time: "~12 min",
            exercises: [
              { name: "Push-Ups", detail: "4×25" },
              { name: "DB Flat Press (2×20lb)", detail: "3×12" },
              { name: "DB Incline Press (2×15lb)", detail: "3×12" },
            ]
          },
          {
            label: "Block 2 — Arms", time: "~10 min",
            exercises: [
              { name: "DB Curl (2×15lb)", detail: "3×12" },
              { name: "Tricep Kickback (1×20lb)", detail: "3×12" },
              { name: "Hammer Curl (2×15lb)", detail: "3×10" },
            ]
          },
          {
            label: "Block 3 — Core", time: "~10 min",
            exercises: [
              { name: "Sit-Ups", detail: "3×20" },
              { name: "Plank Hold", detail: "3×30s" },
              { name: "Leg Raises", detail: "3×12" },
            ]
          },
        ],
        pushupNote: "Goal: 4×25. If you nail all 4 sets, add 2 next time."
      },
      {
        name: "Tuesday", tag: "commute", tagLabel: "Bike Commute",
        bikeDay: true,
        blocks: [
          {
            label: "Morning (before commute)", time: "~6 min",
            exercises: [
              { name: "Push-Ups", detail: "2×20" },
              { name: "Sit-Ups", detail: "2×15" },
              { name: "Bodyweight Squats", detail: "1×20" },
            ]
          }
        ]
      },
      {
        name: "Wednesday", tag: "home", tagLabel: "Home Day",
        blocks: [
          {
            label: "Morning Warm-Up", time: "~6 min",
            exercises: [
              { name: "Band Pull-Aparts (or doorframe row)", detail: "2×15" },
              { name: "Neck Rolls + Wrist Circles", detail: "1×10 ea" },
            ]
          },
          {
            label: "Block 1 — Shoulders", time: "~12 min",
            exercises: [
              { name: "DB Shoulder Press (2×20lb)", detail: "4×10" },
              { name: "DB Lateral Raise (2×15lb)", detail: "3×15" },
              { name: "DB Front Raise (1×15lb)", detail: "3×12" },
            ]
          },
          {
            label: "Block 2 — Back (simulate)", time: "~10 min",
            exercises: [
              { name: "DB Row on bench (1×30lb)", detail: "4×10 ea" },
              { name: "DB Rear Delt Fly (2×15lb)", detail: "3×15" },
              { name: "Superman Hold", detail: "3×12" },
            ]
          },
          {
            label: "Block 3 — Core", time: "~10 min",
            exercises: [
              { name: "Sit-Ups", detail: "3×25" },
              { name: "Bicycle Crunches", detail: "3×20 ea" },
              { name: "Plank Hold", detail: "3×35s" },
            ]
          },
        ],
        pushupNote: "Bonus: 2×15 push-ups between blocks if energy allows."
      },
      {
        name: "Thursday", tag: "commute", tagLabel: "Bike Commute",
        bikeDay: true,
        blocks: [
          {
            label: "Morning (before commute)", time: "~6 min",
            exercises: [
              { name: "Push-Ups", detail: "2×20" },
              { name: "Sit-Ups", detail: "2×15" },
              { name: "Standing March (high knees, slow)", detail: "1×30" },
            ]
          }
        ]
      },
      {
        name: "Friday", tag: "home", tagLabel: "Home Day",
        blocks: [
          {
            label: "Morning Warm-Up", time: "~6 min",
            exercises: [
              { name: "Hip Circles + Leg Swings", detail: "2×10 ea" },
              { name: "Slow Bodyweight Squats", detail: "1×15 (quiet, controlled)" },
            ]
          },
          {
            label: "Block 1 — Chest (heavier)", time: "~12 min",
            exercises: [
              { name: "Push-Ups", detail: "4×25" },
              { name: "DB Flat Press (2×20lb)", detail: "4×10" },
              { name: "DB Pullover on bench (1×30lb)", detail: "3×10" },
            ]
          },
          {
            label: "Block 2 — Shoulders + Arms", time: "~12 min",
            exercises: [
              { name: "DB Arnold Press (2×15lb)", detail: "3×12" },
              { name: "DB Curl (2×20lb)", detail: "3×10" },
              { name: "Overhead Tricep Ext. (1×20lb)", detail: "3×10" },
            ]
          },
          {
            label: "Block 3 — Core Finisher", time: "~8 min",
            exercises: [
              { name: "Sit-Ups", detail: "4×20" },
              { name: "Side Plank", detail: "2×25s ea" },
              { name: "V-Hold", detail: "3×20s" },
            ]
          },
        ],
        pushupNote: "End of week pushup test: try 5×20 with 60s rest."
      },
      {
        name: "Saturday", tag: "rest", tagLabel: "Rest",
        restDay: true,
        restMsg: "Active rest. Go for a walk, stretch, or do nothing — you earned it. Your muscles grow on rest days."
      },
      {
        name: "Sunday", tag: "rest", tagLabel: "Rest",
        restDay: true,
        restMsg: "Full recovery. Prep mentally for the week. Optional: 10 min of light stretching or yoga."
      },
    ]
  },
  2: {
    label: "Week 2 — Add a Layer",
    desc: "Bump push-up sets. Add a rep or two to dumbbell work. Tighten form.",
    pill: "Progress",
    days: [
      {
        name: "Monday", tag: "home", tagLabel: "Home Day",
        blocks: [
          { label: "Morning Warm-Up", time: "~8 min", exercises: [
            { name: "Standing Hip Circles", detail: "2×15 ea" },
            { name: "Arm Crossovers", detail: "2×15" },
            { name: "Cat-Cow", detail: "1×10" },
          ]},
          { label: "Block 1 — Chest & Push", time: "~12 min", exercises: [
            { name: "Push-Ups", detail: "5×20" },
            { name: "DB Flat Press (2×20lb)", detail: "4×12" },
            { name: "DB Incline Press (2×20lb)", detail: "3×12" },
          ]},
          { label: "Block 2 — Arms", time: "~10 min", exercises: [
            { name: "DB Curl (2×20lb)", detail: "3×12" },
            { name: "Skull Crushers on bench (2×15lb)", detail: "3×10" },
            { name: "Concentration Curl (1×20lb)", detail: "3×10 ea" },
          ]},
          { label: "Block 3 — Core", time: "~10 min", exercises: [
            { name: "Sit-Ups", detail: "4×20" },
            { name: "Plank Hold", detail: "3×40s" },
            { name: "Leg Raises", detail: "3×15" },
          ]},
        ],
        pushupNote: "Pushup goal this week: 5×20. Focus on full chest-to-floor depth."
      },
      {
        name: "Tuesday", tag: "commute", tagLabel: "Bike Commute",
        bikeDay: true,
        blocks: [{ label: "Morning (before commute)", time: "~6 min", exercises: [
          { name: "Push-Ups", detail: "2×25" },
          { name: "Sit-Ups", detail: "2×20" },
          { name: "Standing Toe Touches (slow)", detail: "1×15" },
        ]}]
      },
      {
        name: "Wednesday", tag: "home", tagLabel: "Home Day",
        blocks: [
          { label: "Morning Warm-Up", time: "~6 min", exercises: [
            { name: "Shoulder Rolls + Neck Stretch", detail: "1×10 ea" },
            { name: "Thoracic Rotations", detail: "2×10 ea" },
          ]},
          { label: "Block 1 — Shoulders (heavier)", time: "~12 min", exercises: [
            { name: "DB Shoulder Press (2×20lb)", detail: "4×12" },
            { name: "DB Lateral Raise (2×15lb)", detail: "4×15" },
            { name: "DB Upright Row (2×15lb)", detail: "3×12" },
          ]},
          { label: "Block 2 — Back", time: "~10 min", exercises: [
            { name: "DB Row (1×30lb)", detail: "4×12 ea" },
            { name: "Rear Delt Fly (2×15lb)", detail: "4×15" },
            { name: "Superman with Hold", detail: "3×10 (hold 3s)" },
          ]},
          { label: "Block 3 — Core", time: "~10 min", exercises: [
            { name: "Sit-Ups", detail: "4×25" },
            { name: "Russian Twist (1×15lb)", detail: "3×15 ea" },
            { name: "Plank + Hip Dips", detail: "3×30s" },
          ]},
        ],
        pushupNote: "Between blocks: 1×15 push-ups as active rest."
      },
      {
        name: "Thursday", tag: "commute", tagLabel: "Bike Commute",
        bikeDay: true,
        blocks: [{ label: "Morning (before commute)", time: "~6 min", exercises: [
          { name: "Push-Ups", detail: "2×25" },
          { name: "Sit-Ups", detail: "2×20" },
          { name: "Plank Hold", detail: "1×45s" },
        ]}]
      },
      {
        name: "Friday", tag: "home", tagLabel: "Home Day",
        blocks: [
          { label: "Morning Warm-Up", time: "~6 min", exercises: [
            { name: "Arm Circles + Chest Opener", detail: "2×15" },
            { name: "Hip Flexor Stretch", detail: "1×30s ea" },
          ]},
          { label: "Block 1 — Full Push", time: "~12 min", exercises: [
            { name: "Push-Ups", detail: "5×20" },
            { name: "DB Flat Press (2×20lb)", detail: "4×12" },
            { name: "DB Pullover (1×30lb)", detail: "3×12" },
          ]},
          { label: "Block 2 — Shoulders + Arms", time: "~12 min", exercises: [
            { name: "Arnold Press (2×20lb)", detail: "3×12" },
            { name: "DB Curl (2×20lb)", detail: "4×10" },
            { name: "Overhead Tricep Ext. (1×20lb)", detail: "3×12" },
          ]},
          { label: "Block 3 — Core", time: "~8 min", exercises: [
            { name: "Sit-Ups", detail: "4×25" },
            { name: "V-Hold", detail: "3×25s" },
            { name: "Side Plank", detail: "2×30s ea" },
          ]},
        ],
        pushupNote: "Week 2 test: Can you do 2×35? Try it fresh Monday morning."
      },
      { name: "Saturday", tag: "rest", tagLabel: "Rest", restDay: true, restMsg: "Stretch, foam roll (or use a tennis ball), go for a 20 min walk." },
      { name: "Sunday", tag: "rest", tagLabel: "Rest", restDay: true, restMsg: "Full rest. You're building lean muscle — recovery is where gains happen." }
    ]
  },
  3: {
    label: "Week 3 — Push Harder",
    desc: "Closer to 100 push-ups. Add intensity with slower tempo (3s down, 1s up).",
    pill: "Intensity",
    days: [
      {
        name: "Monday", tag: "home", tagLabel: "Home Day",
        blocks: [
          { label: "Morning Warm-Up", time: "~8 min", exercises: [
            { name: "Standing Hip Circles + Leg Swings", detail: "2×15 ea" },
            { name: "Arm Circles", detail: "2×20" },
            { name: "Downward Dog", detail: "5 breaths" },
          ]},
          { label: "Block 1 — Chest & Push", time: "~14 min", exercises: [
            { name: "Push-Ups (slow tempo 3s down)", detail: "4×25" },
            { name: "DB Flat Press (2×20lb)", detail: "4×12" },
            { name: "DB Incline Press (2×20lb)", detail: "4×12" },
          ]},
          { label: "Block 2 — Arms (heavier)", time: "~10 min", exercises: [
            { name: "DB Curl (2×20lb)", detail: "4×12" },
            { name: "Skull Crusher (2×15lb)", detail: "3×12" },
            { name: "Close-Grip Push-Up", detail: "2×15" },
          ]},
          { label: "Block 3 — Core", time: "~10 min", exercises: [
            { name: "Sit-Ups", detail: "4×25" },
            { name: "Plank Hold", detail: "3×50s" },
            { name: "Hollow Body Hold", detail: "3×20s" },
          ]},
        ],
        pushupNote: "Slow tempo push-ups build MORE strength than fast reps. 3s down, pause, press up."
      },
      {
        name: "Tuesday", tag: "commute", tagLabel: "Bike Commute",
        bikeDay: true,
        blocks: [{ label: "Morning (before commute)", time: "~7 min", exercises: [
          { name: "Push-Ups", detail: "3×20" },
          { name: "Sit-Ups", detail: "2×20" },
          { name: "Plank", detail: "1×45s" },
        ]}]
      },
      {
        name: "Wednesday", tag: "home", tagLabel: "Home Day",
        blocks: [
          { label: "Morning Warm-Up", time: "~6 min", exercises: [
            { name: "Band Pull-Aparts / Towel Rows", detail: "2×15" },
            { name: "Thoracic Rotations", detail: "2×10 ea" },
          ]},
          { label: "Block 1 — Shoulders (volume)", time: "~13 min", exercises: [
            { name: "DB Shoulder Press (2×20lb)", detail: "5×10" },
            { name: "Lateral Raise (2×15lb)", detail: "4×15" },
            { name: "DB Shrug (2×20lb)", detail: "3×15" },
          ]},
          { label: "Block 2 — Back", time: "~11 min", exercises: [
            { name: "DB Row (1×30lb)", detail: "5×10 ea" },
            { name: "Rear Delt Fly (2×15lb)", detail: "4×15" },
            { name: "Good Mornings (2×15lb)", detail: "3×12" },
          ]},
          { label: "Block 3 — Core", time: "~10 min", exercises: [
            { name: "Sit-Ups", detail: "5×25" },
            { name: "Russian Twist (1×15lb)", detail: "3×20 ea" },
            { name: "Dead Bug", detail: "3×10 ea" },
          ]},
        ],
        pushupNote: "Optional: 10 push-ups at the top of every hour while WFH."
      },
      {
        name: "Thursday", tag: "commute", tagLabel: "Bike Commute",
        bikeDay: true,
        blocks: [{ label: "Morning (before commute)", time: "~7 min", exercises: [
          { name: "Push-Ups", detail: "3×20" },
          { name: "Sit-Ups", detail: "3×20" },
          { name: "Bear Crawl in Place (slow)", detail: "1×30s" },
        ]}]
      },
      {
        name: "Friday", tag: "home", tagLabel: "Home Day",
        blocks: [
          { label: "Morning Warm-Up", time: "~6 min", exercises: [
            { name: "Slow Standing Torso Rotations", detail: "2×15 ea" },
            { name: "Shoulder Mobility", detail: "2×10" },
          ]},
          { label: "Block 1 — Full Push + Test", time: "~15 min", exercises: [
            { name: "Max Push-Ups (one set)", detail: "AMRAP" },
            { name: "Rest 3 min, then:", detail: "" },
            { name: "DB Flat Press (2×20lb)", detail: "4×12" },
            { name: "DB Pullover (1×30lb)", detail: "3×12" },
          ]},
          { label: "Block 2 — Arms + Shoulders", time: "~12 min", exercises: [
            { name: "DB Curl + Press combo (2×15lb)", detail: "3×12" },
            { name: "Lateral Raise (2×15lb)", detail: "3×15" },
            { name: "Tricep Kickback (1×20lb)", detail: "3×12 ea" },
          ]},
          { label: "Block 3 — Core", time: "~8 min", exercises: [
            { name: "Sit-Ups", detail: "4×30" },
            { name: "V-Hold", detail: "3×30s" },
            { name: "Side Plank", detail: "2×35s ea" },
          ]},
        ],
        pushupNote: "AMRAP test: count it and write it down. You'll beat it Week 4."
      },
      { name: "Saturday", tag: "rest", tagLabel: "Rest", restDay: true, restMsg: "Legs are getting work from the bike — stretch quads and hamstrings today." },
      { name: "Sunday", tag: "rest", tagLabel: "Rest", restDay: true, restMsg: "Full rest. Sleep well. You're in the hard part of the block now." }
    ]
  },
  4: {
    label: "Week 4 — Peak & Reflect",
    desc: "Push-up goal: attempt 60+ unbroken. Consolidate strength. Start planning next block.",
    pill: "Peak",
    days: [
      {
        name: "Monday", tag: "home", tagLabel: "Home Day",
        blocks: [
          { label: "Morning Warm-Up", time: "~8 min", exercises: [
            { name: "Standing Hip Circles + Leg Swings", detail: "3×15 ea" },
            { name: "Arm Swings", detail: "2×20" },
            { name: "Deep Squat Hold", detail: "2×30s" },
          ]},
          { label: "Block 1 — Chest & Push (peak)", time: "~14 min", exercises: [
            { name: "Push-Ups (slow)", detail: "4×30" },
            { name: "DB Flat Press (2×20lb)", detail: "5×10" },
            { name: "DB Incline Press (2×20lb)", detail: "4×12" },
          ]},
          { label: "Block 2 — Arms", time: "~10 min", exercises: [
            { name: "DB Curl (2×20lb)", detail: "4×12" },
            { name: "Skull Crusher (2×15lb)", detail: "4×10" },
            { name: "Close-Grip Push-Up", detail: "3×15" },
          ]},
          { label: "Block 3 — Core", time: "~10 min", exercises: [
            { name: "Sit-Ups", detail: "5×25" },
            { name: "Plank Hold", detail: "3×60s" },
            { name: "Hollow Body Hold", detail: "3×25s" },
          ]},
        ],
        pushupNote: "4×30 this week. Focus on breathing — exhale on the way up."
      },
      {
        name: "Tuesday", tag: "commute", tagLabel: "Bike Commute",
        bikeDay: true,
        blocks: [{ label: "Morning (before commute)", time: "~7 min", exercises: [
          { name: "Push-Ups", detail: "3×25" },
          { name: "Sit-Ups", detail: "3×20" },
          { name: "Plank", detail: "1×60s" },
        ]}]
      },
      {
        name: "Wednesday", tag: "home", tagLabel: "Home Day",
        blocks: [
          { label: "Morning Warm-Up", time: "~6 min", exercises: [
            { name: "Shoulder Mobility Flow", detail: "5 min" },
          ]},
          { label: "Block 1 — Shoulders (final push)", time: "~13 min", exercises: [
            { name: "DB Shoulder Press (2×20lb)", detail: "5×12" },
            { name: "Lateral Raise (2×15lb)", detail: "5×15" },
            { name: "Front Raise (1×15lb)", detail: "3×12" },
          ]},
          { label: "Block 2 — Back", time: "~11 min", exercises: [
            { name: "DB Row (1×30lb)", detail: "5×12 ea" },
            { name: "Rear Delt Fly (2×15lb)", detail: "4×15" },
            { name: "Superman (hold 3s)", detail: "4×10" },
          ]},
          { label: "Block 3 — Core", time: "~10 min", exercises: [
            { name: "Sit-Ups", detail: "5×30" },
            { name: "Russian Twist (1×15lb)", detail: "4×20 ea" },
            { name: "Dead Bug", detail: "4×10 ea" },
          ]},
        ],
        pushupNote: "Greasing the groove: 10 push-ups every time you leave your desk."
      },
      {
        name: "Thursday", tag: "commute", tagLabel: "Bike Commute",
        bikeDay: true,
        blocks: [{ label: "Morning (before commute)", time: "~7 min", exercises: [
          { name: "Push-Ups", detail: "3×25" },
          { name: "Sit-Ups", detail: "3×25" },
          { name: "Slow Squat to Stand", detail: "2×15" },
        ]}]
      },
      {
        name: "Friday", tag: "home", tagLabel: "Home Day",
        blocks: [
          { label: "Morning Warm-Up", time: "~8 min", exercises: [
            { name: "Shoulder Circles + Chest Opener", detail: "3 min" },
            { name: "Hip Flexor + Chest Stretch", detail: "2 min" },
          ]},
          { label: "PUSH-UP TEST", time: "record it!", exercises: [
            { name: "Max Unbroken Push-Ups", detail: "1 set, AMRAP" },
            { name: "Rest 5 min, then:", detail: "" },
            { name: "Push-Ups", detail: "3×max" },
          ]},
          { label: "Block 2 — Shoulders + Arms", time: "~12 min", exercises: [
            { name: "DB Press (2×20lb)", detail: "4×12" },
            { name: "DB Curl (2×20lb)", detail: "4×12" },
            { name: "Lateral Raise (2×15lb)", detail: "3×15" },
          ]},
          { label: "Block 3 — Core Finisher", time: "~8 min", exercises: [
            { name: "Sit-Ups", detail: "5×30" },
            { name: "Plank Hold", detail: "3×60s" },
            { name: "V-Hold", detail: "3×35s" },
          ]},
        ],
        pushupNote: "Beat your Week 3 AMRAP number. Track it. This is your baseline for Block 2."
      },
      { name: "Saturday", tag: "rest", tagLabel: "Rest", restDay: true, restMsg: "Congratulations on finishing Block 1! Light walk or full rest." },
      { name: "Sunday", tag: "rest", tagLabel: "Rest", restDay: true, restMsg: "Reflect on Week 4. Note what felt hard, what felt easy. Plan next block accordingly." }
    ]
  }
};
