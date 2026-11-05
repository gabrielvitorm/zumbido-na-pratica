import { CtaLink } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PriceBlock } from "./price-block";
import type { BlackNovemberOffer } from "@/lib/black-november";

export interface HeroProps {
  headline: string;
  subheadline: string;
  socialProofLine: string;
  ctaLabel: string;
  ctaHref: string;
  loteBadge: string;
  accentClassName?: string;
  ctaTrackParams?: Record<string, unknown>;
  offer?: BlackNovemberOffer;
  microcopy?: string;
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
  offer,
  microcopy,
}: HeroProps) {
  return (
    <section className="bg-navy-dark px-4 py-16 text-white lg:py-20">
      <div className="mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-[1.15fr_0.85fr]">
        <div className="text-center lg:text-left">
        <Badge className="mb-4">{loteBadge}</Badge>
        <h1 className="font-display text-3xl font-semibold leading-tight text-white lg:text-5xl">
          {headline}
        </h1>
        <p className="mt-4 text-lg text-slate-muted">{subheadline}</p>
        {offer ? (
          <div className="mt-7 lg:hidden">
            <PriceBlock offer={offer} ctaHref={ctaHref} ctaLabel={ctaLabel} ctaTrackParams={ctaTrackParams} />
          </div>
        ) : (
          <CtaLink
            href={ctaHref}
            trackAs="InitiateCheckout"
            trackParams={ctaTrackParams}
            className="mt-8 w-full justify-center sm:w-auto"
            accentClassName={accentClassName}
          >
            {ctaLabel}
          </CtaLink>
        )}
        <p className="mt-4 text-sm text-slate-muted">{socialProofLine}</p>
        {microcopy ? <p className="mt-2 text-xs text-slate-muted">{microcopy}</p> : null}
        </div>
        {offer ? (
          <div className="hidden lg:block">
            <PriceBlock offer={offer} ctaHref={ctaHref} ctaLabel={ctaLabel} ctaTrackParams={ctaTrackParams} />
          </div>
        ) : null}
      </div>
    </section>
  );
}
