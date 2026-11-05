import { describe, it, expect, vi } from "vitest";
import { resolveTrackingConfig } from "./tracking";
import { buildBlackNovemberTrackingParams, trackCampaignEvent } from "./tracking";

describe("resolveTrackingConfig", () => {
  it("returns null for both ids when env is empty", () => {
    expect(resolveTrackingConfig({})).toEqual({ metaPixelId: null, gaId: null });
  });

  it("returns the ids when present", () => {
    expect(resolveTrackingConfig({ metaPixelId: "123", gaId: "G-ABC" })).toEqual({
      metaPixelId: "123",
      gaId: "G-ABC",
    });
  });

  it("treats empty strings as absent", () => {
    expect(resolveTrackingConfig({ metaPixelId: "", gaId: "" })).toEqual({
      metaPixelId: null,
      gaId: null,
    });
  });
});

describe("Black November tracking", () => {
  it("builds campaign parameters for every CTA position", () => {
    expect(buildBlackNovemberTrackingParams("hero", { value: 1900 })).toEqual({
      campaign: "black_november",
      cta_position: "hero",
      value: 1900,
    });
    expect(buildBlackNovemberTrackingParams("modulos", {})).toMatchObject({ cta_position: "modulos" });
    expect(buildBlackNovemberTrackingParams("oferta", {})).toMatchObject({ cta_position: "oferta" });
    expect(buildBlackNovemberTrackingParams("final", {})).toMatchObject({ cta_position: "final" });
    expect(buildBlackNovemberTrackingParams("sticky_mobile", {})).toMatchObject({ cta_position: "sticky_mobile" });
  });

  it("sends custom campaign events with stored attribution", () => {
    const fbq = vi.fn();
    const gtag = vi.fn();
    Object.assign(globalThis, { window: { fbq, gtag, localStorage: { getItem: () => JSON.stringify({ utm_campaign: "black_november" }) } } });

    trackCampaignEvent("faq_open", { faq_id: "faq-0" });

    expect(fbq).toHaveBeenCalledWith("trackCustom", "faq_open", expect.objectContaining({ campaign: "black_november", faq_id: "faq-0", utm_campaign: "black_november" }));
    expect(gtag).toHaveBeenCalledWith("event", "faq_open", expect.objectContaining({ campaign: "black_november", faq_id: "faq-0" }));
  });
});
