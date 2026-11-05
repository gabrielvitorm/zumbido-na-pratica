import { describe, expect, it } from "vitest";
import { obrigadoContent } from "../app/(campaigns)/zumbido-na-pratica/content";

describe("Black November thank-you page content", () => {
  it("does not expose legacy campaign copy or pending purchase links", () => {
    const content = JSON.stringify(obrigadoContent);

    expect(content).toContain("Black November");
    expect(content).toContain("8 módulos");
    expect(content).toContain("Duas lives");
    expect(content).not.toContain("Turma - Black November");
    expect(content).not.toContain("#checkout-pendente");
  });
});
