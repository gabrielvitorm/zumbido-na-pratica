import { Accordion, type AccordionItem } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";

export interface ModuleItem {
  number: number;
  title: string;
  description: string;
  isBonus?: boolean;
  isUpsell?: boolean;
}

export interface ModuleAccordionProps {
  modules: ModuleItem[];
}

export function ModuleAccordion({ modules }: ModuleAccordionProps) {
  const accordionItems: AccordionItem[] = modules.map((module) => ({
    id: `module-${module.number}-${module.title}`,
    title: module.isBonus || module.isUpsell ? module.title : `Módulo ${module.number} — ${module.title}`,
    content: (
      <div>
        {module.isBonus ? <Badge tone="success" className="mb-2">Bônus incluído</Badge> : null}
        {module.isUpsell ? <Badge tone="alert" className="mb-2">Upsell disponível</Badge> : null}
        <p>{module.description}</p>
      </div>
    ),
  }));

  return (
    <section className="mx-auto max-w-2xl px-4 py-12">
      <h2 className="mb-6 text-center text-2xl font-bold text-brand-primary">Conteúdo da formação</h2>
      <Accordion items={accordionItems} />
    </section>
  );
}
