import { CheckCircle } from "lucide-react";
import { CtaLink, Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { campaignConfig } from "../config";
import { obrigadoContent } from "../content";
import { PurchaseTracking } from "./purchase-tracking";

export default async function ObrigadoPage({
  searchParams,
}: {
  searchParams: Promise<{ nome?: string }>;
}) {
  const { nome } = await searchParams;
  const firstName = nome ?? "";
  const greeting = firstName
    ? obrigadoContent.confirmation.body.replace("{nome}", firstName)
    : obrigadoContent.confirmation.body.replace(", {nome}!", "!");

  return (
    <>
      <PurchaseTracking />

      {/* 1. Confirmação */}
      <section className="mx-auto max-w-xl px-4 py-16 text-center">
        <CheckCircle className="mx-auto mb-4 h-14 w-14 text-brand-success" />
        <h1 className="text-2xl font-bold text-brand-primary sm:text-3xl">{obrigadoContent.confirmation.title}</h1>
        <p className="mt-4 whitespace-pre-line text-brand-text/80">
          {greeting}
        </p>
      </section>

      {/* 2. Próximo passo */}
      <section className="mx-auto max-w-xl px-4 py-12 text-center">
        <Card className="shadow-sm shadow-black/5">
          <h2 className="text-xl font-bold text-brand-primary">{obrigadoContent.nextStep.title}</h2>
          <p className="mt-2 text-brand-text/80">{obrigadoContent.nextStep.body}</p>
          <CtaLink href={campaignConfig.whatsappGroupLink} className="mt-6 inline-flex">
            {obrigadoContent.nextStep.ctaLabel}
          </CtaLink>
        </Card>
      </section>

      {/* 3. O que esperar */}
      <section className="mx-auto max-w-xl px-4 py-12">
        <h2 className="mb-6 text-center text-xl font-bold text-brand-primary">{obrigadoContent.timeline.title}</h2>
        <ol className="space-y-4 border-l-2 border-brand-primary/20 pl-4">
          {obrigadoContent.timeline.items.map((item) => (
            <li key={item.label}>
              <p className="font-semibold text-brand-primary">{item.label}</p>
              <p className="text-brand-text/80">{item.description}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* 4. Upsell */}
      <section className="mx-auto max-w-xl px-4 py-12">
        <Card className="border-2 border-brand-accent bg-brand-accent/5 text-center shadow-sm shadow-black/5">
          <h2 className="text-xl font-bold text-brand-primary">{obrigadoContent.upsell.title}</h2>
          <p className="mt-3 text-brand-text/80">{obrigadoContent.upsell.body}</p>
          <p className="mt-4 text-3xl font-bold text-brand-primary">{obrigadoContent.upsell.price}</p>
          <p className="text-sm text-brand-text/60">{obrigadoContent.upsell.priceNote}</p>
          <div className="mt-6 flex flex-col items-center gap-3">
            <CtaLink href={campaignConfig.upsellCheckoutLink} trackAs="InitiateCheckout">
              {obrigadoContent.upsell.acceptLabel}
            </CtaLink>
            {/* href="#" is intentional: per the source copy, the decline link's job is just
                to be visibly present as a friction-free "no thanks", not to navigate anywhere. */}
            <a href="#" className="text-sm text-brand-text/60 underline">
              {obrigadoContent.upsell.declineLabel}
            </a>
          </div>
        </Card>
      </section>

      {/* 5. Compartilhamento */}
      {campaignConfig.showShareSection ? (
        <section className="mx-auto max-w-xl px-4 py-12 text-center">
          <h2 className="text-lg font-bold text-brand-primary">{obrigadoContent.share.title}</h2>
          <p className="mt-3 rounded-xl bg-brand-primary/5 p-4 text-sm text-brand-text/70">
            {obrigadoContent.share.suggestedText}
          </p>
          {/* No onClick: Stories sharing isn't wired to any real share API in this scope.
              This is a visual-only element for now. */}
          <Button variant="secondary" className="mt-4">
            {obrigadoContent.share.ctaLabel}
          </Button>
        </section>
      ) : null}
    </>
  );
}
