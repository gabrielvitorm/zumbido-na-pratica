import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

describe("FAQ client boundary", () => {
  it("keeps the FAQ callback inside a Client Component", () => {
    const source = readFileSync(new URL("../components/campaign/faq-section.tsx", import.meta.url), "utf8");

    expect(source.startsWith('"use client";')).toBe(true);
  });
});
