"use client";

import { WeekData, DayState } from "@/data/types";
import { WeekIntro } from "./WeekIntro";
import { DayCard } from "./DayCard";
import { PushupTracker } from "./PushupTracker";

interface EditMode {
  isEditing: (weekNum: number, dayIndex: number) => boolean;
  enterEditMode: (weekNum: number, dayIndex: number) => void;
  commitEdits: () => void;
  cancelEdits: () => void;
  removeBlock: (weekNum: number, dayIndex: number, blockIndex: number) => void;
  removeExercise: (weekNum: number, dayIndex: number, blockIndex: number, exIndex: number) => void;
  updateExercise: (weekNum: number, dayIndex: number, blockIndex: number, exIndex: number, field: "name" | "detail", value: string) => void;
  editingKey: { weekNum: number; dayIndex: number } | null;
}

interface WeekViewProps {
  week: WeekData;
  weekNumber: number;
  getDayState: (weekNum: number, dayIndex: number) => DayState;
  onToggleEx: (weekNum: number, dayIndex: number, exIndex: number) => void;
  onToggleDay: (weekNum: number, dayIndex: number) => void;
  editMode: EditMode;
  toggleSet: (weekNum: number, dayIdx: number, exIdx: number, setIdx: number, totalSets: number) => void;
  getSetStates: (weekNum: number, dayIdx: number, exIdx: number, totalSets: number) => boolean[];
}

export function WeekView({
  week,
  weekNumber,
  getDayState,
  onToggleEx,
  onToggleDay,
  editMode,
  toggleSet,
  getSetStates,
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
            weekNumber={weekNumber}
            state={getDayState(weekNumber, di)}
            onToggleEx={(exIdx) => onToggleEx(weekNumber, di, exIdx)}
            onToggleDay={() => onToggleDay(weekNumber, di)}
            isEditing={editMode.isEditing(weekNumber, di)}
            onEnterEdit={() => editMode.enterEditMode(weekNumber, di)}
            onSaveEdit={editMode.commitEdits}
            onCancelEdit={editMode.cancelEdits}
            onRemoveBlock={(bi) => editMode.removeBlock(weekNumber, di, bi)}
            onRemoveExercise={(bi, ei) => editMode.removeExercise(weekNumber, di, bi, ei)}
            onUpdateExercise={(bi, ei, field, value) =>
              editMode.updateExercise(weekNumber, di, bi, ei, field, value)
            }
            editingAny={editMode.editingKey !== null}
            toggleSet={(exIdx, setIdx, totalSets) => toggleSet(weekNumber, di, exIdx, setIdx, totalSets)}
            getSetStates={(exIdx, totalSets) => getSetStates(weekNumber, di, exIdx, totalSets)}
          />
        ))}
      </div>
      <PushupTracker />
    </>
  );
}
