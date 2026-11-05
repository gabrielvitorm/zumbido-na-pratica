"use client";

import { useEffect, useState } from "react";
import type { CampaignState } from "@/lib/black-november";
import { getCountdownParts, padCountdown } from "@/lib/countdown";

export interface CountdownTimerProps {
  targetDate: string;
  state?: CampaignState;
  validityText?: string;
}

export function CountdownTimer({ targetDate, state, validityText = "Oferta válida até 30/11 às 23:59" }: CountdownTimerProps) {
  const [mounted, setMounted] = useState(false);
  const [remaining, setRemaining] = useState(() => getCountdownParts(targetDate));

  useEffect(() => {
    setMounted(true);
    const interval = setInterval(() => setRemaining(getCountdownParts(targetDate)), 1000);
    return () => clearInterval(interval);
  }, [targetDate]);

  if (state === "expired" || (!remaining && mounted)) {
    return <span>{"Oferta encerrada"}</span>;
  }

  if (!mounted || !remaining) return <span className="tabular-nums">--:--:--:--</span>;

  return (
    <span aria-live="off" className="tabular-nums">
      {padCountdown(remaining.days)}:{padCountdown(remaining.hours)}:{padCountdown(remaining.minutes)}:{padCountdown(remaining.seconds)}
      <span className="sr-only">{validityText}</span>
    </span>
  );
}
