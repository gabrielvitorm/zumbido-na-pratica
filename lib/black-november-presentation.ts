import type { BlackNovemberOffer, LiveSession } from "./black-november";

export interface PriceSummary {
  anchorPrice: string;
  price: string;
  installment: string;
  savings: string;
}

export function getBlackNovemberPriceSummary(offer: BlackNovemberOffer): PriceSummary {
  return {
    anchorPrice: offer.anchorPrice,
    price: offer.price,
    installment: offer.installment,
    savings: offer.savings,
  };
}

export function getLiveSessionLabel(session: LiveSession): string {
  return session.date ?? "Data a definir";
}
