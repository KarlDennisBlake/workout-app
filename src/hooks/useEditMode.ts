"use client";

import { useState, useCallback } from "react";
import { WorkoutOverrides } from "@/data/types";

type EditingKey = { weekNum: number; dayIndex: number } | null;

export function useEditMode(
  overrides: WorkoutOverrides,
  setOverrides: (value: WorkoutOverrides | ((prev: WorkoutOverrides) => WorkoutOverrides)) => void
) {
  const [editingKey, setEditingKey] = useState<EditingKey>(null);
  const [draft, setDraft] = useState<WorkoutOverrides>({});

  const isEditing = useCallback(
    (weekNum: number, dayIndex: number) =>
      editingKey?.weekNum === weekNum && editingKey?.dayIndex === dayIndex,
    [editingKey]
  );

  const enterEditMode = useCallback(
    (weekNum: number, dayIndex: number) => {
      if (editingKey) return; // only one day at a time
      setDraft(JSON.parse(JSON.stringify(overrides)));
      setEditingKey({ weekNum, dayIndex });
    },
    [editingKey, overrides]
  );

  const commitEdits = useCallback(() => {
    setOverrides(draft);
    setEditingKey(null);
  }, [draft, setOverrides]);

  const cancelEdits = useCallback(() => {
    setDraft({});
    setEditingKey(null);
  }, []);

  const removeBlock = useCallback(
    (weekNum: number, dayIndex: number, blockIndex: number) => {
      setDraft((prev) => {
        const next = JSON.parse(JSON.stringify(prev)) as WorkoutOverrides;
        if (!next[weekNum]) next[weekNum] = {};
        if (!next[weekNum][dayIndex]) next[weekNum][dayIndex] = {};
        if (!next[weekNum][dayIndex].blocks) next[weekNum][dayIndex].blocks = {};
        next[weekNum][dayIndex].blocks![blockIndex] = {
          ...next[weekNum][dayIndex].blocks![blockIndex],
          deleted: true,
        };
        return next;
      });
    },
    []
  );

  const removeExercise = useCallback(
    (weekNum: number, dayIndex: number, blockIndex: number, exIndex: number) => {
      setDraft((prev) => {
        const next = JSON.parse(JSON.stringify(prev)) as WorkoutOverrides;
        if (!next[weekNum]) next[weekNum] = {};
        if (!next[weekNum][dayIndex]) next[weekNum][dayIndex] = {};
        if (!next[weekNum][dayIndex].blocks) next[weekNum][dayIndex].blocks = {};
        if (!next[weekNum][dayIndex].blocks![blockIndex])
          next[weekNum][dayIndex].blocks![blockIndex] = {};
        if (!next[weekNum][dayIndex].blocks![blockIndex].exercises)
          next[weekNum][dayIndex].blocks![blockIndex].exercises = {};
        next[weekNum][dayIndex].blocks![blockIndex].exercises![exIndex] = {
          ...next[weekNum][dayIndex].blocks![blockIndex].exercises![exIndex],
          deleted: true,
        };
        return next;
      });
    },
    []
  );

  const updateExercise = useCallback(
    (
      weekNum: number,
      dayIndex: number,
      blockIndex: number,
      exIndex: number,
      field: "name" | "detail",
      value: string
    ) => {
      setDraft((prev) => {
        const next = JSON.parse(JSON.stringify(prev)) as WorkoutOverrides;
        if (!next[weekNum]) next[weekNum] = {};
        if (!next[weekNum][dayIndex]) next[weekNum][dayIndex] = {};
        if (!next[weekNum][dayIndex].blocks) next[weekNum][dayIndex].blocks = {};
        if (!next[weekNum][dayIndex].blocks![blockIndex])
          next[weekNum][dayIndex].blocks![blockIndex] = {};
        if (!next[weekNum][dayIndex].blocks![blockIndex].exercises)
          next[weekNum][dayIndex].blocks![blockIndex].exercises = {};
        if (!next[weekNum][dayIndex].blocks![blockIndex].exercises![exIndex])
          next[weekNum][dayIndex].blocks![blockIndex].exercises![exIndex] = {};
        next[weekNum][dayIndex].blocks![blockIndex].exercises![exIndex][field] = value;
        return next;
      });
    },
    []
  );

  return {
    editingKey,
    isEditing,
    enterEditMode,
    commitEdits,
    cancelEdits,
    removeBlock,
    removeExercise,
    updateExercise,
    draft,
  };
}
