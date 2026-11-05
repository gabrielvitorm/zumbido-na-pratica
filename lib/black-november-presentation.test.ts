import { describe, expect, it } from "vitest";
import { blackNovemberOffer } from "./black-november";
import { getBlackNovemberPriceSummary, getLiveSessionLabel } from "./black-november-presentation";
import { modulosContent } from "../app/(campaigns)/zumbido-na-pratica/content";

describe("Black November presentation data", () => {
  it("keeps all price values together for every price component", () => {
    expect(getBlackNovemberPriceSummary(blackNovemberOffer)).toEqual({
      anchorPrice: "R$ 3.000,00",
      price: "R$ 1.900,00",
      installment: "12x de R$ 196,50",
      savings: "R$ 1.100,00",
    });
  });

  it("does not expose null live dates as UI text", () => {
    expect(getLiveSessionLabel(blackNovemberOffer.liveSessions[0])).toBe("Data a definir");
  });

  it("provides eight module cards for the visual component", () => {
    expect(modulosContent).toHaveLength(8);
  });
});
