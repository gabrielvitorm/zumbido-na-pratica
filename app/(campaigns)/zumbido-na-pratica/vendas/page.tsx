import { Fraunces } from "next/font/google";
import { Check, X } from "lucide-react";
import { getBlackNovemberState, blackNovemberOffer } from "@/lib/black-november";
import { StickyBar } from "@/components/ui/sticky-bar";
import { CtaLink } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { StickyMobileCta } from "@/components/ui/sticky-mobile-cta";
import { Hero } from "@/components/campaign/hero";
import { PriceBlock } from "@/components/campaign/price-block";
import { GuaranteeBlock } from "@/components/campaign/guarantee-block";
import { FaqSection } from "@/components/campaign/faq-section";
import { ModuleCards } from "@/components/campaign/module-cards";
import { LiveBonus } from "@/components/campaign/live-bonus";
import { ViewContentTracking } from "./view-content-tracking";
import { ScrollDepthTracking } from "./scroll-depth-tracking";
import { campaignConfig } from "../config";
import {
  heroContent,
  dorContent,
  viradaContent,
  paraQuemContent,
  transformacaoContent,
  modulosContent,
  liveBonusContent,
  quemEnsinaContent,
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
  const campaignState = getBlackNovemberState(new Date(), blackNovemberOffer);
  const contentName = "Zumbido na Prática — Black November";
  const checkoutHref = campaignState === "expired" ? "#black-encerrada" : campaignConfig.checkoutLink;
  const ctaTrackParams = (position: string) => ({
    content_name: contentName,
    content_ids: [blackNovemberOffer.id],
    value: blackNovemberOffer.priceValue,
    currency: "BRL",
    cta_position: position,
  });

  if (campaignState === "expired") {
    return (
      <main id="black-encerrada" className={`${fraunces.variable} min-h-screen bg-navy-dark px-4 py-24 text-center text-white`}>
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-gold-light">Black November encerrada</p>
        <h1 className="mx-auto mt-4 max-w-2xl font-display text-4xl font-semibold">A condição especial terminou.</h1>
        <p className="mx-auto mt-5 max-w-xl text-slate-muted">O preço normal da formação será exibido nesta página.</p>
      </main>
    );
  }

  const urgencyText = campaignState === "last-day"
    ? "ÚLTIMO DIA — Black November termina hoje às 23:59"
    : "BLACK NOVEMBER — Zumbido na Prática por R$ 1.900,00 · só até 30/11";

  return (
    <div className={`${fraunces.variable} [--font-display:var(--font-fraunces),Georgia,serif]`}>
      <ViewContentTracking contentName={contentName} contentIds={[blackNovemberOffer.id]} value={blackNovemberOffer.priceValue} />
      <ScrollDepthTracking />
      <StickyBar
        text={urgencyText}
        variant="urgent"
        countdownTarget={blackNovemberOffer.endDate}
        campaignState={campaignState}
        price={blackNovemberOffer.price}
        ctaHref={checkoutHref}
        ctaLabel="Entrar na Black"
        ctaTrackParams={ctaTrackParams("sticky")}
        backgroundClassName="bg-navy-dark border-b border-gold/40"
        countdownClassName="font-mono font-bold text-gold-light"
      />

      <div className="relative bg-navy">
        <div className="relative z-10">
          <div id="hero-end-sentinel">
            <Hero
              headline={heroContent.headline}
              subheadline={heroContent.subheadline}
              socialProofLine={heroContent.socialProofLine}
              ctaLabel={heroContent.ctaLabel}
              ctaHref={checkoutHref}
              loteBadge={heroContent.loteBadge}
              offer={blackNovemberOffer}
              microcopy={heroContent.microcopy}
              accentClassName="bg-gold-light text-navy hover:bg-gold"
              ctaTrackParams={ctaTrackParams("hero")}
            />
          </div>

          <section className="bg-navy px-4 py-12 text-slate-muted">
            <div className="mx-auto flex max-w-xl flex-col gap-8">
              <p className="mx-auto max-w-[20ch] text-center font-display text-xl text-white">{dorContent.paragraphs[0]}</p>
              <div className="space-y-4">
                {dorContent.paragraphs.slice(1, 4).map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              </div>
              <p className="mx-auto max-w-[20ch] text-center font-display text-xl text-white">{dorContent.paragraphs[4]}</p>
            </div>
          </section>

          <section className="bg-navy-dark px-4 py-12">
            <div className="mx-auto max-w-2xl rounded-card border border-gold/30 bg-navy-card p-6 text-slate-muted">
              <h2 className="mb-4 text-center font-display text-2xl font-semibold text-gold-light">{viradaContent.title}</h2>
              <div className="space-y-4">{viradaContent.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div>
            </div>
          </section>

          <section className="bg-navy px-4 py-12">
            <div className="mx-auto grid max-w-3xl gap-4 lg:grid-cols-2">
              <div className="rounded-card border border-gold/30 bg-navy-card p-5 text-slate-muted">
                <h3 className="mb-3 font-semibold text-gold-light">{paraQuemContent.leftTitle}</h3>
                <ul className="space-y-2">{paraQuemContent.leftItems.map((item) => <li key={item} className="flex items-start gap-2"><Check className="mt-0.5 h-5 w-5 shrink-0 text-success" /><span>{item}</span></li>)}</ul>
              </div>
              <div className="rounded-card border border-gold/20 bg-navy-dark p-5 text-slate-muted">
                <h3 className="mb-3 font-semibold text-gold-light">{paraQuemContent.rightTitle}</h3>
                <ul className="space-y-2">{paraQuemContent.rightItems.map((item) => <li key={item} className="flex items-start gap-2"><X className="mt-0.5 h-5 w-5 shrink-0 text-urgent" /><span>{item}</span></li>)}</ul>
              </div>
            </div>
          </section>

          <section className="bg-navy-dark px-4 py-12">
            <h2 className="mb-6 text-center font-display text-2xl font-semibold text-gold-light">{transformacaoContent.title}</h2>
            <ul className="mx-auto max-w-2xl space-y-3 text-slate-muted">{transformacaoContent.items.map((item) => <li key={item} className="flex items-start gap-2"><Check className="mt-0.5 h-5 w-5 shrink-0 text-gold" /><span>{item}</span></li>)}</ul>
          </section>
        </div>
      </div>

      <ModuleCards modules={modulosContent} />
      <LiveBonus sessions={liveBonusContent.sessions} />

      <section className="bg-navy px-4 py-12 text-center text-white">
        <h2 className="mb-4 font-display text-2xl font-semibold">Sou {quemEnsinaContent.name}, neurocientista.</h2>
        <p className="mx-auto max-w-2xl whitespace-pre-line text-slate-muted">{quemEnsinaContent.bio}</p>
      </section>

      <section className="bg-navy-dark px-4 py-12">
        <Card className="mx-auto max-w-xl border border-gold/30 bg-navy-card text-white">
          <h2 className="mb-4 font-display text-xl font-semibold text-gold-light">{ofertaContent.title}</h2>
          <ul className="space-y-2 text-slate-muted">{ofertaContent.items.map((item) => <li key={item} className="flex items-start gap-2"><Check className="mt-0.5 h-5 w-5 shrink-0 text-gold" /><span>{item}</span></li>)}</ul>
          <div className="mt-6"><PriceBlock offer={blackNovemberOffer} ctaHref={checkoutHref} ctaLabel={ofertaContent.ctaLabel} ctaTrackParams={ctaTrackParams("oferta")} compact /></div>
        </Card>
      </section>

      <section id="price-sentinel" className="bg-navy px-4 py-12">
        <PriceBlock offer={blackNovemberOffer} ctaHref={checkoutHref} ctaLabel={ofertaContent.ctaLabel} ctaTrackParams={ctaTrackParams("price_card")} />
      </section>

      <GuaranteeBlock title={garantiaContent.title} description={garantiaContent.description} />
      <FaqSection items={faqContent} />

      <section className="bg-navy-dark px-4 py-16 text-center text-white">
        <h2 className="font-display text-2xl font-semibold sm:text-3xl">{ctaFinalContent.title}</h2>
        <p className="mt-4 text-slate-muted">{ctaFinalContent.subtitle}</p>
        <CtaLink href={checkoutHref} trackAs="InitiateCheckout" trackParams={ctaTrackParams("final")} className="mt-8 inline-flex" accentClassName="bg-gold-light text-navy hover:bg-gold">{ctaFinalContent.ctaLabel}</CtaLink>
      </section>

      <StickyMobileCta price={blackNovemberOffer.price} ctaLabel="Entrar na Black" ctaHref={checkoutHref} heroSentinelId="hero-end-sentinel" priceSentinelId="price-sentinel" accentClassName="bg-gold-light text-navy hover:bg-gold" ctaTrackParams={ctaTrackParams("sticky_mobile")} />
    </div>
  );
}
