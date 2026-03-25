"use client";

import { Block } from "@/data/types";
import { ExerciseRow } from "./ExerciseRow";

interface ExerciseBlockProps {
  block: Block;
  blockIndex: number;
  dayName: string;
  exerciseStartIndex: number;
  exerciseStates: boolean[];
  onToggle: (exIndex: number) => void;
  isEditing?: boolean;
  onRemoveBlock?: () => void;
  onRemoveExercise?: (exIndex: number) => void;
  onUpdateExercise?: (exIndex: number, field: "name" | "detail", value: string) => void;
}

function buildCalendarUrl(block: Block, dayName: string): string {
  const title = encodeURIComponent(block.label);
  const exercises = block.exercises
    .filter((ex) => ex.detail)
    .map((ex) => `${ex.name} — ${ex.detail}`)
    .join("\n");
  const details = encodeURIComponent(exercises);

  const now = new Date();
  const pad = (n: number) => n.toString().padStart(2, "0");
  const fmt = (d: Date) =>
    `${d.getFullYear()}${pad(d.getMonth() + 1)}${pad(d.getDate())}T${pad(d.getHours())}${pad(d.getMinutes())}00`;
  const end = new Date(now.getTime() + 30 * 60 * 1000);

  return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&details=${details}&dates=${fmt(now)}/${fmt(end)}`;
}

export function ExerciseBlock({
  block,
  blockIndex,
  dayName,
  exerciseStartIndex,
  exerciseStates,
  onToggle,
  isEditing,
  onRemoveBlock,
  onRemoveExercise,
  onUpdateExercise,
}: ExerciseBlockProps) {
  return (
    <>
      <div className="block-header">
        {block.label}
        {block.time && <span className="block-time">{block.time}</span>}
        {isEditing ? (
          <button
            className="remove-block-btn"
            title="Remove block"
            onClick={(e) => {
              e.stopPropagation();
              onRemoveBlock?.();
            }}
          >
            ×
          </button>
        ) : (
          <button
            className="cal-btn"
            title="Add to Google Calendar"
            onClick={() =>
              window.open(buildCalendarUrl(block, dayName), "_blank")
            }
          >
            <svg viewBox="0 0 20 20" fill="currentColor" width="14" height="14">
              <path
                fillRule="evenodd"
                d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        )}
      </div>
      {block.exercises.map((ex, i) => {
        const globalIdx = exerciseStartIndex + i;
        return (
          <ExerciseRow
            key={globalIdx}
            name={ex.name}
            detail={ex.detail}
            checked={exerciseStates[globalIdx] || false}
            onToggle={() => onToggle(globalIdx)}
            isEditing={isEditing}
            onRemove={() => onRemoveExercise?.(i)}
            onUpdateDetail={(value) => onUpdateExercise?.(i, "detail", value)}
            onUpdateName={(value) => onUpdateExercise?.(i, "name", value)}
          />
        );
      })}
    </>
  );
}
