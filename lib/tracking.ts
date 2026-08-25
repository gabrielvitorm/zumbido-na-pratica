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

  if (typeof window.fbq === "function") {
    window.fbq("track", name, params);
  }

  if (typeof window.gtag === "function") {
    window.gtag("event", name, params);
  }
}
