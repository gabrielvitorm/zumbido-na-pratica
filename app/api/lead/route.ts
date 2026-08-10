import { z } from "zod";

const leadSchema = z.object({
  name: z.string().min(2),
  whatsapp: z.string().min(8),
  consent: z.literal(true),
  scoreBand: z.string(),
  score: z.number(),
});

export async function POST(request: Request): Promise<Response> {
  const body = await request.json().catch(() => null);
  const parsed = leadSchema.safeParse(body);

  if (!parsed.success) {
    return Response.json({ ok: false, error: "invalid payload" }, { status: 400 });
  }

  const webhookUrl = process.env.LEAD_WEBHOOK_URL;

  if (webhookUrl) {
    try {
      await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.data),
      });
    } catch (error) {
      console.error("Failed to forward lead to webhook", error);
    }
  } else {
    console.warn("LEAD_WEBHOOK_URL is not set — lead was received but not forwarded", parsed.data);
  }

  return Response.json({ ok: true }, { status: 200 });
}
