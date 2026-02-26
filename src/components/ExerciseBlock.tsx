"use client";

import { Block } from "@/data/types";
import { ExerciseRow } from "./ExerciseRow";

interface ExerciseBlockProps {
  block: Block;
  exerciseStartIndex: number;
  exerciseStates: boolean[];
  onToggle: (exIndex: number) => void;
}

export function ExerciseBlock({
  block,
  exerciseStartIndex,
  exerciseStates,
  onToggle,
}: ExerciseBlockProps) {
  return (
    <>
      <div className="block-header">
        {block.label}
        <span className="block-time">{block.time}</span>
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
          />
        );
      })}
    </>
  );
}
