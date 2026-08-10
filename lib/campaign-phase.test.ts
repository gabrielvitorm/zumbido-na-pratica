import { describe, it, expect } from "vitest";
import { getCurrentLote, type LotePhase } from "./campaign-phase";

const lotes: LotePhase[] = [
  {
    id: "lote1",
    label: "Lote 1",
    price: "R$ 3.200",
    installment: "12x de R$ 291",
    startDate: "2026-08-10",
    endDate: "2026-08-14",
    barText: "Lote 1 vale até quinta, 13/08",
    barVariant: "default",
  },
  {
    id: "lote2",
    label: "Lote 2",
    price: "R$ 3.500",
    installment: "12x de R$ 318",
    startDate: "2026-08-14",
    endDate: "2026-08-21",
    barText: "Vagas abertas — R$ 3.500",
    barVariant: "default",
  },
  {
    id: "final",
    label: "Últimas horas",
    price: "R$ 3.500",
    installment: "12x de R$ 318",
    startDate: "2026-08-21",
    endDate: "2026-08-25",
    barText: "Últimas horas de inscrição",
    barVariant: "urgent",
  },
];

describe("getCurrentLote", () => {
  it("returns lote1 when now falls inside its window", () => {
    expect(getCurrentLote(lotes, new Date("2026-08-11T12:00:00Z")).id).toBe("lote1");
  });

  it("returns lote2 when now falls inside its window", () => {
    expect(getCurrentLote(lotes, new Date("2026-08-15T12:00:00Z")).id).toBe("lote2");
  });

  it("returns final when now falls inside the last window", () => {
    expect(getCurrentLote(lotes, new Date("2026-08-22T12:00:00Z")).id).toBe("final");
  });

  it("returns the first lote when now is before all windows", () => {
    expect(getCurrentLote(lotes, new Date("2026-08-01T00:00:00Z")).id).toBe("lote1");
  });

  it("returns the last lote when now is after all windows", () => {
    expect(getCurrentLote(lotes, new Date("2026-09-01T00:00:00Z")).id).toBe("final");
  });

  it("treats the end date as exclusive (boundary belongs to the next lote)", () => {
    expect(getCurrentLote(lotes, new Date("2026-08-14T00:00:00Z")).id).toBe("lote2");
  });

  it("throws if the lotes array is empty", () => {
    expect(() => getCurrentLote([], new Date())).toThrow();
  });
});
