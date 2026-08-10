# Zumbido na Prática — LPs Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build and prepare for deploy the 3 landing pages of the "Zumbido na Prática" (Turma 4) launch — página de vendas, página de obrigado, quiz de captação — as a Next.js site with a shared health/trust design system, ready to run on a fresh Hostgator VPS.

**Architecture:** Next.js 15 App Router + TypeScript + Tailwind CSS v4. Shared UI primitives live in `/components/ui`, larger campaign-specific blocks in `/components/campaign`. Pure logic (lote/date resolution, quiz scoring, tracking config) lives in `/lib` and is unit-tested with Vitest. The `zumbido-na-pratica` campaign has its own `content.ts` (copy) and `config.ts` (links/dates/flags), so a future campaign can be added as a sibling folder without touching shared code. No database — quiz leads are POSTed to an external webhook URL from an API route.

**Tech Stack:** Next.js 15, TypeScript, Tailwind CSS v4, react-hook-form, zod, framer-motion, lucide-react, Vitest, PM2, Nginx, Certbot.

## Global Constraints

- Next.js 15 (App Router), TypeScript strict mode, Tailwind CSS v4 (CSS-based `@theme`, no `tailwind.config.js`).
- Single font family: Inter, loaded via `next/font/google`, weights 400/500/600/700.
- Color tokens (exact hex): primary `#12495A`, background `#FAF9F6`, text `#1F2937`, accent/CTA `#E8703A`, success `#2F9E63`, alert `#D64545`.
- No database. Leads go through `POST /api/lead` → external webhook URL (`LEAD_WEBHOOK_URL` env var).
- All external links (checkout, WhatsApp group, webhook, pixel IDs) come from environment variables with a visible fallback placeholder — never a hard failure when unset.
- Sales page dobra order is fixed per `pagina-vendas.md` (14 dobras) — do not reorder.
- Thank-you page dobra order is fixed per `pagina-obrigado.md` (5 dobras, share section optional/flagged).
- Automated tests (Vitest) are written only for pure/server logic: `/lib` (`campaign-phase.ts`, `quiz-scoring.ts`, `tracking.ts` config resolution) and the `/api/lead` route handler (Task 16 — validation and webhook-forwarding behavior, no UI involved). All UI/page work is verified manually in the browser via `npm run dev` — this is a deliberate scope decision from the spec, not an omission.
- Deploy target: Hostgator VPS, fresh install, via Node LTS + PM2 + Nginx + Certbot (no Docker).
- Copy text must be reproduced verbatim from `pagina-vendas.md`, `pagina-obrigado.md`, `pagina-captacao-quiz.md` — these are approved, do not paraphrase.

---

## Task 1: Scaffold Next.js project and base tooling

**Files:**
- Create: `package.json`, `tsconfig.json`, `next.config.ts`, `.gitignore`, `.eslintrc.json` (or `eslint.config.mjs`), `app/layout.tsx`, `app/page.tsx`, `app/globals.css`
- Create: `.env.example`

**Interfaces:**
- Produces: a working Next.js dev server (`npm run dev`) and build (`npm run build`) with TypeScript and Tailwind v4 wired in. All later tasks assume this scaffold exists.

- [ ] **Step 1: Scaffold with create-next-app**

Run from the project root (`C:\Users\gabri\Desktop\lp`):

```bash
npx --yes create-next-app@latest . --typescript --tailwind --eslint --app --no-src-dir --import-alias "@/*" --use-npm
```

When prompted about the current directory not being empty, confirm to proceed (the 3 `.md` files and `docs/` folder are fine to keep alongside).

- [ ] **Step 2: Verify Tailwind v4 setup**

Open `app/globals.css` and confirm it starts with `@import "tailwindcss";` (Tailwind v4 style, no `tailwind.config.js` generated). If `create-next-app` produced a `tailwind.config.ts` (older template), delete it — this project uses the CSS-first v4 config from Task 2.

- [ ] **Step 3: Add `.env.example`**

```
CHECKOUT_LINK=
WHATSAPP_GROUP_LINK=
LEAD_WEBHOOK_URL=
NEXT_PUBLIC_META_PIXEL_ID=
NEXT_PUBLIC_GA_ID=
```

- [ ] **Step 4: Configure standalone output**

Edit `next.config.ts`:

```ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
};

export default nextConfig;
```

- [ ] **Step 5: Verify dev server**

Run: `npm run dev`
Expected: server starts on `http://localhost:3000`, default Next.js welcome page loads without errors. Stop the server after confirming.

- [ ] **Step 6: Verify production build**

Run: `npm run build`
Expected: build completes with no TypeScript/ESLint errors.

- [ ] **Step 7: Commit**

```bash
git add -A
git commit -m "chore: scaffold Next.js 15 project with TypeScript and Tailwind v4"
```

---

## Task 2: Design tokens, fonts, and root layout

**Files:**
- Modify: `app/globals.css`
- Modify: `app/layout.tsx`

**Interfaces:**
- Produces: Tailwind utility classes `bg-brand-primary`, `text-brand-primary`, `bg-brand-bg`, `text-brand-text`, `bg-brand-accent`, `text-brand-accent`, `bg-brand-success`, `text-brand-success`, `bg-brand-alert`, `text-brand-alert`, and the `font-sans` (Inter) family applied globally. All later UI components consume these classes.

- [ ] **Step 1: Define theme tokens in `globals.css`**

```css
@import "tailwindcss";

@theme {
  --color-brand-primary: #12495a;
  --color-brand-bg: #faf9f6;
  --color-brand-text: #1f2937;
  --color-brand-accent: #e8703a;
  --color-brand-success: #2f9e63;
  --color-brand-alert: #d64545;
  --font-sans: var(--font-inter), ui-sans-serif, system-ui, sans-serif;
}

body {
  background-color: var(--color-brand-bg);
  color: var(--color-brand-text);
}
```

- [ ] **Step 2: Load Inter and apply it in the root layout**

```tsx
// app/layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Zumbido na Prática",
  description: "Formação prática em tratamento de zumbido para profissionais da saúde.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR" className={inter.variable}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
```

- [ ] **Step 3: Manual verification**

Run: `npm run dev`, open `http://localhost:3000`.
Expected: page background is the warm off-white (`#FAF9F6`), text renders in Inter. Confirm via browser devtools that `--color-brand-primary` etc. are present on `:root`/`html` computed styles (Tailwind v4 emits them as CSS custom properties).

- [ ] **Step 4: Commit**

```bash
git add app/globals.css app/layout.tsx
git commit -m "feat: add design tokens (palette, Inter font) and root layout"
```

---

## Task 3: Vitest setup for pure-logic unit tests

**Files:**
- Create: `vitest.config.ts`
- Modify: `package.json` (add `test` script and devDependencies)
- Create: `lib/sanity.test.ts` (temporary, deleted at the end of this task)

**Interfaces:**
- Produces: `npm run test` runs Vitest once; `npm run test:watch` runs it in watch mode. Later tasks (4, 5, 6) add real test files under `lib/`.

- [ ] **Step 1: Install Vitest**

```bash
npm install --save-dev vitest
```

- [ ] **Step 2: Add `vitest.config.ts`**

```ts
import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "node",
    include: ["lib/**/*.test.ts"],
  },
});
```

- [ ] **Step 3: Add test scripts to `package.json`**

```json
{
  "scripts": {
    "test": "vitest run",
    "test:watch": "vitest"
  }
}
```

- [ ] **Step 4: Write a sanity test to confirm the pipeline works**

```ts
// lib/sanity.test.ts
import { describe, it, expect } from "vitest";

describe("vitest setup", () => {
  it("runs", () => {
    expect(1 + 1).toBe(2);
  });
});
```

- [ ] **Step 5: Run it**

Run: `npm run test`
Expected: 1 test file, 1 test, PASS.

- [ ] **Step 6: Delete the sanity test**

```bash
rm lib/sanity.test.ts
```

- [ ] **Step 7: Commit**

```bash
git add vitest.config.ts package.json package-lock.json
git commit -m "chore: set up Vitest for pure-logic unit tests"
```

---

## Task 4: `lib/campaign-phase.ts` — lote/date resolution (TDD)

**Files:**
- Create: `lib/campaign-phase.ts`
- Test: `lib/campaign-phase.test.ts`

**Interfaces:**
- Produces:
  - `export interface LotePhase { id: string; label: string; price: string; installment: string; startDate: string; endDate: string; barText: string; barVariant: "default" | "urgent"; }`
  - `export function getCurrentLote(lotes: LotePhase[], now: Date): LotePhase`
- Consumed by: Task 15 (`config.ts` defines the `lotes` array), Task 17 (sales page price card + sticky bar), Task 9 (`StickyBar`/`CountdownTimer` usage in the page, not the component itself).

- [ ] **Step 1: Write the failing tests**

```ts
// lib/campaign-phase.test.ts
import { describe, it, expect } from "vitest";
import { getCurrentLote, type LotePhase } from "./campaign-phase";

const lotes: LotePhase[] = [
  {
    id: "lote1",
    label: "Lote 1",
    price: "R$ 3.200",
    installment: "12x de R$ 291",
    startDate: "2026-08-10",
    endDate: "2026-08-14",
    barText: "Lote 1 vale até quinta, 13/08",
    barVariant: "default",
  },
  {
    id: "lote2",
    label: "Lote 2",
    price: "R$ 3.500",
    installment: "12x de R$ 318",
    startDate: "2026-08-14",
    endDate: "2026-08-21",
    barText: "Vagas abertas — R$ 3.500",
    barVariant: "default",
  },
  {
    id: "final",
    label: "Últimas horas",
    price: "R$ 3.500",
    installment: "12x de R$ 318",
    startDate: "2026-08-21",
    endDate: "2026-08-25",
    barText: "Últimas horas de inscrição",
    barVariant: "urgent",
  },
];

describe("getCurrentLote", () => {
  it("returns lote1 when now falls inside its window", () => {
    expect(getCurrentLote(lotes, new Date("2026-08-11T12:00:00Z")).id).toBe("lote1");
  });

  it("returns lote2 when now falls inside its window", () => {
    expect(getCurrentLote(lotes, new Date("2026-08-15T12:00:00Z")).id).toBe("lote2");
  });

  it("returns final when now falls inside the last window", () => {
    expect(getCurrentLote(lotes, new Date("2026-08-22T12:00:00Z")).id).toBe("final");
  });

  it("returns the first lote when now is before all windows", () => {
    expect(getCurrentLote(lotes, new Date("2026-08-01T00:00:00Z")).id).toBe("lote1");
  });

  it("returns the last lote when now is after all windows", () => {
    expect(getCurrentLote(lotes, new Date("2026-09-01T00:00:00Z")).id).toBe("final");
  });

  it("treats the end date as exclusive (boundary belongs to the next lote)", () => {
    expect(getCurrentLote(lotes, new Date("2026-08-14T00:00:00Z")).id).toBe("lote2");
  });

  it("throws if the lotes array is empty", () => {
    expect(() => getCurrentLote([], new Date())).toThrow();
  });
});
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `npm run test -- campaign-phase`
Expected: FAIL — `lib/campaign-phase.ts` does not exist yet.

- [ ] **Step 3: Implement `lib/campaign-phase.ts`**

```ts
export interface LotePhase {
  id: string;
  label: string;
  price: string;
  installment: string;
  /** ISO date string, inclusive */
  startDate: string;
  /** ISO date string, exclusive */
  endDate: string;
  barText: string;
  barVariant: "default" | "urgent";
}

export function getCurrentLote(lotes: LotePhase[], now: Date): LotePhase {
  if (lotes.length === 0) {
    throw new Error("getCurrentLote requires at least one lote");
  }

  const nowTime = now.getTime();

  for (const lote of lotes) {
    const start = new Date(lote.startDate).getTime();
    const end = new Date(lote.endDate).getTime();
    if (nowTime >= start && nowTime < end) {
      return lote;
    }
  }

  const firstStart = new Date(lotes[0].startDate).getTime();
  if (nowTime < firstStart) {
    return lotes[0];
  }

  return lotes[lotes.length - 1];
}
```

- [ ] **Step 4: Run tests to verify they pass**

Run: `npm run test -- campaign-phase`
Expected: 7 tests PASS.

- [ ] **Step 5: Commit**

```bash
git add lib/campaign-phase.ts lib/campaign-phase.test.ts
git commit -m "feat: add getCurrentLote for date-based pricing phase resolution"
```

---

## Task 5: `lib/quiz-scoring.ts` — quiz scoring logic (TDD)

**Files:**
- Create: `lib/quiz-scoring.ts`
- Test: `lib/quiz-scoring.test.ts`

**Interfaces:**
- Produces:
  - `export type ScoreBand = "ja-tem-base" | "conduta-inconsistente" | "no-improviso";`
  - `export function sumScore(points: number[]): number`
  - `export function getScoreBand(score: number): ScoreBand`
- Consumed by: Task 19 (quiz page orchestration reads answers, sums, classifies band).

- [ ] **Step 1: Write the failing tests**

```ts
// lib/quiz-scoring.test.ts
import { describe, it, expect } from "vitest";
import { sumScore, getScoreBand } from "./quiz-scoring";

describe("sumScore", () => {
  it("returns 0 for an empty array", () => {
    expect(sumScore([])).toBe(0);
  });

  it("sums all point values", () => {
    expect(sumScore([0, 2, 3, 1, 3])).toBe(9);
  });
});

describe("getScoreBand", () => {
  it("classifies 0 as ja-tem-base", () => {
    expect(getScoreBand(0)).toBe("ja-tem-base");
  });

  it("classifies 4 as ja-tem-base (upper boundary)", () => {
    expect(getScoreBand(4)).toBe("ja-tem-base");
  });

  it("classifies 5 as conduta-inconsistente (lower boundary)", () => {
    expect(getScoreBand(5)).toBe("conduta-inconsistente");
  });

  it("classifies 9 as conduta-inconsistente (upper boundary)", () => {
    expect(getScoreBand(9)).toBe("conduta-inconsistente");
  });

  it("classifies 10 as no-improviso (lower boundary)", () => {
    expect(getScoreBand(10)).toBe("no-improviso");
  });

  it("classifies scores above 14 as no-improviso", () => {
    expect(getScoreBand(20)).toBe("no-improviso");
  });
});
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `npm run test -- quiz-scoring`
Expected: FAIL — module does not exist.

- [ ] **Step 3: Implement `lib/quiz-scoring.ts`**

```ts
export type ScoreBand = "ja-tem-base" | "conduta-inconsistente" | "no-improviso";

export function sumScore(points: number[]): number {
  return points.reduce((total, value) => total + value, 0);
}

export function getScoreBand(score: number): ScoreBand {
  if (score <= 4) return "ja-tem-base";
  if (score <= 9) return "conduta-inconsistente";
  return "no-improviso";
}
```

- [ ] **Step 4: Run tests to verify they pass**

Run: `npm run test -- quiz-scoring`
Expected: 8 tests PASS.

- [ ] **Step 5: Commit**

```bash
git add lib/quiz-scoring.ts lib/quiz-scoring.test.ts
git commit -m "feat: add quiz scoring and result band classification"
```

---

## Task 6: `lib/tracking.ts` — tracking config resolution + event helper (TDD)

**Files:**
- Create: `lib/tracking.ts`
- Test: `lib/tracking.test.ts`

**Interfaces:**
- Produces:
  - `export type TrackingEventName = "Lead" | "InitiateCheckout" | "CompleteRegistration";`
  - `export function resolveTrackingConfig(env: { metaPixelId?: string; gaId?: string }): { metaPixelId: string | null; gaId: string | null }`
  - `export function trackEvent(name: TrackingEventName, params?: Record<string, unknown>): void` — calls `window.fbq`/`window.gtag` if present, no-ops otherwise (guards on `typeof window`).
- Consumed by: Task 17/18/19 (pages fire events), a `TrackingScripts` component added inline in `app/layout.tsx` in this same task (manual-verified, not unit-tested).

- [ ] **Step 1: Write the failing tests (for the pure resolver only)**

```ts
// lib/tracking.test.ts
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
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `npm run test -- tracking`
Expected: FAIL — module does not exist.

- [ ] **Step 3: Implement `lib/tracking.ts`**

```ts
export type TrackingEventName = "Lead" | "InitiateCheckout" | "CompleteRegistration";

export function resolveTrackingConfig(env: {
  metaPixelId?: string;
  gaId?: string;
}): { metaPixelId: string | null; gaId: string | null } {
  return {
    metaPixelId: env.metaPixelId ? env.metaPixelId : null,
    gaId: env.gaId ? env.gaId : null,
  };
}

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
    gtag?: (...args: unknown[]) => void;
  }
}

export function trackEvent(name: TrackingEventName, params: Record<string, unknown> = {}): void {
  if (typeof window === "undefined") return;

  if (typeof window.fbq === "function") {
    window.fbq("track", name, params);
  }

  if (typeof window.gtag === "function") {
    window.gtag("event", name, params);
  }
}
```

- [ ] **Step 4: Run tests to verify they pass**

Run: `npm run test -- tracking`
Expected: 3 tests PASS.

- [ ] **Step 5: Add the `TrackingScripts` component (manual-verified, not unit-tested)**

```tsx
// components/tracking-scripts.tsx
import Script from "next/script";
import { resolveTrackingConfig } from "@/lib/tracking";

export function TrackingScripts() {
  const { metaPixelId, gaId } = resolveTrackingConfig({
    metaPixelId: process.env.NEXT_PUBLIC_META_PIXEL_ID,
    gaId: process.env.NEXT_PUBLIC_GA_ID,
  });

  return (
    <>
      {metaPixelId ? (
        <Script id="meta-pixel" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
            n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,
            document,'script','https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '${metaPixelId}');
            fbq('track', 'PageView');
          `}
        </Script>
      ) : null}
      {gaId ? (
        <>
          <Script src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`} strategy="afterInteractive" />
          <Script id="ga4-init" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${gaId}');
            `}
          </Script>
        </>
      ) : null}
    </>
  );
}
```

- [ ] **Step 6: Wire it into the root layout**

Edit `app/layout.tsx`, add inside `<body>` before `{children}`:

```tsx
import { TrackingScripts } from "@/components/tracking-scripts";
// ...
<body className="font-sans antialiased">
  <TrackingScripts />
  {children}
</body>
```

- [ ] **Step 7: Manual verification**

Run: `npm run dev` with no env vars set — confirm no script tags for pixel/GA render (view page source). Then run with `NEXT_PUBLIC_META_PIXEL_ID=123 NEXT_PUBLIC_GA_ID=G-TEST npm run dev` and confirm both scripts appear in page source.

- [ ] **Step 8: Commit**

```bash
git add lib/tracking.ts lib/tracking.test.ts components/tracking-scripts.tsx app/layout.tsx
git commit -m "feat: add tracking config resolver, event helper, and conditional pixel/GA scripts"
```

---

## Task 7: UI kit — Button, CtaLink, Badge, Card

**Files:**
- Create: `components/ui/button.tsx`
- Create: `components/ui/badge.tsx`
- Create: `components/ui/card.tsx`

**Interfaces:**
- Produces:
  - `export function Button(props: React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: "primary" | "secondary" }): JSX.Element`
  - `export function CtaLink(props: React.AnchorHTMLAttributes<HTMLAnchorElement> & { variant?: "primary" | "secondary"; trackAs?: TrackingEventName }): JSX.Element` — when `trackAs` is set, fires `trackEvent(trackAs)` on click (used by checkout CTAs; omitted elsewhere).
  - `export function Badge(props: { tone?: "neutral" | "success" | "alert"; children: React.ReactNode }): JSX.Element`
  - `export function Card(props: { className?: string; children: React.ReactNode }): JSX.Element`
- Consumes: `trackEvent`, `TrackingEventName` from `lib/tracking.ts` (Task 6).
- Consumed by: Tasks 9–13 (all campaign blocks and quiz screens use these).

- [ ] **Step 1: Implement `components/ui/button.tsx`**

```tsx
"use client";

import type { ButtonHTMLAttributes, AnchorHTMLAttributes } from "react";
import { trackEvent, type TrackingEventName } from "@/lib/tracking";

type Variant = "primary" | "secondary";

function variantClasses(variant: Variant): string {
  if (variant === "secondary") {
    return "bg-transparent border-2 border-brand-primary text-brand-primary hover:bg-brand-primary/5";
  }
  return "bg-brand-accent text-white hover:bg-brand-accent/90";
}

const baseClasses =
  "inline-flex items-center justify-center rounded-xl px-6 py-3 font-semibold transition-colors disabled:opacity-50 disabled:pointer-events-none";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
}

export function Button({ variant = "primary", className = "", ...props }: ButtonProps) {
  return (
    <button className={`${baseClasses} ${variantClasses(variant)} ${className}`} {...props} />
  );
}

export interface CtaLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  variant?: Variant;
  trackAs?: TrackingEventName;
}

export function CtaLink({ variant = "primary", className = "", trackAs, onClick, ...props }: CtaLinkProps) {
  return (
    <a
      className={`${baseClasses} ${variantClasses(variant)} ${className}`}
      onClick={(event) => {
        if (trackAs) trackEvent(trackAs);
        onClick?.(event);
      }}
      {...props}
    />
  );
}
```

- [ ] **Step 2: Implement `components/ui/badge.tsx`**

```tsx
export interface BadgeProps {
  tone?: "neutral" | "success" | "alert";
  children: React.ReactNode;
  className?: string;
}

function toneClasses(tone: NonNullable<BadgeProps["tone"]>): string {
  switch (tone) {
    case "success":
      return "bg-brand-success/10 text-brand-success";
    case "alert":
      return "bg-brand-alert/10 text-brand-alert";
    default:
      return "bg-brand-primary/10 text-brand-primary";
  }
}

export function Badge({ tone = "neutral", children, className = "" }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-3 py-1 text-sm font-medium ${toneClasses(tone)} ${className}`}
    >
      {children}
    </span>
  );
}
```

- [ ] **Step 3: Implement `components/ui/card.tsx`**

```tsx
export interface CardProps {
  className?: string;
  children: React.ReactNode;
}

export function Card({ className = "", children }: CardProps) {
  return (
    <div className={`rounded-xl bg-white shadow-sm shadow-black/5 p-6 ${className}`}>
      {children}
    </div>
  );
}
```

- [ ] **Step 4: Manual verification**

Create a temporary route `app/dev-preview/page.tsx` rendering `<Button>`, `<CtaLink href="#">`, `<Badge tone="success">`, `<Card>` with sample content. Run `npm run dev`, open `http://localhost:3000/dev-preview`, confirm styles match the design tokens (petróleo/terracota/rounded corners). Delete `app/dev-preview` afterward.

- [ ] **Step 5: Commit**

```bash
git add components/ui/button.tsx components/ui/badge.tsx components/ui/card.tsx
git commit -m "feat: add Button, CtaLink, Badge, Card UI primitives"
```

---

## Task 8: UI kit — Accordion, TwoColumnList

**Files:**
- Create: `components/ui/accordion.tsx`
- Create: `components/ui/two-column-list.tsx`

**Interfaces:**
- Produces:
  - `export interface AccordionItem { id: string; title: string; content: React.ReactNode }`
  - `export function Accordion(props: { items: AccordionItem[]; defaultOpenId?: string }): JSX.Element`
  - `export function TwoColumnList(props: { leftTitle: string; leftItems: string[]; rightTitle: string; rightItems: string[] }): JSX.Element`
- Consumed by: Task 11 ("Para quem é/não é" block), Task 12 (`ModuleAccordion`, `FaqSection`).

- [ ] **Step 1: Implement `components/ui/accordion.tsx`**

```tsx
"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

export interface AccordionItem {
  id: string;
  title: string;
  content: React.ReactNode;
}

export interface AccordionProps {
  items: AccordionItem[];
  defaultOpenId?: string;
}

export function Accordion({ items, defaultOpenId }: AccordionProps) {
  const [openId, setOpenId] = useState<string | null>(defaultOpenId ?? null);

  return (
    <div className="divide-y divide-brand-text/10 rounded-xl border border-brand-text/10 bg-white">
      {items.map((item) => {
        const isOpen = openId === item.id;
        return (
          <div key={item.id}>
            <button
              type="button"
              onClick={() => setOpenId(isOpen ? null : item.id)}
              className="flex w-full items-center justify-between px-5 py-4 text-left font-semibold text-brand-primary"
              aria-expanded={isOpen}
            >
              <span>{item.title}</span>
              <ChevronDown
                className={`h-5 w-5 shrink-0 transition-transform ${isOpen ? "rotate-180" : ""}`}
              />
            </button>
            {isOpen ? (
              <div className="px-5 pb-4 text-brand-text/80">{item.content}</div>
            ) : null}
          </div>
        );
      })}
    </div>
  );
}
```

- [ ] **Step 2: Implement `components/ui/two-column-list.tsx`**

```tsx
import { Check, X } from "lucide-react";

export interface TwoColumnListProps {
  leftTitle: string;
  leftItems: string[];
  rightTitle: string;
  rightItems: string[];
}

export function TwoColumnList({ leftTitle, leftItems, rightTitle, rightItems }: TwoColumnListProps) {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      <div>
        <h3 className="mb-3 font-semibold text-brand-primary">{leftTitle}</h3>
        <ul className="space-y-2">
          {leftItems.map((item) => (
            <li key={item} className="flex items-start gap-2">
              <Check className="mt-0.5 h-5 w-5 shrink-0 text-brand-success" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h3 className="mb-3 font-semibold text-brand-primary">{rightTitle}</h3>
        <ul className="space-y-2">
          {rightItems.map((item) => (
            <li key={item} className="flex items-start gap-2">
              <X className="mt-0.5 h-5 w-5 shrink-0 text-brand-alert" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
```

- [ ] **Step 3: Install lucide-react if not already present**

Run: `npm install lucide-react`

- [ ] **Step 4: Manual verification**

Reuse `app/dev-preview/page.tsx` (recreate temporarily): render `<Accordion items={[...]}>` with 2 sample items and confirm click toggles open/close; render `<TwoColumnList>` with sample arrays and confirm check/x icons render in the right colors. Delete the preview route afterward.

- [ ] **Step 5: Commit**

```bash
git add components/ui/accordion.tsx components/ui/two-column-list.tsx package.json package-lock.json
git commit -m "feat: add Accordion and TwoColumnList UI components"
```

---

## Task 9: UI kit — CountdownTimer, StickyBar

**Files:**
- Create: `components/ui/countdown-timer.tsx`
- Create: `components/ui/sticky-bar.tsx`

**Interfaces:**
- Produces:
  - `export function CountdownTimer(props: { targetDate: string }): JSX.Element`
  - `export function StickyBar(props: { text: string; variant: "default" | "urgent"; countdownTarget?: string }): JSX.Element`
- Consumes: nothing from `/lib` directly (the sales page passes already-resolved `text`/`countdownTarget` from `getCurrentLote`, see Task 17).
- Consumed by: Task 17 (sales page).

- [ ] **Step 1: Implement `components/ui/countdown-timer.tsx`**

```tsx
"use client";

import { useEffect, useState } from "react";

export interface CountdownTimerProps {
  targetDate: string;
}

function getRemaining(targetDate: string): { days: number; hours: number; minutes: number; seconds: number } | null {
  const diff = new Date(targetDate).getTime() - Date.now();
  if (diff <= 0) return null;

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  return { days, hours, minutes, seconds };
}

function pad(value: number): string {
  return value.toString().padStart(2, "0");
}

export function CountdownTimer({ targetDate }: CountdownTimerProps) {
  const [mounted, setMounted] = useState(false);
  const [remaining, setRemaining] = useState(() => getRemaining(targetDate));

  useEffect(() => {
    setMounted(true);
    const interval = setInterval(() => setRemaining(getRemaining(targetDate)), 1000);
    return () => clearInterval(interval);
  }, [targetDate]);

  if (!mounted) {
    return <span className="tabular-nums">--:--:--:--</span>;
  }

  if (!remaining) {
    return <span className="tabular-nums">00:00:00:00</span>;
  }

  return (
    <span className="tabular-nums">
      {pad(remaining.days)}:{pad(remaining.hours)}:{pad(remaining.minutes)}:{pad(remaining.seconds)}
    </span>
  );
}
```

- [ ] **Step 2: Implement `components/ui/sticky-bar.tsx`**

```tsx
import { CountdownTimer } from "./countdown-timer";

export interface StickyBarProps {
  text: string;
  variant: "default" | "urgent";
  countdownTarget?: string;
}

export function StickyBar({ text, variant, countdownTarget }: StickyBarProps) {
  const backgroundClass = variant === "urgent" ? "bg-brand-alert" : "bg-brand-primary";

  return (
    <div className={`sticky top-0 z-50 w-full ${backgroundClass} px-4 py-2 text-center text-sm font-medium text-white`}>
      <span>{text}</span>
      {countdownTarget ? (
        <span className="ml-3 font-mono">
          <CountdownTimer targetDate={countdownTarget} />
        </span>
      ) : null}
    </div>
  );
}
```

- [ ] **Step 3: Manual verification**

Recreate `app/dev-preview/page.tsx` temporarily: render `<StickyBar text="Lote 1 vale até quinta" variant="default" countdownTarget={new Date(Date.now() + 86400000).toISOString()} />` at the top of the page with some tall content below it. Run `npm run dev`, scroll the page, confirm the bar stays fixed at the top and the countdown ticks down every second without a hydration warning in the console. Also test `variant="urgent"` renders in red. Delete the preview route afterward.

- [ ] **Step 4: Commit**

```bash
git add components/ui/countdown-timer.tsx components/ui/sticky-bar.tsx
git commit -m "feat: add CountdownTimer and StickyBar UI components"
```

---

## Task 10: UI kit — VideoEmbed

**Files:**
- Create: `components/ui/video-embed.tsx`

**Interfaces:**
- Produces: `export function VideoEmbed(props: { src?: string; thumbnailAlt: string; label?: string }): JSX.Element`
- Consumed by: Task 11 (Hero, Virada block), Task 12/13 (prova social videos).

- [ ] **Step 1: Implement `components/ui/video-embed.tsx`**

```tsx
import { Play } from "lucide-react";

export interface VideoEmbedProps {
  src?: string;
  thumbnailAlt: string;
  label?: string;
}

export function VideoEmbed({ src, thumbnailAlt, label }: VideoEmbedProps) {
  if (!src) {
    return (
      <div
        role="img"
        aria-label={thumbnailAlt}
        className="flex aspect-video w-full flex-col items-center justify-center gap-2 rounded-xl bg-brand-primary/10 text-brand-primary"
      >
        <Play className="h-10 w-10" />
        <span className="text-sm font-medium">{label ?? "Vídeo em breve"}</span>
      </div>
    );
  }

  return (
    <video
      controls
      preload="metadata"
      aria-label={thumbnailAlt}
      className="aspect-video w-full rounded-xl bg-black"
    >
      <source src={src} />
    </video>
  );
}
```

- [ ] **Step 2: Manual verification**

Recreate `app/dev-preview/page.tsx` temporarily: render `<VideoEmbed thumbnailAlt="Depoimento" />` (no `src`, confirms placeholder) and `<VideoEmbed src="/sample.mp4" thumbnailAlt="Teste" />` (any local mp4 you drop in `public/`, or skip if unavailable — placeholder path is enough to confirm the `<video>` tag renders). Delete the preview route afterward.

- [ ] **Step 3: Commit**

```bash
git add components/ui/video-embed.tsx
git commit -m "feat: add VideoEmbed component with placeholder fallback"
```

---

## Task 11: Campaign blocks — Hero, PriceCard, GuaranteeBlock

**Files:**
- Create: `components/campaign/hero.tsx`
- Create: `components/campaign/price-card.tsx`
- Create: `components/campaign/guarantee-block.tsx`

**Interfaces:**
- Produces:
  - `export function Hero(props: { headline: string; subheadline: string; socialProofLine: string; ctaLabel: string; ctaHref: string; loteBadge: string }): JSX.Element` — always tracks its CTA as `"InitiateCheckout"`.
  - `export function PriceCard(props: { loteLabel: string; price: string; installment: string; originalPrice?: string; ctaLabel: string; ctaHref: string; noteText: string }): JSX.Element` — always tracks its CTA as `"InitiateCheckout"`.
  - `export function GuaranteeBlock(props: { title: string; description: string }): JSX.Element`
- Consumes: `CtaLink`, `Badge`, `Card` from `components/ui`.
- Consumed by: Task 17 (sales page).

- [ ] **Step 1: Implement `components/campaign/hero.tsx`**

```tsx
import { CtaLink } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export interface HeroProps {
  headline: string;
  subheadline: string;
  socialProofLine: string;
  ctaLabel: string;
  ctaHref: string;
  loteBadge: string;
}

export function Hero({ headline, subheadline, socialProofLine, ctaLabel, ctaHref, loteBadge }: HeroProps) {
  return (
    <section className="mx-auto max-w-3xl px-4 py-16 text-center">
      <Badge className="mb-4">{loteBadge}</Badge>
      <h1 className="text-3xl font-bold leading-tight text-brand-primary sm:text-4xl">{headline}</h1>
      <p className="mt-4 text-lg text-brand-text/80">{subheadline}</p>
      <CtaLink href={ctaHref} trackAs="InitiateCheckout" className="mt-8 inline-flex">
        {ctaLabel}
      </CtaLink>
      <p className="mt-3 text-sm text-brand-text/60">{socialProofLine}</p>
    </section>
  );
}
```

- [ ] **Step 2: Implement `components/campaign/price-card.tsx`**

```tsx
import { Card } from "@/components/ui/card";
import { CtaLink } from "@/components/ui/button";

export interface PriceCardProps {
  loteLabel: string;
  price: string;
  installment: string;
  originalPrice?: string;
  ctaLabel: string;
  ctaHref: string;
  noteText: string;
}

export function PriceCard({ loteLabel, price, installment, originalPrice, ctaLabel, ctaHref, noteText }: PriceCardProps) {
  return (
    <Card className="mx-auto max-w-md text-center">
      <p className="text-sm font-medium text-brand-primary">{loteLabel}</p>
      <p className="mt-2">
        {originalPrice ? (
          <span className="mr-2 text-lg text-brand-text/40 line-through">{originalPrice}</span>
        ) : null}
        <span className="text-4xl font-bold text-brand-primary">{price}</span>
      </p>
      <p className="mt-1 text-brand-text/70">{installment}</p>
      <CtaLink href={ctaHref} trackAs="InitiateCheckout" className="mt-6 w-full">
        {ctaLabel}
      </CtaLink>
      <p className="mt-3 text-sm text-brand-text/60">{noteText}</p>
    </Card>
  );
}
```

- [ ] **Step 3: Implement `components/campaign/guarantee-block.tsx`**

```tsx
import { ShieldCheck } from "lucide-react";

export interface GuaranteeBlockProps {
  title: string;
  description: string;
}

export function GuaranteeBlock({ title, description }: GuaranteeBlockProps) {
  return (
    <section className="mx-auto flex max-w-2xl flex-col items-center gap-3 px-4 py-12 text-center">
      <ShieldCheck className="h-10 w-10 text-brand-success" />
      <h2 className="text-xl font-bold text-brand-primary">{title}</h2>
      <p className="text-brand-text/80">{description}</p>
    </section>
  );
}
```

- [ ] **Step 4: Manual verification**

Recreate `app/dev-preview/page.tsx` temporarily with sample props for all three components (use copy fragments from Task 15's content, or placeholder text for now). Confirm layout, spacing, and centered alignment look right at both mobile (375px) and desktop widths in devtools. Delete the preview route afterward.

- [ ] **Step 5: Commit**

```bash
git add components/campaign/hero.tsx components/campaign/price-card.tsx components/campaign/guarantee-block.tsx
git commit -m "feat: add Hero, PriceCard, GuaranteeBlock campaign blocks"
```

---

## Task 12: Campaign blocks — FaqSection, ModuleAccordion, TwoColumnBlock wrapper

**Files:**
- Create: `components/campaign/faq-section.tsx`
- Create: `components/campaign/module-accordion.tsx`

**Interfaces:**
- Produces:
  - `export interface FaqItem { question: string; answer: string }`
  - `export function FaqSection(props: { items: FaqItem[] }): JSX.Element`
  - `export interface ModuleItem { number: number; title: string; description: string; isBonus?: boolean; isUpsell?: boolean }`
  - `export function ModuleAccordion(props: { modules: ModuleItem[] }): JSX.Element`
- Consumes: `Accordion` from `components/ui`.
- Consumed by: Task 17 (sales page).

- [ ] **Step 1: Implement `components/campaign/faq-section.tsx`**

```tsx
import { Accordion, type AccordionItem } from "@/components/ui/accordion";

export interface FaqItem {
  question: string;
  answer: string;
}

export interface FaqSectionProps {
  items: FaqItem[];
}

export function FaqSection({ items }: FaqSectionProps) {
  const accordionItems: AccordionItem[] = items.map((item, index) => ({
    id: `faq-${index}`,
    title: item.question,
    content: item.answer,
  }));

  return (
    <section className="mx-auto max-w-2xl px-4 py-12">
      <h2 className="mb-6 text-center text-2xl font-bold text-brand-primary">Perguntas frequentes</h2>
      <Accordion items={accordionItems} />
    </section>
  );
}
```

- [ ] **Step 2: Implement `components/campaign/module-accordion.tsx`**

```tsx
import { Accordion, type AccordionItem } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";

export interface ModuleItem {
  number: number;
  title: string;
  description: string;
  isBonus?: boolean;
  isUpsell?: boolean;
}

export interface ModuleAccordionProps {
  modules: ModuleItem[];
}

export function ModuleAccordion({ modules }: ModuleAccordionProps) {
  const accordionItems: AccordionItem[] = modules.map((module) => ({
    id: `module-${module.number}-${module.title}`,
    title: module.isBonus || module.isUpsell ? module.title : `Módulo ${module.number} — ${module.title}`,
    content: (
      <div>
        {module.isBonus ? <Badge tone="success" className="mb-2">Bônus incluído</Badge> : null}
        {module.isUpsell ? <Badge tone="alert" className="mb-2">Upsell disponível</Badge> : null}
        <p>{module.description}</p>
      </div>
    ),
  }));

  return (
    <section className="mx-auto max-w-2xl px-4 py-12">
      <h2 className="mb-6 text-center text-2xl font-bold text-brand-primary">Conteúdo da formação</h2>
      <Accordion items={accordionItems} />
    </section>
  );
}
```

- [ ] **Step 3: Manual verification**

Recreate `app/dev-preview/page.tsx` temporarily rendering `<FaqSection>` with 2-3 sample Q&As and `<ModuleAccordion>` with a mix of numbered/bonus/upsell items. Confirm badges render correctly and accordion expand/collapse works for both. Delete the preview route afterward.

- [ ] **Step 4: Commit**

```bash
git add components/campaign/faq-section.tsx components/campaign/module-accordion.tsx
git commit -m "feat: add FaqSection and ModuleAccordion campaign blocks"
```

---

## Task 13: Quiz step components — ProgressBar, ChoiceScreen, ContactFormScreen, ResultScreen

**Files:**
- Create: `components/campaign/quiz/progress-bar.tsx`
- Create: `components/campaign/quiz/choice-screen.tsx`
- Create: `components/campaign/quiz/contact-form-screen.tsx`
- Create: `components/campaign/quiz/result-screen.tsx`

**Interfaces:**
- Produces:
  - `export function ProgressBar(props: { current: number; total: number }): JSX.Element`
  - `export interface QuizOption { label: string; points: number }`
  - `export function ChoiceScreen(props: { question: string; options: QuizOption[]; onAnswer: (points: number) => void; onBack?: () => void }): JSX.Element`
  - `export interface ContactFormValues { name: string; whatsapp: string; consent: boolean }`
  - `export function ContactFormScreen(props: { onSubmit: (values: ContactFormValues) => void; onBack: () => void; isSubmitting: boolean; errorMessage?: string }): JSX.Element`
  - `export function ResultScreen(props: { title: string; body: string; ctaLabel: string; ctaHref: string }): JSX.Element`
- Consumed by: Task 19 (quiz page orchestrates these + `useReducer`).

- [ ] **Step 1: Install react-hook-form and zod**

```bash
npm install react-hook-form zod @hookform/resolvers
```

- [ ] **Step 2: Implement `components/campaign/quiz/progress-bar.tsx`**

```tsx
export interface ProgressBarProps {
  current: number;
  total: number;
}

export function ProgressBar({ current, total }: ProgressBarProps) {
  const percent = Math.round((current / total) * 100);
  return (
    <div className="h-2 w-full rounded-full bg-brand-primary/10">
      <div
        className="h-2 rounded-full bg-brand-accent transition-all"
        style={{ width: `${percent}%` }}
        role="progressbar"
        aria-valuenow={percent}
        aria-valuemin={0}
        aria-valuemax={100}
      />
    </div>
  );
}
```

- [ ] **Step 3: Implement `components/campaign/quiz/choice-screen.tsx`**

```tsx
import { ChevronLeft } from "lucide-react";

export interface QuizOption {
  label: string;
  points: number;
}

export interface ChoiceScreenProps {
  question: string;
  options: QuizOption[];
  onAnswer: (points: number) => void;
  onBack?: () => void;
}

export function ChoiceScreen({ question, options, onAnswer, onBack }: ChoiceScreenProps) {
  return (
    <div className="flex min-h-[60vh] flex-col justify-center">
      {onBack ? (
        <button
          type="button"
          onClick={onBack}
          className="mb-4 flex items-center gap-1 self-start text-sm text-brand-text/60"
        >
          <ChevronLeft className="h-4 w-4" /> Voltar
        </button>
      ) : null}
      <h2 className="mb-6 text-xl font-bold text-brand-primary sm:text-2xl">{question}</h2>
      <div className="space-y-3">
        {options.map((option) => (
          <button
            key={option.label}
            type="button"
            onClick={() => onAnswer(option.points)}
            className="w-full rounded-xl border border-brand-primary/20 bg-white px-5 py-4 text-left transition-colors hover:border-brand-accent hover:bg-brand-accent/5"
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
}
```

- [ ] **Step 4: Implement `components/campaign/quiz/contact-form-screen.tsx`**

```tsx
"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

const contactSchema = z.object({
  name: z.string().min(2, "Digite seu nome completo"),
  whatsapp: z
    .string()
    .regex(/^\(\d{2}\)\s?\d{4,5}-?\d{4}$/, "Digite um WhatsApp válido, ex: (11) 91234-5678"),
  consent: z.literal(true, {
    errorMap: () => ({ message: "É preciso aceitar para continuar" }),
  }),
});

export type ContactFormValues = z.infer<typeof contactSchema>;

export interface ContactFormScreenProps {
  onSubmit: (values: ContactFormValues) => void;
  onBack: () => void;
  isSubmitting: boolean;
  errorMessage?: string;
}

function formatWhatsapp(value: string): string {
  const digits = value.replace(/\D/g, "").slice(0, 11);
  if (digits.length <= 2) return digits;
  if (digits.length <= 7) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
}

export function ContactFormScreen({ onSubmit, onBack, isSubmitting, errorMessage }: ContactFormScreenProps) {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<ContactFormValues>({ resolver: zodResolver(contactSchema) });

  const whatsapp = watch("whatsapp") ?? "";

  return (
    <div className="flex min-h-[60vh] flex-col justify-center">
      <button
        type="button"
        onClick={onBack}
        className="mb-4 flex items-center gap-1 self-start text-sm text-brand-text/60"
      >
        <ChevronLeft className="h-4 w-4" /> Voltar
      </button>
      <h2 className="mb-2 text-xl font-bold text-brand-primary sm:text-2xl">
        Só mais um passo pra ver seu resultado
      </h2>
      <p className="mb-6 text-brand-text/70">
        Quero te mandar o diagnóstico completo e, se fizer sentido, o convite pra uma aula ao vivo gratuita
        sobre o assunto.
      </p>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label htmlFor="name" className="mb-1 block text-sm font-medium">
            Nome
          </label>
          <input
            id="name"
            type="text"
            className="w-full rounded-xl border border-brand-primary/20 px-4 py-3"
            {...register("name")}
          />
          {errors.name ? <p className="mt-1 text-sm text-brand-alert">{errors.name.message}</p> : null}
        </div>
        <div>
          <label htmlFor="whatsapp" className="mb-1 block text-sm font-medium">
            WhatsApp
          </label>
          <input
            id="whatsapp"
            type="tel"
            placeholder="(11) 91234-5678"
            className="w-full rounded-xl border border-brand-primary/20 px-4 py-3"
            value={whatsapp}
            {...register("whatsapp", {
              onChange: (event) => setValue("whatsapp", formatWhatsapp(event.target.value)),
            })}
          />
          {errors.whatsapp ? <p className="mt-1 text-sm text-brand-alert">{errors.whatsapp.message}</p> : null}
        </div>
        <div className="flex items-start gap-2">
          <input id="consent" type="checkbox" className="mt-1" {...register("consent")} />
          <label htmlFor="consent" className="text-sm text-brand-text/70">
            Concordo com o tratamento dos meus dados conforme a{" "}
            <a href="/privacidade" className="underline">
              Política de Privacidade
            </a>
            .
          </label>
        </div>
        {errors.consent ? <p className="text-sm text-brand-alert">{errors.consent.message}</p> : null}
        {errorMessage ? <p className="text-sm text-brand-alert">{errorMessage}</p> : null}
        <Button type="submit" disabled={isSubmitting} className="w-full">
          {isSubmitting ? "Enviando..." : "Ver meu resultado"}
        </Button>
        <p className="text-center text-xs text-brand-text/50">
          Seus dados estão seguros e não serão compartilhados.
        </p>
      </form>
    </div>
  );
}
```

- [ ] **Step 5: Implement `components/campaign/quiz/result-screen.tsx`**

```tsx
import { CtaLink } from "@/components/ui/button";

export interface ResultScreenProps {
  title: string;
  body: string;
  ctaLabel: string;
  ctaHref: string;
}

export function ResultScreen({ title, body, ctaLabel, ctaHref }: ResultScreenProps) {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center text-center">
      <h2 className="mb-4 text-2xl font-bold text-brand-primary">{title}</h2>
      <p className="mb-8 max-w-xl text-brand-text/80">{body}</p>
      <CtaLink href={ctaHref}>{ctaLabel}</CtaLink>
    </div>
  );
}
```

- [ ] **Step 6: Manual verification**

Recreate `app/dev-preview/page.tsx` temporarily, render each of the four components with sample props in isolation (a fixed `current`/`total` for `ProgressBar`, a sample question/options for `ChoiceScreen`, the form standalone for `ContactFormScreen` — try submitting with an invalid phone to see the zod error, and a sample `ResultScreen`). Confirm the WhatsApp mask formats as you type (`11912345678` → `(11) 91234-5678`) and the consent checkbox blocks submission when unchecked. Delete the preview route afterward.

- [ ] **Step 7: Commit**

```bash
git add components/campaign/quiz package.json package-lock.json
git commit -m "feat: add quiz step components (progress bar, choice, contact form, result)"
```

---

## Task 14: Campaign config — `config.ts`

**Files:**
- Create: `app/(campaigns)/zumbido-na-pratica/config.ts`

**Interfaces:**
- Produces:
  ```ts
  export interface CampaignConfig {
    checkoutLink: string;
    whatsappGroupLink: string;
    quizResultCtaLink: string;
    showShareSection: boolean;
  }
  export const campaignConfig: CampaignConfig;
  export const lotes: LotePhase[]; // from lib/campaign-phase
  ```
- Consumes: `LotePhase` type from `lib/campaign-phase.ts` (Task 4).
- Consumed by: Task 17 (vendas), Task 18 (obrigado), Task 19 (quiz). Note: `LEAD_WEBHOOK_URL` is read directly from `process.env` inside Task 16's API route (not exposed via `campaignConfig`), since it's a server-only secret that must never reach client bundles.

- [ ] **Step 1: Implement `app/(campaigns)/zumbido-na-pratica/config.ts`**

```ts
import type { LotePhase } from "@/lib/campaign-phase";

export interface CampaignConfig {
  checkoutLink: string;
  whatsappGroupLink: string;
  quizResultCtaLink: string;
  showShareSection: boolean;
}

export const campaignConfig: CampaignConfig = {
  checkoutLink: process.env.CHECKOUT_LINK || "#checkout-pendente",
  whatsappGroupLink: process.env.WHATSAPP_GROUP_LINK || "#whatsapp-pendente",
  // Regra de negócio (ver pagina-captacao-quiz.md): antes de 20/08 aponta pro grupo da
  // aula aberta; a partir de 20/08 troque manualmente para campaignConfig.checkoutLink
  // ou para a URL da página de vendas publicada.
  quizResultCtaLink: process.env.WHATSAPP_GROUP_LINK || "#whatsapp-pendente",
  showShareSection: true,
};

// Datas de exemplo herdadas de pagina-vendas.md — confirmar o ano real dos lotes
// antes de publicar (mantidas aqui como o único lugar que precisa mudar por turma).
export const lotes: LotePhase[] = [
  {
    id: "lote1",
    label: "Lote 1",
    price: "R$ 3.200",
    installment: "12x de R$ 291",
    startDate: "2026-08-10",
    endDate: "2026-08-14",
    barText: "🟡 Lote de abertura: R$ 3.200 (12x de R$ 291) — vale até quinta, 13/08",
    barVariant: "default",
  },
  {
    id: "lote2",
    label: "Lote 2",
    price: "R$ 3.500",
    installment: "12x de R$ 318",
    startDate: "2026-08-14",
    endDate: "2026-08-21",
    barText: "Vagas abertas — R$ 3.500 (12x de R$ 318)",
    barVariant: "default",
  },
  {
    id: "final",
    label: "Últimas 96h",
    price: "R$ 3.500",
    installment: "12x de R$ 318",
    startDate: "2026-08-21",
    endDate: "2026-08-25",
    barText: "🔴 Últimas horas de inscrição — fecha 24/08 às 23h59",
    barVariant: "urgent",
  },
];
```

- [ ] **Step 2: Manual verification**

Run: `npx tsc --noEmit`
Expected: no type errors (confirms `LotePhase` import matches Task 4's export).

- [ ] **Step 3: Commit**

```bash
git add "app/(campaigns)/zumbido-na-pratica/config.ts"
git commit -m "feat: add zumbido-na-pratica campaign config (links, lotes)"
```

---

## Task 15: Campaign content — `content.ts`

**Files:**
- Create: `app/(campaigns)/zumbido-na-pratica/content.ts`

**Interfaces:**
- Produces: typed constants `heroContent`, `dorContent`, `viradaContent`, `paraQuemContent`, `transformacaoContent`, `modulosContent: ModuleItem[]`, `quemEnsinaContent`, `provaSocialContent`, `ofertaContent`, `garantiaContent`, `faqContent: FaqItem[]`, `ctaFinalContent`, `obrigadoContent`, `quizContent` (all copy verbatim from the 3 source `.md` files, structured for the components built in Tasks 11-13).
- Consumes: `ModuleItem` type from `components/campaign/module-accordion.tsx`, `FaqItem` type from `components/campaign/faq-section.tsx`, `QuizOption` type from `components/campaign/quiz/choice-screen.tsx`.
- Consumed by: Task 17, 18, 19 (pages).

- [ ] **Step 1: Implement `app/(campaigns)/zumbido-na-pratica/content.ts`**

```ts
import type { ModuleItem } from "@/components/campaign/module-accordion";
import type { FaqItem } from "@/components/campaign/faq-section";
import type { QuizOption } from "@/components/campaign/quiz/choice-screen";

export const heroContent = {
  headline: 'Pare de dizer "não tem cura, vamos aprender a conviver" pro seu paciente com zumbido',
  subheadline:
    "Aprenda o protocolo que eu uso pra tratar zumbido de verdade — Terapia Manual, Laserterapia, Neuromodulação e mais 4 abordagens, direto de quem estuda o cérebro por profissão.",
  socialProofLine: "Mais de 65 profissionais da saúde já passaram por essa formação",
  ctaLabel: "Quero minha vaga na Turma 4",
  loteBadge: "Lote 1 até 13/08",
};

export const dorContent = {
  paragraphs: [
    "Você já teve esse paciente.",
    "Ele chega falando que o zumbido não deixa ele dormir. Você pede o exame. O exame vem normal.",
    'E aí você fala a frase que todo mundo fala: "não tem cura, vamos aprender a conviver."',
    "Não é mentira. Mas também não é resposta — é o jeito educado de dizer que você não sabe o que fazer com aquele paciente.",
    "Eu sei, porque eu também dizia isso.",
  ],
};

export const viradaContent = {
  title: "O zumbido não está no ouvido.",
  paragraphs: [
    "O ouvido pode ter sido o gatilho. Mas quem sustenta o zumbido, na maioria dos casos, é a via auditiva central — a parte do cérebro que aprendeu a amplificar um sinal que não deveria estar ali.",
    "É por isso que o exame vem normal. Você não está tratando o órgão errado — você está tratando o sintoma errado.",
    "Quando eu entendi isso, o tratamento mudou. Parei de tentar \"consertar o ouvido\" e passei a modular o sistema inteiro — com terapia manual, laser, neuromodulação e mindfulness, cada um agindo numa parte diferente desse circuito.",
    "É esse protocolo que eu ensino no Zumbido na Prática.",
  ],
  videoSrc: undefined as string | undefined,
};

export const paraQuemContent = {
  leftTitle: "É pra você se:",
  leftItems: [
    "Você atende ou pretende atender pacientes com zumbido",
    "Você já se sentiu sem resposta na frente de um paciente assim",
    'Você quer sair do "não tem cura" e ter conduta de verdade',
    "Você é fono, fisio, TO, dentista ou outro profissional da saúde que lida com esse sintoma",
  ],
  rightTitle: "Não é pra você se:",
  rightItems: [
    "Você busca só teoria acadêmica sobre zumbido, sem aplicação clínica",
    "Você não atende pacientes (o curso é 100% voltado à prática)",
    "Você já domina os 7 protocolos e busca apenas atualização pontual",
  ],
};

export const transformacaoContent = {
  title: "Ao final da formação, você vai saber:",
  items: [
    "Diferenciar os tipos de zumbido e escolher o protocolo certo pra cada caso",
    "Aplicar Terapia Manual, Laserterapia e Laserpuntura com indicação e contraindicação claras",
    "Usar Neuromodulação (TDS e vagal) em pacientes que não respondem às abordagens convencionais",
    'Conduzir um caso de Surdez Súbita com segurança, sem "torcer para o paciente melhorar sozinho"',
    "Estruturar seu atendimento de zumbido como serviço — como precificar, como montar pacote de sessões",
    "Continuar sendo acompanhada nos seus primeiros casos reais, depois do curso",
  ],
};

// Pontuação de diagnóstico atribuída por resposta (a mais insegura = mais pontos),
// seguindo a regra descrita em pagina-captacao-quiz.md. A ordem das opções é a
// mesma do MD original.
export const modulosContent: ModuleItem[] = [
  {
    number: 1,
    title: "Mindfulness",
    description:
      "Técnicas de regulação da atenção que reduzem o incômodo do zumbido mesmo quando o som em si não muda.",
  },
  {
    number: 2,
    title: "Terapia Manual",
    description:
      "Abordagem manual voltada à musculatura e articulações que influenciam o sistema auditivo — nenhum equipamento necessário.",
  },
  {
    number: 3,
    title: "Laserterapia",
    description: "Protocolo de aplicação, dosagem e frequência para casos indicados.",
  },
  {
    number: 4,
    title: "Laserpuntura",
    description: "Pontos e protocolo específicos para zumbido, combinando laser com abordagem de acupuntura.",
  },
  {
    number: 5,
    title: "Neuromodulação (TDS e vagal)",
    description:
      "Conteúdo novo desta turma. Técnicas de estimulação que atuam diretamente no circuito neural responsável por manter o zumbido.",
  },
  {
    number: 6,
    title: "Surdez Súbita (nome a confirmar)",
    description: "Conduta diante de um caso de surdez súbita — o que fazer, quando encaminhar, o que não pode esperar.",
  },
  {
    number: 7,
    title: "PAC e Estimulação Trigeminal",
    description: "Abordagens complementares para casos que não respondem só às técnicas anteriores.",
  },
  {
    number: 0,
    title: "Bônus — Mentoria de Primeiros Pacientes (3 meses)",
    description:
      "Depois do curso, você traz seus casos reais e eu te ajudo na conduta, por 3 meses. Quem quiser continuar depois, segue por R$ 147/mês — sem cobrança automática, você decide.",
    isBonus: true,
  },
  {
    number: 0,
    title: "Bônus — Módulo Empresarial",
    description:
      "Como precificar, montar pacote de sessões e estruturar o atendimento de zumbido como serviço no seu consultório.",
    isBonus: true,
  },
  {
    number: 0,
    title: "Bônus — Mini Curso de Tráfego",
    description: "Como atrair o paciente certo pro seu consultório — de nada adianta o protocolo sem gente pra aplicar nele.",
    isBonus: true,
  },
  {
    number: 0,
    title: "Upsell — Módulo de Avaliação (R$ 700)",
    description:
      "Protocolo completo de avaliação do paciente com zumbido, do zero. Oferecido no checkout, não incluso no pacote.",
    isUpsell: true,
  },
];

export const quemEnsinaContent = {
  name: "[Nome]",
  bio: "Estudo o cérebro há [X anos], com foco em como o sistema nervoso processa e mantém sintomas como o zumbido. Já formei mais de 65 profissionais da saúde através do Zumbido na Prática, em 3 turmas anteriores.\n\nEsta é a primeira turma depois de um tempo parada — usei essa pausa pra reformular o curso inteiro e trazer o que há de mais atual em neuromodulação para o tratamento do zumbido.",
  photoSrc: undefined as string | undefined,
};

export const provaSocialContent = {
  headline: "Mais de 65 profissionais já passaram pela formação. Veja o que mudou na prática delas:",
  videos: [
    { src: undefined as string | undefined, thumbnailAlt: "Depoimento 1" },
    { src: undefined as string | undefined, thumbnailAlt: "Depoimento 2" },
  ],
};

export const ofertaContent = {
  title: "O que está incluso:",
  items: [
    "7 módulos completos, 100% ao vivo (R$ 3.500 avulso — não disponível nesta turma)",
    "Gravação de todas as aulas por 12 meses",
    "Mentoria de Primeiros Pacientes — 3 meses inclusos",
    "Módulo Empresarial — bônus",
    "Mini Curso de Tráfego — bônus",
    "Acesso ao grupo exclusivo da turma",
  ],
  closingLine: "Tudo isso por R$ 3.200 no Lote 1 (depois R$ 3.500)",
};

export const garantiaContent = {
  title: "Garantia de 7 dias após o primeiro encontro",
  description:
    "Você assiste ao primeiro fim de semana de aula (29 e 30/08) inteiro. Se não for pra você, é só pedir reembolso até 05/09 — sem burocracia.",
};

export const faqContent: FaqItem[] = [
  {
    question: "O curso é gravado ou ao vivo?",
    answer:
      "100% ao vivo, nos fins de semana: 29 e 30/08, 12 e 13/09, 26 e 27/09, 03 e 04/10. Toda aula fica gravada e disponível por 12 meses.",
  },
  {
    question: "Preciso ter equipamento de laser?",
    answer:
      "Não para todos os módulos. Terapia Manual, Mindfulness e Estimulação Trigeminal não pedem equipamento. Laser e Neuromodulação, sim — e o Módulo Empresarial te ajuda a planejar esse investimento.",
  },
  {
    question: "Não sei se dá tempo na minha agenda.",
    answer: "São 4 fins de semana, e você não precisa assistir tudo ao vivo — a gravação fica 1 ano no ar.",
  },
  {
    question: "Como funciona a Mentoria de Primeiros Pacientes?",
    answer:
      "Você traz seus casos reais e eu ajudo na conduta, por 3 meses inclusos no pacote. Depois, quem quiser continuar segue por R$ 147/mês — você decide, sem cobrança automática.",
  },
  {
    question: "Posso comprar só um módulo?",
    answer: "Não nesta turma — os módulos saem só no pacote completo, porque o protocolo depende da sequência.",
  },
  {
    question: "Tem parcelamento?",
    answer: "Sim, em até 12x.",
  },
  {
    question: "E se eu não gostar?",
    answer: "Você tem garantia de 7 dias após o primeiro encontro.",
  },
];

export const ctaFinalContent = {
  title: "A Turma 4 do Zumbido na Prática está aberta.",
  subtitle: "Comece 29 de agosto com o protocolo que muda o que você faz na segunda-feira de manhã.",
  ctaLabel: "Quero minha vaga",
};

export const obrigadoContent = {
  confirmation: {
    title: "Sua vaga na Turma 4 está garantida.",
    body: "Bem-vinda, {nome}! Fico muito feliz de te ter nessa turma — principalmente sendo essa a primeira depois de um tempo parada.\n\nVocê vai receber um e-mail de confirmação em instantes com os dados de acesso.",
  },
  nextStep: {
    title: "Primeiro passo: entre no grupo da turma",
    body: "É lá que eu aviso sobre horário, link da aula ao vivo e materiais. Não perca esse passo.",
    ctaLabel: "Entrar no grupo da Turma 4",
  },
  timeline: {
    title: "O que acontece a partir de agora:",
    items: [
      { label: "Hoje", description: "você recebe o e-mail com acesso à área de membros" },
      { label: "Nos próximos dias", description: "materiais de apoio liberados aos poucos" },
      { label: "29 e 30/08", description: "primeiro encontro ao vivo — Introdução ao Zumbido + minha aula" },
      { label: "Encontros seguintes", description: "12 e 13/09, 26 e 27/09, 03 e 04/10" },
    ],
  },
  upsell: {
    title: "Antes de você sair: um complemento que faz sentido com o que você acabou de garantir",
    body: "O curso te dá o protocolo de tratamento. O Módulo de Avaliação te dá o protocolo de diagnóstico — como avaliar o paciente com zumbido do zero, antes de decidir qual dos 7 módulos aplicar.",
    price: "R$ 700",
    priceNote: "acesso imediato, junto com o resto do curso.",
    acceptLabel: "Quero adicionar o Módulo de Avaliação",
    declineLabel: "Não, obrigada, só o combo por enquanto",
  },
  share: {
    title: "Acabou de garantir sua vaga? Conta pra galera:",
    suggestedText: "Acabei de entrar na Turma 4 do Zumbido na Prática 🎧 #zumbidonapratica",
    ctaLabel: "Compartilhar nos Stories",
  },
};

export interface QuizQuestion {
  id: string;
  question: string;
  options: QuizOption[];
}

export const quizContent = {
  cover: {
    headline:
      'Você sabe tratar zumbido de verdade — ou está só "aprendendo a conviver" junto com o paciente?',
    body: "Responda 5 perguntas rápidas e descubra em que nível está sua conduta clínica pra zumbido.\n\nLeva 2 minutos.",
    ctaLabel: "Começar",
  },
  questions: [
    {
      id: "frequencia",
      question: "Com que frequência chega paciente com zumbido no seu consultório?",
      options: [
        { label: "Quase todo mês", points: 0 },
        { label: "De vez em quando", points: 1 },
        { label: "Raramente, mas quando chega eu fico sem saber o que fazer", points: 3 },
        { label: "Ainda não atendo, mas quero me preparar", points: 2 },
      ],
    },
    {
      id: "explicacao",
      question: "Quando o exame do paciente vem normal, mas o zumbido continua, você sabe explicar por quê?",
      options: [
        { label: "Sim, sei explicar com segurança", points: 0 },
        { label: "Mais ou menos, mas não consigo explicar com clareza pro paciente", points: 2 },
        { label: "Não sei — e confesso que isso me incomoda", points: 3 },
      ],
    },
    {
      id: "criterio",
      question: "Você sabe quando indicar Laserterapia em vez de Neuromodulação para um caso de zumbido?",
      options: [
        { label: "Sim, tenho critério claro pra isso", points: 0 },
        { label: "Eu uso sempre a mesma abordagem, não importa o caso", points: 2 },
        { label: "Não sei diferenciar quando usar cada uma", points: 3 },
      ],
    },
    {
      id: "sentimento",
      question: "Como você se sente quando um paciente de zumbido volta e diz que não melhorou nada?",
      options: [
        { label: "Frustrada, sem saber o próximo passo", points: 3 },
        { label: "Incomodada, mas sigo o protocolo que conheço", points: 1 },
        { label: "Tranquila, sei ajustar a conduta", points: 0 },
      ],
    },
    {
      id: "intencao",
      question: "Se você tivesse um protocolo estruturado e testado pra zumbido, o que mudaria primeiro no seu consultório?",
      options: [
        { label: "Eu pararia de encaminhar tanto paciente pra outros profissionais", points: 2 },
        { label: "Eu cobraria mais pelo meu atendimento, porque teria mais segurança", points: 1 },
        { label: "Eu simplesmente dormiria mais tranquila sabendo o que fazer", points: 3 },
      ],
    },
  ] satisfies QuizQuestion[],
  results: {
    "ja-tem-base": {
      title: "{nome}, seu diagnóstico: você já tem uma base sólida em zumbido.",
      body: "O que pode fazer diferença agora não é aprender do zero, é adicionar abordagens que você provavelmente ainda não usa — como Neuromodulação e Laserpuntura — e ganhar mais critério pra escolher entre elas.",
    },
    "conduta-inconsistente": {
      title: "{nome}, seu diagnóstico: você já sabe o básico, mas ainda decide caso a caso, sem um protocolo fixo.",
      body: "Isso funciona até aparecer o paciente que não responde ao que você já conhece — e aí volta a insegurança. Vale fechar essa lacuna antes que ela custe um paciente insatisfeito.",
    },
    "no-improviso": {
      title: "{nome}, seu diagnóstico: você está no improviso com zumbido — e não está sozinha.",
      body: "A maioria das profissionais que responde esse quiz está exatamente onde você está: sem exame alterado pra guiar a conduta, sem critério claro entre as abordagens, e com aquela sensação de estar torcendo pro paciente melhorar sozinho. Isso tem solução — e não é estudar mais teoria, é ter protocolo.",
    },
  },
  resultCtaLabel: "Quero conhecer o protocolo — aula gratuita dia 18/08",
};
```

- [ ] **Step 2: Manual verification**

Run: `npx tsc --noEmit`
Expected: no type errors (confirms `ModuleItem`, `FaqItem`, `QuizOption` imports match Tasks 12–13 exports, and `quizContent.questions` satisfies `QuizQuestion[]`).

- [ ] **Step 3: Commit**

```bash
git add "app/(campaigns)/zumbido-na-pratica/content.ts"
git commit -m "feat: add zumbido-na-pratica campaign copy (content.ts)"
```

---

## Task 16: `POST /api/lead` route

**Files:**
- Create: `app/api/lead/route.ts`
- Test: `app/api/lead/route.test.ts`

**Interfaces:**
- Produces: `export async function POST(request: Request): Promise<Response>` — accepts JSON `{ name: string; whatsapp: string; consent: boolean; scoreBand: string; score: number }`, validates with zod, forwards to `process.env.LEAD_WEBHOOK_URL` via `fetch`, always resolves `{ ok: true }` (200) unless the request body itself is invalid (400).
- Consumed by: Task 19 (quiz page calls this via `fetch("/api/lead", ...)`).

- [ ] **Step 1: Write the failing tests**

```ts
// app/api/lead/route.test.ts
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
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `npm run test -- route`
Expected: FAIL — `app/api/lead/route.ts` does not exist.

- [ ] **Step 3: Implement `app/api/lead/route.ts`**

```ts
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
```

- [ ] **Step 4: Update `vitest.config.ts` to also include route tests**

```ts
import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "node",
    include: ["lib/**/*.test.ts", "app/**/*.test.ts"],
  },
});
```

- [ ] **Step 5: Run tests to verify they pass**

Run: `npm run test -- route`
Expected: 3 tests PASS.

- [ ] **Step 6: Commit**

```bash
git add app/api/lead/route.ts app/api/lead/route.test.ts vitest.config.ts
git commit -m "feat: add POST /api/lead route with validation and webhook forwarding"
```

---

## Task 17: Sales page — `/zumbido-na-pratica/vendas`

**Files:**
- Create: `app/(campaigns)/zumbido-na-pratica/vendas/page.tsx`

**Interfaces:**
- Consumes: `getCurrentLote` (Task 4), `campaignConfig`/`lotes` (Task 14), all content constants from `content.ts` (Task 15), `Hero`/`PriceCard`/`GuaranteeBlock`/`FaqSection`/`ModuleAccordion` (Tasks 11-12), `StickyBar`/`TwoColumnList`/`VideoEmbed`/`Card`/`CtaLink`/`Badge` (Tasks 7-10), `trackEvent` (Task 6).
- Produces: the full 14-dobra sales page at `/zumbido-na-pratica/vendas`.

- [ ] **Step 1: Implement the page**

```tsx
// app/(campaigns)/zumbido-na-pratica/vendas/page.tsx
import { getCurrentLote } from "@/lib/campaign-phase";
import { StickyBar } from "@/components/ui/sticky-bar";
import { CtaLink } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { TwoColumnList } from "@/components/ui/two-column-list";
import { VideoEmbed } from "@/components/ui/video-embed";
import { Hero } from "@/components/campaign/hero";
import { PriceCard } from "@/components/campaign/price-card";
import { GuaranteeBlock } from "@/components/campaign/guarantee-block";
import { FaqSection } from "@/components/campaign/faq-section";
import { ModuleAccordion } from "@/components/campaign/module-accordion";
import { campaignConfig, lotes } from "../config";
import {
  heroContent,
  dorContent,
  viradaContent,
  paraQuemContent,
  transformacaoContent,
  modulosContent,
  quemEnsinaContent,
  provaSocialContent,
  ofertaContent,
  garantiaContent,
  faqContent,
  ctaFinalContent,
} from "../content";

export default function VendasPage() {
  const currentLote = getCurrentLote(lotes, new Date());

  return (
    <>
      <StickyBar text={currentLote.barText} variant={currentLote.barVariant} countdownTarget={currentLote.endDate} />

      {/* 1. Hero */}
      <Hero
        headline={heroContent.headline}
        subheadline={heroContent.subheadline}
        socialProofLine={heroContent.socialProofLine}
        ctaLabel={heroContent.ctaLabel}
        ctaHref={campaignConfig.checkoutLink}
        loteBadge={heroContent.loteBadge}
      />

      {/* 3. Dor */}
      <section className="mx-auto max-w-xl px-4 py-12 text-center">
        {dorContent.paragraphs.map((paragraph) => (
          <p key={paragraph} className="mb-4 text-lg text-brand-text/80">
            {paragraph}
          </p>
        ))}
      </section>

      {/* 4. Virada */}
      <section className="mx-auto max-w-2xl px-4 py-12">
        <h2 className="mb-6 text-center text-2xl font-bold text-brand-primary">{viradaContent.title}</h2>
        <VideoEmbed src={viradaContent.videoSrc} thumbnailAlt="Por que o zumbido não está no ouvido" />
        <div className="mt-6 space-y-4">
          {viradaContent.paragraphs.map((paragraph) => (
            <p key={paragraph} className="text-brand-text/80">
              {paragraph}
            </p>
          ))}
        </div>
      </section>

      {/* 5. Para quem é / não é */}
      <section className="mx-auto max-w-3xl px-4 py-12">
        <TwoColumnList {...paraQuemContent} />
      </section>

      {/* 6. Transformação */}
      <section className="mx-auto max-w-2xl px-4 py-12">
        <h2 className="mb-6 text-center text-2xl font-bold text-brand-primary">{transformacaoContent.title}</h2>
        <ul className="space-y-3">
          {transformacaoContent.items.map((item) => (
            <li key={item} className="flex items-start gap-2">
              <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-brand-accent" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* 7. Conteúdo — 7 módulos */}
      <ModuleAccordion modules={modulosContent} />

      {/* 8. Quem ensina */}
      <section className="mx-auto max-w-2xl px-4 py-12 text-center">
        <h2 className="mb-4 text-2xl font-bold text-brand-primary">Sou {quemEnsinaContent.name}, neurocientista.</h2>
        <p className="whitespace-pre-line text-brand-text/80">{quemEnsinaContent.bio}</p>
      </section>

      {/* 9. Prova social */}
      <section className="mx-auto max-w-4xl px-4 py-12">
        <h2 className="mb-6 text-center text-2xl font-bold text-brand-primary">{provaSocialContent.headline}</h2>
        <div className="grid gap-6 md:grid-cols-2">
          {provaSocialContent.videos.map((video, index) => (
            <VideoEmbed key={index} src={video.src} thumbnailAlt={video.thumbnailAlt} />
          ))}
        </div>
      </section>

      {/* 10. Oferta e bônus */}
      <section className="mx-auto max-w-xl px-4 py-12">
        <Card>
          <h2 className="mb-4 text-xl font-bold text-brand-primary">{ofertaContent.title}</h2>
          <ul className="space-y-2">
            {ofertaContent.items.map((item) => (
              <li key={item} className="text-brand-text/80">
                — {item}
              </li>
            ))}
          </ul>
          <p className="mt-4 font-semibold text-brand-primary">{ofertaContent.closingLine}</p>
        </Card>
      </section>

      {/* 11. Preço e lotes */}
      <section className="px-4 py-12">
        <PriceCard
          loteLabel={`Turma 4 — ${currentLote.label}`}
          price={currentLote.price}
          installment={currentLote.installment}
          ctaLabel="Garantir minha vaga"
          ctaHref={campaignConfig.checkoutLink}
          noteText={currentLote.barText}
        />
      </section>

      {/* 12. Garantia */}
      <GuaranteeBlock title={garantiaContent.title} description={garantiaContent.description} />

      {/* 13. FAQ */}
      <FaqSection items={faqContent} />

      {/* 14. CTA final */}
      <section className="bg-brand-primary px-4 py-16 text-center text-white">
        <h2 className="text-2xl font-bold sm:text-3xl">{ctaFinalContent.title}</h2>
        <p className="mt-4 text-white/80">{ctaFinalContent.subtitle}</p>
        <CtaLink href={campaignConfig.checkoutLink} trackAs="InitiateCheckout" className="mt-8 inline-flex">
          {ctaFinalContent.ctaLabel}
        </CtaLink>
      </section>
    </>
  );
}
```

- [ ] **Step 2: Manual verification**

Run: `npm run dev`, open `http://localhost:3000/zumbido-na-pratica/vendas`.
Checklist:
- All 14 sections render in order, no console errors.
- Sticky bar shows Lote 1 text/countdown (today's date falls in the Lote 1 window per `config.ts`).
- Clicking any CTA navigates to `#checkout-pendente` (expected placeholder since `CHECKOUT_LINK` is unset). With `NEXT_PUBLIC_META_PIXEL_ID`/`NEXT_PUBLIC_GA_ID` set (see Task 6), confirm in the browser console (`window.fbq`/`window.gtag` calls, or a `console.log` breakpoint in `trackEvent`) that clicking a checkout CTA fires `InitiateCheckout`.
- Module accordion expands/collapses; FAQ accordion expands/collapses independently.
- Resize to 375px width — confirm no horizontal scroll and text remains readable.

- [ ] **Step 3: Commit**

```bash
git add "app/(campaigns)/zumbido-na-pratica/vendas/page.tsx"
git commit -m "feat: assemble the sales page from the 14 dobras"
```

---

## Task 18: Thank-you page — `/zumbido-na-pratica/obrigado`

**Files:**
- Create: `app/(campaigns)/zumbido-na-pratica/obrigado/page.tsx`
- Create: `app/(campaigns)/zumbido-na-pratica/obrigado/purchase-tracking.tsx`

**Interfaces:**
- Consumes: `obrigadoContent` (Task 15), `campaignConfig` (Task 14), `Card`/`CtaLink`/`Button` (Task 7), `trackEvent` (Task 6).
- Produces: the full 5-dobra thank-you page at `/zumbido-na-pratica/obrigado`.

- [ ] **Step 1: Implement the client-side purchase-tracking helper**

```tsx
// app/(campaigns)/zumbido-na-pratica/obrigado/purchase-tracking.tsx
"use client";

import { useEffect } from "react";
import { trackEvent } from "@/lib/tracking";

export function PurchaseTracking() {
  useEffect(() => {
    trackEvent("CompleteRegistration");
  }, []);

  return null;
}
```

- [ ] **Step 2: Implement the page**

```tsx
// app/(campaigns)/zumbido-na-pratica/obrigado/page.tsx
import { CheckCircle } from "lucide-react";
import { CtaLink, Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { campaignConfig } from "../config";
import { obrigadoContent } from "../content";
import { PurchaseTracking } from "./purchase-tracking";

export default async function ObrigadoPage({
  searchParams,
}: {
  searchParams: Promise<{ nome?: string }>;
}) {
  const { nome } = await searchParams;
  const firstName = nome ?? "";

  return (
    <>
      <PurchaseTracking />

      {/* 1. Confirmação */}
      <section className="mx-auto max-w-xl px-4 py-16 text-center">
        <CheckCircle className="mx-auto mb-4 h-14 w-14 text-brand-success" />
        <h1 className="text-2xl font-bold text-brand-primary sm:text-3xl">{obrigadoContent.confirmation.title}</h1>
        <p className="mt-4 whitespace-pre-line text-brand-text/80">
          {obrigadoContent.confirmation.body.replace("{nome}", firstName || "!")}
        </p>
      </section>

      {/* 2. Próximo passo */}
      <section className="mx-auto max-w-xl px-4 py-12 text-center">
        <Card>
          <h2 className="text-xl font-bold text-brand-primary">{obrigadoContent.nextStep.title}</h2>
          <p className="mt-2 text-brand-text/80">{obrigadoContent.nextStep.body}</p>
          <CtaLink href={campaignConfig.whatsappGroupLink} className="mt-6 inline-flex">
            {obrigadoContent.nextStep.ctaLabel}
          </CtaLink>
        </Card>
      </section>

      {/* 3. O que esperar */}
      <section className="mx-auto max-w-xl px-4 py-12">
        <h2 className="mb-6 text-center text-xl font-bold text-brand-primary">{obrigadoContent.timeline.title}</h2>
        <ol className="space-y-4 border-l-2 border-brand-primary/20 pl-4">
          {obrigadoContent.timeline.items.map((item) => (
            <li key={item.label}>
              <p className="font-semibold text-brand-primary">{item.label}</p>
              <p className="text-brand-text/80">{item.description}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* 4. Upsell */}
      <section className="mx-auto max-w-xl px-4 py-12">
        <Card className="border-2 border-brand-accent bg-brand-accent/5 text-center">
          <h2 className="text-xl font-bold text-brand-primary">{obrigadoContent.upsell.title}</h2>
          <p className="mt-3 text-brand-text/80">{obrigadoContent.upsell.body}</p>
          <p className="mt-4 text-3xl font-bold text-brand-primary">{obrigadoContent.upsell.price}</p>
          <p className="text-sm text-brand-text/60">{obrigadoContent.upsell.priceNote}</p>
          <div className="mt-6 flex flex-col items-center gap-3">
            <Button>{obrigadoContent.upsell.acceptLabel}</Button>
            <a href="#" className="text-sm text-brand-text/60 underline">
              {obrigadoContent.upsell.declineLabel}
            </a>
          </div>
        </Card>
      </section>

      {/* 5. Compartilhamento */}
      {campaignConfig.showShareSection ? (
        <section className="mx-auto max-w-xl px-4 py-12 text-center">
          <h2 className="text-lg font-bold text-brand-primary">{obrigadoContent.share.title}</h2>
          <p className="mt-3 rounded-xl bg-brand-primary/5 p-4 text-sm text-brand-text/70">
            {obrigadoContent.share.suggestedText}
          </p>
          <Button variant="secondary" className="mt-4">
            {obrigadoContent.share.ctaLabel}
          </Button>
        </section>
      ) : null}
    </>
  );
}
```

- [ ] **Step 3: Manual verification**

Run: `npm run dev`, open `http://localhost:3000/zumbido-na-pratica/obrigado` (no name) and `http://localhost:3000/zumbido-na-pratica/obrigado?nome=Maria` (with name). Confirm the confirmation copy adapts. Confirm the upsell decline link is visually present and not hidden, per spec requirement. Confirm no sale-oriented CTA appears above the confirmation block.

- [ ] **Step 4: Commit**

```bash
git add "app/(campaigns)/zumbido-na-pratica/obrigado"
git commit -m "feat: assemble the thank-you page with confirmation, timeline, and upsell"
```

---

## Task 19: Quiz page — `/zumbido-na-pratica/quiz`

**Files:**
- Create: `app/(campaigns)/zumbido-na-pratica/quiz/page.tsx`
- Create: `app/(campaigns)/zumbido-na-pratica/quiz/quiz-flow.tsx`

**Interfaces:**
- Consumes: `sumScore`/`getScoreBand` (Task 5), `trackEvent` (Task 6), `campaignConfig` (Task 14), `quizContent` (Task 15), `ProgressBar`/`ChoiceScreen`/`ContactFormScreen`/`ResultScreen` (Task 13).
- Produces: the full quiz flow (cover → 5 questions → contact form → result) at `/zumbido-na-pratica/quiz`.

- [ ] **Step 1: Implement the client-side orchestration component**

```tsx
// app/(campaigns)/zumbido-na-pratica/quiz/quiz-flow.tsx
"use client";

import { useState } from "react";
import { sumScore, getScoreBand } from "@/lib/quiz-scoring";
import { trackEvent } from "@/lib/tracking";
import { ProgressBar } from "@/components/campaign/quiz/progress-bar";
import { ChoiceScreen } from "@/components/campaign/quiz/choice-screen";
import { ContactFormScreen, type ContactFormValues } from "@/components/campaign/quiz/contact-form-screen";
import { ResultScreen } from "@/components/campaign/quiz/result-screen";
import { campaignConfig } from "../config";
import { quizContent } from "../content";

type Step =
  | { kind: "cover" }
  | { kind: "question"; index: number }
  | { kind: "contact" }
  | { kind: "result" };

export function QuizFlow() {
  const [step, setStep] = useState<Step>({ kind: "cover" });
  const [answers, setAnswers] = useState<number[]>([]);
  const [contact, setContact] = useState<ContactFormValues | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | undefined>(undefined);

  const totalSteps = quizContent.questions.length + 2; // + cover + contact

  if (step.kind === "cover") {
    return (
      <div className="mx-auto flex min-h-[70vh] max-w-xl flex-col items-center justify-center px-4 text-center">
        <h1 className="text-2xl font-bold text-brand-primary sm:text-3xl">{quizContent.cover.headline}</h1>
        <p className="mt-4 whitespace-pre-line text-brand-text/80">{quizContent.cover.body}</p>
        <button
          type="button"
          onClick={() => setStep({ kind: "question", index: 0 })}
          className="mt-8 inline-flex items-center justify-center rounded-xl bg-brand-accent px-6 py-3 font-semibold text-white transition-colors hover:bg-brand-accent/90"
        >
          {quizContent.cover.ctaLabel}
        </button>
      </div>
    );
  }

  if (step.kind === "question") {
    const question = quizContent.questions[step.index];
    return (
      <div className="mx-auto max-w-xl px-4 py-8">
        <ProgressBar current={step.index + 1} total={totalSteps} />
        <div className="mt-8">
          <ChoiceScreen
            question={question.question}
            options={question.options}
            onAnswer={(points) => {
              const nextAnswers = [...answers.slice(0, step.index), points];
              setAnswers(nextAnswers);
              if (step.index + 1 < quizContent.questions.length) {
                setStep({ kind: "question", index: step.index + 1 });
              } else {
                setStep({ kind: "contact" });
              }
            }}
            onBack={
              step.index > 0
                ? () => setStep({ kind: "question", index: step.index - 1 })
                : () => setStep({ kind: "cover" })
            }
          />
        </div>
      </div>
    );
  }

  if (step.kind === "contact") {
    return (
      <div className="mx-auto max-w-xl px-4 py-8">
        <ProgressBar current={totalSteps - 1} total={totalSteps} />
        <div className="mt-8">
          <ContactFormScreen
            isSubmitting={isSubmitting}
            errorMessage={submitError}
            onBack={() => setStep({ kind: "question", index: quizContent.questions.length - 1 })}
            onSubmit={async (values) => {
              setIsSubmitting(true);
              setSubmitError(undefined);
              const score = sumScore(answers);
              const scoreBand = getScoreBand(score);

              try {
                await fetch("/api/lead", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({ ...values, score, scoreBand }),
                });
                trackEvent("Lead");
                setContact(values);
                setStep({ kind: "result" });
              } catch {
                setSubmitError("Não deu pra enviar agora. Tenta de novo em alguns segundos.");
              } finally {
                setIsSubmitting(false);
              }
            }}
          />
        </div>
      </div>
    );
  }

  const score = sumScore(answers);
  const band = getScoreBand(score);
  const result = quizContent.results[band];
  const firstName = contact?.name.split(" ")[0] ?? "";

  return (
    <div className="mx-auto max-w-xl px-4 py-8">
      <ProgressBar current={totalSteps} total={totalSteps} />
      <div className="mt-8">
        <ResultScreen
          title={result.title.replace("{nome}", firstName)}
          body={result.body}
          ctaLabel={quizContent.resultCtaLabel}
          ctaHref={campaignConfig.quizResultCtaLink}
        />
      </div>
    </div>
  );
}
```

Note: `ResultScreen` (Task 13) already renders its own `CtaLink` internally, so this file has no direct need to import it.

- [ ] **Step 2: Implement the page shell**

```tsx
// app/(campaigns)/zumbido-na-pratica/quiz/page.tsx
import { QuizFlow } from "./quiz-flow";

export default function QuizPage() {
  return <QuizFlow />;
}
```

- [ ] **Step 3: Manual verification**

Run: `npm run dev`, open `http://localhost:3000/zumbido-na-pratica/quiz`.
Checklist:
- Cover screen renders, "Começar" advances to question 1.
- Each of the 5 questions advances automatically on option click; progress bar fills proportionally.
- "Voltar" on question 2+ returns to the previous question and preserves the previously selected answer's position (re-answering overwrites it).
- Contact form validates name/WhatsApp/consent; submitting with the network tab open shows a `POST /api/lead` call.
- After submit, the result screen shows a title/body appropriate to the answers chosen (answer mostly "insecure" options to hit `no-improviso`; mostly "confident" options to hit `ja-tem-base`) and the CTA points to `campaignConfig.quizResultCtaLink`.

- [ ] **Step 4: Commit**

```bash
git add "app/(campaigns)/zumbido-na-pratica/quiz"
git commit -m "feat: implement the quiz flow (cover, questions, contact form, result)"
```

---

## Task 20: Privacy policy page — `/privacidade`

**Files:**
- Create: `app/privacidade/page.tsx`

**Interfaces:**
- Produces: a static page at `/privacidade`, linked from the quiz's consent checkbox (Task 13).

- [ ] **Step 1: Implement the page**

```tsx
// app/privacidade/page.tsx
export default function PrivacidadePage() {
  return (
    <main className="mx-auto max-w-2xl px-4 py-16">
      <h1 className="text-2xl font-bold text-brand-primary">Política de Privacidade</h1>
      <div className="mt-6 space-y-4 text-brand-text/80">
        <p>
          Esta página descreve como os dados fornecidos por você (nome, WhatsApp e, quando aplicável, e-mail)
          são coletados e utilizados quando você participa do quiz de diagnóstico ou se inscreve em uma das
          formações da Zumbido na Prática.
        </p>
        <p>
          Os dados coletados são utilizados exclusivamente para contato sobre o conteúdo relacionado à
          formação, aulas abertas e materiais educativos — não são vendidos ou compartilhados com terceiros
          para fins de marketing não relacionados.
        </p>
        <p>
          Você pode solicitar a exclusão dos seus dados a qualquer momento entrando em contato pelo canal
          informado nas nossas comunicações.
        </p>
      </div>
    </main>
  );
}
```

- [ ] **Step 2: Manual verification**

Run: `npm run dev`, open `http://localhost:3000/privacidade` directly, and confirm the link from the quiz's contact form (Task 13/19) navigates here correctly (open in a new tab from the quiz so you don't lose quiz progress).

- [ ] **Step 3: Commit**

```bash
git add app/privacidade/page.tsx
git commit -m "feat: add static privacy policy page"
```

---

## Task 21: Deploy artifacts — PM2, Nginx, DEPLOY.md

**Files:**
- Create: `ecosystem.config.js`
- Create: `deploy/nginx.conf.example`
- Create: `DEPLOY.md`

**Interfaces:**
- Produces: everything needed to reproduce the deploy on a fresh Hostgator VPS by following `DEPLOY.md`. No code interfaces — this task is documentation + process config.

- [ ] **Step 1: Implement `ecosystem.config.js`**

```js
module.exports = {
  apps: [
    {
      name: "zumbido-lps",
      script: ".next/standalone/server.js",
      cwd: __dirname,
      env: {
        NODE_ENV: "production",
        PORT: 3000,
      },
      autorestart: true,
      max_restarts: 10,
      watch: false,
    },
  ],
};
```

- [ ] **Step 2: Implement `deploy/nginx.conf.example`**

```nginx
server {
    listen 80;
    server_name SEU_DOMINIO_AQUI;

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

- [ ] **Step 3: Write `DEPLOY.md`**

```markdown
# Deploy — VPS Hostgator (do zero)

## 1. Preparar a VPS

```bash
ssh root@SEU_IP

# Node LTS via nvm
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
source ~/.bashrc
nvm install --lts

# PM2 global
npm install -g pm2

# Nginx
apt update && apt install -y nginx certbot python3-certbot-nginx
```

## 2. Enviar o código

Do seu computador, dentro da pasta do projeto:

```bash
rsync -avz --exclude node_modules --exclude .next --exclude .git ./ root@SEU_IP:/var/www/zumbido-lps
```

Ou clone via git se o repositório estiver hospedado remotamente.

## 3. Configurar variáveis de ambiente

Na VPS, dentro de `/var/www/zumbido-lps`, crie `.env.production` com os valores reais:

```
CHECKOUT_LINK=...
WHATSAPP_GROUP_LINK=...
LEAD_WEBHOOK_URL=...
NEXT_PUBLIC_META_PIXEL_ID=...
NEXT_PUBLIC_GA_ID=...
```

## 4. Build e start

```bash
cd /var/www/zumbido-lps
npm ci
npm run build
pm2 start ecosystem.config.js
pm2 save
pm2 startup   # siga a instrução impressa pra sobreviver a reboot
```

## 5. Nginx + SSL

```bash
cp deploy/nginx.conf.example /etc/nginx/sites-available/zumbido-lps
# edite /etc/nginx/sites-available/zumbido-lps e troque SEU_DOMINIO_AQUI pelo domínio real
ln -s /etc/nginx/sites-available/zumbido-lps /etc/nginx/sites-enabled/
nginx -t
systemctl reload nginx

certbot --nginx -d SEU_DOMINIO_AQUI
```

## 6. Atualizar depois de mudanças (redeploy)

```bash
cd /var/www/zumbido-lps
git pull   # ou rsync novamente
npm ci
npm run build
pm2 reload zumbido-lps
```

## 7. Nova campanha no futuro

Adicione a pasta em `app/(campaigns)/<nova-campanha>` com seu próprio `content.ts`/`config.ts`,
reaproveitando os componentes de `/components`. Nenhuma mudança de infraestrutura (Nginx/PM2) é
necessária — o mesmo processo Next.js serve todas as campanhas do domínio.
```

- [ ] **Step 4: Manual verification**

Read through `DEPLOY.md` once end-to-end as if you were following it fresh — confirm every command references a file that actually exists in the repo (`ecosystem.config.js`, `deploy/nginx.conf.example`) and that placeholders (`SEU_IP`, `SEU_DOMINIO_AQUI`) are clearly marked as things to replace, not left ambiguous.

- [ ] **Step 5: Commit**

```bash
git add ecosystem.config.js deploy/nginx.conf.example DEPLOY.md
git commit -m "docs: add PM2/Nginx deploy config and VPS setup guide"
```

---

## Post-plan checklist (not a task — do after Task 21)

- Run `npm run test` (all `/lib` and `/api` unit tests) and `npm run build` one final time to confirm the whole app still builds clean.
- Manually click through all 3 pages end-to-end once more in the browser, including the quiz submitting to `/api/lead` with `LEAD_WEBHOOK_URL` unset (confirms the graceful-degradation path logs a warning instead of failing the user).
