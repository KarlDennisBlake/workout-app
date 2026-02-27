"use client";

interface DayCardHeaderProps {
  name: string;
  tag: string;
  tagLabel: string;
  isDone: boolean;
  isRestDay: boolean;
  onToggleDone: () => void;
  onHeaderClick?: () => void;
  collapsed?: boolean;
}

export function DayCardHeader({
  name,
  tag,
  tagLabel,
  isDone,
  isRestDay,
  onToggleDone,
  onHeaderClick,
  collapsed,
}: DayCardHeaderProps) {
  return (
    <div
      className="dch"
      onClick={onHeaderClick}
      style={{ cursor: "pointer" }}
    >
      <div className="dch-left">
        <div className="dch-day">
          {name}
          {collapsed && (
            <span className="dch-collapsed-hint"> — tap to expand</span>
          )}
        </div>
        <div className="dch-type">{tagLabel}</div>
      </div>
      <span className={`type-tag tag-${tag}`}>{tagLabel}</span>
      {!isRestDay && (
        <button
          className="done-btn"
          onClick={(e) => {
            e.stopPropagation();
            onToggleDone();
          }}
        >
          {isDone ? "\u2713" : ""}
        </button>
      )}
    </div>
  );
}
