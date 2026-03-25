"use client";

import { useRouter } from "next/navigation";
import { ThemeToggle } from "@/components/ThemeToggle";

export default function Home() {
  const router = useRouter();

  return (
    <div className="welcome-container">
      <header className="welcome-header">
        <div className="hdr-title">
          <h1 style={{ fontFamily: "var(--font-syne), 'Syne', sans-serif" }}>
            Your Workout
          </h1>
          <p>4-Week Training Program</p>
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
          A focused 4-week program with progressive overload.
          Track your sets, reps, and push-up goals day by day.
        </p>

        <button
          className="welcome-cta"
          onClick={() => router.push("/workout")}
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
