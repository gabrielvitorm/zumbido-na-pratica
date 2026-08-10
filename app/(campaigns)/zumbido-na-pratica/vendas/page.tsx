import { getCurrentLote } from "@/lib/campaign-phase";
import { StickyBar } from "@/components/ui/sticky-bar";
import { CtaLink } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { TwoColumnList } from "@/components/ui/two-column-list";
import { VideoEmbed } from "@/components/ui/video-embed";
import { Hero } from "@/components/campaign/hero";
import { PriceCard } from "@/components/campaign/price-card";
import { GuaranteeBlock } from "@/components/campaign/guarantee-block";
import { FaqSection } from "@/components/campaign/faq-section";
import { ModuleAccordion } from "@/components/campaign/module-accordion";
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

export default function VendasPage() {
  const currentLote = getCurrentLote(lotes, new Date());

  return (
    <>
      <StickyBar text={currentLote.barText} variant={currentLote.barVariant} countdownTarget={currentLote.endDate} />

      {/* 1. Hero */}
      <Hero
        headline={heroContent.headline}
        subheadline={heroContent.subheadline}
        socialProofLine={heroContent.socialProofLine}
        ctaLabel={heroContent.ctaLabel}
        ctaHref={campaignConfig.checkoutLink}
        loteBadge={heroContent.loteBadge}
      />

      {/* 3. Dor */}
      <section className="mx-auto max-w-xl px-4 py-12 text-center">
        {dorContent.paragraphs.map((paragraph) => (
          <p key={paragraph} className="mb-4 text-lg text-brand-text/80">
            {paragraph}
          </p>
        ))}
      </section>

      {/* 4. Virada */}
      <section className="mx-auto max-w-2xl px-4 py-12">
        <h2 className="mb-6 text-center text-2xl font-bold text-brand-primary">{viradaContent.title}</h2>
        <VideoEmbed src={viradaContent.videoSrc} thumbnailAlt="Por que o zumbido não está no ouvido" />
        <div className="mt-6 space-y-4">
          {viradaContent.paragraphs.map((paragraph) => (
            <p key={paragraph} className="text-brand-text/80">
              {paragraph}
            </p>
          ))}
        </div>
      </section>

      {/* 5. Para quem é / não é */}
      <section className="mx-auto max-w-3xl px-4 py-12">
        <TwoColumnList {...paraQuemContent} />
      </section>

      {/* 6. Transformação */}
      <section className="mx-auto max-w-2xl px-4 py-12">
        <h2 className="mb-6 text-center text-2xl font-bold text-brand-primary">{transformacaoContent.title}</h2>
        <ul className="space-y-3">
          {transformacaoContent.items.map((item) => (
            <li key={item} className="flex items-start gap-2">
              <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-brand-accent" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* 7. Conteúdo — 7 módulos */}
      <ModuleAccordion modules={modulosContent} />

      {/* 8. Quem ensina */}
      <section className="mx-auto max-w-2xl px-4 py-12 text-center">
        <h2 className="mb-4 text-2xl font-bold text-brand-primary">Sou {quemEnsinaContent.name}, neurocientista.</h2>
        <p className="whitespace-pre-line text-brand-text/80">{quemEnsinaContent.bio}</p>
      </section>

      {/* 9. Prova social */}
      <section className="mx-auto max-w-4xl px-4 py-12">
        <h2 className="mb-6 text-center text-2xl font-bold text-brand-primary">{provaSocialContent.headline}</h2>
        <div className="grid gap-6 md:grid-cols-2">
          {provaSocialContent.videos.map((video, index) => (
            <VideoEmbed key={index} src={video.src} thumbnailAlt={video.thumbnailAlt} />
          ))}
        </div>
      </section>

      {/* 10. Oferta e bônus */}
      <section className="mx-auto max-w-xl px-4 py-12">
        <Card>
          <h2 className="mb-4 text-xl font-bold text-brand-primary">{ofertaContent.title}</h2>
          <ul className="space-y-2">
            {ofertaContent.items.map((item) => (
              <li key={item} className="text-brand-text/80">
                — {item}
              </li>
            ))}
          </ul>
          <p className="mt-4 font-semibold text-brand-primary">{ofertaContent.closingLine}</p>
        </Card>
      </section>

      {/* 11. Preço e lotes */}
      <section className="px-4 py-12">
        <PriceCard
          loteLabel={`Turma 4 — ${currentLote.label}`}
          price={currentLote.price}
          installment={currentLote.installment}
          ctaLabel="Garantir minha vaga"
          ctaHref={campaignConfig.checkoutLink}
          noteText={currentLote.barText}
        />
      </section>

      {/* 12. Garantia */}
      <GuaranteeBlock title={garantiaContent.title} description={garantiaContent.description} />

      {/* 13. FAQ */}
      <FaqSection items={faqContent} />

      {/* 14. CTA final */}
      <section className="bg-brand-primary px-4 py-16 text-center text-white">
        <h2 className="text-2xl font-bold sm:text-3xl">{ctaFinalContent.title}</h2>
        <p className="mt-4 text-white/80">{ctaFinalContent.subtitle}</p>
        <CtaLink href={campaignConfig.checkoutLink} trackAs="InitiateCheckout" className="mt-8 inline-flex">
          {ctaFinalContent.ctaLabel}
        </CtaLink>
      </section>
    </>
  );
}
