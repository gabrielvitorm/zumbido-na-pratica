# Vendas Page Visual Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Redesign `/zumbido-na-pratica/vendas` per the visual design spec — a new petróleo/cream/coral palette layered on top of (not replacing) the site's base brand tokens, Fraunces display type scoped to this page, alternating cream/ink section backgrounds, card-based module list, a mobile sticky CTA bar, and a static SVG "signature" line through the reading sections.

**Architecture:** All new tokens/components are additive. Shared primitives in `/components/ui` (`Card`, `Accordion`) get small, backward-compatible prop additions (opt-in shadow, opt-in accent color) rather than hardcoded page-specific colors, preserving their reuse by other campaigns. Campaign-specific components in `/components/campaign` (`Hero`, `PriceCard`, `GuaranteeBlock`, `FaqSection`) adopt the new tokens directly, since they're already scoped to visual presentation, not shared data logic. Two new components are added: `AuditoryPathway` (static decorative SVG, `/components/campaign`) and `StickyMobileCta` (mobile-only fixed CTA bar, `/components/ui`, reusable by future campaigns). The page assembly task rewires `vendas/page.tsx` around these pieces.

**Tech Stack:** Next.js 15, TypeScript, Tailwind CSS v4 (`@theme`), `next/font/google` (Fraunces), lucide-react. No new dependencies.

## Global Constraints

- New color tokens (exact hex): `--color-ink: #0F3D3E`, `--color-ink-light: #17514F`, `--color-cream: #FAF7F1`, `--color-coral: #FF5A3C`, `--color-coral-dark: #E14B2F`, `--color-coral-tint: #FFE9E3`, `--color-text-primary: #17211F`, `--color-text-secondary: #52605D`, `--color-text-on-ink: #F3F1EA`, `--color-text-on-ink-secondary: #A9BDBB`, `--color-border: #E4DFD3`, `--color-success: #2F7A5C`, `--color-warning-bg: #FDF3E4`, `--color-warning-text: #8A5A1C`.
- These are added to the existing `@theme` block in `app/globals.css` alongside (never replacing) the existing `--color-brand-*` tokens — other pages (`/zumbido-na-pratica/obrigado`, `/zumbido-na-pratica/quiz`, `/privacidade`) keep using `--color-brand-*` and must render unchanged.
- Display font is Fraunces, loaded via `next/font/google`, weights 400/500/600/700, scoped to the vendas page only (not the root layout) — do not touch `app/layout.tsx`.
- `@desktop` in the spec means `≥1024px` — use Tailwind's `lg:` breakpoint for every desktop-layout change called out in the spec, not `sm:`/`md:`.
- No new npm dependencies. `framer-motion` is explicitly NOT installed for this work — the signature element is static in this phase (CSS/SVG only).
- All checkout CTAs continue to use `campaignConfig.checkoutLink` and carry `trackAs="InitiateCheckout"` on `CtaLink` (established site-wide convention — do not regress tracking).
- No automated tests apply to this visual work (consistent with the project's established testing scope: Vitest is reserved for pure logic in `/lib` and the `/api` routes; UI/visual changes are verified manually via `npm run dev` + browser/curl inspection). Every task's "Step: Verify" is a manual check, not a Vitest run — do not invent tests that assert nothing just to have a test file.
- Run `npx tsc --noEmit` and `npm run build` at the end of every task to catch type/build regressions immediately, even though there's no dedicated test suite for this UI work.

---

## Task 1: Design tokens

**Files:**
- Modify: `app/globals.css`

**Interfaces:**
- Produces: new Tailwind utility classes `bg-ink`, `text-ink`, `border-ink`, `bg-ink-light`, `border-ink-light`, `bg-cream`, `text-cream`, `bg-coral`, `text-coral`, `border-l-coral`, `bg-coral-dark`, `bg-coral-tint`, `text-coral-tint`, `text-text-primary`, `text-text-secondary`, `text-text-on-ink`, `text-text-on-ink-secondary`, `border-border`, `text-success`, `bg-warning-bg`, `text-warning-text`, plus `font-display`, `rounded-card`, `rounded-button`. All consumed by every later task in this plan.

- [ ] **Step 1: Add the new tokens to the `@theme` block**

Edit `app/globals.css`:

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

  /* Zumbido na Prática — vendas page visual redesign (2026-08-11) */
  --color-ink: #0f3d3e;
  --color-ink-light: #17514f;
  --color-cream: #faf7f1;
  --color-coral: #ff5a3c;
  --color-coral-dark: #e14b2f;
  --color-coral-tint: #ffe9e3;
  --color-text-primary: #17211f;
  --color-text-secondary: #52605d;
  --color-text-on-ink: #f3f1ea;
  --color-text-on-ink-secondary: #a9bdbb;
  --color-border: #e4dfd3;
  --color-success: #2f7a5c;
  --color-warning-bg: #fdf3e4;
  --color-warning-text: #8a5a1c;
  --font-display: var(--font-fraunces), Georgia, serif;
  --radius-card: 16px;
  --radius-button: 10px;
}

body {
  background-color: var(--color-brand-bg);
  color: var(--color-brand-text);
}
```

Note: `--font-fraunces` is not yet defined anywhere — it will resolve to nothing (falling through to `Georgia, serif`) until Task 7 loads the actual Fraunces font and applies its CSS variable class to the vendas page's wrapper. This is intentional: `font-display` gracefully degrades to Georgia on any page that doesn't load Fraunces.

- [ ] **Step 2: Verify the tokens compile**

Run: `npm run build`
Expected: build succeeds with no CSS/Tailwind errors. (The new utility classes aren't used anywhere yet, so nothing visually changes — this just confirms the `@theme` syntax is valid.)

- [ ] **Step 3: Commit**

```bash
git add app/globals.css
git commit -m "feat: add vendas page redesign color/font/radius tokens"
```

---

## Task 2: Shared primitive updates — Card, Accordion, StickyBar, GuaranteeBlock, FaqSection

**Files:**
- Modify: `components/ui/card.tsx`
- Modify: `components/ui/accordion.tsx`
- Modify: `components/ui/sticky-bar.tsx`
- Modify: `components/campaign/guarantee-block.tsx`
- Modify: `components/campaign/faq-section.tsx`

**Interfaces:**
- Produces:
  - `Card` gains `elevated?: boolean` (default `false`) — when `true`, renders a visible shadow; when `false` (new default), no shadow. This is a behavior change from the current always-on `shadow-sm` — deliberate, since the spec requires the price card to be "the only shadow on the page."
  - `Accordion` gains `activeBorderClassName?: string` (default `"border-l-brand-accent"`, preserving today's neutral look for any other future consumer) — the open item gets a 4px left border in that class; closed items get a transparent one (no layout shift).
  - `StickyBar` gains `backgroundClassName?: string` (default: today's `bg-brand-primary`/`bg-brand-alert` variant logic, unchanged) and `countdownClassName?: string` (default `"font-mono"`, unchanged) — same opt-in-override pattern as `Accordion`, so other campaigns keep today's look by default while this page overrides both.
- Consumed by: Task 7 (page assembly uses `<Card elevated>` for the price card and plain `<Card>` for the offer list; `FaqSection` passes `activeBorderClassName="border-l-coral"` to `Accordion`; `<StickyBar backgroundClassName="bg-ink" countdownClassName="font-mono text-coral">`).

**Cross-page impact warning:** `Card` is also used by `app/(campaigns)/zumbido-na-pratica/obrigado/page.tsx` (2 call sites, outside this plan's scope) — flipping its default from always-shadowed to opt-in-only would silently change that page's appearance, violating this plan's own Global Constraint that other pages "must render unchanged." When implementing Step 1, also grep for every existing `<Card` usage outside `vendas/` and, for any found, add the literal classes `shadow-sm shadow-black/5` directly to that call site's `className` (not the new `elevated` prop, which now renders a different, heavier shadow reserved for Task 7's price card) — this preserves that page's exact prior appearance.

- [ ] **Step 1: Update `components/ui/card.tsx`**

```tsx
export interface CardProps {
  className?: string;
  elevated?: boolean;
  children: React.ReactNode;
}

export function Card({ className = "", elevated = false, children }: CardProps) {
  return (
    <div
      className={`rounded-xl bg-white p-6 ${elevated ? "shadow-md shadow-black/10" : ""} ${className}`}
    >
      {children}
    </div>
  );
}
```

- [ ] **Step 2: Update `components/ui/accordion.tsx`**

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
  activeBorderClassName?: string;
}

export function Accordion({ items, defaultOpenId, activeBorderClassName = "border-l-brand-accent" }: AccordionProps) {
  const [openId, setOpenId] = useState<string | null>(defaultOpenId ?? null);

  return (
    <div className="divide-y divide-brand-text/10 rounded-xl border border-brand-text/10 bg-white">
      {items.map((item) => {
        const isOpen = openId === item.id;
        return (
          <div
            key={item.id}
            className={`border-l-4 ${isOpen ? activeBorderClassName : "border-l-transparent"}`}
          >
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

- [ ] **Step 3: Update `components/ui/sticky-bar.tsx`**

```tsx
import { CountdownTimer } from "./countdown-timer";

export interface StickyBarProps {
  text: string;
  variant: "default" | "urgent";
  countdownTarget?: string;
  backgroundClassName?: string;
  countdownClassName?: string;
}

export function StickyBar({
  text,
  variant,
  countdownTarget,
  backgroundClassName,
  countdownClassName = "font-mono",
}: StickyBarProps) {
  const defaultBackgroundClass = variant === "urgent" ? "bg-brand-alert" : "bg-brand-primary";

  return (
    <div
      className={`sticky top-0 z-50 flex min-h-9 w-full items-center justify-center ${backgroundClassName ?? defaultBackgroundClass} px-4 text-center text-xs font-medium text-white`}
    >
      <span>{text}</span>
      {countdownTarget ? (
        <span className={`ml-3 ${countdownClassName}`}>
          <CountdownTimer targetDate={countdownTarget} />
        </span>
      ) : null}
    </div>
  );
}
```

This covers spec section 3.1 (fixed ~36px height via `min-h-9`, `0.75rem` text via `text-xs`, background and countdown color both overridable — Task 7 passes `backgroundClassName="bg-ink"` and `countdownClassName="font-mono text-coral"` regardless of `variant`, since the spec wants the bar always ink-colored on this page, not switching to a different color in the "urgent" lote phase; the `variant` prop still exists and still drives the *default* for any consumer that doesn't override `backgroundClassName`).

- [ ] **Step 4: Update `components/campaign/guarantee-block.tsx`**

```tsx
import { ShieldCheck } from "lucide-react";

export interface GuaranteeBlockProps {
  title: string;
  description: string;
}

export function GuaranteeBlock({ title, description }: GuaranteeBlockProps) {
  return (
    <section className="bg-cream px-4 py-12">
      <div className="mx-auto flex max-w-2xl flex-col items-center gap-3 text-center">
        <ShieldCheck className="h-10 w-10 text-success" />
        <h2 className="font-display text-xl font-semibold text-ink">{title}</h2>
        <p className="text-text-primary/80">{description}</p>
      </div>
    </section>
  );
}
```

Note: `GuaranteeBlock` now owns its `bg-cream` background directly (previously the page wrapped it in an unstyled `<section>`) — this matches the pattern `Hero` already uses of owning its section background, and means Task 7 renders `<GuaranteeBlock />` directly with no wrapping `<section>`.

- [ ] **Step 5: Update `components/campaign/faq-section.tsx`**

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
    <section className="bg-white px-4 py-12">
      <div className="mx-auto max-w-2xl">
        <h2 className="mb-6 text-center font-display text-2xl font-semibold text-ink">Perguntas frequentes</h2>
        <Accordion items={accordionItems} activeBorderClassName="border-l-coral" />
      </div>
    </section>
  );
}
```

Note: `FaqSection` now owns its `bg-white` background directly, same reasoning as `GuaranteeBlock` — Task 7 renders `<FaqSection items={faqContent} />` with no wrapping `<section>`.

- [ ] **Step 6: Manual verification**

Run: `npm run dev`, open `http://localhost:3000/zumbido-na-pratica/vendas`. The page still looks like the OLD design at this point (Task 7 hasn't rewired it yet) — confirm it still renders without errors and the FAQ accordion still expands/collapses (now with a colored left border on the open item using the fallback `border-l-brand-accent`, since `FaqSection` hasn't been re-rendered with the new prop wiring until this component itself is used — actually it IS wired now since Step 4 already passes `activeBorderClassName="border-l-coral"` in the component itself, so you should see a coral left border on the open FAQ item immediately). Confirm the Garantia section still renders (now with its own `bg-cream`, which is visually identical to before since the page already sits on a cream-ish background).

Run: `npx tsc --noEmit` — must be clean.
Run: `npm run build` — must succeed.

- [ ] **Step 7: Commit**

```bash
git add components/ui/card.tsx components/ui/accordion.tsx components/ui/sticky-bar.tsx components/campaign/guarantee-block.tsx components/campaign/faq-section.tsx
git commit -m "feat: add opt-in shadow/accent/color props to Card, Accordion, StickyBar; apply new tokens to GuaranteeBlock and FaqSection"
```

---

## Task 3: Hero redesign

**Files:**
- Modify: `components/campaign/hero.tsx`
- Modify: `app/(campaigns)/zumbido-na-pratica/content.ts`

**Interfaces:**
- Produces: `Hero` gains an optional `imageSrc?: string` prop (passed through to an internal `VideoEmbed`, which already gracefully falls back to a branded placeholder — never a gray box — when `src` is `undefined`). `heroContent` gains a `videoSrc?: string` field (currently `undefined`, same pattern as `viradaContent.videoSrc`).
- Consumed by: Task 7 (page assembly passes `heroContent.videoSrc` as `Hero`'s `imageSrc`).

- [ ] **Step 1: Add `videoSrc` to `heroContent` in `content.ts`**

Find the `heroContent` export and add one field:

```ts
export const heroContent = {
  headline: 'Pare de dizer "não tem cura, vamos aprender a conviver" pro seu paciente com zumbido',
  subheadline:
    "Aprenda o protocolo que eu uso pra tratar zumbido de verdade — Terapia Manual, Laserterapia, Neuromodulação e mais 4 abordagens, direto de quem estuda o cérebro por profissão.",
  socialProofLine: "Mais de 65 profissionais da saúde já passaram por essa formação",
  ctaLabel: "Quero minha vaga na Turma 4",
  loteBadge: "Lote 1 até 13/08",
  videoSrc: undefined as string | undefined,
};
```

(Only the new `videoSrc` line is added — every other field is unchanged, copy is untouched.)

- [ ] **Step 2: Rewrite `components/campaign/hero.tsx`**

```tsx
import { CtaLink } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { VideoEmbed } from "@/components/ui/video-embed";

export interface HeroProps {
  headline: string;
  subheadline: string;
  socialProofLine: string;
  ctaLabel: string;
  ctaHref: string;
  loteBadge: string;
  imageSrc?: string;
}

export function Hero({
  headline,
  subheadline,
  socialProofLine,
  ctaLabel,
  ctaHref,
  loteBadge,
  imageSrc,
}: HeroProps) {
  return (
    <section className="px-4 py-16 lg:py-20">
      <div className="mx-auto flex max-w-5xl flex-col gap-8 lg:grid lg:grid-cols-2 lg:items-center lg:gap-12">
        <div className="text-center lg:text-left">
          <Badge className="mb-4">{loteBadge}</Badge>
          <h1 className="font-display text-3xl font-semibold leading-tight text-ink lg:text-5xl">
            {headline}
          </h1>
          <p className="mt-4 text-lg text-text-primary/80">{subheadline}</p>
          <CtaLink
            href={ctaHref}
            trackAs="InitiateCheckout"
            className="mt-8 w-full justify-center lg:w-auto"
          >
            {ctaLabel}
          </CtaLink>
          <p className="mt-3 text-sm text-text-secondary">{socialProofLine}</p>
        </div>
        <div className="mx-auto aspect-4/5 w-full max-w-sm overflow-hidden rounded-card lg:aspect-3/4 lg:max-w-none">
          <VideoEmbed src={imageSrc} thumbnailAlt="Foto ou vídeo da Expert" label="Vídeo em breve" />
        </div>
      </div>
    </section>
  );
}
```

Note: `Hero` no longer sets its own background color — Task 7's page wrapper supplies `bg-cream` for the whole reading block that `Hero` is the first section of (see Task 7's "signature line" wrapper). This is a deliberate coupling: `Hero` is a campaign-specific component built for this page's design, not a generic `/components/ui` primitive, so it's acceptable for it to expect a cream-toned ancestor.

- [ ] **Step 3: Manual verification**

Run: `npm run dev`. The Hero section will render with NO background color of its own until Task 7 rewires the page wrapper — that's expected and temporary; don't try to "fix" it in this task. Confirm:
- The image slot shows the `VideoEmbed` placeholder (Play icon + "Vídeo em breve" label) since `heroContent.videoSrc` is `undefined`.
- At `≥1024px` width (resize devtools), the layout switches to 2 columns (text left, image right).
- Below `1024px`, it's a single stacked column, image below text.
- `npx tsc --noEmit` — clean.
- `npm run build` — succeeds.

- [ ] **Step 4: Commit**

```bash
git add components/campaign/hero.tsx "app/(campaigns)/zumbido-na-pratica/content.ts"
git commit -m "feat: redesign Hero with 2-column desktop layout and optional image slot"
```

---

## Task 4: ModuleCards component (replaces ModuleAccordion)

**Files:**
- Create: `components/campaign/module-cards.tsx`
- Delete: `components/campaign/module-accordion.tsx`
- Modify: `app/(campaigns)/zumbido-na-pratica/content.ts` (one import line)

**Interfaces:**
- Produces: `export interface ModuleItem { number: number; title: string; description: string; isBonus?: boolean; isUpsell?: boolean }` (moved from `module-accordion.tsx`, same shape, no data migration needed) and `export function ModuleCards(props: { modules: ModuleItem[] }): JSX.Element`.
- Consumed by: Task 7 (page assembly renders `<ModuleCards modules={modulosContent} />` instead of `<ModuleAccordion modules={modulosContent} />`).

Note on scope: the spec's "chevron para expandir detalhe adicional se houver" is conditional — the current `ModuleItem` data model has only one `description` field, no separate "additional detail" field, and the spec is explicit that title + description must always be visible either way. Since there's no extra content to expand, this implementation renders the cards as static (no expand/collapse, no client-side state) rather than building interactivity for data that doesn't exist. If a future task adds a `details` field to `ModuleItem`, expand/collapse can be added then.

- [ ] **Step 1: Create `components/campaign/module-cards.tsx`**

```tsx
import { Badge } from "@/components/ui/badge";

export interface ModuleItem {
  number: number;
  title: string;
  description: string;
  isBonus?: boolean;
  isUpsell?: boolean;
}

export interface ModuleCardsProps {
  modules: ModuleItem[];
}

export function ModuleCards({ modules }: ModuleCardsProps) {
  return (
    <section className="bg-white px-4 py-12">
      <h2 className="mb-6 text-center font-display text-2xl font-semibold text-ink">
        Conteúdo da formação
      </h2>
      <div className="mx-auto flex max-w-2xl flex-col gap-3">
        {modules.map((module) => {
          const isBadgeVariant = module.isBonus || module.isUpsell;
          return (
            <div
              key={`module-${module.number}-${module.title}`}
              className={`flex items-start gap-3 rounded-card border p-4 ${
                module.isBonus
                  ? "border-coral-tint bg-coral-tint"
                  : module.isUpsell
                    ? "border-dashed border-border bg-white"
                    : "border-border bg-white"
              }`}
            >
              {!isBadgeVariant ? (
                <span
                  className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-semibold text-white ${
                    module.number === 5 ? "bg-coral" : "bg-ink"
                  }`}
                >
                  {module.number}
                </span>
              ) : null}
              <div className="flex-1">
                {module.isBonus ? (
                  <Badge tone="success" className="mb-1">
                    Bônus incluído
                  </Badge>
                ) : null}
                {module.isUpsell ? (
                  <Badge tone="alert" className="mb-1">
                    Disponível como adicional
                  </Badge>
                ) : null}
                <p className="font-semibold text-text-primary">
                  {isBadgeVariant ? module.title : `Módulo ${module.number} — ${module.title}`}
                </p>
                <p className="mt-1 text-sm text-text-secondary">{module.description}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Delete the old component**

```bash
rm components/campaign/module-accordion.tsx
```

- [ ] **Step 3: Update the import in `content.ts`**

Change:
```ts
import type { ModuleItem } from "@/components/campaign/module-accordion";
```
to:
```ts
import type { ModuleItem } from "@/components/campaign/module-cards";
```

(This is the only change to `content.ts` in this task — `modulosContent`'s data is untouched.)

- [ ] **Step 4: Manual verification**

Run: `npx tsc --noEmit` — this WILL fail until Task 7 also updates `vendas/page.tsx`'s import of `ModuleAccordion` (which no longer exists). That's expected — Task 7 fixes it. For this task, confirm the failure is ONLY in `vendas/page.tsx` (the one place still importing the deleted `ModuleAccordion`), not anywhere else — run `npx tsc --noEmit 2>&1 | grep -v "vendas/page.tsx"` and confirm no other errors remain.

- [ ] **Step 5: Commit**

```bash
git add components/campaign/module-cards.tsx content.ts
git rm components/campaign/module-accordion.tsx
git add "app/(campaigns)/zumbido-na-pratica/content.ts"
git commit -m "feat: replace ModuleAccordion with card-based ModuleCards"
```

(`vendas/page.tsx` still references the deleted component and won't type-check until Task 7 — this is a known, temporary, disclosed intermediate state, not a task failure.)

---

## Task 5: StickyMobileCta component

**Files:**
- Create: `components/ui/sticky-mobile-cta.tsx`

**Interfaces:**
- Produces: `export interface StickyMobileCtaProps { price: string; ctaLabel: string; ctaHref: string; heroSentinelId: string; priceSentinelId: string }` and `export function StickyMobileCta(props: StickyMobileCtaProps): JSX.Element`. Visible only below `1024px` (`lg:hidden`), appears once the element with id `heroSentinelId` has scrolled past the top of the viewport, and disappears once the element with id `priceSentinelId` enters the viewport.
- Consumed by: Task 7 (page assembly renders it once, passing sentinel ids it also places in the page, and `currentLote.price`/`campaignConfig.checkoutLink`).

- [ ] **Step 1: Create `components/ui/sticky-mobile-cta.tsx`**

```tsx
"use client";

import { useEffect, useState } from "react";
import { CtaLink } from "./button";

export interface StickyMobileCtaProps {
  price: string;
  ctaLabel: string;
  ctaHref: string;
  heroSentinelId: string;
  priceSentinelId: string;
}

export function StickyMobileCta({
  price,
  ctaLabel,
  ctaHref,
  heroSentinelId,
  priceSentinelId,
}: StickyMobileCtaProps) {
  const [pastHero, setPastHero] = useState(false);
  const [reachedPrice, setReachedPrice] = useState(false);

  useEffect(() => {
    const heroSentinel = document.getElementById(heroSentinelId);
    const priceSentinel = document.getElementById(priceSentinelId);
    if (!heroSentinel || !priceSentinel) return;

    const heroObserver = new IntersectionObserver(
      ([entry]) => setPastHero(!entry.isIntersecting && entry.boundingClientRect.top < 0),
      { threshold: 0 }
    );
    const priceObserver = new IntersectionObserver(([entry]) => setReachedPrice(entry.isIntersecting), {
      threshold: 0,
    });

    heroObserver.observe(heroSentinel);
    priceObserver.observe(priceSentinel);

    return () => {
      heroObserver.disconnect();
      priceObserver.disconnect();
    };
  }, [heroSentinelId, priceSentinelId]);

  const visible = pastHero && !reachedPrice;

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-50 border-t border-border bg-white px-4 py-3 shadow-[0_-4px_12px_rgba(0,0,0,0.08)] transition-transform duration-200 lg:hidden ${
        visible ? "translate-y-0" : "translate-y-full"
      }`}
      aria-hidden={!visible}
    >
      <div className="flex items-center justify-between gap-3">
        <span className="font-display text-lg font-semibold text-ink">{price}</span>
        <CtaLink href={ctaHref} trackAs="InitiateCheckout" className="flex-1 justify-center py-2.5 text-sm">
          {ctaLabel}
        </CtaLink>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Manual verification**

This component can't be meaningfully verified in isolation (it needs the sentinel elements Task 7 will place in the real page). Confirm only:
- `npx tsc --noEmit` — clean (the component itself type-checks; it isn't imported/used anywhere yet).
- Read through the logic once: `visible` is `false` until `pastHero` flips `true` (hero sentinel's top has scrolled above the viewport) and flips back to `false` the instant `reachedPrice` becomes `true` (price sentinel intersecting). Confirm this matches the spec's "aparece depois que o hero sai da tela... desaparece ao chegar na seção de Preço."

Full end-to-end verification (does it actually appear/disappear at the right scroll positions) happens in Task 7, once it's wired into the real page with real sentinels.

- [ ] **Step 3: Commit**

```bash
git add components/ui/sticky-mobile-cta.tsx
git commit -m "feat: add StickyMobileCta component"
```

---

## Task 6: AuditoryPathway component (static signature element, Phase 1)

**Files:**
- Create: `components/campaign/auditory-pathway.tsx`

**Interfaces:**
- Produces: `export function AuditoryPathway(): JSX.Element` — a purely decorative, absolutely-positioned SVG (`absolute inset-0`, no props). Must be rendered by a `position: relative` ancestor for the absolute positioning to anchor correctly.
- Consumed by: Task 7 (rendered once, as the first child of the wrapper that also contains Hero through Transformação — the "reading block" the pathway visually runs through, per the design spec's own stated endpoint at the "Quem ensina" section).

Scope note (disclosed deliberately, not a silent gap): the design spec calls for a third key-node marker at "módulo 5 (Neuromodulação)," inside the Módulos section — which has a different (white) background than the cream reading block the pathway physically renders behind. Extending one continuous SVG path across a background-color boundary while staying visible on both sides is a Phase 2/animation-scope problem, not a Phase 1/static one. This plan realizes that specific key-moment differently: `ModuleCards` (Task 4) already gives module 5 a distinct `bg-coral` numbered badge instead of `bg-ink` — that IS the "nó em destaque" for module 5, just expressed as a UI accent on the module card rather than a literal point on the SVG line. The pathway itself (this component) carries only the two nodes that fall within its own cream-background span: end of hero, and the Virada section.

- [ ] **Step 1: Create `components/campaign/auditory-pathway.tsx`**

```tsx
export function AuditoryPathway() {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      preserveAspectRatio="none"
      viewBox="0 0 100 1000"
      className="pointer-events-none absolute inset-0 z-0 h-full w-full opacity-30 lg:opacity-50"
    >
      <path
        d="M50 0 C 20 90, 80 150, 50 260 S 15 420, 50 520 S 85 640, 50 760 S 30 900, 50 1000"
        fill="none"
        stroke="var(--color-ink-light)"
        strokeWidth="1.5"
        vectorEffect="non-scaling-stroke"
      />
      {/* Node: end of hero */}
      <circle cx="50" cy="260" r="5" fill="var(--color-coral)" />
      {/* Node: Virada section */}
      <circle cx="50" cy="520" r="5" fill="var(--color-coral)" />
    </svg>
  );
}
```

The `viewBox="0 0 100 1000"` with `preserveAspectRatio="none"` and `h-full w-full` makes the path stretch to fill whatever height its relative ancestor ends up being (the combined height of Hero through Transformação), regardless of actual rendered pixel height — no JS measurement needed for this static phase. Node positions (y=260, y=520 out of 1000) are visually-tuned approximations of "end of hero" (~26% down the block) and "Virada" (~52% down the block), not JS-measured exact boundaries — acceptable given the spec's own framing of this element as "textura de fundo, não protagonista."

- [ ] **Step 2: Manual verification**

Can't be meaningfully verified in isolation (needs a real relative-positioned ancestor with real content height, which Task 7 provides). Confirm only:
- `npx tsc --noEmit` — clean.
- Read the SVG once: `aria-hidden="true"` and `focusable="false"` are present (decorative-only, correctly hidden from assistive tech), `pointer-events-none` so it never intercepts clicks on the real content above it.

Full visual verification (does it actually render as a subtle line behind the reading sections, do the coral nodes land in sensible spots) happens in Task 7.

- [ ] **Step 3: Commit**

```bash
git add components/campaign/auditory-pathway.tsx
git commit -m "feat: add static AuditoryPathway signature element"
```

---

## Task 7: Page assembly — rewire vendas/page.tsx

**Files:**
- Modify: `app/(campaigns)/zumbido-na-pratica/vendas/page.tsx`
- Modify: `components/campaign/price-card.tsx`

**Interfaces:**
- Consumes: everything from Tasks 1-6 (`Card`, `Accordion` via `FaqSection`, `Hero`, `ModuleCards`, `StickyMobileCta`, `AuditoryPathway`), plus the existing `getCurrentLote`, `campaignConfig`, `lotes`, and all `content.ts` exports.
- Produces: the fully redesigned page at `/zumbido-na-pratica/vendas`.

- [ ] **Step 1: Update `components/campaign/price-card.tsx` for the new tokens and the "only shadow on the page" requirement**

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

export function PriceCard({
  loteLabel,
  price,
  installment,
  originalPrice,
  ctaLabel,
  ctaHref,
  noteText,
}: PriceCardProps) {
  return (
    <Card elevated className="mx-auto max-w-md text-center">
      <p className="text-sm font-medium text-ink">{loteLabel}</p>
      <p className="mt-2">
        {originalPrice ? (
          <span className="mr-2 text-lg text-text-secondary line-through">{originalPrice}</span>
        ) : null}
        <span className="font-display text-4xl font-bold text-ink">{price}</span>
      </p>
      <p className="mt-1 text-text-secondary">{installment}</p>
      <CtaLink href={ctaHref} trackAs="InitiateCheckout" className="mt-6 w-full">
        {ctaLabel}
      </CtaLink>
      <p className="mt-3 text-sm text-text-secondary">{noteText}</p>
    </Card>
  );
}
```

- [ ] **Step 2: Rewrite `app/(campaigns)/zumbido-na-pratica/vendas/page.tsx`**

```tsx
import { Fraunces } from "next/font/google";
import { Check, X } from "lucide-react";
import { getCurrentLote } from "@/lib/campaign-phase";
import { StickyBar } from "@/components/ui/sticky-bar";
import { CtaLink } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { VideoEmbed } from "@/components/ui/video-embed";
import { StickyMobileCta } from "@/components/ui/sticky-mobile-cta";
import { Hero } from "@/components/campaign/hero";
import { PriceCard } from "@/components/campaign/price-card";
import { GuaranteeBlock } from "@/components/campaign/guarantee-block";
import { FaqSection } from "@/components/campaign/faq-section";
import { ModuleCards } from "@/components/campaign/module-cards";
import { AuditoryPathway } from "@/components/campaign/auditory-pathway";
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

export const dynamic = "force-dynamic";

const fraunces = Fraunces({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-fraunces",
});

export default function VendasPage() {
  const currentLote = getCurrentLote(lotes, new Date());

  return (
    <div className={fraunces.variable}>
      <StickyBar
        text={currentLote.barText}
        variant={currentLote.barVariant}
        countdownTarget={currentLote.endDate}
        backgroundClassName="bg-ink"
        countdownClassName="font-mono text-coral"
      />

      {/* Reading block: Hero → Dor → Virada → Para quem → Transformação, one shared
          cream background with the signature line running behind all of it. */}
      <div className="relative bg-cream">
        <AuditoryPathway />
        <div className="relative z-10">
          <Hero
            headline={heroContent.headline}
            subheadline={heroContent.subheadline}
            socialProofLine={heroContent.socialProofLine}
            ctaLabel={heroContent.ctaLabel}
            ctaHref={campaignConfig.checkoutLink}
            loteBadge={heroContent.loteBadge}
            imageSrc={heroContent.videoSrc}
          />
          <div id="hero-end-sentinel" aria-hidden="true" />

          {/* Dor — 3-block structure: isolated opening, left-aligned body, isolated closing */}
          <section className="px-4 py-12">
            <div className="mx-auto flex max-w-xl flex-col gap-8">
              <p className="mx-auto max-w-[20ch] text-center font-display text-xl text-text-primary">
                {dorContent.paragraphs[0]}
              </p>
              <div className="space-y-4 text-text-primary/80">
                {dorContent.paragraphs.slice(1, 4).map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
              <p className="mx-auto max-w-[20ch] text-center font-display text-xl text-text-primary">
                {dorContent.paragraphs[4]}
              </p>
            </div>
          </section>

          {/* Virada — high-contrast white card on the cream background */}
          <section className="px-4 py-12">
            <div className="mx-auto max-w-2xl rounded-card border border-border bg-white p-6">
              <h2 className="mb-4 text-center font-display text-2xl font-semibold text-ink">
                {viradaContent.title}
              </h2>
              <VideoEmbed src={viradaContent.videoSrc} thumbnailAlt="Por que o zumbido não está no ouvido" />
              <div className="mt-6 space-y-4 text-text-primary/80">
                {viradaContent.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </div>
          </section>

          {/* Para quem é / não é — stacked mobile, side-by-side desktop */}
          <section className="px-4 py-12">
            <div className="mx-auto grid max-w-3xl gap-4 lg:grid-cols-2">
              <div className="rounded-card border border-border bg-white p-5">
                <h3 className="mb-3 font-semibold text-text-primary">{paraQuemContent.leftTitle}</h3>
                <ul className="space-y-2">
                  {paraQuemContent.leftItems.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-text-primary/80">
                      <Check className="mt-0.5 h-5 w-5 shrink-0 text-success" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-card border border-border bg-cream p-5">
                <h3 className="mb-3 font-semibold text-text-primary">{paraQuemContent.rightTitle}</h3>
                <ul className="space-y-2">
                  {paraQuemContent.rightItems.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-text-secondary">
                      <X className="mt-0.5 h-5 w-5 shrink-0 text-text-secondary" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          {/* Transformação — coral checks, higher visual weight than "Para quem" */}
          <section className="px-4 py-12">
            <h2 className="mb-6 text-center font-display text-2xl font-semibold text-ink">
              {transformacaoContent.title}
            </h2>
            <ul className="mx-auto max-w-2xl space-y-3">
              {transformacaoContent.items.map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <Check className="mt-0.5 h-5 w-5 shrink-0 text-coral" />
                  <span className="text-text-primary/80">{item}</span>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </div>

      {/* Módulos — white background, card list, no signature line (see AuditoryPathway's scope note) */}
      <ModuleCards modules={modulosContent} />

      {/* Quem ensina — ink, continuous with Prova social below */}
      <section className="bg-ink px-4 py-12 text-center text-text-on-ink">
        <h2 className="mb-4 font-display text-2xl font-semibold">Sou {quemEnsinaContent.name}, neurocientista.</h2>
        <p className="mx-auto max-w-2xl whitespace-pre-line text-text-on-ink-secondary">{quemEnsinaContent.bio}</p>
      </section>

      {/* Prova social — same ink block, "65+" before the videos */}
      <section className="bg-ink px-4 py-12 text-text-on-ink">
        <p className="mb-2 text-center font-display text-4xl font-bold text-white">65+</p>
        <h2 className="mb-6 text-center text-2xl font-semibold">{provaSocialContent.headline}</h2>
        <div className="mx-auto grid max-w-4xl gap-6 md:grid-cols-2">
          {provaSocialContent.videos.map((video, index) => (
            <VideoEmbed key={index} src={video.src} thumbnailAlt={video.thumbnailAlt} />
          ))}
        </div>
      </section>

      {/* Oferta e bônus — cream, receipt-style list */}
      <section className="bg-cream px-4 py-12">
        <Card className="mx-auto max-w-xl">
          <h2 className="mb-4 font-display text-xl font-semibold text-ink">{ofertaContent.title}</h2>
          <ul className="space-y-2">
            {ofertaContent.items.map((item, index) => (
              <li key={item} className="flex items-start gap-2 text-text-primary/80">
                <Check
                  className={`mt-0.5 h-5 w-5 shrink-0 ${index === 0 ? "text-coral" : "text-success"}`}
                />
                <span className={index === 0 ? "font-medium text-text-primary" : ""}>{item}</span>
              </li>
            ))}
          </ul>
          <p className="mt-4 font-display font-semibold text-ink">{ofertaContent.closingLine}</p>
        </Card>
      </section>

      {/* Preço e lotes — white, the one elevated card on the page */}
      <section id="price-sentinel" className="bg-white px-4 py-12">
        <PriceCard
          loteLabel={`Turma 4 — ${currentLote.label}`}
          price={currentLote.price}
          installment={currentLote.installment}
          ctaLabel="Garantir minha vaga"
          ctaHref={campaignConfig.checkoutLink}
          noteText={currentLote.barText}
        />
      </section>

      <GuaranteeBlock title={garantiaContent.title} description={garantiaContent.description} />

      <FaqSection items={faqContent} />

      {/* CTA final — ink */}
      <section className="bg-ink px-4 py-16 text-center text-text-on-ink">
        <h2 className="font-display text-2xl font-semibold sm:text-3xl">{ctaFinalContent.title}</h2>
        <p className="mt-4 text-text-on-ink-secondary">{ctaFinalContent.subtitle}</p>
        <CtaLink href={campaignConfig.checkoutLink} trackAs="InitiateCheckout" className="mt-8 inline-flex">
          {ctaFinalContent.ctaLabel}
        </CtaLink>
      </section>

      <StickyMobileCta
        price={currentLote.price}
        ctaLabel="Garantir vaga"
        ctaHref={campaignConfig.checkoutLink}
        heroSentinelId="hero-end-sentinel"
        priceSentinelId="price-sentinel"
      />
    </div>
  );
}
```

Note on the "Oferta" list: the spec calls for "valor riscado à direita" for items that have one, but `ofertaContent.items` (in `content.ts`) stores each item as a single plain string (e.g. `"7 módulos completos, 100% ao vivo (R$ 3.500 avulso — não disponível nesta turma)"`), not as a structured `{ item, value }` pair — restructuring that data shape is a content-schema change outside this visual-only redesign's scope. This implementation gives the list a receipt-like visual treatment (check icon + text, first/highest-value item emphasized in coral) without attempting to parse a monetary value out of the existing strings. If a future task wants a literal struck-through value column, `ofertaContent.items` needs to become structured data first.

- [ ] **Step 3: Manual verification**

Run: `npm run dev`, open `http://localhost:3000/zumbido-na-pratica/vendas`.

Checklist:
- Page renders with no console errors, no hydration warnings.
- Sticky top bar: ink background (not the old petróleo/red), ~36px tall, small text, countdown digits in coral. Note: this design intentionally uses the same ink background in both `variant="default"` and `variant="urgent"` lote phases (the spec's section 3.1 doesn't carve out an urgent-specific color) — urgency in the final lote phase is now carried by the bar's text copy and the coral countdown, not a full background color swap. If that reads as a loss of urgency signal once real users see it, that's a copy/product call to revisit later, not a bug in this implementation.
- Hero: 2-column grid at `≥1024px`, single column below. Badge, headline (Fraunces), subheadline, CTA, social proof all present. Image slot shows the `VideoEmbed` placeholder.
- Dor: opening/closing lines are centered, serif, narrow (`max-w-[20ch]`); the 3 middle paragraphs are left-aligned normal text. Visually distinct blocks with clear vertical spacing.
- Virada: a white bordered card sits on the cream background, clearly the highest-contrast element in that section.
- Para quem: stacked on mobile width, side-by-side at `≥1024px`. Left column check icons are green (`text-success`), right column X icons are gray (`text-text-secondary`), not red.
- Transformação: check icons are coral.
- Módulos: card list (not accordion), module 5's number badge is coral, the rest are ink-colored, bonus cards have a tinted background, the upsell card has a dashed border.
- Quem ensina + Prova social: both render on a continuous dark ink background, "65+" appears above the video placeholders in large serif type.
- Oferta: white card on cream background, check-marked list.
- Preço: white card with a visible shadow — confirm by eye that no OTHER card/section on the page has a shadow.
- Garantia, FAQ, CTA final render correctly; the FAQ's open item has a coral left border.
- Signature line: scroll from Hero through Transformação and confirm a faint curved line is visible behind the text (more visible at desktop width per the `lg:opacity-50` vs `opacity-30` split), with 2 small coral dots along it. Confirm it is NOT visible behind the Módulos/Quem ensina/etc. sections (expected — those have opaque backgrounds).
- Sticky mobile CTA: resize below `1024px`. Scroll past the Hero — a fixed bar should slide up from the bottom showing the current price and a "Garantir vaga" button. Continue scrolling to the Preço section — the bar should slide back down/disappear. Resize to `≥1024px` — the bar should never appear at all (`lg:hidden`).
- All checkout CTAs still point to `campaignConfig.checkoutLink`'s resolved value (the `#checkout-pendente` placeholder, since `CHECKOUT_LINK` isn't set locally).

Then:
- Run `npx tsc --noEmit` — must be clean (this is also where Task 4's temporarily-broken `ModuleAccordion` import gets fixed, since it's no longer referenced).
- Run `npm run build` — must succeed. Check the route table: `/zumbido-na-pratica/vendas` should still show `ƒ` (dynamic) — confirm the `export const dynamic = "force-dynamic";` line survived the rewrite (it's easy to accidentally drop during a full-file rewrite; if it's missing, the page would silently go back to the static-prerendering bug this project already fixed once before).
- Quickly load `/zumbido-na-pratica/obrigado`, `/zumbido-na-pratica/quiz`, and `/privacidade` in the browser too — confirm they're visually unaffected (they don't import anything touched by this plan, but a quick look confirms the shared `Card`/`Accordion`/`FaqSection`/`GuaranteeBlock` prop changes in Task 2 didn't leak into pages that don't use the new cream/ink tokens — those pages don't render `FaqSection`/`GuaranteeBlock` today, but if that changes later, this is the moment such a regression would first appear).

- [ ] **Step 4: Commit**

```bash
git add "app/(campaigns)/zumbido-na-pratica/vendas/page.tsx" components/campaign/price-card.tsx
git commit -m "feat: assemble the redesigned vendas page (tokens, signature line, module cards, sticky CTA)"
```

---

## Post-plan checklist (not a task — do after Task 7)

- Run `npm run test` once to confirm the existing Vitest suite (unrelated to this visual work) is still green — this plan doesn't touch `/lib` or `/api`, so it should be unaffected, but confirm rather than assume.
- Re-read `docs/superpowers/specs/2026-08-11-vendas-page-visual-redesign-design.md` section by section against the final page once more, end to end, in the browser at both mobile and desktop widths.
- Phase 2 (scroll-driven animation of the signature line, section 2 of the spec) is explicitly out of scope for this plan — do not attempt it as part of Task 7's "polish."
