# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

A Next.js (App Router) marketing site for "Zumbido na Prática", a course for health
professionals on tinnitus treatment. It's built as a set of landing-page "campaigns" —
sales page, quiz funnel, cart, thank-you page — plus Meta Pixel/GA4 conversion tracking
and a lead-capture webhook. Copy/business-rule context for the current campaign lives in
the root `pagina-*.md` files (`pagina-captacao-quiz.md`, `pagina-vendas.md`,
`pagina-obrigado.md`) — read these when a task involves changing funnel copy, offer
pricing, or the quiz logic, since they document the intended business rules that the code
implements.

## Commands

```bash
npm run dev          # dev server with Turbopack (http://localhost:3000)
npm run build         # production build (Turbopack)
npm run start         # run the production build
npm run lint          # eslint (next/core-web-vitals + next/typescript)
npm test              # vitest run (single run)
npm run test:watch    # vitest watch mode
npm run db:migrate    # apply db/schema.sql against DATABASE_URL (one-time/idempotent)
```

Run a single test file: `npx vitest run lib/quiz-scoring.test.ts`.

Tests are colocated with source (`*.test.ts`) and only cover `lib/**` and `app/**` per
`vitest.config.ts` — pure logic (scoring, phase/date logic, tracking config, the lead API
route), not components.

## Architecture

### Campaign routing

Everything customer-facing lives under the route group `app/(campaigns)/zumbido-na-pratica/`,
with the site root (`app/page.tsx`) redirecting to `/zumbido-na-pratica/vendas`. Each
funnel step is its own route: `vendas` (sales page), `quiz`, `carrinho` (à-la-carte
module cart with WhatsApp checkout), `obrigado` (post-purchase). Per DEPLOY.md, a future
campaign is added as a sibling folder under `app/(campaigns)/<nova-campanha>/` with its
own `content.ts`/`config.ts`, reusing the shared `components/`.

Every campaign page sets `export const dynamic = "force-dynamic"` so `config.ts` reads
`process.env` at request time — env vars can be changed and the service restarted without
a rebuild (see EASYPANEL.md). The exception is the static root (`/`) and `/privacidade`,
where `NEXT_PUBLIC_*` values are baked in at build time.

### Content vs. config split (per campaign folder)

- `content.ts` — copy/text content for the page sections, imported by the page component.
- `config.ts` — runtime behavior: env-derived links (`CHECKOUT_LINK`, `WHATSAPP_GROUP_LINK`,
  `SALES_WHATSAPP_NUMBER`) and the `lotes` array (pricing/enrollment-window phases).
- `lib/campaign-phase.ts` — `getCurrentLote(lotes, now)` picks the active pricing phase by
  date range; used by the sales page and sticky bar/CTA to show the right price/deadline.

When changing price, dates, or checkout links for the current cohort, edit `config.ts`
in the campaign folder, not the components.

### Tracking

`lib/tracking.ts` defines the canonical event names (`PageView`, `ViewContent`, `Lead`,
`AddToCart`, `InitiateCheckout`, `CompleteRegistration`, `Purchase`) and `trackEvent()`,
which fires to both `window.fbq` (Meta Pixel) and `window.gtag` (GA4) if present.
`components/tracking-scripts.tsx` (in root `layout.tsx`) injects the pixel/GA scripts
based on `NEXT_PUBLIC_META_PIXEL_ID` / `NEXT_PUBLIC_GA_ID`. Individual pages fire funnel
events at the right step — e.g. `ViewContentTracking`/`purchase-tracking.tsx` client
components on mount, `CtaLink`'s `trackAs` prop on click, `CartFlow` firing `AddToCart` on
selection. When adding a new CTA or funnel step, wire it to `trackEvent`/`CtaLink
trackAs` rather than calling `fbq`/`gtag` directly.

### Lead capture and attribution

`app/api/lead/route.ts` validates a lead payload (zod schema: name, whatsapp, consent,
scoreBand, score, plus optional `utm_*` fields) and, independently: forwards it to
`LEAD_WEBHOOK_URL` if set, and inserts it into a `leads` table via `lib/db.ts#saveLead` if
`DATABASE_URL` is set. Both are fire-and-forget — either one being unset or failing is
logged and does not fail the request or block the other (see EASYPANEL.md for provisioning
the Postgres service and running the one-time migration via `npm run db:migrate`, which
applies `db/schema.sql`). The quiz flow (`quiz-flow.tsx`) computes `scoreBand`/`score` via
`lib/quiz-scoring.ts` before submitting.

UTM params (`utm_source`/`medium`/`campaign`/`term`/`content`) are captured client-side on
first landing by `components/attribution-capture.tsx` (mounted in the root layout, so it
runs on every campaign page) and persisted to `localStorage` via `lib/attribution.ts`
(last-touch: a new UTM in the URL overwrites the stored value). `lib/tracking.ts#trackEvent`
and `#trackCustomEvent` automatically merge the stored attribution into every pixel/GA
event, so individual call sites never need to pass it explicitly — only event-specific
params (value, currency, content_name, cta_position, ...) are set per call site.

### WhatsApp checkout

`carrinho` (cart) lets users pick à-la-carte modules and checks out via a generated
`wa.me` deep link (`lib/whatsapp.ts#buildWhatsappCartLink`) rather than a real cart/payment
system — the message body lists selected items and total, sent to `SALES_WHATSAPP_NUMBER`.

### UI components

`components/ui/` are generic primitives (`Button`/`CtaLink`, `Card`, `Badge`, `Accordion`,
`CountdownTimer`, `StickyBar`, `StickyMobileCta`, `VideoEmbed`) shared across campaigns.
`components/campaign/` are landing-page-specific sections (Hero, PriceCard, FaqSection,
GuaranteeBlock, ModuleCards, and the `quiz/` subfolder for the quiz flow screens).
`CtaLink`/`Button` take an `accentClassName` that only applies to `variant="primary"`
(silently ignored on `secondary`) — check `variantClasses` in `button.tsx` before assuming
a color prop takes effect.

### Styling

Tailwind v4 (CSS-based config, no `tailwind.config.js`) — design tokens are declared in
`app/globals.css` via `@theme`. There are two overlapping palettes: an older generic
`brand-*` set and the current "ink/cream/coral" palette used by the vendas-page redesign
(see the comment dated 2026-08-11 in `globals.css`). Prefer the ink/cream/coral tokens for
new sales-page work. `--font-display` (Fraunces) is loaded per-page (e.g. in
`vendas/page.tsx`) rather than globally; `--font-sans` (Inter) is loaded in the root layout.

## Deployment

Deploys via Docker on EasyPanel (see `EASYPANEL.md`) — `Dockerfile` does a multi-stage
build using `output: "standalone"` (`next.config.ts`). `DEPLOY.md` documents an older
VPS + PM2 + Nginx flow (`ecosystem.config.js`, `deploy/nginx.conf.example`) that is no
longer the primary path but is kept for reference.
