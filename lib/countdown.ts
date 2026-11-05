export interface CountdownParts {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export function getCountdownParts(targetDate: string, now = new Date()): CountdownParts | null {
  const diff = new Date(targetDate).getTime() - now.getTime();
  if (diff <= 0) return null;

  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

export function padCountdown(value: number): string {
  return value.toString().padStart(2, "0");
}
