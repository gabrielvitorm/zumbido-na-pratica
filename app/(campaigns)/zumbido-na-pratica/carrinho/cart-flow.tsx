"use client";

import { useMemo, useState } from "react";
import { CtaLink } from "@/components/ui/button";
import { formatPrice, buildWhatsappCartLink } from "@/lib/whatsapp";
import { cartContent, cartItems } from "./carrinho-content";

export interface CartFlowProps {
  salesWhatsappNumber: string;
}

export function CartFlow({ salesWhatsappNumber }: CartFlowProps) {
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

  function toggleItem(id: string) {
    setSelectedIds((current) => {
      const next = new Set(current);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  }

  const selectedItems = useMemo(
    () => cartItems.filter((item) => selectedIds.has(item.id)),
    [selectedIds]
  );
  const total = useMemo(() => selectedItems.reduce((sum, item) => sum + item.price, 0), [selectedItems]);
  const hasSelection = selectedItems.length > 0;

  const whatsappHref = hasSelection
    ? buildWhatsappCartLink(salesWhatsappNumber, selectedItems)
    : undefined;

  return (
    <div className="min-h-screen bg-cream px-4 py-12">
      <div className="mx-auto max-w-2xl">
        <h1 className="text-center font-display text-3xl font-semibold text-ink">{cartContent.headline}</h1>
        <p className="mx-auto mt-3 max-w-lg text-center text-text-primary/80">{cartContent.subheadline}</p>

        <div className="mt-8 flex flex-col gap-3">
          {cartItems.map((item) => {
            const checked = selectedIds.has(item.id);
            return (
              <label
                key={item.id}
                className={`flex cursor-pointer items-center gap-3 rounded-card border p-4 transition-colors ${
                  checked ? "border-coral bg-coral-tint" : "border-border bg-white"
                }`}
              >
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={() => toggleItem(item.id)}
                  className="h-5 w-5 shrink-0 accent-coral"
                />
                <span className="flex-1 text-text-primary">{item.title}</span>
                <span className="shrink-0 font-semibold text-ink">{formatPrice(item.price)}</span>
              </label>
            );
          })}
        </div>

        <div className="sticky bottom-4 mt-8 rounded-card border border-border bg-white p-5 shadow-md shadow-black/10">
          <div className="flex items-center justify-between">
            <span className="text-text-primary">Total selecionado</span>
            <span className="font-display text-2xl font-bold text-ink">{formatPrice(total)}</span>
          </div>
          {hasSelection ? (
            <CtaLink
              href={whatsappHref}
              trackAs="InitiateCheckout"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 w-full justify-center"
              accentClassName="bg-coral text-white hover:bg-coral-dark"
            >
              {cartContent.ctaLabel}
            </CtaLink>
          ) : (
            <p className="mt-4 text-center text-sm text-text-secondary">{cartContent.emptyStateText}</p>
          )}
        </div>
      </div>
    </div>
  );
}
