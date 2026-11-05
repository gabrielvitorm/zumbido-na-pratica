import { describe, expect, it } from "vitest";
import {
  ctaFinalContent,
  faqContent,
  garantiaContent,
  heroContent,
  modulosContent,
  ofertaContent,
  paraQuemContent,
  transformacaoContent,
  viradaContent,
} from "../app/(campaigns)/zumbido-na-pratica/content";

const officialModuleTitles = [
  "Avaliação",
  "Fotobiomodulação",
  "Neuromodulação",
  "Neuromodulação Trigeminal",
  "Treinamento Auditivo e Zumbido",
  "Estimulação Vagal",
  "Motricidade Orofacial e Zumbido",
  "Aconselhamento",
];

const salesCopy = JSON.stringify({
  heroContent,
  viradaContent,
  paraQuemContent,
  transformacaoContent,
  modulosContent,
  ofertaContent,
  garantiaContent,
  faqContent,
  ctaFinalContent,
});

describe("Black November sales content", () => {
  it("removes stale Turma 4 copy and the old live-course claims", () => {
    for (const staleTerm of [
      "Turma 4",
      "05/09",
      "06/09",
      "10 módulos",
      "mindfulness",
      "Laserterapia",
      "Laserpuntura",
      "Mentoria de Primeiros Pacientes",
      "100% ao vivo",
    ]) {
      expect(salesCopy.toLowerCase()).not.toContain(staleTerm.toLowerCase());
    }
  });

  it("publishes the official eight modules in order", () => {
    expect(modulosContent).toHaveLength(8);
    expect(modulosContent.map((module) => module.title)).toEqual(officialModuleTitles);
  });
});
