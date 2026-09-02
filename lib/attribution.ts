const UTM_PARAMS = ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content"] as const;

export type Attribution = Partial<Record<(typeof UTM_PARAMS)[number], string>>;

const STORAGE_KEY = "znp_attribution";

export function extractUtmParams(search: string): Attribution {
  const params = new URLSearchParams(search);
  const found: Attribution = {};
  for (const key of UTM_PARAMS) {
    const value = params.get(key);
    if (value) found[key] = value;
  }
  return found;
}

/** Last-touch: overwrites the stored attribution whenever the URL carries new utm params. */
export function captureAttributionFromUrl(search: string): void {
  if (typeof window === "undefined") return;

  const found = extractUtmParams(search);
  if (Object.keys(found).length === 0) return;

  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(found));
  } catch {
    // localStorage unavailable (private mode, storage full, etc.) — attribution just won't persist.
  }
}

export function getStoredAttribution(): Attribution {
  if (typeof window === "undefined") return {};

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Attribution) : {};
  } catch {
    return {};
  }
}
