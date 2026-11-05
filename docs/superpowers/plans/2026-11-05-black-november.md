# Black November — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Transform `/zumbido-na-pratica/vendas` into the Black November offer page with a consistent 8-module offer, 2 live Q&A bonuses, fixed deadline behavior, accessible premium UI and complete CTA tracking.

**Architecture:** Keep the existing route and composition. Move offer facts into one typed `blackNovemberOffer` configuration, make page content consume that configuration, and evolve existing campaign components before creating only the missing `LiveBonus`, price and countdown pieces. The deadline is represented with an explicit `-03:00` offset and must be enforced by the checkout/server as well as the front end.

**Tech Stack:** Next.js 15, React 19, TypeScript, Tailwind CSS v4, Vitest, ESLint, Meta Pixel/GA4 tracking already present in the repository.

**Spec:** `docs/superpowers/specs/2026-11-05-black-november-design.md`

## Global Constraints

- Campaign deadline: `2026-11-30T23:59:59-03:00`, timezone `America/Fortaleza`.
- The page must display exactly 8 modules in the official order.
- The campaign format is recorded content plus 2 live Q&A sessions; do not describe weekly live classes.
- Price, anchor, installments, savings and checkout URL must come from one offer configuration.
- Do not use unverified clinical guarantees or artificial scarcity.
- The expired state must never leave the Black price and checkout active accidentally.
- All CTA destinations preserve attribution/UTM parameters and identify their page position.
- Tests, lint and production build must pass before completion.

## Review Focus

- Boundary at the exact campaign deadline: test before, at, during the last day and after expiration in the campaign timezone (Task 1).
- Missing commercial configuration or unresolved placeholders: fail validation rather than render incomplete production copy (Task 1); live dates are the only currently pending commercial values and must not be rendered as placeholders.
- Mobile sticky CTA visibility around hero and offer sentinels: test hidden before hero exit, visible between sections and hidden at the offer (Task 4).
- FAQ interaction and DOM accessibility: test multiple open items plus `aria-expanded`/`aria-controls` (Task 4).
- CTA tracking and attribution preservation: test each position and existing stored UTM data (Task 5).

---

### Task 1: Typed Black November offer and campaign states

**Files:**
- Create: `lib/black-november.ts`
- Modify: `app/(campaigns)/zumbido-na-pratica/config.ts`
- Modify: `lib/campaign-phase.ts`
- Test: `lib/black-november.test.ts`
- Test: `lib/campaign-phase.test.ts`

**Interfaces:**
- Produces `BlackNovemberOffer`, `CampaignState`, `getBlackNovemberState(now, offer)`, `validateBlackNovemberOffer(offer)` and a single exported `blackNovemberOffer` consumed by content and page components.

- [ ] **Step 1: Write failing tests** for the typed offer validation and state boundaries. Assert that an active offer is returned one second before the deadline, the last-day state is returned on `2026-11-30`, and the expired state is returned one second after `2026-11-30T23:59:59-03:00`.
- [ ] **Step 2: Run `npm test -- --run lib/black-november.test.ts lib/campaign-phase.test.ts`** and verify the new tests fail because the interface/state helpers do not exist.
- [ ] **Step 3: Implement the typed offer and state helpers** with explicit `-03:00` dates, required commercial fields, `expiredBehavior`, and placeholder rejection for production values.
- [ ] **Step 4: Update `config.ts`** so the existing campaign config consumes the Black offer and no longer falls back to the expired Turma 4 lot for the sales route.
- [ ] **Step 5: Run the focused tests** and verify all state/validation cases pass.
- [ ] **Step 6: Commit** with `feat: add black november campaign configuration`.

**Dependency gate:** Price, anchor, savings, installment, checkout URL and expired behavior are confirmed: R$ 1.900,00, R$ 3.000,00, R$ 1.100,00, 12x de R$ 196,50, `https://pay.kiwify.com.br/UPbHakl` and `normal-price`. Only the two live dates remain pending, along with any still-unconfirmed access/group/certificate policy.

### Task 2: Rewrite campaign content and module data

**Files:**
- Modify: `app/(campaigns)/zumbido-na-pratica/content.ts`
- Modify: `app/(campaigns)/zumbido-na-pratica/config.ts`
- Test: `lib/black-november-content.test.ts`

**Interfaces:**
- Consumes `blackNovemberOffer` from Task 1.
- Produces content objects consumed by `Hero`, `ModuleCards`, `PriceBlock`, `LiveBonus`, `FaqSection` and the sales page.

- [ ] **Step 1: Write failing content tests** that assert no sales copy contains `Turma 4`, September dates, `10 módulos`, `mindfulness`, `Laserterapia`, `Laserpuntura`, `Mentoria de Primeiros Pacientes` or `100% ao vivo`, and that the module array has exactly 8 entries in the official order.
- [ ] **Step 2: Run the focused test** and verify it fails against the current content.
- [ ] **Step 3: Rewrite hero, virada, audience, transformation, bio, offer, guarantee, FAQ and final CTA copy** using the approved Black messaging and values from `blackNovemberOffer`.
- [ ] **Step 4: Replace the 10 current module entries** with the official 8 entries and descriptions; confirm the new Training Auditivo description and whether Surdez Súbita belongs in any module before adding either claim.
- [ ] **Step 5: Add two live session records** to the content/config boundary and remove the mentorship bonus unless `includesMentorship` is explicitly true.
- [ ] **Step 6: Run the focused tests** and verify the copy invariants pass.
- [ ] **Step 7: Commit** with `feat: update sales copy for black november`.

### Task 3: Build Black visual tokens and offer components

**Files:**
- Modify: `app/globals.css`
- Create: `components/campaign/price-block.tsx`
- Create: `components/campaign/live-bonus.tsx`
- Modify: `components/campaign/hero.tsx`
- Modify: `components/campaign/price-card.tsx`
- Modify: `components/campaign/module-cards.tsx`
- Modify: `components/campaign/guarantee-block.tsx`

**Interfaces:**
- `PriceBlock` consumes `BlackNovemberOffer` and emits price, anchor, installment, savings and a CTA without owning campaign values.
- `LiveBonus` consumes `{ date: string; label: string }[]` and renders exactly two accessible sessions.
- `ModuleCards` consumes the 8-item `ModuleItem[]` and supports the Black card treatment without relying on a raster image.

- [ ] **Step 1: Add component-level tests or render assertions** for price consistency, two live sessions and eight module cards.
- [ ] **Step 2: Run the focused tests** and verify they fail against the current components/props.
- [ ] **Step 3: Add Black design tokens** for navy backgrounds, gold surfaces/borders, text colors, urgency and guarantee states; preserve a readable fallback for non-Black campaign surfaces.
- [ ] **Step 4: Implement `PriceBlock` and `LiveBonus`** with responsive layouts, touch targets of at least 44px and no hard-coded commercial values.
- [ ] **Step 5: Update hero and price card** to include the Black badge, price block, microcopy and consistent CTA label.
- [ ] **Step 6: Update module cards** with the eight-card order, gold icon treatment, responsive layout and accessible expand/collapse behavior if expansion is retained.
- [ ] **Step 7: Run focused tests and `npm run lint`**; verify the visual components pass type and accessibility checks.
- [ ] **Step 8: Commit** with `feat: add black november offer components`.

### Task 4: Countdown, page composition and responsive states

**Files:**
- Create or modify: `components/ui/countdown-timer.tsx`
- Modify: `components/ui/sticky-bar.tsx`
- Modify: `components/ui/sticky-mobile-cta.tsx`
- Modify: `components/campaign/faq-section.tsx`
- Modify: `app/(campaigns)/zumbido-na-pratica/vendas/page.tsx`
- Test: `components/ui/countdown-timer.test.tsx`
- Test: `components/ui/sticky-mobile-cta.test.tsx`

**Interfaces:**
- `CountdownTimer` consumes `{ targetDate: string; state: CampaignState }` and renders active, last-day or expired UI without a zeroed active timer.
- The sales page composes sections in the spec order and passes the same offer to every price/CTA component.

- [ ] **Step 1: Write failing countdown tests** for timezone-aware boundary values, `aria-live="off"`, static validity text and expired output.
- [ ] **Step 2: Run the focused tests** and verify the current zeroed-counter behavior fails the new expectations.
- [ ] **Step 3: Implement the countdown state model** and remove the `00:00:00:00` active-looking fallback.
- [ ] **Step 4: Update the sticky desktop bar** with badge, price, compact CTA, countdown and last-day text; ensure overflow works at 360px.
- [ ] **Step 5: Update the mobile CTA** to appear after the hero and hide when the offer card is visible, preserving the existing sentinel strategy.
- [ ] **Step 6: Update the FAQ accordion** to allow multiple open questions, keep answers in the DOM and expose correct ARIA attributes.
- [ ] **Step 7: Recompose `vendas/page.tsx`** in the new section order, including the bonus block, offer block, guarantee, FAQ and final CTA; route expired behavior according to the offer configuration.
- [ ] **Step 8: Run focused tests, `npm run lint` and a local smoke test** at `/zumbido-na-pratica/vendas` on 360px, 390px, 768px and 1280px.
- [ ] **Step 9: Commit** with `feat: compose black november sales page`.

### Task 5: Tracking, attribution and checkout behavior

**Files:**
- Modify: `lib/tracking.ts`
- Modify: `app/(campaigns)/zumbido-na-pratica/vendas/page.tsx`
- Modify: `components/ui/button.tsx`
- Modify: `app/(campaigns)/zumbido-na-pratica/vendas/scroll-depth-tracking.tsx`
- Test: `lib/tracking.test.ts`

**Interfaces:**
- Produces campaign event names and CTA position parameters: `hero`, `modulos`, `oferta`, `final`, `sticky_mobile`.
- All events continue to merge stored attribution and page-specific parameters.

- [ ] **Step 1: Write failing tracking tests** for `view_black_page`, all five CTA positions, `faq_open`, scroll-depth thresholds and UTM preservation.
- [ ] **Step 2: Run the focused tests** and verify the new event names/parameters fail.
- [ ] **Step 3: Extend tracking types/helpers** without breaking existing Meta Pixel and GA4 event calls.
- [ ] **Step 4: Instrument hero, modules, offer, final and mobile CTA clicks** with campaign id, value, currency and position.
- [ ] **Step 5: Add FAQ-open tracking** with a stable question id and preserve the existing scroll-depth behavior.
- [ ] **Step 6: Ensure every CTA points to the configured Black checkout** and preserves UTMs through the existing attribution mechanism.
- [ ] **Step 7: Run tracking tests and inspect browser events locally** with mocked `fbq`/`gtag`.
- [ ] **Step 8: Commit** with `feat: track black november conversion funnel`.

### Task 6: Metadata, compliance and final QA

**Files:**
- Modify: `app/layout.tsx`
- Modify: `app/(campaigns)/zumbido-na-pratica/vendas/page.tsx`
- Modify: `app/globals.css`
- Create or update: Black November Open Graph asset if required
- Test: existing test suite plus manual QA checklist

- [ ] **Step 1: Update title, description, Open Graph metadata and favicon references** to identify Black November without promising clinical outcomes.
- [ ] **Step 2: Run a repository search** for prohibited stale copy and resolve every occurrence relevant to the sales page.
- [ ] **Step 3: Run keyboard and screen-reader-oriented checks** for focus, accordion semantics, CTA names, live-region behavior and decorative icons.
- [ ] **Step 4: Verify responsive layouts** at 360px, 390px, 768px, 1024px and 1280px, including sticky bars and last-day state.
- [ ] **Step 5: Run `npm test -- --run`, `npm run lint` and `npm run build`**; expected result is zero failures and a successful production build.
- [ ] **Step 6: Verify the actual checkout/server expiration rule** matches `2026-11-30T23:59:59-03:00` and does not rely only on the browser countdown.
- [ ] **Step 7: Commit** with `chore: finalize black november qa`.

## Self-review coverage

- Campaign facts and deadline are covered by Task 1.
- All copy changes, prohibited terms and eight modules are covered by Task 2.
- Visual direction, price consistency and lives are covered by Task 3.
- Page order, countdown, FAQ, mobile behavior and expiration UI are covered by Task 4.
- Analytics, UTMs and CTA destinations are covered by Task 5.
- Metadata, accessibility, responsive QA, build and server-side expiration are covered by Task 6.

## Execution handoff

Do not start implementation until the commercial decision table in the spec is filled and this plan is reviewed. Then execute one task at a time using either `superpowers:subagent-driven-development` for independent review gates or `superpowers:executing-plans` for native execution.
