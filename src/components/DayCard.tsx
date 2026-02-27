"use client";

import { useState, useEffect, useRef } from "react";
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

  const [collapsed, setCollapsed] = useState(isDone);
  const prevDone = useRef(isDone);
  const bodyRef = useRef<HTMLDivElement>(null);

  // Auto-collapse when all exercises are checked off,
  // auto-expand when unchecked (e.g. via the done button)
  useEffect(() => {
    if (isDone !== prevDone.current) {
      setCollapsed(isDone);
      prevDone.current = isDone;
    }
  }, [isDone]);

  const handleHeaderClick = () => {
    setCollapsed((prev) => !prev);
  };

  return (
    <div className={`day-card${isDone ? " done" : ""}${collapsed ? " collapsed" : ""}`}>
      <DayCardHeader
        name={day.name}
        tag={day.tag}
        tagLabel={day.tagLabel}
        isDone={isDone}
        isRestDay={!!day.restDay}
        onToggleDone={onToggleDay}
        onHeaderClick={handleHeaderClick}
        collapsed={collapsed}
      />
      <div
        ref={bodyRef}
        className="day-card-body"
        style={{
          gridTemplateRows: collapsed ? "0fr" : "1fr",
        }}
      >
        <div className="day-card-body-inner">
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
      </div>
    </div>
  );
}
