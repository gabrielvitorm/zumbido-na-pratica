import { CtaLink } from "@/components/ui/button";

export interface ResultScreenProps {
  title: string;
  body: string;
  ctaLabel: string;
  ctaHref: string;
}

export function ResultScreen({ title, body, ctaLabel, ctaHref }: ResultScreenProps) {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center text-center">
      <h2 className="mb-4 text-2xl font-bold text-brand-primary">{title}</h2>
      <p className="mb-8 max-w-xl text-brand-text/80">{body}</p>
      <CtaLink href={ctaHref}>{ctaLabel}</CtaLink>
    </div>
  );
}
