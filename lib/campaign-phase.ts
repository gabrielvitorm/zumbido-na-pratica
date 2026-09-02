export interface LotePhase {
  id: string;
  label: string;
  price: string;
  /** Numeric BRL value of `price`, for tracking events (Meta Pixel / GA4 `value` param). */
  priceValue: number;
  installment: string;
  /** ISO date string, inclusive */
  startDate: string;
  /** ISO date string, exclusive */
  endDate: string;
  barText: string;
  barVariant: "default" | "urgent";
}

export function getCurrentLote(lotes: LotePhase[], now: Date): LotePhase {
  if (lotes.length === 0) {
    throw new Error("getCurrentLote requires at least one lote");
  }

  const nowTime = now.getTime();

  for (const lote of lotes) {
    const start = new Date(lote.startDate).getTime();
    const end = new Date(lote.endDate).getTime();
    if (nowTime >= start && nowTime < end) {
      return lote;
    }
  }

  const firstStart = new Date(lotes[0].startDate).getTime();
  if (nowTime < firstStart) {
    return lotes[0];
  }

  return lotes[lotes.length - 1];
}
