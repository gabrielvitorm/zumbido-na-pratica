import { describe, it, expect } from "vitest";
import { sumScore, getScoreBand } from "./quiz-scoring";

describe("sumScore", () => {
  it("returns 0 for an empty array", () => {
    expect(sumScore([])).toBe(0);
  });

  it("sums all point values", () => {
    expect(sumScore([0, 2, 3, 1, 3])).toBe(9);
  });
});

describe("getScoreBand", () => {
  it("classifies 0 as ja-tem-base", () => {
    expect(getScoreBand(0)).toBe("ja-tem-base");
  });

  it("classifies 4 as ja-tem-base (upper boundary)", () => {
    expect(getScoreBand(4)).toBe("ja-tem-base");
  });

  it("classifies 5 as conduta-inconsistente (lower boundary)", () => {
    expect(getScoreBand(5)).toBe("conduta-inconsistente");
  });

  it("classifies 9 as conduta-inconsistente (upper boundary)", () => {
    expect(getScoreBand(9)).toBe("conduta-inconsistente");
  });

  it("classifies 10 as no-improviso (lower boundary)", () => {
    expect(getScoreBand(10)).toBe("no-improviso");
  });

  it("classifies scores above 14 as no-improviso", () => {
    expect(getScoreBand(20)).toBe("no-improviso");
  });
});
