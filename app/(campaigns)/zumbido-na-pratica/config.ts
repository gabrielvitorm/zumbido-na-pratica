import type { LotePhase } from "@/lib/campaign-phase";
import { blackNovemberOffer } from "@/lib/black-november";

export interface CampaignConfig {
  checkoutLink: string;
  whatsappGroupLink: string;
  quizResultCtaLink: string;
  showShareSection: boolean;
  /** Digits only, no "+" — e.g. "5583996314804". Used to build wa.me links. */
  salesWhatsappNumber: string;
}

export const campaignConfig: CampaignConfig = {
  checkoutLink: process.env.CHECKOUT_LINK || blackNovemberOffer.checkoutLink,
  whatsappGroupLink: process.env.WHATSAPP_GROUP_LINK || "#whatsapp-pendente",
  // Regra de negócio (ver pagina-captacao-quiz.md): antes de 20/08 apontava pro grupo da
  // aula aberta; já passamos de 20/08, então aponta pro checkout.
  quizResultCtaLink: process.env.CHECKOUT_LINK || "#checkout-pendente",
  showShareSection: true,
  salesWhatsappNumber: process.env.SALES_WHATSAPP_NUMBER || "",
};

export const lotes: LotePhase[] = [
  {
    id: blackNovemberOffer.id,
    label: blackNovemberOffer.label,
    price: blackNovemberOffer.price,
    priceValue: blackNovemberOffer.priceValue,
    installment: blackNovemberOffer.installment,
    startDate: blackNovemberOffer.startDate,
    endDate: blackNovemberOffer.endDate,
    barText: "BLACK NOVEMBER — Zumbido na Prática por R$ 1.900,00 · só até 30/11",
    barVariant: "urgent",
  },
];
