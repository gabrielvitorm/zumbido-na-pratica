import { describe, it, expect } from "vitest";
import { buildWhatsappCartLink, resolveCartCta } from "./whatsapp";

const itemA = {
  title: "Avaliação",
  price: 550,
  checkoutLink: "https://pay.kiwify.com.br/T52JZCU",
};

const itemB = {
  title: "Mindfulness",
  price: 790,
  checkoutLink: "https://pay.kiwify.com.br/jqFkpYE",
};

describe("resolveCartCta", () => {
  it("returns null when nothing is selected", () => {
    expect(resolveCartCta([], "5583996314804")).toBeNull();
  });

  it("sends a single selected module to its checkout link", () => {
    expect(resolveCartCta([itemA], "5583996314804")).toEqual({
      href: itemA.checkoutLink,
      opensWhatsapp: false,
    });
  });

  it("sends two or more modules to WhatsApp", () => {
    const phone = "5583996314804";
    expect(resolveCartCta([itemA, itemB], phone)).toEqual({
      href: buildWhatsappCartLink(phone, [itemA, itemB]),
      opensWhatsapp: true,
    });
  });
});
