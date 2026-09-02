import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { POST } from "./route";

const queryMock = vi.fn().mockResolvedValue({ rows: [] });

vi.mock("pg", () => ({
  Pool: vi.fn().mockImplementation(function PoolMock() {
    return { query: queryMock };
  }),
}));

function makeRequest(body: unknown): Request {
  return new Request("http://localhost/api/lead", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
}

describe("POST /api/lead", () => {
  const originalWebhook = process.env.LEAD_WEBHOOK_URL;
  const originalDatabaseUrl = process.env.DATABASE_URL;

  beforeEach(() => {
    process.env.LEAD_WEBHOOK_URL = "https://example.com/webhook";
    process.env.DATABASE_URL = "postgres://user:pass@localhost:5432/db";
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(new Response(null, { status: 200 })));
    queryMock.mockClear();
    queryMock.mockResolvedValue({ rows: [] });
  });

  afterEach(() => {
    process.env.LEAD_WEBHOOK_URL = originalWebhook;
    process.env.DATABASE_URL = originalDatabaseUrl;
    vi.unstubAllGlobals();
  });

  it("returns 400 for an invalid payload", async () => {
    const response = await POST(makeRequest({ name: "" }));
    expect(response.status).toBe(400);
  });

  it("forwards a valid payload to the webhook and returns 200", async () => {
    const response = await POST(
      makeRequest({
        name: "Maria Silva",
        whatsapp: "(11) 91234-5678",
        consent: true,
        scoreBand: "no-improviso",
        score: 12,
      })
    );

    expect(response.status).toBe(200);
    expect(fetch).toHaveBeenCalledWith(
      "https://example.com/webhook",
      expect.objectContaining({ method: "POST" })
    );
  });

  it("forwards utm attribution fields when present", async () => {
    const response = await POST(
      makeRequest({
        name: "Maria Silva",
        whatsapp: "(11) 91234-5678",
        consent: true,
        scoreBand: "no-improviso",
        score: 12,
        utm_source: "meta",
        utm_campaign: "turma4",
      })
    );

    expect(response.status).toBe(200);
    const [, options] = vi.mocked(fetch).mock.calls[0];
    const forwardedBody = JSON.parse((options as RequestInit).body as string);
    expect(forwardedBody).toMatchObject({ utm_source: "meta", utm_campaign: "turma4" });

    expect(queryMock).toHaveBeenCalledWith(
      expect.stringContaining("INSERT INTO leads"),
      ["Maria Silva", "(11) 91234-5678", 12, "no-improviso", "meta", null, "turma4", null, null]
    );
  });

  it("still returns 200 when the webhook call fails, and does not throw", async () => {
    vi.stubGlobal("fetch", vi.fn().mockRejectedValue(new Error("network down")));

    const response = await POST(
      makeRequest({
        name: "Maria Silva",
        whatsapp: "(11) 91234-5678",
        consent: true,
        scoreBand: "no-improviso",
        score: 12,
      })
    );

    expect(response.status).toBe(200);
  });

  it("does not touch the database when DATABASE_URL is not set", async () => {
    process.env.DATABASE_URL = "";

    const response = await POST(
      makeRequest({
        name: "Maria Silva",
        whatsapp: "(11) 91234-5678",
        consent: true,
        scoreBand: "no-improviso",
        score: 12,
      })
    );

    expect(response.status).toBe(200);
    expect(queryMock).not.toHaveBeenCalled();
  });

  it("still returns 200 when the database insert fails, and does not throw", async () => {
    queryMock.mockRejectedValueOnce(new Error("connection refused"));

    const response = await POST(
      makeRequest({
        name: "Maria Silva",
        whatsapp: "(11) 91234-5678",
        consent: true,
        scoreBand: "no-improviso",
        score: 12,
      })
    );

    expect(response.status).toBe(200);
  });
});
