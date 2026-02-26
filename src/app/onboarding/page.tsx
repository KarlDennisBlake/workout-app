"use client";

import { useRouter } from "next/navigation";
import { ChatOnboarding } from "@/components/ChatOnboarding";
import { UserProfile, Weeks } from "@/data/types";

export default function OnboardingPage() {
  const router = useRouter();

  function handleComplete(profile: UserProfile, routine: Weeks) {
    try {
      localStorage.setItem("workout_profile", JSON.stringify(profile));
      localStorage.setItem("workout_routine", JSON.stringify(routine));
      // Clear old progress when a new routine is generated
      localStorage.removeItem("workout_progress");
    } catch {
      // localStorage might be full
    }
    router.push("/workout");
  }

  return <ChatOnboarding onComplete={handleComplete} />;
}
