const currencyFormatter = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
});

export function formatPrice(value: number): string {
  return currencyFormatter.format(value);
}

export interface WhatsappCartItem {
  title: string;
  price: number;
  checkoutLink: string;
}

export function buildWhatsappCartLink(phoneNumber: string, items: WhatsappCartItem[]): string {
  const total = items.reduce((sum, item) => sum + item.price, 0);
  const lines = items.map((item) => `- ${item.title} — ${formatPrice(item.price)} — ${item.checkoutLink}`);
  const message = ["Olá! Quero comprar:", ...lines, `Total: ${formatPrice(total)}`].join("\n");
  return `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
}

export function resolveCartCta(
  items: WhatsappCartItem[],
  salesWhatsappNumber: string
): { href: string; opensWhatsapp: boolean } | null {
  if (items.length === 0) return null;
  if (items.length === 1) {
    return { href: items[0].checkoutLink, opensWhatsapp: false };
  }
  return {
    href: buildWhatsappCartLink(salesWhatsappNumber, items),
    opensWhatsapp: true,
  };
}
