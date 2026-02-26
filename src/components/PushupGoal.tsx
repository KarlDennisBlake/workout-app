interface PushupGoalProps {
  note: string;
}

export function PushupGoal({ note }: PushupGoalProps) {
  return <div className="pushup-goal">{note}</div>;
}
