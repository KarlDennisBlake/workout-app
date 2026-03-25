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
}: ExerciseRowProps) {
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
    <div
      className={`ex-row${checked ? " checked" : ""}`}
      onClick={onToggle}
    >
      <div className="ex-cb" />
      <div className="ex-name">{name}</div>
      <div className="ex-detail">{detail}</div>
    </div>
  );
}
