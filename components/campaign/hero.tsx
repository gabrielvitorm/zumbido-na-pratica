import { CtaLink } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { VideoEmbed } from "@/components/ui/video-embed";

export interface HeroProps {
  headline: string;
  subheadline: string;
  socialProofLine: string;
  ctaLabel: string;
  ctaHref: string;
  loteBadge: string;
  imageSrc?: string;
  accentClassName?: string;
}

export function Hero({
  headline,
  subheadline,
  socialProofLine,
  ctaLabel,
  ctaHref,
  loteBadge,
  imageSrc,
  accentClassName,
}: HeroProps) {
  return (
    <section className="px-4 py-16 lg:py-20">
      <div className="mx-auto flex max-w-5xl flex-col gap-8 lg:grid lg:grid-cols-2 lg:items-center lg:gap-12">
        <div className="text-center lg:text-left">
          <Badge className="mb-4">{loteBadge}</Badge>
          <h1 className="font-display text-3xl font-semibold leading-tight text-ink lg:text-5xl">
            {headline}
          </h1>
          <p className="mt-4 text-lg text-text-primary/80">{subheadline}</p>
          <CtaLink
            href={ctaHref}
            trackAs="InitiateCheckout"
            className="mt-8 w-full justify-center lg:w-auto"
            accentClassName={accentClassName}
          >
            {ctaLabel}
          </CtaLink>
          <p className="mt-3 text-sm text-text-secondary">{socialProofLine}</p>
        </div>
        <div className="mx-auto aspect-4/5 w-full max-w-sm overflow-hidden rounded-card lg:aspect-3/4 lg:max-w-none">
          <VideoEmbed src={imageSrc} thumbnailAlt="Foto ou vídeo da Expert" label="Vídeo em breve" />
        </div>
      </div>
    </section>
  );
}
