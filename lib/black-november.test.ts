import { describe, expect, it } from "vitest";
import {
  blackNovemberOffer,
  getBlackNovemberState,
  validateBlackNovemberOffer,
} from "./black-november";

describe("Black November offer", () => {
  it("contains the confirmed commercial values", () => {
    expect(blackNovemberOffer).toMatchObject({
      id: "black-november-2026",
      priceValue: 1900,
      anchorPriceValue: 3000,
      savingsValue: 1100,
      installment: "12x de R$ 196,50",
      checkoutLink: "https://pay.kiwify.com.br/UPbHakl",
      expiredBehavior: "normal-price",
    });
  });

  it("accepts the offer while the two live dates are pending", () => {
    expect(validateBlackNovemberOffer(blackNovemberOffer)).toEqual({
      valid: true,
      pendingLiveDates: true,
    });
  });
});

describe("getBlackNovemberState", () => {
  it("returns active before the last day", () => {
    const now = new Date("2026-11-29T23:59:58-03:00");
    expect(getBlackNovemberState(now, blackNovemberOffer)).toBe("active");
  });

  it("returns last-day during November 30", () => {
    const now = new Date("2026-11-30T12:00:00-03:00");
    expect(getBlackNovemberState(now, blackNovemberOffer)).toBe("last-day");
  });

  it("returns expired immediately after the deadline", () => {
    const now = new Date("2026-12-01T00:00:00-03:00");
    expect(getBlackNovemberState(now, blackNovemberOffer)).toBe("expired");
  });
});
