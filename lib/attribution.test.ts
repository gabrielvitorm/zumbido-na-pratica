import { describe, it, expect } from "vitest";
import { extractUtmParams } from "./attribution";

describe("extractUtmParams", () => {
  it("returns an empty object when there are no utm params", () => {
    expect(extractUtmParams("")).toEqual({});
    expect(extractUtmParams("?ref=foo")).toEqual({});
  });

  it("extracts known utm params and ignores unrelated query params", () => {
    expect(extractUtmParams("?utm_source=meta&utm_campaign=turma4&ref=foo")).toEqual({
      utm_source: "meta",
      utm_campaign: "turma4",
    });
  });

  it("extracts all five known utm params", () => {
    expect(
      extractUtmParams(
        "?utm_source=meta&utm_medium=cpc&utm_campaign=turma4&utm_term=zumbido&utm_content=video1"
      )
    ).toEqual({
      utm_source: "meta",
      utm_medium: "cpc",
      utm_campaign: "turma4",
      utm_term: "zumbido",
      utm_content: "video1",
    });
  });

  it("ignores empty utm values", () => {
    expect(extractUtmParams("?utm_source=")).toEqual({});
  });
});
