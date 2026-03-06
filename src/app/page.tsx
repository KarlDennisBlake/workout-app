"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ThemeToggle } from "@/components/ThemeToggle";
import { AISettings } from "@/components/AISettings";

export default function Home() {
  const router = useRouter();
  const [isNewUser, setIsNewUser] = useState<boolean | null>(null);
  const [showSettings, setShowSettings] = useState(false);

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

        <button
          className="welcome-advanced"
          onClick={() => setShowSettings(true)}
        >
          <svg viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
          </svg>
          Advanced Settings
        </button>
      </main>
      {showSettings && <AISettings onClose={() => setShowSettings(false)} />}
    </div>
  );
}
