import { Badge } from "@/components/ui/badge";

export interface ModuleItem {
  number: number;
  title: string;
  description: string;
  isBonus?: boolean;
  isUpsell?: boolean;
}

export interface ModuleCardsProps {
  modules: ModuleItem[];
}

export function ModuleCards({ modules }: ModuleCardsProps) {
  return (
    <section className="bg-white px-4 py-12">
      <h2 className="mb-6 text-center font-display text-2xl font-semibold text-ink">
        Conteúdo da formação
      </h2>
      <div className="mx-auto flex max-w-2xl flex-col gap-3">
        {modules.map((module) => {
          const isBadgeVariant = module.isBonus || module.isUpsell;
          return (
            <div
              key={`module-${module.number}-${module.title}`}
              className={`flex items-start gap-3 rounded-card border p-4 ${
                module.isBonus
                  ? "border-coral-tint bg-coral-tint"
                  : module.isUpsell
                    ? "border-dashed border-border bg-white"
                    : "border-border bg-white"
              }`}
            >
              {!isBadgeVariant ? (
                <span
                  className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-semibold text-white ${
                    module.number === 5 ? "bg-coral" : "bg-ink"
                  }`}
                >
                  {module.number}
                </span>
              ) : null}
              <div className="flex-1">
                {module.isBonus ? (
                  <Badge tone="success" className="mb-1">
                    Bônus incluído
                  </Badge>
                ) : null}
                {module.isUpsell ? (
                  <Badge tone="alert" className="mb-1">
                    Disponível como adicional
                  </Badge>
                ) : null}
                <p className="font-semibold text-text-primary">
                  {isBadgeVariant ? module.title : `Módulo ${module.number} — ${module.title}`}
                </p>
                <p className="mt-1 text-sm text-text-secondary">{module.description}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
