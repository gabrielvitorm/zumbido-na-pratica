import { Accordion, type AccordionItem } from "@/components/ui/accordion";

export interface FaqItem {
  question: string;
  answer: string;
}

export interface FaqSectionProps {
  items: FaqItem[];
}

export function FaqSection({ items }: FaqSectionProps) {
  const accordionItems: AccordionItem[] = items.map((item, index) => ({
    id: `faq-${index}`,
    title: item.question,
    content: item.answer,
  }));

  return (
    <section className="mx-auto max-w-2xl px-4 py-12">
      <h2 className="mb-6 text-center text-2xl font-bold text-brand-primary">Perguntas frequentes</h2>
      <Accordion items={accordionItems} />
    </section>
  );
}
