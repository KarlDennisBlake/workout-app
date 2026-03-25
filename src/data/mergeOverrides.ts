import { Weeks, WorkoutOverrides, Block, Exercise } from "./types";

export function applyOverrides(base: Weeks, overrides: WorkoutOverrides): Weeks {
  if (!overrides || Object.keys(overrides).length === 0) return base;

  const result: Weeks = {};

  for (const w in base) {
    const weekNum = Number(w);
    const week = base[weekNum];
    const weekOverrides = overrides[weekNum];

    if (!weekOverrides) {
      result[weekNum] = week;
      continue;
    }

    result[weekNum] = {
      ...week,
      days: week.days.map((day, di) => {
        const dayOverride = weekOverrides[di];
        if (!dayOverride?.blocks || !day.blocks) return day;

        const filteredBlocks: Block[] = [];
        day.blocks.forEach((block, bi) => {
          const blockOv = dayOverride.blocks?.[bi];
          if (blockOv?.deleted) return; // skip deleted blocks

          const filteredExercises: Exercise[] = [];
          block.exercises.forEach((ex, ei) => {
            const exOv = blockOv?.exercises?.[ei];
            if (exOv?.deleted) return; // skip deleted exercises

            filteredExercises.push({
              name: exOv?.name ?? ex.name,
              detail: exOv?.detail ?? ex.detail,
            });
          });

          filteredBlocks.push({
            ...block,
            exercises: filteredExercises,
          });
        });

        return { ...day, blocks: filteredBlocks };
      }),
    };
  }

  return result;
}
