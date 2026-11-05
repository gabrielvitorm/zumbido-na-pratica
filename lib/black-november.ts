export type CampaignState = "active" | "last-day" | "expired";

export interface LiveSession {
  label: string;
  date: string | null;
}

export interface BlackNovemberOffer {
  id: "black-november-2026";
  label: "Black November";
  price: "R$ 1.900,00";
  priceValue: 1900;
  anchorPrice: "R$ 3.000,00";
  anchorPriceValue: 3000;
  savings: "R$ 1.100,00";
  savingsValue: 1100;
  installment: "12x de R$ 196,50";
  checkoutLink: "https://pay.kiwify.com.br/UPbHakl";
  startDate: "2026-11-01T00:00:00-03:00";
  endDate: "2026-11-30T23:59:59-03:00";
  accessMonths: number;
  liveSessions: [LiveSession, LiveSession];
  includesGroup: boolean;
  includesCertificate: boolean;
  includesMentorship: false;
  expiredBehavior: "normal-price";
}

export const blackNovemberOffer: BlackNovemberOffer = {
  id: "black-november-2026",
  label: "Black November",
  price: "R$ 1.900,00",
  priceValue: 1900,
  anchorPrice: "R$ 3.000,00",
  anchorPriceValue: 3000,
  savings: "R$ 1.100,00",
  savingsValue: 1100,
  installment: "12x de R$ 196,50",
  checkoutLink: "https://pay.kiwify.com.br/UPbHakl",
  startDate: "2026-11-01T00:00:00-03:00",
  endDate: "2026-11-30T23:59:59-03:00",
  accessMonths: 12,
  liveSessions: [
    { label: "Live 1", date: null },
    { label: "Live 2", date: null },
  ],
  includesGroup: false,
  includesCertificate: false,
  includesMentorship: false,
  expiredBehavior: "normal-price",
};

function isPlaceholder(value: string): boolean {
  return value.includes("[") || value.includes("]") || value.includes("pendente");
}

export function validateBlackNovemberOffer(offer: BlackNovemberOffer): {
  valid: boolean;
  pendingLiveDates: boolean;
} {
  const pendingLiveDates = offer.liveSessions.some((session) => session.date === null);
  const valid =
    offer.priceValue > 0 &&
    offer.anchorPriceValue > offer.priceValue &&
    offer.savingsValue === offer.anchorPriceValue - offer.priceValue &&
    offer.installment.length > 0 &&
    !isPlaceholder(offer.checkoutLink) &&
    offer.checkoutLink.startsWith("https://") &&
    offer.liveSessions.length === 2;

  return { valid, pendingLiveDates };
}

function fortalezaDate(now: Date): string {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "America/Fortaleza",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(now);
}

export function getBlackNovemberState(now: Date, offer: BlackNovemberOffer): CampaignState {
  const end = new Date(offer.endDate).getTime();
  if (now.getTime() >= end) return "expired";
  if (fortalezaDate(now) === "2026-11-30") return "last-day";
  return "active";
}
