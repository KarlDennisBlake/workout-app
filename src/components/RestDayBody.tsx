interface RestDayBodyProps {
  message: string;
}

export function RestDayBody({ message }: RestDayBodyProps) {
  return <div className="rest-day-body">{message}</div>;
}
