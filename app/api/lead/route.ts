import { z } from "zod";
import { saveLead } from "@/lib/db";

const leadSchema = z.object({
  name: z.string().min(2),
  whatsapp: z.string().min(8),
  consent: z.literal(true),
  scoreBand: z.string(),
  score: z.number(),
  utm_source: z.string().optional(),
  utm_medium: z.string().optional(),
  utm_campaign: z.string().optional(),
  utm_term: z.string().optional(),
  utm_content: z.string().optional(),
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

  try {
    await saveLead({
      name: parsed.data.name,
      whatsapp: parsed.data.whatsapp,
      score: parsed.data.score,
      scoreBand: parsed.data.scoreBand,
      utmSource: parsed.data.utm_source,
      utmMedium: parsed.data.utm_medium,
      utmCampaign: parsed.data.utm_campaign,
      utmTerm: parsed.data.utm_term,
      utmContent: parsed.data.utm_content,
    });
  } catch (error) {
    console.error("Failed to save lead to database", error);
  }

  return Response.json({ ok: true }, { status: 200 });
}
