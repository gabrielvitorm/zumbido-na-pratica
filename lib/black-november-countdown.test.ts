import { describe, expect, it } from "vitest";
import { getCountdownParts } from "./countdown";
import { shouldShowMobileCta } from "./mobile-cta";

describe("Black November countdown", () => {
  it("calculates remaining time using the explicit target instant", () => {
    expect(getCountdownParts("2026-11-30T23:59:59-03:00", new Date("2026-11-30T23:00:00-03:00"))).toEqual({
      days: 0,
      hours: 0,
      minutes: 59,
      seconds: 59,
    });
  });

  it("returns null after the deadline instead of a zeroed active timer", () => {
    expect(getCountdownParts("2026-11-30T23:59:59-03:00", new Date("2026-12-01T00:00:00-03:00"))).toBeNull();
  });
});

describe("mobile CTA visibility", () => {
  it("shows only after leaving the hero and before reaching the offer", () => {
    expect(shouldShowMobileCta(false, false)).toBe(false);
    expect(shouldShowMobileCta(true, false)).toBe(true);
    expect(shouldShowMobileCta(true, true)).toBe(false);
  });
});
