import { Check, X } from "lucide-react";

export interface TwoColumnListProps {
  leftTitle: string;
  leftItems: string[];
  rightTitle: string;
  rightItems: string[];
}

export function TwoColumnList({ leftTitle, leftItems, rightTitle, rightItems }: TwoColumnListProps) {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      <div>
        <h3 className="mb-3 font-semibold text-brand-primary">{leftTitle}</h3>
        <ul className="space-y-2">
          {leftItems.map((item) => (
            <li key={item} className="flex items-start gap-2">
              <Check className="mt-0.5 h-5 w-5 shrink-0 text-brand-success" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h3 className="mb-3 font-semibold text-brand-primary">{rightTitle}</h3>
        <ul className="space-y-2">
          {rightItems.map((item) => (
            <li key={item} className="flex items-start gap-2">
              <X className="mt-0.5 h-5 w-5 shrink-0 text-brand-alert" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
