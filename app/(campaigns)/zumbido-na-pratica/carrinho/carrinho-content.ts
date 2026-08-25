export interface CartItem {
  id: string;
  title: string;
  price: number;
  checkoutLink: string;
}

export const cartContent = {
  headline: "Monte seu combo de módulos",
  subheadline:
    "Escolha os módulos que fazem sentido pra sua prática. Selecione, confira o total e envie pra gente pelo WhatsApp que a gente fecha com você.",
  ctaLabel: "Enviar seleção pelo WhatsApp",
  emptyStateText: "Selecione pelo menos um módulo pra continuar.",
};

export const cartItems: CartItem[] = [
  {
    id: "modulo-empreendedor-trafego",
    title: "Módulo empreendedor + tráfego",
    price: 550,
    checkoutLink: "https://pay.kiwify.com.br/1vqYrr6",
  },
  {
    id: "avaliacao",
    title: "Avaliação",
    price: 550,
    checkoutLink: "https://pay.kiwify.com.br/T52JZCU",
  },
  {
    id: "laserterapia-laserpuntura",
    title: "Laserterapia + Laserpuntura",
    price: 550,
    checkoutLink: "https://pay.kiwify.com.br/g7EProC",
  },
  {
    id: "neuromodulacao-tdcs",
    title: "Neuromodulação TDCS",
    price: 550,
    checkoutLink: "https://pay.kiwify.com.br/K2jvugS",
  },
  {
    id: "neuromodulacao-vagal",
    title: "Neuromodulação vagal",
    price: 550,
    checkoutLink: "https://pay.kiwify.com.br/jmjIlPp",
  },
  {
    id: "neuromodulacao-trigeminal",
    title: "Neuromodulação trigeminal",
    price: 550,
    checkoutLink: "https://pay.kiwify.com.br/yCDVgDn",
  },
  {
    id: "terapia-motricidade",
    title: "Terapia de motricidade",
    price: 550,
    checkoutLink: "https://pay.kiwify.com.br/LBofi6j",
  },
  {
    id: "terapia-processamento-cognitivo",
    title: "Terapia de processamento cognitivo para zumbido",
    price: 550,
    checkoutLink: "https://pay.kiwify.com.br/XAfM97M",
  },
  {
    id: "mindfulness-como-eu-faco",
    title: "Mindfulness para zumbido. Como eu faço.",
    price: 550,
    checkoutLink: "https://pay.kiwify.com.br/JAzKyKo",
  },
  {
    id: "aconselhamento-como-eu-faco",
    title: "Aconselhamento: como eu faço.",
    price: 550,
    checkoutLink: "https://pay.kiwify.com.br/Sun9CF8",
  },
  {
    id: "mindfulness",
    title: "Mindfulness",
    price: 790,
    checkoutLink: "https://pay.kiwify.com.br/jqFkpYE",
  },
  {
    id: "supervisao",
    title: "Supervisão (SuperZumbido) — 5 reuniões mensais",
    price: 790,
    checkoutLink: "#checkout-pendente-supervisao",
  },
];
