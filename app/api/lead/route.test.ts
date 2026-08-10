import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { POST } from "./route";

function makeRequest(body: unknown): Request {
  return new Request("http://localhost/api/lead", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
}

describe("POST /api/lead", () => {
  const originalWebhook = process.env.LEAD_WEBHOOK_URL;

  beforeEach(() => {
    process.env.LEAD_WEBHOOK_URL = "https://example.com/webhook";
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(new Response(null, { status: 200 })));
  });

  afterEach(() => {
    process.env.LEAD_WEBHOOK_URL = originalWebhook;
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
});
