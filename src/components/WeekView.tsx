"use client";

import { WeekData, DayState } from "@/data/types";
import { WeekIntro } from "./WeekIntro";
import { DayCard } from "./DayCard";
import { PushupTracker } from "./PushupTracker";

interface WeekViewProps {
  week: WeekData;
  weekNumber: number;
  getDayState: (weekNum: number, dayIndex: number) => DayState;
  onToggleEx: (weekNum: number, dayIndex: number, exIndex: number) => void;
  onToggleDay: (weekNum: number, dayIndex: number) => void;
}

export function WeekView({
  week,
  weekNumber,
  getDayState,
  onToggleEx,
  onToggleDay,
}: WeekViewProps) {
  return (
    <>
      <WeekIntro label={week.label} desc={week.desc} pill={week.pill} />
      <div className="day-grid">
        {week.days.map((day, di) => (
          <DayCard
            key={di}
            day={day}
            dayIndex={di}
            state={getDayState(weekNumber, di)}
            onToggleEx={(exIdx) => onToggleEx(weekNumber, di, exIdx)}
            onToggleDay={() => onToggleDay(weekNumber, di)}
          />
        ))}
      </div>
      <PushupTracker />
    </>
  );
}
