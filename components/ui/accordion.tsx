"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

export interface AccordionItem {
  id: string;
  title: string;
  content: React.ReactNode;
}

export interface AccordionProps {
  items: AccordionItem[];
  defaultOpenId?: string;
  activeBorderClassName?: string;
  allowMultiple?: boolean;
}

export function Accordion({
  items,
  defaultOpenId,
  activeBorderClassName = "border-l-brand-accent",
  allowMultiple = false,
}: AccordionProps) {
  const [openIds, setOpenIds] = useState<string[]>(defaultOpenId ? [defaultOpenId] : []);

  return (
    <div className="divide-y divide-brand-text/10 rounded-xl border border-brand-text/10 bg-white">
      {items.map((item) => {
        const isOpen = openIds.includes(item.id);
        const panelId = `${item.id}-panel`;
        return (
          <div
            key={item.id}
            className={`border-l-4 ${isOpen ? activeBorderClassName : "border-l-transparent"}`}
          >
            <button
              type="button"
              onClick={() =>
                setOpenIds((current) => {
                  if (isOpen) return current.filter((id) => id !== item.id);
                  return allowMultiple ? [...current, item.id] : [item.id];
                })
              }
              className="flex w-full items-center justify-between px-5 py-4 text-left font-semibold text-brand-primary"
              aria-expanded={isOpen}
              aria-controls={panelId}
            >
              <span>{item.title}</span>
              <ChevronDown
                className={`h-5 w-5 shrink-0 transition-transform ${isOpen ? "rotate-180" : ""}`}
              />
            </button>
            <div id={panelId} hidden={!isOpen} className="px-5 pb-4 text-brand-text/80">
              {item.content}
            </div>
          </div>
        );
      })}
    </div>
  );
}
