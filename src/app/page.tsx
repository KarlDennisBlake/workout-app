"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ThemeToggle } from "@/components/ThemeToggle";

export default function Home() {
  const router = useRouter();
  const [isNewUser, setIsNewUser] = useState<boolean | null>(null);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("workout_routine");
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Object.keys(parsed).length > 0) {
          router.replace("/workout");
          return;
        }
      }
    } catch {
      // Treat parse errors as new user
    }
    setIsNewUser(true);
  }, [router]);

  if (isNewUser === null) {
    return <div className="loading-skeleton">Loading...</div>;
  }

  return (
    <div className="welcome-container">
      <header className="welcome-header">
        <div className="hdr-title">
          <h1 style={{ fontFamily: "var(--font-syne), 'Syne', sans-serif" }}>
            Your Workout
          </h1>
          <p>AI-Powered Routine Builder</p>
        </div>
        <ThemeToggle />
      </header>

      <main className="welcome-hero">
        <h2
          className="welcome-heading"
          style={{ fontFamily: "var(--font-syne), 'Syne', sans-serif" }}
        >
          Build a workout routine
          <br />
          that fits your life.
        </h2>

        <p className="welcome-desc">
          Tell us about your goals, equipment, and schedule. Our AI coach
          builds a personalized 4-week plan in minutes.
        </p>

        <button
          className="welcome-cta"
          onClick={() => router.push("/onboarding")}
        >
          Get Started
        </button>

        <div className="welcome-features">
          <span className="welcome-pill">Personalized</span>
          <span className="welcome-pill">4-Week Plans</span>
          <span className="welcome-pill">Track Progress</span>
        </div>
      </main>
    </div>
  );
}
