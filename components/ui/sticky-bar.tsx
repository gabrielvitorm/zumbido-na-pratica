import { CountdownTimer } from "./countdown-timer";

export interface StickyBarProps {
  text: string;
  variant: "default" | "urgent";
  countdownTarget?: string;
  backgroundClassName?: string;
  countdownClassName?: string;
}

export function StickyBar({
  text,
  variant,
  countdownTarget,
  backgroundClassName,
  countdownClassName = "font-mono",
}: StickyBarProps) {
  const defaultBackgroundClass = variant === "urgent" ? "bg-brand-alert" : "bg-brand-primary";

  return (
    <div
      className={`sticky top-0 z-50 flex min-h-9 w-full items-center justify-center ${backgroundClassName ?? defaultBackgroundClass} px-4 text-center text-xs font-medium text-white`}
    >
      <span>{text}</span>
      {countdownTarget ? (
        <span className={`ml-3 ${countdownClassName}`}>
          <CountdownTimer targetDate={countdownTarget} />
        </span>
      ) : null}
    </div>
  );
}
