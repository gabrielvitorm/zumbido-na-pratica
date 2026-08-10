import { describe, it, expect } from "vitest";
import { resolveTrackingConfig } from "./tracking";

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
