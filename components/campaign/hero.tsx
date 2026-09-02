import { CtaLink } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export interface HeroProps {
  headline: string;
  subheadline: string;
  socialProofLine: string;
  ctaLabel: string;
  ctaHref: string;
  loteBadge: string;
  accentClassName?: string;
  ctaTrackParams?: Record<string, unknown>;
}

export function Hero({
  headline,
  subheadline,
  socialProofLine,
  ctaLabel,
  ctaHref,
  loteBadge,
  accentClassName,
  ctaTrackParams,
}: HeroProps) {
  return (
    <section className="px-4 py-16 lg:py-20">
      <div className="mx-auto max-w-2xl text-center">
        <Badge className="mb-4">{loteBadge}</Badge>
        <h1 className="font-display text-3xl font-semibold leading-tight text-ink lg:text-5xl">
          {headline}
        </h1>
        <p className="mt-4 text-lg text-text-primary/80">{subheadline}</p>
        <CtaLink
          href={ctaHref}
          trackAs="InitiateCheckout"
          trackParams={ctaTrackParams}
          className="mt-8 w-full justify-center sm:w-auto"
          accentClassName={accentClassName}
        >
          {ctaLabel}
        </CtaLink>
        <p className="mt-3 text-sm text-text-secondary">{socialProofLine}</p>
      </div>
    </section>
  );
}
