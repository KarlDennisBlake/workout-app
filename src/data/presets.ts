export const EQUIPMENT_OPTIONS = [
  { id: "dumbbells", label: "Dumbbells" },
  { id: "barbell", label: "Barbell & Plates" },
  { id: "bench", label: "Adjustable Bench" },
  { id: "pull_up_bar", label: "Pull-Up Bar" },
  { id: "resistance_bands", label: "Resistance Bands" },
  { id: "kettlebell", label: "Kettlebell" },
  { id: "cable_machine", label: "Cable Machine" },
  { id: "bodyweight", label: "Bodyweight Only" },
] as const;

export const GOAL_OPTIONS = [
  { id: "build_muscle", label: "Build Muscle" },
  { id: "lose_fat", label: "Lose Fat" },
  { id: "improve_endurance", label: "Improve Endurance" },
  { id: "get_stronger", label: "Get Stronger" },
  { id: "flexibility", label: "Flexibility & Mobility" },
  { id: "general_fitness", label: "General Fitness" },
] as const;

export const DAYS_PER_WEEK_OPTIONS = [3, 4, 5, 6] as const;

export const TIME_PER_SESSION_OPTIONS = [
  "15 min",
  "20 min",
  "30 min",
  "45 min",
  "60 min",
  "75 min",
  "90 min",
] as const;
