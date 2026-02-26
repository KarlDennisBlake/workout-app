"use client";

import { Day, DayState } from "@/data/types";
import { DayCardHeader } from "./DayCardHeader";
import { ExerciseBlock } from "./ExerciseBlock";
import { PushupGoal } from "./PushupGoal";
import { BikeBadge } from "./BikeBadge";
import { RestDayBody } from "./RestDayBody";

interface DayCardProps {
  day: Day;
  dayIndex: number;
  state: DayState;
  onToggleEx: (exIndex: number) => void;
  onToggleDay: () => void;
}

export function DayCard({
  day,
  dayIndex,
  state,
  onToggleEx,
  onToggleDay,
}: DayCardProps) {
  const isDone =
    state.done || (state.ex.length > 0 && state.ex.every(Boolean));

  return (
    <div className={`day-card${isDone ? " done" : ""}`}>
      <DayCardHeader
        name={day.name}
        tag={day.tag}
        tagLabel={day.tagLabel}
        isDone={isDone}
        isRestDay={!!day.restDay}
        onToggleDone={onToggleDay}
      />
      {day.restDay ? (
        <RestDayBody message={day.restMsg || ""} />
      ) : (
        <div className="blocks">
          {day.blocks?.map((block, bi) => {
            const startIdx = day.blocks!
              .slice(0, bi)
              .reduce((a, b) => a + b.exercises.length, 0);
            return (
              <ExerciseBlock
                key={bi}
                block={block}
                exerciseStartIndex={startIdx}
                exerciseStates={state.ex}
                onToggle={onToggleEx}
              />
            );
          })}
          {day.pushupNote && <PushupGoal note={day.pushupNote} />}
          {day.bikeDay && <BikeBadge />}
        </div>
      )}
    </div>
  );
}
