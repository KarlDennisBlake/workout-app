interface ProgressBarProps {
  completed: number;
  total: number;
}

export function ProgressBar({ completed, total }: ProgressBarProps) {
  const pct = total ? Math.round((completed / total) * 100) : 0;

  return (
    <div className="prog-bar-wrap">
      <span className="prog-label">Week Progress</span>
      <div className="prog-track">
        <div className="prog-fill" style={{ width: `${pct}%` }} />
      </div>
      <span
        className="prog-pct"
        style={{ fontFamily: "var(--font-syne), 'Syne', sans-serif" }}
      >
        {pct}%
      </span>
    </div>
  );
}
