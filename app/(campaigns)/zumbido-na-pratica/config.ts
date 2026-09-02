import type { LotePhase } from "@/lib/campaign-phase";

export interface CampaignConfig {
  checkoutLink: string;
  whatsappGroupLink: string;
  quizResultCtaLink: string;
  showShareSection: boolean;
  /** Digits only, no "+" — e.g. "5583996314804". Used to build wa.me links. */
  salesWhatsappNumber: string;
}

export const campaignConfig: CampaignConfig = {
  checkoutLink: process.env.CHECKOUT_LINK || "#checkout-pendente",
  whatsappGroupLink: process.env.WHATSAPP_GROUP_LINK || "#whatsapp-pendente",
  // Regra de negócio (ver pagina-captacao-quiz.md): antes de 20/08 apontava pro grupo da
  // aula aberta; já passamos de 20/08, então aponta pro checkout.
  quizResultCtaLink: process.env.CHECKOUT_LINK || "#checkout-pendente",
  showShareSection: true,
  salesWhatsappNumber: process.env.SALES_WHATSAPP_NUMBER || "",
};

// Turma 4 — valor único, sem lotes. Inscrições até 06/09/2026 23:59 (turma já começa
// 05/09, então o prazo cai no meio do primeiro fim de semana de aula — urgência real).
export const lotes: LotePhase[] = [
  {
    id: "turma4",
    label: "Turma 4",
    price: "R$ 2.470",
    priceValue: 2470,
    installment: "12x de R$ 255,46",
    startDate: "2026-08-01T00:00:00-03:00",
    endDate: "2026-09-06T23:59:59-03:00",
    barText: "Últimos dias — Turma 4 R$ 2.470 (12x de R$ 255,46) — inscrições até 06/09",
    barVariant: "urgent",
  },
];
