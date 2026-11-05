import { Card } from "@/components/ui/card";
import { CtaLink } from "@/components/ui/button";

export interface PriceCardProps {
  loteLabel: string;
  price: string;
  installment: string;
  originalPrice?: string;
  ctaLabel: string;
  ctaHref: string;
  noteText: string;
  savings?: string;
  accentClassName?: string;
  ctaTrackParams?: Record<string, unknown>;
}

export function PriceCard({
  loteLabel,
  price,
  installment,
  originalPrice,
  ctaLabel,
  ctaHref,
  noteText,
  savings,
  accentClassName,
  ctaTrackParams,
}: PriceCardProps) {
  return (
      <Card elevated className="mx-auto max-w-md border border-gold/40 bg-navy-card text-center text-white shadow-[0_0_32px_rgba(212,175,55,0.12)]">
      <p className="text-sm font-medium text-gold-light">{loteLabel}</p>
      <p className="mt-2">
        {originalPrice ? (
          <span className="mr-2 text-lg text-text-secondary line-through">{originalPrice}</span>
        ) : null}
        <span className="font-display text-4xl font-bold text-gold-light">{price}</span>
      </p>
      <p className="mt-1 text-slate-muted">{installment}</p>
      {savings ? <p className="mt-2 text-sm font-semibold text-gold">Economia de {savings}</p> : null}
      <CtaLink
        href={ctaHref}
        trackAs="InitiateCheckout"
        trackParams={ctaTrackParams}
        className="mt-6 w-full"
        accentClassName={accentClassName}
      >
        {ctaLabel}
      </CtaLink>
      <p className="mt-3 text-sm text-slate-muted">{noteText}</p>
    </Card>
  );
}
