"use client";

interface ExerciseRowProps {
  name: string;
  detail: string;
  checked: boolean;
  onToggle: () => void;
}

export function ExerciseRow({ name, detail, checked, onToggle }: ExerciseRowProps) {
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
