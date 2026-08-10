import { ShieldCheck } from "lucide-react";

export interface GuaranteeBlockProps {
  title: string;
  description: string;
}

export function GuaranteeBlock({ title, description }: GuaranteeBlockProps) {
  return (
    <section className="mx-auto flex max-w-2xl flex-col items-center gap-3 px-4 py-12 text-center">
      <ShieldCheck className="h-10 w-10 text-brand-success" />
      <h2 className="text-xl font-bold text-brand-primary">{title}</h2>
      <p className="text-brand-text/80">{description}</p>
    </section>
  );
}
