import { ShieldCheck } from "lucide-react";

export interface GuaranteeBlockProps {
  title: string;
  description: string;
}

export function GuaranteeBlock({ title, description }: GuaranteeBlockProps) {
  return (
    <section className="bg-navy px-4 py-12 text-white">
      <div className="mx-auto flex max-w-2xl flex-col items-center gap-3 text-center">
        <ShieldCheck className="h-10 w-10 text-success" />
        <h2 className="font-display text-xl font-semibold text-gold-light">{title}</h2>
        <p className="text-slate-muted">{description}</p>
      </div>
    </section>
  );
}
