"use client";

import { useState, useRef, useEffect } from "react";

interface ExerciseRowProps {
  name: string;
  detail: string;
  checked: boolean;
  onToggle: () => void;
  isEditing?: boolean;
  onRemove?: () => void;
  onUpdateDetail?: (value: string) => void;
  onUpdateName?: (value: string) => void;
  toggleSet: (setIdx: number, totalSets: number) => void;
  getSetStates: (totalSets: number) => boolean[];
}

// Parse "4×25" or "3x12" → { count: 4, label: "25" }. Returns null for non-set details.
function parseSetDetail(detail: string): { count: number; label: string } | null {
  const match = detail.trim().match(/^(\d+)[×x](.+)$/);
  if (!match) return null;
  const count = parseInt(match[1], 10);
  if (count < 2 || count > 20) return null;
  return { count, label: match[2].trim() };
}

function InlineInput({
  value,
  onCommit,
  className,
}: {
  value: string;
  onCommit: (value: string) => void;
  className?: string;
}) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(value);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setDraft(value);
  }, [value]);

  useEffect(() => {
    if (editing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [editing]);

  const commit = () => {
    setEditing(false);
    if (draft !== value) {
      onCommit(draft);
    }
  };

  if (!editing) {
    return (
      <span
        className={`${className || ""} editable-field`}
        onClick={(e) => {
          e.stopPropagation();
          setEditing(true);
        }}
      >
        {value}
      </span>
    );
  }

  return (
    <input
      ref={inputRef}
      className={`inline-input ${className || ""}`}
      value={draft}
      onChange={(e) => setDraft(e.target.value)}
      onBlur={commit}
      onKeyDown={(e) => {
        if (e.key === "Enter") commit();
        if (e.key === "Escape") {
          setDraft(value);
          setEditing(false);
        }
      }}
      onClick={(e) => e.stopPropagation()}
    />
  );
}

export function ExerciseRow({
  name,
  detail,
  checked,
  onToggle,
  isEditing,
  onRemove,
  onUpdateDetail,
  onUpdateName,
  toggleSet,
  getSetStates,
}: ExerciseRowProps) {
  const parsed = parseSetDetail(detail);
  const setStates = parsed ? getSetStates(parsed.count) : [];

  if (isEditing) {
    return (
      <div className="ex-row editing-row">
        <button
          className="remove-ex-btn"
          onClick={(e) => {
            e.stopPropagation();
            onRemove?.();
          }}
          title="Remove exercise"
        >
          ×
        </button>
        <InlineInput
          value={name}
          onCommit={(v) => onUpdateName?.(v)}
          className="ex-name"
        />
        <InlineInput
          value={detail}
          onCommit={(v) => onUpdateDetail?.(v)}
          className="ex-detail"
        />
      </div>
    );
  }

  return (
    <div className={`ex-row-wrap${checked ? " checked" : ""}`}>
      <div className="ex-row" onClick={onToggle}>
        <div className="ex-cb" />
        <div className="ex-name">{name}</div>
        {!parsed && <div className="ex-detail">{detail}</div>}
      </div>
      {parsed && (
        <div className="set-bubbles">
          {Array.from({ length: parsed.count }, (_, i) => (
            <button
              key={i}
              className={`set-bubble${setStates[i] ? " done" : ""}`}
              onClick={(e) => {
                e.stopPropagation();
                toggleSet(i, parsed.count);
              }}
            >
              {parsed.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
