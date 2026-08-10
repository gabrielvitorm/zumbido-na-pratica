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
}

export function PriceCard({ loteLabel, price, installment, originalPrice, ctaLabel, ctaHref, noteText }: PriceCardProps) {
  return (
    <Card className="mx-auto max-w-md text-center">
      <p className="text-sm font-medium text-brand-primary">{loteLabel}</p>
      <p className="mt-2">
        {originalPrice ? (
          <span className="mr-2 text-lg text-brand-text/40 line-through">{originalPrice}</span>
        ) : null}
        <span className="text-4xl font-bold text-brand-primary">{price}</span>
      </p>
      <p className="mt-1 text-brand-text/70">{installment}</p>
      <CtaLink href={ctaHref} trackAs="InitiateCheckout" className="mt-6 w-full">
        {ctaLabel}
      </CtaLink>
      <p className="mt-3 text-sm text-brand-text/60">{noteText}</p>
    </Card>
  );
}
