"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { Day, DayState } from "@/data/types";
import { DayCardHeader } from "./DayCardHeader";
import { ExerciseBlock } from "./ExerciseBlock";
import { PushupGoal } from "./PushupGoal";
import { BikeBadge } from "./BikeBadge";
import { RestDayBody } from "./RestDayBody";

interface DayCardProps {
  day: Day;
  dayIndex: number;
  weekNumber: number;
  state: DayState;
  onToggleEx: (exIndex: number) => void;
  onToggleDay: () => void;
  isEditing: boolean;
  onEnterEdit: () => void;
  onSaveEdit: () => void;
  onCancelEdit: () => void;
  onRemoveBlock: (blockIndex: number) => void;
  onRemoveExercise: (blockIndex: number, exIndex: number) => void;
  onUpdateExercise: (
    blockIndex: number,
    exIndex: number,
    field: "name" | "detail",
    value: string
  ) => void;
  editingAny: boolean;
}

export function DayCard({
  day,
  dayIndex,
  weekNumber,
  state,
  onToggleEx,
  onToggleDay,
  isEditing,
  onEnterEdit,
  onSaveEdit,
  onCancelEdit,
  onRemoveBlock,
  onRemoveExercise,
  onUpdateExercise,
  editingAny,
}: DayCardProps) {
  const isDone =
    state.done || (state.ex.length > 0 && state.ex.every(Boolean));

  const [collapsed, setCollapsed] = useState(isDone);
  const prevDone = useRef(isDone);
  const bodyRef = useRef<HTMLDivElement>(null);
  const longPressTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Auto-collapse when all exercises are checked off (but not while editing)
  useEffect(() => {
    if (isEditing) return;
    if (isDone !== prevDone.current) {
      setCollapsed(isDone);
      prevDone.current = isDone;
    }
  }, [isDone, isEditing]);

  // Force expand when entering edit mode
  useEffect(() => {
    if (isEditing) setCollapsed(false);
  }, [isEditing]);

  const handleHeaderClick = () => {
    if (isEditing) return;
    setCollapsed((prev) => !prev);
  };

  // Long-press detection
  const handlePointerDown = useCallback(
    (e: React.PointerEvent) => {
      if (day.restDay || editingAny) return;
      longPressTimer.current = setTimeout(() => {
        longPressTimer.current = null;
        if (navigator.vibrate) navigator.vibrate(30);
        onEnterEdit();
      }, 500);
    },
    [day.restDay, editingAny, onEnterEdit]
  );

  const cancelLongPress = useCallback(() => {
    if (longPressTimer.current) {
      clearTimeout(longPressTimer.current);
      longPressTimer.current = null;
    }
  }, []);

  return (
    <div
      className={`day-card${isDone ? " done" : ""}${collapsed ? " collapsed" : ""}${isEditing ? " editing" : ""}`}
      onPointerDown={handlePointerDown}
      onPointerUp={cancelLongPress}
      onPointerLeave={cancelLongPress}
      onPointerCancel={cancelLongPress}
      onContextMenu={(e) => {
        if (!day.restDay) e.preventDefault();
      }}
    >
      <DayCardHeader
        name={day.name}
        tag={day.tag}
        tagLabel={day.tagLabel}
        isDone={isDone}
        isRestDay={!!day.restDay}
        onToggleDone={onToggleDay}
        onHeaderClick={handleHeaderClick}
        collapsed={collapsed}
        isEditing={isEditing}
        onSaveEdit={onSaveEdit}
        onCancelEdit={onCancelEdit}
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
                    blockIndex={bi}
                    dayName={day.name}
                    exerciseStartIndex={startIdx}
                    exerciseStates={state.ex}
                    onToggle={onToggleEx}
                    isEditing={isEditing}
                    onRemoveBlock={() => onRemoveBlock(bi)}
                    onRemoveExercise={(ei) => onRemoveExercise(bi, ei)}
                    onUpdateExercise={(ei, field, value) =>
                      onUpdateExercise(bi, ei, field, value)
                    }
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
