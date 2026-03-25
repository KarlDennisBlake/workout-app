import { Weeks } from "./types";

export const defaultWeeks: Weeks = {
  1: {
    label: "Week 1 — Set the New Floor",
    desc: "Establish Block 3 baselines. Push-up goal: 4×40. Introduce tempo and pause reps on DB work.",
    pill: "Baseline",
    days: [
      {
        name: "Monday", tag: "home", tagLabel: "Home Day",
        blocks: [
          {
            label: "Morning Warm-Up",
            exercises: [
              { name: "Arm Circles + Shoulder Rolls", detail: "2×20" },
              { name: "Cat-Cow Stretch", detail: "2×10" },
              { name: "Standing Hip Circles", detail: "2×10 ea" },
            ]
          },
          {
            label: "Block 1 — Chest & Push",
            exercises: [
              { name: "Push-Ups", detail: "4×40" },
              { name: "DB Flat Press (2×20lb, 3s down)", detail: "4×10" },
              { name: "DB Incline Press (2×20lb)", detail: "4×12" },
              { name: "Diamond Push-Ups", detail: "2×12" },
              { name: "Plank Hold", detail: "2×50s" },
            ]
          },
          {
            label: "Block 2 — Arms + Core",
            exercises: [
              { name: "DB Curl (2×20lb, pause at top)", detail: "4×10" },
              { name: "Skull Crushers (2×15lb)", detail: "3×12" },
              { name: "Hammer Curl (2×20lb)", detail: "3×12" },
              { name: "Sit-Ups", detail: "4×30" },
              { name: "Leg Raises", detail: "3×15" },
            ]
          },
        ],
        pushupNote: "Block 3 starts here. 4×40 should feel manageable — focus on perfect form."
      },
      {
        name: "Tuesday", tag: "commute", tagLabel: "Bike Commute",
        bikeDay: true,
        blocks: [
          {
            label: "Morning (before commute)",
            exercises: [
              { name: "Push-Ups", detail: "2×30" },
              { name: "Sit-Ups", detail: "2×25" },
              { name: "Bodyweight Squats", detail: "1×20" },
            ]
          }
        ]
      },
      {
        name: "Wednesday", tag: "home", tagLabel: "Home Day",
        blocks: [
          {
            label: "Morning Warm-Up",
            exercises: [
              { name: "Band Pull-Aparts (or towel rows)", detail: "2×15" },
              { name: "Neck Rolls + Wrist Circles", detail: "1×10 ea" },
              { name: "Thoracic Rotations", detail: "2×10 ea" },
            ]
          },
          {
            label: "Block 1 — Shoulders + Back",
            exercises: [
              { name: "DB Shoulder Press (2×20lb)", detail: "4×12" },
              { name: "DB Lateral Raise (2×15lb)", detail: "4×15" },
              { name: "DB Row (1×30lb)", detail: "4×12 ea" },
              { name: "DB Rear Delt Fly (2×15lb)", detail: "3×15" },
            ]
          },
          {
            label: "Block 2 — Back Detail + Core",
            exercises: [
              { name: "DB Front Raise (1×15lb)", detail: "3×12" },
              { name: "Superman Hold (3s)", detail: "3×12" },
              { name: "Sit-Ups", detail: "4×25" },
              { name: "Russian Twist (1×15lb)", detail: "3×15 ea" },
            ]
          },
        ],
        pushupNote: "Bonus: 2×20 push-ups between blocks if energy allows."
      },
      {
        name: "Thursday", tag: "commute", tagLabel: "Bike Commute",
        bikeDay: true,
        blocks: [
          {
            label: "Morning (before commute)",
            exercises: [
              { name: "Push-Ups", detail: "2×30" },
              { name: "Sit-Ups", detail: "2×25" },
              { name: "Standing March (high knees, slow)", detail: "1×30" },
            ]
          }
        ]
      },
      {
        name: "Friday", tag: "home", tagLabel: "Home Day",
        blocks: [
          {
            label: "Morning Warm-Up",
            exercises: [
              { name: "Hip Circles + Leg Swings", detail: "2×10 ea" },
              { name: "Slow Bodyweight Squats", detail: "1×15" },
            ]
          },
          {
            label: "Block 1 — Chest (tempo focus)",
            exercises: [
              { name: "Push-Ups (3s down, 1s pause)", detail: "4×30" },
              { name: "DB Flat Press (2×20lb)", detail: "4×12" },
              { name: "DB Pullover (1×30lb)", detail: "3×12" },
              { name: "Wide Push-Ups", detail: "2×15" },
              { name: "Plank Hold", detail: "2×50s" },
            ]
          },
          {
            label: "Block 2 — Shoulders + Arms",
            exercises: [
              { name: "DB Arnold Press (2×15lb)", detail: "3×12" },
              { name: "DB Curl (2×20lb)", detail: "3×12" },
              { name: "Overhead Tricep Ext. (1×20lb)", detail: "3×12" },
              { name: "Sit-Ups", detail: "4×25" },
              { name: "Hollow Body Hold", detail: "3×20s" },
            ]
          },
        ],
        pushupNote: "Tempo push-ups are harder — 4×30 here is real work. Respect the pace."
      },
      {
        name: "Saturday", tag: "rest", tagLabel: "Rest",
        restDay: true,
        restMsg: "Active rest. Walk, stretch, or do nothing — ease into Block 3."
      },
      {
        name: "Sunday", tag: "rest", tagLabel: "Rest",
        restDay: true,
        restMsg: "Full recovery. Prep mentally for the week ahead."
      },
    ]
  },
  2: {
    label: "Week 2 — Add the Weight",
    desc: "Push-up goal: 4×45. Bump DB volume. Introduce pause reps on press movements.",
    pill: "Volume",
    days: [
      {
        name: "Monday", tag: "home", tagLabel: "Home Day",
        blocks: [
          { label: "Morning Warm-Up", exercises: [
            { name: "Standing Hip Circles", detail: "2×15 ea" },
            { name: "Arm Crossovers", detail: "2×15" },
            { name: "Cat-Cow", detail: "1×10" },
          ]},
          { label: "Block 1 — Chest & Push", exercises: [
            { name: "Push-Ups", detail: "4×45" },
            { name: "DB Flat Press (2×20lb, pause at bottom)", detail: "5×10" },
            { name: "DB Incline Press (2×20lb)", detail: "4×12" },
            { name: "Diamond Push-Ups", detail: "3×12" },
            { name: "Plank Hold", detail: "3×50s" },
          ]},
          { label: "Block 2 — Arms + Core", exercises: [
            { name: "DB Curl (2×20lb)", detail: "4×12" },
            { name: "Skull Crushers (2×15lb)", detail: "4×12" },
            { name: "Concentration Curl (1×20lb)", detail: "3×10 ea" },
            { name: "Sit-Ups", detail: "4×30" },
            { name: "Leg Raises", detail: "3×15" },
          ]},
        ],
        pushupNote: "4×45 this week. Break them into 2 quick sets of 22–23 if needed."
      },
      {
        name: "Tuesday", tag: "commute", tagLabel: "Bike Commute",
        bikeDay: true,
        blocks: [{ label: "Morning (before commute)", exercises: [
          { name: "Push-Ups", detail: "2×35" },
          { name: "Sit-Ups", detail: "2×25" },
          { name: "Standing Toe Touches (slow)", detail: "1×15" },
        ]}]
      },
      {
        name: "Wednesday", tag: "home", tagLabel: "Home Day",
        blocks: [
          { label: "Morning Warm-Up", exercises: [
            { name: "Shoulder Rolls + Neck Stretch", detail: "1×10 ea" },
            { name: "Thoracic Rotations", detail: "2×10 ea" },
          ]},
          { label: "Block 1 — Shoulders + Back", exercises: [
            { name: "DB Shoulder Press (2×20lb)", detail: "5×10" },
            { name: "DB Lateral Raise (2×15lb)", detail: "4×15" },
            { name: "DB Row (1×30lb)", detail: "5×10 ea" },
            { name: "DB Upright Row (2×15lb)", detail: "3×12" },
          ]},
          { label: "Block 2 — Back Detail + Core", exercises: [
            { name: "Rear Delt Fly (2×15lb)", detail: "4×15" },
            { name: "Superman with Hold (3s)", detail: "3×12" },
            { name: "Sit-Ups", detail: "4×30" },
            { name: "Russian Twist (1×15lb)", detail: "3×20 ea" },
            { name: "Plank + Hip Dips", detail: "3×30s" },
          ]},
        ],
        pushupNote: "Between blocks: 1×25 push-ups as active rest."
      },
      {
        name: "Thursday", tag: "commute", tagLabel: "Bike Commute",
        bikeDay: true,
        blocks: [{ label: "Morning (before commute)", exercises: [
          { name: "Push-Ups", detail: "2×35" },
          { name: "Sit-Ups", detail: "2×25" },
          { name: "Plank Hold", detail: "1×55s" },
        ]}]
      },
      {
        name: "Friday", tag: "home", tagLabel: "Home Day",
        blocks: [
          { label: "Morning Warm-Up", exercises: [
            { name: "Arm Circles + Chest Opener", detail: "2×15" },
            { name: "Hip Flexor Stretch", detail: "1×30s ea" },
          ]},
          { label: "Block 1 — Full Push", exercises: [
            { name: "Push-Ups (3s tempo)", detail: "4×35" },
            { name: "DB Flat Press (2×20lb)", detail: "5×10" },
            { name: "DB Pullover (1×30lb)", detail: "4×12" },
            { name: "Close-Grip Push-Up", detail: "3×15" },
          ]},
          { label: "Block 2 — Shoulders + Arms", exercises: [
            { name: "Arnold Press (2×20lb)", detail: "4×10" },
            { name: "DB Curl (2×20lb)", detail: "4×12" },
            { name: "Overhead Tricep Ext. (1×20lb)", detail: "4×12" },
            { name: "Sit-Ups", detail: "5×25" },
            { name: "Side Plank", detail: "2×35s ea" },
          ]},
        ],
        pushupNote: "Tempo push-ups Friday + regular push-ups Monday = balanced stimulus."
      },
      { name: "Saturday", tag: "rest", tagLabel: "Rest", restDay: true, restMsg: "Stretch, foam roll, go for a 20 min walk." },
      { name: "Sunday", tag: "rest", tagLabel: "Rest", restDay: true, restMsg: "Full rest. Recovery is where gains happen." }
    ]
  },
  3: {
    label: "Week 3 — Grind Week",
    desc: "Push-up goal: 4×50. Peak volume on DB work. Slow everything down — control > speed.",
    pill: "Intensity",
    days: [
      {
        name: "Monday", tag: "home", tagLabel: "Home Day",
        blocks: [
          { label: "Morning Warm-Up", exercises: [
            { name: "Standing Hip Circles + Leg Swings", detail: "2×15 ea" },
            { name: "Arm Circles", detail: "2×20" },
            { name: "Downward Dog", detail: "5 breaths" },
          ]},
          { label: "Block 1 — Chest & Push (volume)", exercises: [
            { name: "Push-Ups", detail: "4×50" },
            { name: "DB Flat Press (2×20lb, 3s down)", detail: "5×10" },
            { name: "DB Incline Press (2×20lb)", detail: "4×12" },
            { name: "Diamond Push-Ups", detail: "3×15" },
            { name: "Plank Hold", detail: "3×60s" },
          ]},
          { label: "Block 2 — Arms + Core", exercises: [
            { name: "DB Curl (2×20lb, slow negative)", detail: "4×12" },
            { name: "Skull Crusher (2×15lb)", detail: "4×12" },
            { name: "Close-Grip Push-Up", detail: "3×15" },
            { name: "Sit-Ups", detail: "5×30" },
            { name: "Hollow Body Hold", detail: "3×30s" },
          ]},
        ],
        pushupNote: "4×50 is the peak. Break sets if needed — just get all 200 reps in."
      },
      {
        name: "Tuesday", tag: "commute", tagLabel: "Bike Commute",
        bikeDay: true,
        blocks: [{ label: "Morning (before commute)", exercises: [
          { name: "Push-Ups", detail: "3×30" },
          { name: "Sit-Ups", detail: "3×25" },
          { name: "Plank", detail: "1×55s" },
        ]}]
      },
      {
        name: "Wednesday", tag: "home", tagLabel: "Home Day",
        blocks: [
          { label: "Morning Warm-Up", exercises: [
            { name: "Band Pull-Aparts / Towel Rows", detail: "2×15" },
            { name: "Thoracic Rotations", detail: "2×10 ea" },
          ]},
          { label: "Block 1 — Shoulders + Back (peak volume)", exercises: [
            { name: "DB Shoulder Press (2×20lb)", detail: "5×12" },
            { name: "Lateral Raise (2×15lb)", detail: "5×15" },
            { name: "DB Row (1×30lb)", detail: "5×12 ea" },
            { name: "DB Shrug (2×20lb)", detail: "3×15" },
          ]},
          { label: "Block 2 — Back Detail + Core", exercises: [
            { name: "Rear Delt Fly (2×15lb)", detail: "4×15" },
            { name: "Good Mornings (2×15lb)", detail: "3×12" },
            { name: "Sit-Ups", detail: "5×30" },
            { name: "Russian Twist (1×15lb)", detail: "4×20 ea" },
            { name: "Dead Bug", detail: "3×10 ea" },
          ]},
        ],
        pushupNote: "Optional: 10 push-ups at the top of every hour while WFH."
      },
      {
        name: "Thursday", tag: "commute", tagLabel: "Bike Commute",
        bikeDay: true,
        blocks: [{ label: "Morning (before commute)", exercises: [
          { name: "Push-Ups", detail: "3×30" },
          { name: "Sit-Ups", detail: "3×25" },
          { name: "Bear Crawl in Place (slow)", detail: "1×30s" },
        ]}]
      },
      {
        name: "Friday", tag: "home", tagLabel: "Home Day",
        blocks: [
          { label: "Morning Warm-Up", exercises: [
            { name: "Slow Standing Torso Rotations", detail: "2×15 ea" },
            { name: "Shoulder Mobility", detail: "2×10" },
          ]},
          { label: "Block 1 — Full Push + AMRAP Test", exercises: [
            { name: "Max Push-Ups (one set)", detail: "AMRAP" },
            { name: "Rest 3 min, then:", detail: "" },
            { name: "DB Flat Press (2×20lb)", detail: "4×12" },
            { name: "DB Pullover (1×30lb)", detail: "4×12" },
          ]},
          { label: "Block 2 — Arms + Shoulders", exercises: [
            { name: "DB Curl + Press combo (2×15lb)", detail: "4×12" },
            { name: "Lateral Raise (2×15lb)", detail: "4×15" },
            { name: "Tricep Kickback (1×20lb)", detail: "3×12 ea" },
            { name: "Sit-Ups", detail: "5×30" },
            { name: "V-Hold", detail: "3×30s" },
          ]},
        ],
        pushupNote: "AMRAP test: beat your Block 2 number. Write it down."
      },
      { name: "Saturday", tag: "rest", tagLabel: "Rest", restDay: true, restMsg: "Stretch quads and hamstrings — the bike is doing work on those." },
      { name: "Sunday", tag: "rest", tagLabel: "Rest", restDay: true, restMsg: "Full rest. Sleep well. You're in the hard part of the block." }
    ]
  },
  4: {
    label: "Week 4 — Prove It",
    desc: "Push-up goal: 80+ unbroken. Deload DB volume slightly — peak on the push-up test Friday.",
    pill: "Peak",
    days: [
      {
        name: "Monday", tag: "home", tagLabel: "Home Day",
        blocks: [
          { label: "Morning Warm-Up", exercises: [
            { name: "Standing Hip Circles + Leg Swings", detail: "3×15 ea" },
            { name: "Arm Swings", detail: "2×20" },
            { name: "Deep Squat Hold", detail: "2×30s" },
          ]},
          { label: "Block 1 — Chest & Push (deload)", exercises: [
            { name: "Push-Ups", detail: "4×40" },
            { name: "DB Flat Press (2×20lb)", detail: "4×12" },
            { name: "DB Incline Press (2×20lb)", detail: "3×12" },
            { name: "Diamond Push-Ups", detail: "2×12" },
            { name: "Plank Hold", detail: "2×60s" },
          ]},
          { label: "Block 2 — Arms + Core", exercises: [
            { name: "DB Curl (2×20lb)", detail: "3×12" },
            { name: "Skull Crusher (2×15lb)", detail: "3×12" },
            { name: "Hammer Curl (2×20lb)", detail: "3×10" },
            { name: "Sit-Ups", detail: "4×30" },
            { name: "Hollow Body Hold", detail: "3×25s" },
          ]},
        ],
        pushupNote: "Deload week on DB — save your energy for the push-up test Friday."
      },
      {
        name: "Tuesday", tag: "commute", tagLabel: "Bike Commute",
        bikeDay: true,
        blocks: [{ label: "Morning (before commute)", exercises: [
          { name: "Push-Ups", detail: "2×30" },
          { name: "Sit-Ups", detail: "2×25" },
          { name: "Plank", detail: "1×60s" },
        ]}]
      },
      {
        name: "Wednesday", tag: "home", tagLabel: "Home Day",
        blocks: [
          { label: "Morning Warm-Up", exercises: [
            { name: "Shoulder Mobility Flow", detail: "5 min" },
          ]},
          { label: "Block 1 — Shoulders + Back (deload)", exercises: [
            { name: "DB Shoulder Press (2×20lb)", detail: "4×12" },
            { name: "Lateral Raise (2×15lb)", detail: "3×15" },
            { name: "DB Row (1×30lb)", detail: "4×12 ea" },
            { name: "Front Raise (1×15lb)", detail: "3×12" },
          ]},
          { label: "Block 2 — Back Detail + Core", exercises: [
            { name: "Rear Delt Fly (2×15lb)", detail: "3×15" },
            { name: "Superman (hold 3s)", detail: "3×12" },
            { name: "Sit-Ups", detail: "4×30" },
            { name: "Russian Twist (1×15lb)", detail: "3×20 ea" },
          ]},
        ],
        pushupNote: "Light volume — stay loose, stay fresh for Friday."
      },
      {
        name: "Thursday", tag: "commute", tagLabel: "Bike Commute",
        bikeDay: true,
        blocks: [{ label: "Morning (before commute)", exercises: [
          { name: "Push-Ups", detail: "2×25" },
          { name: "Sit-Ups", detail: "2×20" },
          { name: "Slow Squat to Stand", detail: "2×15" },
        ]}]
      },
      {
        name: "Friday", tag: "home", tagLabel: "Home Day",
        blocks: [
          { label: "Morning Warm-Up", exercises: [
            { name: "Shoulder Circles + Chest Opener", detail: "3 min" },
            { name: "Hip Flexor + Chest Stretch", detail: "2 min" },
            { name: "10 slow push-ups (primer)", detail: "1×10" },
          ]},
          { label: "PUSH-UP TEST", exercises: [
            { name: "Max Unbroken Push-Ups", detail: "1 set, AMRAP" },
            { name: "Rest 5 min, then:", detail: "" },
            { name: "Push-Ups", detail: "3×max" },
          ]},
          { label: "Block 2 — Shoulders + Arms (cool down)", exercises: [
            { name: "DB Press (2×20lb)", detail: "3×12" },
            { name: "DB Curl (2×20lb)", detail: "3×12" },
            { name: "Lateral Raise (2×15lb)", detail: "3×15" },
            { name: "Sit-Ups", detail: "4×30" },
            { name: "Plank Hold", detail: "2×60s" },
          ]},
        ],
        pushupNote: "Beat 70. Target 80+. This is your Block 3 number. Write it down."
      },
      { name: "Saturday", tag: "rest", tagLabel: "Rest", restDay: true, restMsg: "Block 3 done! Light walk or full rest. You've earned it." },
      { name: "Sunday", tag: "rest", tagLabel: "Rest", restDay: true, restMsg: "Reflect on the block. What felt hard, what felt easy. Plan Block 4." }
    ]
  }
};
