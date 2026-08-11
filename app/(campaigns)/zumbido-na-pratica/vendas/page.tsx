import { Fraunces } from "next/font/google";
import { Check, X } from "lucide-react";
import { getCurrentLote } from "@/lib/campaign-phase";
import { StickyBar } from "@/components/ui/sticky-bar";
import { CtaLink } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { VideoEmbed } from "@/components/ui/video-embed";
import { StickyMobileCta } from "@/components/ui/sticky-mobile-cta";
import { Hero } from "@/components/campaign/hero";
import { PriceCard } from "@/components/campaign/price-card";
import { GuaranteeBlock } from "@/components/campaign/guarantee-block";
import { FaqSection } from "@/components/campaign/faq-section";
import { ModuleCards } from "@/components/campaign/module-cards";
import { AuditoryPathway } from "@/components/campaign/auditory-pathway";
import { campaignConfig, lotes } from "../config";
import {
  heroContent,
  dorContent,
  viradaContent,
  paraQuemContent,
  transformacaoContent,
  modulosContent,
  quemEnsinaContent,
  provaSocialContent,
  ofertaContent,
  garantiaContent,
  faqContent,
  ctaFinalContent,
} from "../content";

export const dynamic = "force-dynamic";

const fraunces = Fraunces({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-fraunces",
});

export default function VendasPage() {
  const currentLote = getCurrentLote(lotes, new Date());

  return (
    <div className={`${fraunces.variable} [--font-display:var(--font-fraunces),Georgia,serif]`}>
      <StickyBar
        text={currentLote.barText}
        variant={currentLote.barVariant}
        countdownTarget={currentLote.endDate}
        backgroundClassName="bg-ink"
        countdownClassName="font-mono text-coral"
      />

      {/* Reading block: Hero → Dor → Virada → Para quem → Transformação, one shared
          cream background with the signature line running behind all of it. */}
      <div className="relative bg-cream">
        <AuditoryPathway />
        <div className="relative z-10">
          <div id="hero-end-sentinel">
            <Hero
              headline={heroContent.headline}
              subheadline={heroContent.subheadline}
              socialProofLine={heroContent.socialProofLine}
              ctaLabel={heroContent.ctaLabel}
              ctaHref={campaignConfig.checkoutLink}
              loteBadge={heroContent.loteBadge}
              imageSrc={heroContent.videoSrc}
            />
          </div>

          {/* Dor — 3-block structure: isolated opening, left-aligned body, isolated closing */}
          <section className="px-4 py-12">
            <div className="mx-auto flex max-w-xl flex-col gap-8">
              <p className="mx-auto max-w-[20ch] text-center font-display text-xl text-text-primary">
                {dorContent.paragraphs[0]}
              </p>
              <div className="space-y-4 text-text-primary/80">
                {dorContent.paragraphs.slice(1, 4).map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
              <p className="mx-auto max-w-[20ch] text-center font-display text-xl text-text-primary">
                {dorContent.paragraphs[4]}
              </p>
            </div>
          </section>

          {/* Virada — high-contrast white card on the cream background */}
          <section className="px-4 py-12">
            <div className="mx-auto max-w-2xl rounded-card border border-border bg-white p-6">
              <h2 className="mb-4 text-center font-display text-2xl font-semibold text-ink">
                {viradaContent.title}
              </h2>
              <VideoEmbed src={viradaContent.videoSrc} thumbnailAlt="Por que o zumbido não está no ouvido" />
              <div className="mt-6 space-y-4 text-text-primary/80">
                {viradaContent.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </div>
          </section>

          {/* Para quem é / não é — stacked mobile, side-by-side desktop */}
          <section className="px-4 py-12">
            <div className="mx-auto grid max-w-3xl gap-4 lg:grid-cols-2">
              <div className="rounded-card border border-border bg-white p-5">
                <h3 className="mb-3 font-semibold text-text-primary">{paraQuemContent.leftTitle}</h3>
                <ul className="space-y-2">
                  {paraQuemContent.leftItems.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-text-primary/80">
                      <Check className="mt-0.5 h-5 w-5 shrink-0 text-success" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-card border border-border bg-cream p-5">
                <h3 className="mb-3 font-semibold text-text-primary">{paraQuemContent.rightTitle}</h3>
                <ul className="space-y-2">
                  {paraQuemContent.rightItems.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-text-secondary">
                      <X className="mt-0.5 h-5 w-5 shrink-0 text-text-secondary" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          {/* Transformação — coral checks, higher visual weight than "Para quem" */}
          <section className="px-4 py-12">
            <h2 className="mb-6 text-center font-display text-2xl font-semibold text-ink">
              {transformacaoContent.title}
            </h2>
            <ul className="mx-auto max-w-2xl space-y-3">
              {transformacaoContent.items.map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <Check className="mt-0.5 h-5 w-5 shrink-0 text-coral" />
                  <span className="text-text-primary/80">{item}</span>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </div>

      {/* Módulos — white background, card list, no signature line (see AuditoryPathway's scope note) */}
      <ModuleCards modules={modulosContent} />

      {/* Quem ensina — ink, continuous with Prova social below */}
      <section className="bg-ink px-4 py-12 text-center text-text-on-ink">
        <h2 className="mb-4 font-display text-2xl font-semibold">Sou {quemEnsinaContent.name}, neurocientista.</h2>
        <p className="mx-auto max-w-2xl whitespace-pre-line text-text-on-ink-secondary">{quemEnsinaContent.bio}</p>
      </section>

      {/* Prova social — same ink block, "65+" before the videos */}
      <section className="bg-ink px-4 py-12 text-text-on-ink">
        <p className="mb-2 text-center font-display text-4xl font-bold text-white">65+</p>
        <h2 className="mb-6 text-center text-2xl font-semibold">{provaSocialContent.headline}</h2>
        <div className="mx-auto grid max-w-4xl gap-6 md:grid-cols-2">
          {provaSocialContent.videos.map((video, index) => (
            <VideoEmbed key={index} src={video.src} thumbnailAlt={video.thumbnailAlt} />
          ))}
        </div>
      </section>

      {/* Oferta e bônus — cream, receipt-style list */}
      <section className="bg-cream px-4 py-12">
        <Card className="mx-auto max-w-xl">
          <h2 className="mb-4 font-display text-xl font-semibold text-ink">{ofertaContent.title}</h2>
          <ul className="space-y-2">
            {ofertaContent.items.map((item, index) => (
              <li key={item} className="flex items-start gap-2 text-text-primary/80">
                <Check
                  className={`mt-0.5 h-5 w-5 shrink-0 ${index === 0 ? "text-coral" : "text-success"}`}
                />
                <span className={index === 0 ? "font-medium text-text-primary" : ""}>{item}</span>
              </li>
            ))}
          </ul>
          <p className="mt-4 font-display font-semibold text-ink">{ofertaContent.closingLine}</p>
        </Card>
      </section>

      {/* Preço e lotes — white, the one elevated card on the page */}
      <section id="price-sentinel" className="bg-white px-4 py-12">
        <PriceCard
          loteLabel={`Turma 4 — ${currentLote.label}`}
          price={currentLote.price}
          installment={currentLote.installment}
          ctaLabel="Garantir minha vaga"
          ctaHref={campaignConfig.checkoutLink}
          noteText={currentLote.barText}
        />
      </section>

      <GuaranteeBlock title={garantiaContent.title} description={garantiaContent.description} />

      <FaqSection items={faqContent} />

      {/* CTA final — ink */}
      <section className="bg-ink px-4 py-16 text-center text-text-on-ink">
        <h2 className="font-display text-2xl font-semibold sm:text-3xl">{ctaFinalContent.title}</h2>
        <p className="mt-4 text-text-on-ink-secondary">{ctaFinalContent.subtitle}</p>
        <CtaLink href={campaignConfig.checkoutLink} trackAs="InitiateCheckout" className="mt-8 inline-flex">
          {ctaFinalContent.ctaLabel}
        </CtaLink>
      </section>

      <div className="h-[72px] lg:hidden" aria-hidden="true" />

      <StickyMobileCta
        price={currentLote.price}
        ctaLabel="Garantir vaga"
        ctaHref={campaignConfig.checkoutLink}
        heroSentinelId="hero-end-sentinel"
        priceSentinelId="price-sentinel"
      />
    </div>
  );
}
