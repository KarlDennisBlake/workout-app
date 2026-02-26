"use client";

interface DayCardHeaderProps {
  name: string;
  tag: string;
  tagLabel: string;
  isDone: boolean;
  isRestDay: boolean;
  onToggleDone: () => void;
}

export function DayCardHeader({
  name,
  tag,
  tagLabel,
  isDone,
  isRestDay,
  onToggleDone,
}: DayCardHeaderProps) {
  return (
    <div className="dch">
      <div className="dch-left">
        <div className="dch-day">{name}</div>
        <div className="dch-type">{tagLabel}</div>
      </div>
      <span className={`type-tag tag-${tag}`}>{tagLabel}</span>
      {!isRestDay && (
        <button className="done-btn" onClick={onToggleDone}>
          {isDone ? "\u2713" : ""}
        </button>
      )}
    </div>
  );
}
