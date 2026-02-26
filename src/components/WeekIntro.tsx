interface WeekIntroProps {
  label: string;
  desc: string;
  pill: string;
}

export function WeekIntro({ label, desc, pill }: WeekIntroProps) {
  return (
    <div className="week-intro">
      <div className="wi-text">
        <h2>{label}</h2>
        <p>{desc}</p>
      </div>
      <span className="wi-pill">{pill}</span>
    </div>
  );
}
