export interface Exercise {
  name: string;
  detail: string;
}

export interface Block {
  label: string;
  time: string;
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

export interface DayState {
  done: boolean;
  ex: boolean[];
}

export type WeekState = Record<number, DayState>;
export type WorkoutProgress = Record<number, WeekState>;
