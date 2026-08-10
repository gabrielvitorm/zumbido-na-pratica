import type { LotePhase } from "@/lib/campaign-phase";

export interface CampaignConfig {
  checkoutLink: string;
  whatsappGroupLink: string;
  quizResultCtaLink: string;
  showShareSection: boolean;
}

export const campaignConfig: CampaignConfig = {
  checkoutLink: process.env.CHECKOUT_LINK || "#checkout-pendente",
  whatsappGroupLink: process.env.WHATSAPP_GROUP_LINK || "#whatsapp-pendente",
  // Regra de negócio (ver pagina-captacao-quiz.md): antes de 20/08 aponta pro grupo da
  // aula aberta; a partir de 20/08 troque manualmente para campaignConfig.checkoutLink
  // ou para a URL da página de vendas publicada.
  quizResultCtaLink: process.env.WHATSAPP_GROUP_LINK || "#whatsapp-pendente",
  showShareSection: true,
};

// Datas de exemplo herdadas de pagina-vendas.md — confirmar o ano real dos lotes
// antes de publicar (mantidas aqui como o único lugar que precisa mudar por turma).
export const lotes: LotePhase[] = [
  {
    id: "lote1",
    label: "Lote 1",
    price: "R$ 3.200",
    installment: "12x de R$ 291",
    startDate: "2026-08-10",
    endDate: "2026-08-14",
    barText: "🟡 Lote de abertura: R$ 3.200 (12x de R$ 291) — vale até quinta, 13/08",
    barVariant: "default",
  },
  {
    id: "lote2",
    label: "Lote 2",
    price: "R$ 3.500",
    installment: "12x de R$ 318",
    startDate: "2026-08-14",
    endDate: "2026-08-21",
    barText: "Vagas abertas — R$ 3.500 (12x de R$ 318)",
    barVariant: "default",
  },
  {
    id: "final",
    label: "Últimas 96h",
    price: "R$ 3.500",
    installment: "12x de R$ 318",
    startDate: "2026-08-21",
    endDate: "2026-08-25",
    barText: "🔴 Últimas horas de inscrição — fecha 24/08 às 23h59",
    barVariant: "urgent",
  },
];
