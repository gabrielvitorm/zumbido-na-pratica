"use client";

import { useEffect, useState } from "react";

export interface CountdownTimerProps {
  targetDate: string;
}

function getRemaining(targetDate: string): { days: number; hours: number; minutes: number; seconds: number } | null {
  const diff = new Date(targetDate).getTime() - Date.now();
  if (diff <= 0) return null;

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  return { days, hours, minutes, seconds };
}

function pad(value: number): string {
  return value.toString().padStart(2, "0");
}

export function CountdownTimer({ targetDate }: CountdownTimerProps) {
  const [mounted, setMounted] = useState(false);
  const [remaining, setRemaining] = useState(() => getRemaining(targetDate));

  useEffect(() => {
    setMounted(true);
    const interval = setInterval(() => setRemaining(getRemaining(targetDate)), 1000);
    return () => clearInterval(interval);
  }, [targetDate]);

  if (!mounted) {
    return <span className="tabular-nums">--:--:--:--</span>;
  }

  if (!remaining) {
    return <span className="tabular-nums">00:00:00:00</span>;
  }

  return (
    <span className="tabular-nums">
      {pad(remaining.days)}:{pad(remaining.hours)}:{pad(remaining.minutes)}:{pad(remaining.seconds)}
    </span>
  );
}
