import { getStoredAttribution } from "./attribution";

export type TrackingEventName =
  | "PageView"
  | "ViewContent"
  | "Lead"
  | "AddToCart"
  | "InitiateCheckout"
  | "CompleteRegistration"
  | "Purchase";

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
