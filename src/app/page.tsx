"use client";

import { useState, useMemo } from "react";
import { defaultWeeks } from "@/data/defaultWeeks";
import { WorkoutOverrides } from "@/data/types";
import { applyOverrides } from "@/data/mergeOverrides";
import { useLocalStorageHydrated } from "@/hooks/useLocalStorage";
import { useWorkoutState } from "@/hooks/useWorkoutState";
import { useEditMode } from "@/hooks/useEditMode";
import { Header } from "@/components/Header";
import { ProgressBar } from "@/components/ProgressBar";
import { WeekNav } from "@/components/WeekNav";
import { WeekView } from "@/components/WeekView";

export default function Home() {
  const [overrides, setOverrides, ovHydrated] =
    useLocalStorageHydrated<WorkoutOverrides>("workout_overrides", {});

  const editMode = useEditMode(overrides, setOverrides);

  const activeOverrides = editMode.editingKey ? editMode.draft : overrides;
  const routine = useMemo(
    () => applyOverrides(defaultWeeks, activeOverrides),
    [activeOverrides]
  );

  const weekNumbers = Object.keys(routine).map(Number);
  const [activeWeek, setActiveWeek] = useState(weekNumbers[0] || 1);

  const {
    hydrated,
    toggleExercise,
    toggleDay,
    getWeekProgress,
    getDayState,
    resetProgress,
    toggleSet,
    getSetStates,
  } = useWorkoutState(routine);

  if (!ovHydrated || !hydrated) {
    return <div className="loading-skeleton">Loading...</div>;
  }

  const { completed, total } = getWeekProgress(activeWeek);

  return (
    <>
      <Header />
      <ProgressBar completed={completed} total={total} />
      <WeekNav
        weekNumbers={weekNumbers}
        activeWeek={activeWeek}
        onSelectWeek={setActiveWeek}
      />
      <main>
        {routine[activeWeek] && (
          <WeekView
            week={routine[activeWeek]}
            weekNumber={activeWeek}
            getDayState={getDayState}
            onToggleEx={toggleExercise}
            onToggleDay={toggleDay}
            editMode={editMode}
            toggleSet={toggleSet}
            getSetStates={getSetStates}
          />
        )}
        <div className="reset-footer">
          <button
            className="reset-btn"
            onClick={() => {
              if (confirm("Uncheck everything and start fresh?")) {
                resetProgress();
              }
            }}
          >
            Start Fresh
          </button>
        </div>
      </main>
    </>
  );
}
