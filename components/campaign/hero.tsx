import { CtaLink } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export interface HeroProps {
  headline: string;
  subheadline: string;
  socialProofLine: string;
  ctaLabel: string;
  ctaHref: string;
  loteBadge: string;
}

export function Hero({ headline, subheadline, socialProofLine, ctaLabel, ctaHref, loteBadge }: HeroProps) {
  return (
    <section className="mx-auto max-w-3xl px-4 py-16 text-center">
      <Badge className="mb-4">{loteBadge}</Badge>
      <h1 className="text-3xl font-bold leading-tight text-brand-primary sm:text-4xl">{headline}</h1>
      <p className="mt-4 text-lg text-brand-text/80">{subheadline}</p>
      <CtaLink href={ctaHref} trackAs="InitiateCheckout" className="mt-8 inline-flex">
        {ctaLabel}
      </CtaLink>
      <p className="mt-3 text-sm text-brand-text/60">{socialProofLine}</p>
    </section>
  );
}
