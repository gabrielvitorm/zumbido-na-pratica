"use client";

import { useEffect, useRef, useState } from "react";
import { CtaLink } from "./button";

export interface StickyMobileCtaProps {
  price: string;
  ctaLabel: string;
  ctaHref: string;
  heroSentinelId: string;
  priceSentinelId: string;
  accentClassName?: string;
}

export function StickyMobileCta({
  price,
  ctaLabel,
  ctaHref,
  heroSentinelId,
  priceSentinelId,
  accentClassName,
}: StickyMobileCtaProps) {
  const [pastHero, setPastHero] = useState(false);
  const [reachedPrice, setReachedPrice] = useState(false);
  const barRef = useRef<HTMLDivElement>(null);
  const [barHeight, setBarHeight] = useState(0);

  useEffect(() => {
    const heroSentinel = document.getElementById(heroSentinelId);
    const priceSentinel = document.getElementById(priceSentinelId);
    if (!heroSentinel || !priceSentinel) return;

    const heroObserver = new IntersectionObserver(
      ([entry]) => setPastHero(!entry.isIntersecting && entry.boundingClientRect.top < 0),
      { threshold: 0 }
    );
    const priceObserver = new IntersectionObserver(([entry]) => setReachedPrice(entry.isIntersecting), {
      threshold: 0,
    });

    heroObserver.observe(heroSentinel);
    priceObserver.observe(priceSentinel);

    return () => {
      heroObserver.disconnect();
      priceObserver.disconnect();
    };
  }, [heroSentinelId, priceSentinelId]);

  useEffect(() => {
    if (!barRef.current) return;
    const resizeObserver = new ResizeObserver((entries) => {
      const entry = entries[0];
      if (entry) setBarHeight(entry.contentRect.height);
    });
    resizeObserver.observe(barRef.current);
    return () => resizeObserver.disconnect();
  }, []);

  const visible = pastHero && !reachedPrice;

  return (
    <>
      <div
        ref={barRef}
        className={`fixed inset-x-0 bottom-0 z-50 border-t border-border bg-white px-4 py-3 shadow-[0_-4px_12px_rgba(0,0,0,0.08)] transition-transform duration-200 lg:hidden ${
          visible ? "translate-y-0" : "translate-y-full"
        }`}
        aria-hidden={!visible}
      >
        <div className="flex items-center justify-between gap-3">
          <span className="font-display text-lg font-semibold text-ink">{price}</span>
          <CtaLink
            href={ctaHref}
            trackAs="InitiateCheckout"
            className="flex-1 justify-center py-2.5 text-sm"
            accentClassName={accentClassName}
          >
            {ctaLabel}
          </CtaLink>
        </div>
      </div>
      {visible ? <div style={{ height: barHeight }} className="lg:hidden" aria-hidden="true" /> : null}
    </>
  );
}
