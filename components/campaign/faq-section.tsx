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
    <section className="bg-white px-4 py-12">
      <div className="mx-auto max-w-2xl">
        <h2 className="mb-6 text-center font-display text-2xl font-semibold text-ink">Perguntas frequentes</h2>
        <Accordion items={accordionItems} activeBorderClassName="border-l-coral" />
      </div>
    </section>
  );
}
