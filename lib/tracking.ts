import { getStoredAttribution } from "./attribution";

export type TrackingEventName =
  | "PageView"
  | "ViewContent"
  | "Lead"
  | "AddToCart"
  | "InitiateCheckout"
  | "CompleteRegistration"
  | "Purchase";

export type BlackNovemberEventName =
  | "view_black_page"
  | "click_cta_hero"
  | "click_cta_modulos"
  | "click_cta_oferta"
  | "click_cta_final"
  | "click_cta_sticky_mobile"
  | "faq_open"
  | "scroll_depth";

export type BlackNovemberCtaPosition = "hero" | "modulos" | "oferta" | "final" | "sticky_mobile";

export function resolveTrackingConfig(env: {
  metaPixelId?: string;
  gaId?: string;
}): { metaPixelId: string | null; gaId: string | null } {
  return {
    metaPixelId: env.metaPixelId ? env.metaPixelId : null,
    gaId: env.gaId ? env.gaId : null,
  };
}

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
    gtag?: (...args: unknown[]) => void;
  }
}

export function trackEvent(name: TrackingEventName, params: Record<string, unknown> = {}): void {
  if (typeof window === "undefined") return;

  const enrichedParams = { ...getStoredAttribution(), ...params };

  if (typeof window.fbq === "function") {
    window.fbq("track", name, enrichedParams);
  }

  if (typeof window.gtag === "function") {
    window.gtag("event", name, enrichedParams);
  }
}

/** For non-standard events (e.g. scroll depth) — uses fbq('trackCustom', ...) instead of fbq('track', ...). */
export function trackCustomEvent(name: string, params: Record<string, unknown> = {}): void {
  if (typeof window === "undefined") return;

  const enrichedParams = { ...getStoredAttribution(), ...params };

  if (typeof window.fbq === "function") {
    window.fbq("trackCustom", name, enrichedParams);
  }

  if (typeof window.gtag === "function") {
    window.gtag("event", name, enrichedParams);
  }
}

export function buildBlackNovemberTrackingParams(
  position: BlackNovemberCtaPosition,
  params: Record<string, unknown> = {}
): Record<string, unknown> {
  return { campaign: "black_november", cta_position: position, ...params };
}

export function trackCampaignEvent(
  name: BlackNovemberEventName,
  params: Record<string, unknown> = {}
): void {
  trackCustomEvent(name, { campaign: "black_november", ...params });
}
