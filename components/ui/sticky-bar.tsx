import { CountdownTimer } from "./countdown-timer";

export interface StickyBarProps {
  text: string;
  variant: "default" | "urgent";
  countdownTarget?: string;
}

export function StickyBar({ text, variant, countdownTarget }: StickyBarProps) {
  const backgroundClass = variant === "urgent" ? "bg-brand-alert" : "bg-brand-primary";

  return (
    <div className={`sticky top-0 z-50 w-full ${backgroundClass} px-4 py-2 text-center text-sm font-medium text-white`}>
      <span>{text}</span>
      {countdownTarget ? (
        <span className="ml-3 font-mono">
          <CountdownTimer targetDate={countdownTarget} />
        </span>
      ) : null}
    </div>
  );
}
