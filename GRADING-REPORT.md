# GRADING REPORT — CoboPhone Rebuild

> Synthesized from 4 independent grading agents (Design, UX/Conversion, Technical/Performance, Content/SEO) run against the live deployment at https://cobophone.vercel.app on 2026-05-21.

---

## Overall scores

| Dimension | Score | Verdict |
|---|---|---|
| **Design** (Awwwards rubric) | 7.4 / 10 avg | Agency-portfolio with one foot in regional-award |
| **UX / Conversion** | 7.3 / 10 | Top-decile for Madrid repair, but Step 6 leaks the conversion |
| **Technical / Performance** | 7.4 / 10 | Solid; ship-worthy after 4 specific fixes |
| **Content / SEO** | 8.1 / 10 | Wins suburbs + B2B, loses head terms vs Phone House |
| **Composite** | **7.55 / 10** | — |

Full per-dimension reports in [`grading/01-design.md`](grading/01-design.md), [`grading/02-ux.md`](grading/02-ux.md), [`grading/03-technical.md`](grading/03-technical.md), [`grading/04-content-seo.md`](grading/04-content-seo.md).

---

## Prioritized action list (Impact × Effort × Phase order)

Each finding tagged with source (`D` = design, `U` = UX, `T` = technical, `C` = content/SEO) and the recommendation number from that report.

### Tier 1 — Ship today (H impact, L–S effort)

| # | Fix | Source | File |
|---|---|---|---|
| **F1** | Wire `Step 6` confirmation to a real submit (POST to `/api/contact` or `/api/booking`) — currently `markSubmitted()` flips local state with no booking | U-1 | `src/components/quote/QuoteTool.tsx:422-452` |
| **F2** | Demote WhatsApp button to ghost/outline in the hero — it currently outshouts the primary blue CTA | U-2 | `src/components/sections/HomeHero.tsx:54-63`, `src/components/ui/Button.tsx` |
| **F3** | Add `Content-Security-Policy` header to `next.config.mjs` | T-1 | `next.config.mjs:34-42` |
| **F4** | Demote the H1 in `PhoneJourney.tsx` and `HowItWorks.tsx` so the home has exactly one H1 | T-4 | section components |
| **F5** | Lazy-load Chatbot via `next/dynamic` with `ssr: false` (saves ~40 kB on every page) | T-3 | `src/app/layout.tsx:8,92` |
| **F6** | Wire `hreflang` on dynamic routes via `buildMetadata()` from `src/lib/seo.ts` | T-2 | `[marca]/[modelo]/page.tsx`, `sitemap.ts` |
| **F7** | Truncate `/reparacion/movil` title to ≤ 60 chars | C-6 | `src/app/reparacion/movil/page.tsx` metadata |
| **F8** | Fix `/preguntas-frecuentes` title (brand duplicated) | C-9 | metadata export |
| **F9** | Drop em-dashes on `/ubicacion` and `/contacto` per voice spec | C-8 | both pages |
| **F10** | Swap iPhone model H1 to tú-form imperative ("Repara tu iPhone…") | C-10 | model template |
| **F11** | Add `Service` schema wrapping `AggregateOffer` on model + brand + device-hub pages | T-5 + C-2 | `src/lib/seo.ts` |
| **F12** | De-duplicate hero trust signals (4-cell strip + 3 pill badges = redundant) | D-5 | `HomeHero.tsx:95-105` |
| **F13** | Add `aria-describedby` on contact form fields + add real `role="progressbar"` ARIA on quote tool progress | U-8 + T-9 | `ContactForm.tsx`, `QuoteTool.tsx:73-89` |
| **F14** | Add `error.tsx` boundary at the app root, branded like `not-found.tsx` | T-6 | new `src/app/error.tsx` |
| **F15** | Add "Si no sabemos el fallo, es que no existe" to `/sobre-nosotros` as a closing H2 | C-5 | `sobre-nosotros/page.tsx` |
| **F16** | Add `FAQPage` schema to `/garantia` (it's structurally a FAQ already) | C-4 | `garantia/page.tsx` |
| **F17** | Add a violet-tinted card surface token + use on trust band, "Pro" tier, price columns — so brand color survives outside dark heroes | D-2 | `globals.css` (new `--color-paper-violet`) + section files |
| **F18** | Gate hero device CSS animations behind `prefers-reduced-motion: no-preference` | U-9 | `HomeHero.tsx:182-211` |

### Tier 2 — Worth the effort (H impact, M–L effort)

| # | Fix | Source | File |
|---|---|---|---|
| **F19** | Inject 1 model-specific Google review + "N pantallas iPhone reparadas este año" counter at the price-reveal peak moment | U-3 | `QuoteTool.tsx:340-420` |
| **F20** | Add count-up animation to the price reveal number (0 → priceMax over 600ms) | U-6 | `QuoteTool.tsx:358-362` |
| **F21** | Break the repair detail table into a **price ladder** — top 3 repairs as bento cards, the rest collapsed under a disclosure | D-3 | `[modelo]/page.tsx` |
| **F22** | Promote "Móvil" to a 2×span hero tile in quote step 1 (Hick's Law + accelerate the volume product) | D-7 + U-5 | `QuoteTool.tsx:155-181` |
| **F23** | Make the "Pro" tier on `/mayoristas` win visually — dark surface, scale 1.05, magenta "Recomendado" badge with shadow lift | D-9 | `mayoristas/page.tsx` `TierCard` |
| **F24** | Differentiate the three back-to-back grids on home (categories carousel + brands grid + reviews editorial pull-quote) | D-6 | `Services.tsx`, `Brands.tsx`, `Reviews.tsx` |
| **F25** | Add rate-limit + honeypot to `/api/contact` | T-7 | `route.ts` + `ContactForm.tsx` |
| **F26** | Add Noto Sans SC font for `zh-Hans` locale via `next/font/google` | T-10 | `layout.tsx` |
| **F27** | Add `AggregateRating` + `Review` JSON-LD on home using the real review data we already have | C-3 | `page.tsx` + `seo.ts` |

### Tier 3 — Big payoff (H impact, H effort) — programmatic SEO + R3F

| # | Fix | Source | File |
|---|---|---|---|
| **F28** | Generate `/reparacion/movil/[marca]/[modelo]/[zona]` programmatic pages — 30 models × 8 suburbs = 240 indexable URLs | C-1 | new route segment |
| **F29** | Cross-link "Reparamos en tu zona" on every model + brand page | C-7 | new `ZonasCrossLinks` component |
| **F30** | Add typographic pairing — keep Geist body, add display serif/condensed grotesque for H1/H2 | D-4 | `globals.css` + `next/font` loader |
| **F31** | Ship the R3F home-hero scene — disassembling phone tied to scrollYProgress, 3 meshes lazy-loaded | D-10 | `HomeHero.tsx` + `next/dynamic` |
| **F32** | Real photography on home hero + `/ubicacion` (storefront + Marco portrait) | D-1 | `public/photos/` + section files |

### Tier 4 — Polish

- F33: Replace `target="_blank"` with `rel="noopener noreferrer"` everywhere (7 spots) — T bonus
- F34: Drop `prices.sort(...)` in favor of `[...prices].sort(...)` (mutation bug) — T bonus
- F35: Bigger gold accent on warranty chip cluster — U-10
- F36: Rewrite privacy checkbox copy from legalistic to natural — U-7
- F37: Drop console.log in `/api/contact` behind dev gate — T bonus

---

## Execution plan

1. **Sprint A** — F1 through F18 (Tier 1). Most are L/XS effort. Estimated impact: composite +0.8 to +1.0.
2. **Sprint B** — F19, F20, F21, F22, F27 (the conversion-quality wins). Estimated impact: composite +0.4.
3. **Sprint C** — F23, F24, F25, F26 (the polish + perf wins). Estimated impact: composite +0.3.
4. **Sprint D** — F28, F29 (programmatic SEO). Estimated impact: traffic 3–5× over 6 months.
5. **Sprint E** — F30, F31, F32 (R3F + photography). Estimated impact: SOTD-credibility, brand differentiation.

This file is the source of truth. Subsequent commits should reference the F-number they close (e.g., `feat(F4,F5): single H1 on home + lazy chatbot`).

---

## Strongest praise across all 4 reports

- **Token system (`globals.css`)** — OKLCH violet+magenta, violet-tinted neutrals, branded focus rings, mono-numeral discipline. SOTD-grade craft. (Design)
- **PhoneJourney 5-act scroll animation** — narrow opacity swap bands, layered motion vectors per act, real reduced-motion fallback. Original to CoboPhone, not a template. (Design)
- **URL-deep-linkable quote tool state + per-step ARIA + on-brand 404 recovery** (UX)
- **Zero `any`, zero `as any`, zero `@ts-ignore`** in `src/` (Technical)
- **Voice discipline — 0 forbidden buzzwords across 8 grepped pages, tú-form consistent, voice-spec examples used verbatim** (Content)
- **B2B `/mayoristas` is the strongest single page and beats every audited competitor on that vector** (Content)

---

## Single biggest weakness across all 4 reports

**Step 6 of the quote tool is a façade.** The user picks device → brand → model → repair → sees price → clicks "Reservar reparación" → gets a green checkmark. **No booking actually happens.** A customer who just psychologically committed to spending €299 receives nothing real — no callback timestamp, no reference number, no calendar invite. This is the single largest UX gap on the live site and gets F1 status.
