"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ChatOnboarding } from "@/components/ChatOnboarding";
import { UserProfile, Weeks } from "@/data/types";

export default function EditPage() {
  const router = useRouter();
  const [currentRoutine, setCurrentRoutine] = useState<Weeks | null>(null);
  const [currentProfile, setCurrentProfile] = useState<UserProfile | null>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      const savedRoutine = localStorage.getItem("workout_routine");
      const savedProfile = localStorage.getItem("workout_profile");
      if (savedRoutine && savedProfile) {
        const parsed = JSON.parse(savedRoutine);
        const numbered: Weeks = {};
        for (const key in parsed) {
          numbered[Number(key)] = parsed[key];
        }
        setCurrentRoutine(numbered);
        setCurrentProfile(JSON.parse(savedProfile));
      }
    } catch {
      // Fall through to redirect
    }
    setLoaded(true);
  }, []);

  // If no routine exists, redirect to onboarding
  useEffect(() => {
    if (loaded && !currentRoutine) {
      router.push("/onboarding");
    }
  }, [loaded, currentRoutine, router]);

  function handleComplete(profile: UserProfile, routine: Weeks) {
    try {
      localStorage.setItem("workout_profile", JSON.stringify(profile));
      localStorage.setItem("workout_routine", JSON.stringify(routine));
      // Do NOT clear workout_progress — reconcileProgress() in
      // useWorkoutState will merge existing progress with the
      // new routine shape automatically.
    } catch {
      // localStorage might be full
    }
    router.push("/workout");
  }

  if (!loaded || !currentRoutine || !currentProfile) {
    return <div className="loading-skeleton">Loading...</div>;
  }

  return (
    <ChatOnboarding
      onComplete={handleComplete}
      mode="edit"
      currentRoutine={currentRoutine}
      currentProfile={currentProfile}
    />
  );
}
