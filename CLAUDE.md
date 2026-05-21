# CLAUDE.md — CoboPhone Rebuild

> Working context for Claude Code across sessions on this project.

## What this project is

A complete production-grade rebuild of cobophone.es — a Madrid phone-repair brand + B2B parts wholesaler in Cobo Calleja (Fuenlabrada). Two businesses under one roof, currently presented as one confused WordPress + Elementor 4.x site.

The deliverable is a deployable Next.js 15 site (App Router, RSC, TypeScript strict, Tailwind v4), multilingual (es / en / zh-Hans), with interactive 3D (R3F) used sparingly at five specific moments, full local + programmatic SEO, structured data, and a real conversion architecture anchored by an instant-quote tool.

The full brief lives in the opening message of the original session — re-read it before making structural decisions.

## Phase model

1. Discovery & competitive research → `/research/`
2. Strategy, IA, conversion → `/strategy/`
3. Design system → `/design/`
4. 3D & motion direction → `/design/03-motion.md` + `/design/3d-direction.md`
5. Build (Next.js 15 + R3F + i18n) → `src/`
6. Content (es-first, en, zh) → `messages/`, `data/`
7. SEO + structured data + perf → `src/lib/seo.ts`, `src/app/sitemap.ts`
8. QA + deploy + pitch → `/PITCH.md`

Commit at every phase boundary using conventional commits.

## Project files

- `REVIEW.md` — running decisions log; append as decisions are made
- `PITCH.md` — the deck that gets shown to CoboPhone owners
- `HANDOFF.md` — operations manual (editing content, adding models, redeploying)
- `QUESTIONS.md` — anything blocking; write here, never block on the user
- `README.md` — quickstart

## Tech stack (hard)

- Next.js 15 App Router, RSC default, Turbopack dev
- TypeScript strict
- Tailwind v4 (CSS variables API, not v3 patterns)
- shadcn/ui base, customized aggressively
- React Three Fiber + drei + postprocessing for 3D
- Framer Motion + GSAP + ScrollTrigger + Lenis for motion
- next-intl for i18n
- React Hook Form + Zod for forms
- Zustand for cross-component state in the quote tool
- Mapbox GL JS via react-map-gl
- Stripe Checkout (test mode only)
- Resend (test mode only)
- WhatsApp = wa.me deep links only
- Vercel deploy

## Non-negotiables

- No lorem ipsum, ever — use `[VERIFY: <what>]` and flag in QUESTIONS.md
- No fake reviews
- No purple gradient AI-aesthetic
- 3D only in the five sanctioned places (home hero, quote-tool brand picker, per-service hero, 20-years timeline, B2B portal hero)
- Lighthouse mobile ≥ 95 on every primary page
- WCAG 2.2 AA
- `prefers-reduced-motion` honored everywhere
- All three locales actually translating
- Do NOT register cobophone.es or hijack the brand domain
- Do NOT use real Stripe creds; test mode only
- Rayan's personal contact info lives in PITCH.md and README.md only — NOT on the live site

## Brand voice

Spanish-first, native Madrileño, **tú** form, short sentences, specific numbers ("40 minutos", "3 meses de garantía", "20 años"), no marketing puffery. Forbidden: innovador, revolucionario, soluciones, experiencia única, calidad premium, líder, transformar.

## Color palette (working — challenge in design phase)

- brand-primary `#0B5FFF` — confident workshop blue
- brand-secondary `#FFB800` — amber, the 40-minute promise
- brand-accent `#00C48C` — service-green, success only
- shadow-blue `#0B1B3A` — dark hero / 3D background

## Key insider context (use, do not surface in copy)

Brief author Rayan Karim Checa worked at CoboPhone as Pricing Strategist 2020–2022. Operational realities:
- ~€400K annual logistics; pricing is a real competitive moat
- Supplier network spans domestic + international (Chinese OEM via Cobo Calleja, branded via European distributors)
- Volume product: screen replacements. High-margin: motherboard. Scaling: B2B parts wholesale.
- Saturday closed, Sunday open matches Cobo Calleja's wholesale rhythm — own this as a feature, not a quirk
- Never quote internal margin numbers in code, comments, or copy

## What "done" looks like

A live Vercel URL pitch-ready, with PITCH.md, REVIEW.md, HANDOFF.md, QUESTIONS.md complete, screenshots captured, Lighthouse reports saved, and a final ES + EN executive summary printed.
