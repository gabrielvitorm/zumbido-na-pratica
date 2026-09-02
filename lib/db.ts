import { Pool } from "pg";

let pool: Pool | null = null;

function getPool(): Pool | null {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) return null;

  if (!pool) {
    pool = new Pool({ connectionString });
  }
  return pool;
}

export interface LeadRecord {
  name: string;
  whatsapp: string;
  score: number;
  scoreBand: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  utmTerm?: string;
  utmContent?: string;
}

/** No-ops when DATABASE_URL is unset — the DB is an optional addition on top of LEAD_WEBHOOK_URL. */
export async function saveLead(lead: LeadRecord): Promise<void> {
  const dbPool = getPool();
  if (!dbPool) return;

  await dbPool.query(
    `INSERT INTO leads (name, whatsapp, score, score_band, utm_source, utm_medium, utm_campaign, utm_term, utm_content)
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`,
    [
      lead.name,
      lead.whatsapp,
      lead.score,
      lead.scoreBand,
      lead.utmSource ?? null,
      lead.utmMedium ?? null,
      lead.utmCampaign ?? null,
      lead.utmTerm ?? null,
      lead.utmContent ?? null,
    ]
  );
}
