"use client";

import { ThemeToggle } from "./ThemeToggle";

export function Header() {
  return (
    <header>
      <div className="hdr-title">
        <h1 style={{ fontFamily: "var(--font-syne), 'Syne', sans-serif" }}>
          Workout Routine
        </h1>
      </div>
      <div className="hdr-right">
        <ThemeToggle />
      </div>
    </header>
  );
}
