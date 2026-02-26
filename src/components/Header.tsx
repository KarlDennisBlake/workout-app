"use client";

import { ThemeToggle } from "./ThemeToggle";

interface HeaderProps {
  height?: string;
  weight?: string;
  workBlocks?: string;
  bikeSchedule?: string;
}

export function Header({
  height = '5\'6"',
  weight = "140 lb",
  workBlocks = "10–15m",
  bikeSchedule = "10 mi",
}: HeaderProps) {
  return (
    <header>
      <div className="hdr-title">
        <h1 style={{ fontFamily: "var(--font-syne), 'Syne', sans-serif" }}>
          Your Workout
        </h1>
        <p>Tailored · Home Office · Dumbbell + Bodyweight</p>
      </div>
      <div className="hdr-right">
        <div className="hdr-stats">
          <div className="stat">
            <div
              className="stat-val"
              style={{ fontFamily: "var(--font-syne), 'Syne', sans-serif" }}
            >
              {height}
            </div>
            <div className="stat-lbl">Height</div>
          </div>
          <div className="stat">
            <div
              className="stat-val"
              style={{ fontFamily: "var(--font-syne), 'Syne', sans-serif" }}
            >
              {weight}
            </div>
            <div className="stat-lbl">Weight</div>
          </div>
          <div className="stat">
            <div
              className="stat-val"
              style={{ fontFamily: "var(--font-syne), 'Syne', sans-serif" }}
            >
              {workBlocks}
            </div>
            <div className="stat-lbl">Work Blocks</div>
          </div>
          <div className="stat">
            <div
              className="stat-val"
              style={{ fontFamily: "var(--font-syne), 'Syne', sans-serif" }}
            >
              {bikeSchedule}
            </div>
            <div className="stat-lbl">Bike Tue/Thu</div>
          </div>
        </div>
        <ThemeToggle />
      </div>
    </header>
  );
}
