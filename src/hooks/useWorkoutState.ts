"use client";

import { useCallback, useEffect } from "react";
import { Weeks, WorkoutProgress, DayState } from "@/data/types";
import { useLocalStorageHydrated } from "./useLocalStorage";

// weekNum → dayIdx → exIdx → boolean[] (one per set)
type SetsProgress = Record<number, Record<number, Record<number, boolean[]>>>;

function initProgress(routine: Weeks): WorkoutProgress {
  const progress: WorkoutProgress = {};
  for (const w in routine) {
    const weekNum = Number(w);
    progress[weekNum] = {};
    routine[weekNum].days.forEach((day, di) => {
      const exCount = day.blocks
        ? day.blocks.reduce((a, b) => a + b.exercises.length, 0)
        : 0;
      progress[weekNum][di] = { done: false, ex: new Array(exCount).fill(false) };
    });
  }
  return progress;
}

function reconcileProgress(
  saved: WorkoutProgress,
  routine: Weeks
): WorkoutProgress {
  const fresh = initProgress(routine);
  for (const w in fresh) {
    const weekNum = Number(w);
    if (saved[weekNum]) {
      for (const di in fresh[weekNum]) {
        const dayIdx = Number(di);
        if (saved[weekNum][dayIdx]) {
          const savedDay = saved[weekNum][dayIdx];
          const freshDay = fresh[weekNum][dayIdx];
          if (savedDay.ex.length === freshDay.ex.length) {
            fresh[weekNum][dayIdx] = savedDay;
          }
        }
      }
    }
  }
  return fresh;
}

export function useWorkoutState(routine: Weeks) {
  const [progress, setProgress, hydrated] = useLocalStorageHydrated<WorkoutProgress>(
    "workout_progress",
    initProgress(routine)
  );

  const [setsProgress, setSetsProgress] = useLocalStorageHydrated<SetsProgress>(
    "workout_sets",
    {}
  );

  useEffect(() => {
    if (hydrated) {
      const reconciled = reconcileProgress(progress, routine);
      const needsUpdate =
        JSON.stringify(reconciled) !== JSON.stringify(progress);
      if (needsUpdate) {
        setProgress(reconciled);
      }
    }
  }, [routine, hydrated]);

  const toggleExercise = useCallback(
    (weekNum: number, dayIndex: number, exIndex: number) => {
      setProgress((prev) => {
        const next = JSON.parse(JSON.stringify(prev)) as WorkoutProgress;
        if (next[weekNum]?.[dayIndex]) {
          next[weekNum][dayIndex].ex[exIndex] =
            !next[weekNum][dayIndex].ex[exIndex];
        }
        return next;
      });
    },
    [setProgress]
  );

  const toggleDay = useCallback(
    (weekNum: number, dayIndex: number) => {
      setProgress((prev) => {
        const next = JSON.parse(JSON.stringify(prev)) as WorkoutProgress;
        if (next[weekNum]?.[dayIndex]) {
          const dayState = next[weekNum][dayIndex];
          const newVal = !dayState.done;
          dayState.done = newVal;
          dayState.ex = dayState.ex.map(() => newVal);
        }
        return next;
      });
    },
    [setProgress]
  );

  const getWeekProgress = useCallback(
    (weekNum: number) => {
      const weekDays = routine[weekNum]?.days || [];
      let total = 0;
      let completed = 0;
      weekDays.forEach((day, di) => {
        const exCount = day.blocks
          ? day.blocks.reduce((a, b) => a + b.exercises.length, 0)
          : 0;
        total += exCount;
        if (progress[weekNum]?.[di]) {
          completed += progress[weekNum][di].ex.filter(Boolean).length;
        }
      });
      return { completed, total };
    },
    [routine, progress]
  );

  const getDayState = useCallback(
    (weekNum: number, dayIndex: number): DayState => {
      return (
        progress[weekNum]?.[dayIndex] || { done: false, ex: [] }
      );
    },
    [progress]
  );

  const toggleSet = useCallback(
    (weekNum: number, dayIdx: number, exIdx: number, setIdx: number, totalSets: number) => {
      setSetsProgress((prev) => {
        const next: SetsProgress = JSON.parse(JSON.stringify(prev));
        if (!next[weekNum]) next[weekNum] = {};
        if (!next[weekNum][dayIdx]) next[weekNum][dayIdx] = {};
        if (!next[weekNum][dayIdx][exIdx]) {
          next[weekNum][dayIdx][exIdx] = new Array(totalSets).fill(false);
        }
        next[weekNum][dayIdx][exIdx][setIdx] = !next[weekNum][dayIdx][exIdx][setIdx];

        // Auto-check the main exercise checkbox when all sets are done
        const allDone = next[weekNum][dayIdx][exIdx].every(Boolean);
        if (allDone) {
          setProgress((p) => {
            const np: WorkoutProgress = JSON.parse(JSON.stringify(p));
            if (np[weekNum]?.[dayIdx]) {
              np[weekNum][dayIdx].ex[exIdx] = true;
            }
            return np;
          });
        }

        return next;
      });
    },
    [setSetsProgress, setProgress]
  );

  const getSetStates = useCallback(
    (weekNum: number, dayIdx: number, exIdx: number, totalSets: number): boolean[] => {
      return setsProgress[weekNum]?.[dayIdx]?.[exIdx] ?? new Array(totalSets).fill(false);
    },
    [setsProgress]
  );

  const resetProgress = useCallback(() => {
    setProgress(initProgress(routine));
    setSetsProgress({});
  }, [routine, setProgress, setSetsProgress]);

  return {
    progress,
    hydrated,
    toggleExercise,
    toggleDay,
    getWeekProgress,
    getDayState,
    resetProgress,
    toggleSet,
    getSetStates,
  };
}
