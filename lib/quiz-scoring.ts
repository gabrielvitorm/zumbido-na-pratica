export type ScoreBand = "ja-tem-base" | "conduta-inconsistente" | "no-improviso";

export function sumScore(points: number[]): number {
  return points.reduce((total, value) => total + value, 0);
}

export function getScoreBand(score: number): ScoreBand {
  if (score <= 4) return "ja-tem-base";
  if (score <= 9) return "conduta-inconsistente";
  return "no-improviso";
}
