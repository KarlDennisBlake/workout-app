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
  isEditing?: boolean;
  onSaveEdit?: () => void;
  onCancelEdit?: () => void;
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
  isEditing,
  onSaveEdit,
  onCancelEdit,
}: DayCardHeaderProps) {
  return (
    <div
      className="dch"
      onClick={isEditing ? undefined : onHeaderClick}
      style={{ cursor: isEditing ? "default" : "pointer" }}
    >
      <div className="dch-left">
        <div className="dch-day">
          {name}
          {!isEditing && collapsed && (
            <span className="dch-collapsed-hint"> — tap to expand</span>
          )}
          {isEditing && (
            <span className="dch-editing-hint"> — editing</span>
          )}
        </div>
        <div className="dch-type">{tagLabel}</div>
      </div>
      <span className={`type-tag tag-${tag}`}>{tagLabel}</span>
      {isEditing ? (
        <div className="edit-actions">
          <button
            className="edit-save-btn"
            onClick={(e) => {
              e.stopPropagation();
              onSaveEdit?.();
            }}
          >
            Save
          </button>
          <button
            className="edit-cancel-btn"
            onClick={(e) => {
              e.stopPropagation();
              onCancelEdit?.();
            }}
          >
            Cancel
          </button>
        </div>
      ) : (
        !isRestDay && (
          <button
            className="done-btn"
            onClick={(e) => {
              e.stopPropagation();
              onToggleDone();
            }}
          >
            {isDone ? "\u2713" : ""}
          </button>
        )
      )}
    </div>
  );
}
