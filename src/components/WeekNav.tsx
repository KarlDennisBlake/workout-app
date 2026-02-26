"use client";

interface WeekNavProps {
  weekNumbers: number[];
  activeWeek: number;
  onSelectWeek: (week: number) => void;
}

export function WeekNav({ weekNumbers, activeWeek, onSelectWeek }: WeekNavProps) {
  return (
    <div className="week-nav">
      {weekNumbers.map((w) => (
        <button
          key={w}
          className={`wbtn${w === activeWeek ? " active" : ""}`}
          onClick={() => onSelectWeek(w)}
        >
          Week {w}
        </button>
      ))}
    </div>
  );
}
