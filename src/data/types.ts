export interface Exercise {
  name: string;
  detail: string;
}

export interface Block {
  label: string;
  time?: string;
  exercises: Exercise[];
}

export interface Day {
  name: string;
  tag: string;
  tagLabel: string;
  blocks?: Block[];
  restDay?: boolean;
  restMsg?: string;
  bikeDay?: boolean;
  pushupNote?: string;
}

export interface WeekData {
  label: string;
  desc: string;
  pill: string;
  days: Day[];
}

export type Weeks = Record<number, WeekData>;

export interface UserProfile {
  weight: number;
  weightUnit: "lb" | "kg";
  height: string;
  age: number;
  sex: "male" | "female" | "other";
  equipment: string[];
  goals: string[];
  constraints: string[];
  createdAt: string;
}

export interface IntakeData {
  height: string;
  weight: number;
  weightUnit: "lb" | "kg";
  age: number;
  sex: "male" | "female" | "other";
  equipment: string[];
  equipmentDetails: string;
  goals: string[];
  goalsDetails: string;
  constraints: string;
  daysPerWeek: number;
  timePerSession: string;
}

export interface DayState {
  done: boolean;
  ex: boolean[];
}

export type WeekState = Record<number, DayState>;
export type WorkoutProgress = Record<number, WeekState>;

// Sparse override types for inline editing
export type ExerciseOverride = {
  deleted?: boolean;
  name?: string;
  detail?: string;
};

export type BlockOverride = {
  deleted?: boolean;
  exercises?: Record<number, ExerciseOverride>;
};

export type DayOverride = {
  blocks?: Record<number, BlockOverride>;
};

export type WorkoutOverrides = Record<number, Record<number, DayOverride>>;
