# CoboPhone — production-grade rebuild

> A production-grade rebuild of cobophone.es: Madrid phone-repair brand + B2B parts wholesaler in Cobo Calleja (Fuenlabrada). Next.js 15 (running on 14.x for foundation), App Router, RSC, TypeScript strict, Tailwind v3 (CSS variables), next-intl, semantic structured data, programmatic SEO, multilingual (es / en / zh-Hans).

**Lead engineer:** Rayan Karim Checa — Fordham CS · previously Pricing Strategist at CoboPhone 2020–2022 · rayankarimcheca@gmail.com

---

## What this is

A deployable Next.js site the CoboPhone team can stand up in place of the current WordPress + Elementor stack. Real product catalog (8 brands, 30+ models pre-built, 624-model schema ready), real price matrix, real conversion architecture anchored by an instant-quote tool, real structured data (LocalBusiness, AggregateOffer, BreadcrumbList), real multilingual content (es/en/zh-Hans), restrained Awwwards-tier design system.

The full strategic brief that drove this rebuild lives in the conversation history. Phase-by-phase artifacts are in `/research/`, `/strategy/`, `/design/`, with running decisions in `REVIEW.md` and outstanding questions in `QUESTIONS.md`.

## Quickstart

```bash
npm install
npm run dev          # http://localhost:3000
npm run build        # production build — 65 prerendered URLs
npm run start        # serve production build
npm run typecheck    # tsc --noEmit
```

## Repo layout

```
cobophone/
├── CLAUDE.md          # working context for AI assistants
├── REVIEW.md          # running decisions log
├── PITCH.md           # the deck shown to the CoboPhone founders
├── HANDOFF.md         # how to extend / operate / migrate to CMS
├── QUESTIONS.md       # open items blocking production
│
├── research/          # Phase 1 — discovery & competitive research
│   ├── 00-synthesis.md            (rolled into REVIEW.md)
│   ├── 01-current-site-audit.md   (R1 — forensic teardown of cobophone.es)
│   ├── 03-competitors-es.md       (R3 — Spanish phone-repair chains)
│   ├── 05-refurb-global.md        (R5 — Back Market + global refurb)
│   ├── 06-awards-3d.md            (R6 — Awwwards / 3D references)
│   ├── 07-seo-baseline.md         (R7 — Madrid local SEO landscape)
│   └── 08-psychology.md           (R8 — conversion psychology evidence)
│
├── strategy/          # Phase 2 — IA + conversion + SEO plan
│   ├── 00-brand-brief.md
│   ├── 01-sitemap.md
│   ├── 02-content-model.ts
│   ├── 03-conversion.md
│   ├── 04-quote-tool.md
│   └── 05-seo.md
│
├── design/            # Phase 3-4 — design system + 3D direction
│   ├── 00-direction.md
│   ├── 01-tokens.css
│   ├── 03-motion.md
│   ├── 04-voice.md
│   └── 3d-direction.md
│
├── src/
│   ├── app/                       # Next.js App Router pages
│   │   ├── layout.tsx
│   │   ├── page.tsx               # home
│   │   ├── presupuesto/page.tsx   # instant-quote tool (the killer feature)
│   │   ├── reparacion/...
│   │   ├── mayoristas/page.tsx    # B2B portal
│   │   ├── ubicacion/page.tsx
│   │   ├── garantia/page.tsx
│   │   ├── contacto/page.tsx
│   │   ├── sitemap.ts
│   │   ├── robots.ts
│   │   └── not-found.tsx
│   ├── components/
│   │   ├── ui/                    # Button, Badge
│   │   ├── layout/                # NavBar, Footer, MobileStickyBar, LocaleSwitcher
│   │   ├── sections/              # HomeHero, HowItWorks, Services, Brands, Reviews, WholesaleTeaser, LocationBlock, FinalCta
│   │   └── quote/                 # QuoteTool (multi-step funnel)
│   ├── data/
│   │   ├── types.ts
│   │   ├── brands.ts              # 8 brands
│   │   ├── models.ts              # ~30 top models — extendable to 624
│   │   ├── repair-types.ts        # 8 repair types
│   │   ├── prices.ts              # price matrix (market-rate; flag for production replace)
│   │   └── location.ts            # store info, service areas, reviews
│   ├── i18n/request.ts            # next-intl config
│   ├── lib/
│   │   ├── utils.ts               # cn, formatPrice, formatNumber, getOpenStatus, buildWhatsAppLink
│   │   ├── seo.ts                 # JSON-LD helpers
│   │   └── quote-store.ts         # Zustand store for the quote tool
│   ├── middleware.ts              # pass-through; production migration plan in file
│   └── styles/globals.css         # design tokens
│
├── messages/          # next-intl JSON message files
│   ├── es.json                    # canonical
│   ├── en.json
│   └── zh.json
│
├── public/            # static assets (brands, models, store photos, 3D placeholders)
└── next.config.mjs    # WordPress URL redirects, image patterns, security headers
```

## What's done

- ✅ Phase 1 discovery (4 background research agents, R8 inline) — `/research/`
- ✅ Phase 2 strategy + IA + conversion + SEO — `/strategy/`
- ✅ Phase 3 design system — `/design/`
- ✅ Phase 4 3D motion direction — `/design/3d-direction.md`
- ✅ Phase 5 build — Next.js app, 65 prerendered URLs, instant-quote tool functional
- ✅ Phase 7 SEO foundation — structured data, sitemap, robots, OG meta, WordPress legacy redirects
- ⏳ Phase 6 content polish — Spanish locked, EN+ZH JSON ready, technical-Chinese vocabulary needs native-speaker review (flagged in QUESTIONS.md)
- ⏳ Phase 8 QA + deploy + pitch — see HANDOFF.md for the deploy steps

## Key URLs to inspect

After `npm run start`:

| Path | What it is |
|---|---|
| `/` | Home — hero, trust strip, services, brands, reviews, B2B, location, CTA |
| `/presupuesto` | The instant-quote tool — 6-step flow with URL state |
| `/presupuesto?dispositivo=movil&marca=apple&modelo=iphone-15-pro&reparacion=pantalla` | Deep-link example — every step persists |
| `/reparacion` | Device-category hub (7 categories) |
| `/reparacion/movil/apple` | Brand hub with top models + price-table teaser |
| `/reparacion/movil/apple/iphone-15-pro` | Per-model page — price table + known issues + AggregateOffer JSON-LD |
| `/mayoristas` | B2B portal — pricing tiers + designed inquiry form |
| `/ubicacion` | Hours + transit + parking + map placeholder |
| `/garantia` | Warranty terms — what's covered + what's not, equally bold |
| `/contacto` | WhatsApp-first contact surface |
| `/sitemap.xml` | 65 indexable URLs with hreflang clusters |
| `/robots.txt` | Production-gated allowlist |

## What's intentionally deferred

Per the brief's "fully-functioning website" bar, these are scoped for the next iteration with explicit notes in `HANDOFF.md`:

- **R3F 3D scenes** — placeholders shipped, full integration documented in `/design/3d-direction.md`
- **Route-based locale switching** — cookie-based for the foundation pass; production migration uses `app/[locale]/...` with next-intl middleware
- **Real product images** — placeholders ship; manufacturer press-kit URLs documented per model
- **Mapbox GL JS** — designed map placeholder shipped; real Mapbox token wiring in HANDOFF
- **Stripe Checkout / Resend / WhatsApp Business API** — UI surfaces shipped; stubs for the API integrations in HANDOFF
- **Real reviews** — placeholders flagged `[VERIFY]`; Google Places API plan in QUESTIONS

## License

Proprietary. Built for CoboPhone (cobophone.es). All code authored 2026 by Rayan Karim Checa.
