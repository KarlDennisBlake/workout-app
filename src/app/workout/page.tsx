"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { defaultWeeks } from "@/data/defaultWeeks";
import { Weeks, UserProfile } from "@/data/types";
import { useWorkoutState } from "@/hooks/useWorkoutState";
import { Header } from "@/components/Header";
import { ProgressBar } from "@/components/ProgressBar";
import { WeekNav } from "@/components/WeekNav";
import { WeekView } from "@/components/WeekView";

export default function WorkoutPage() {
  const router = useRouter();
  const [routine, setRoutine] = useState<Weeks>(defaultWeeks);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      const savedRoutine = localStorage.getItem("workout_routine");
      if (savedRoutine) {
        const parsed = JSON.parse(savedRoutine);
        // Convert string keys to numbers
        const numbered: Weeks = {};
        for (const key in parsed) {
          numbered[Number(key)] = parsed[key];
        }
        if (Object.keys(numbered).length > 0) {
          setRoutine(numbered);
        }
      }

      const savedProfile = localStorage.getItem("workout_profile");
      if (savedProfile) {
        setProfile(JSON.parse(savedProfile));
      }
    } catch {
      // Use defaults
    }
    setLoaded(true);
  }, []);

  const weekNumbers = Object.keys(routine).map(Number);
  const [activeWeek, setActiveWeek] = useState(weekNumbers[0] || 1);

  const {
    hydrated,
    toggleExercise,
    toggleDay,
    getWeekProgress,
    getDayState,
  } = useWorkoutState(routine);

  if (!loaded || !hydrated) {
    return <div className="loading-skeleton">Loading...</div>;
  }

  const { completed, total } = getWeekProgress(activeWeek);

  // Build header stats from profile or defaults
  const headerHeight = profile?.height || '5\'6"';
  const headerWeight = profile
    ? `${profile.weight} ${profile.weightUnit}`
    : "140 lb";

  return (
    <>
      <Header
        height={headerHeight}
        weight={headerWeight}
      />
      <ProgressBar completed={completed} total={total} />
      <WeekNav
        weekNumbers={weekNumbers}
        activeWeek={activeWeek}
        onSelectWeek={setActiveWeek}
      />
      <main>
        <div style={{ display: "flex", justifyContent: "flex-end", gap: "0.5rem", marginBottom: "0.5rem" }}>
          {profile && (
            <button
              onClick={() => router.push("/edit")}
              style={{
                background: "none",
                border: "1px solid var(--border)",
                borderRadius: "6px",
                padding: "0.35rem 0.8rem",
                fontSize: "0.7rem",
                color: "var(--muted)",
                cursor: "pointer",
                fontFamily: "inherit",
                letterSpacing: "0.05em",
                textTransform: "uppercase",
              }}
            >
              Edit Routine
            </button>
          )}
          <button
            onClick={() => router.push("/onboarding")}
            style={{
              background: "none",
              border: "1px solid var(--border)",
              borderRadius: "6px",
              padding: "0.35rem 0.8rem",
              fontSize: "0.7rem",
              color: "var(--muted)",
              cursor: "pointer",
              fontFamily: "inherit",
              letterSpacing: "0.05em",
              textTransform: "uppercase",
            }}
          >
            {profile ? "Rebuild Routine" : "Create Custom Routine"}
          </button>
        </div>
        {routine[activeWeek] && (
          <WeekView
            week={routine[activeWeek]}
            weekNumber={activeWeek}
            getDayState={getDayState}
            onToggleEx={toggleExercise}
            onToggleDay={toggleDay}
          />
        )}
      </main>
    </>
  );
}
