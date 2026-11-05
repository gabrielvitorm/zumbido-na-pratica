import { CtaLink } from "@/components/ui/button";
import type { BlackNovemberOffer } from "@/lib/black-november";
import { getBlackNovemberPriceSummary } from "@/lib/black-november-presentation";

export interface PriceBlockProps {
  offer: BlackNovemberOffer;
  ctaHref: string;
  ctaLabel: string;
  ctaTrackParams?: Record<string, unknown>;
  compact?: boolean;
}

export function PriceBlock({ offer, ctaHref, ctaLabel, ctaTrackParams, compact = false }: PriceBlockProps) {
  const summary = getBlackNovemberPriceSummary(offer);
  return (
    <div className={`rounded-2xl border border-gold/40 bg-navy-card p-6 text-center text-white shadow-[0_0_32px_rgba(212,175,55,0.12)] ${compact ? "p-4" : ""}`}>
      <p className="text-xs font-bold uppercase tracking-[0.18em] text-gold-light">Black November</p>
      <p className="mt-4 text-sm text-slate-muted">
        De <span className="line-through">{summary.anchorPrice}</span> por
      </p>
      <p className="mt-1 font-display text-4xl font-bold text-gold-light sm:text-5xl">{summary.price}</p>
      <p className="mt-2 text-base text-slate-muted">ou {summary.installment}</p>
      <p className="mt-2 text-sm font-semibold text-gold">Economia de {summary.savings} · só até 30/11</p>
      <CtaLink
        href={ctaHref}
        trackAs="InitiateCheckout"
        trackParams={ctaTrackParams}
        className="mt-5 min-h-11 w-full"
        accentClassName="bg-gold-light text-navy hover:bg-gold"
      >
        {ctaLabel}
      </CtaLink>
    </div>
  );
}
