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
  accentClassName?: string;
}

export function PriceCard({
  loteLabel,
  price,
  installment,
  originalPrice,
  ctaLabel,
  ctaHref,
  noteText,
  accentClassName,
}: PriceCardProps) {
  return (
    <Card elevated className="mx-auto max-w-md text-center">
      <p className="text-sm font-medium text-ink">{loteLabel}</p>
      <p className="mt-2">
        {originalPrice ? (
          <span className="mr-2 text-lg text-text-secondary line-through">{originalPrice}</span>
        ) : null}
        <span className="font-display text-4xl font-bold text-ink">{price}</span>
      </p>
      <p className="mt-1 text-text-secondary">{installment}</p>
      <CtaLink
        href={ctaHref}
        trackAs="InitiateCheckout"
        className="mt-6 w-full"
        accentClassName={accentClassName}
      >
        {ctaLabel}
      </CtaLink>
      <p className="mt-3 text-sm text-text-secondary">{noteText}</p>
    </Card>
  );
}
