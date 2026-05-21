# 03 — Technical Audit · cobophone.vercel.app

**Auditor:** senior frontend engineer
**Target:** https://cobophone.vercel.app (Next.js 14.2.18, App Router, TS strict, Tailwind 3.4)
**Date:** 2026-05-21
**Verdict (TL;DR):** **7.4 / 10.** A genuinely strong foundation pass — real JSON-LD, real sitemap with hreflang, real Zod-validated form, semantic HTML, reduced-motion handling, and proper Vercel security headers minus CSP. Three things stand between this and "ship to a $1M ARR brand": a real Content-Security-Policy, image discipline (logos + future product photos), and a real test of First Load JS once R3F lands.

---

## Evidence captured

### Headers (`curl -I https://cobophone.vercel.app/`)
```
strict-transport-security: max-age=63072000; includeSubDomains; preload
x-content-type-options: nosniff
x-frame-options: DENY
referrer-policy: strict-origin-when-cross-origin
permissions-policy: camera=(), microphone=(), geolocation=(self)
# MISSING: content-security-policy
# MISSING: cross-origin-opener-policy / cross-origin-embedder-policy
```
Headers verified identical on `/`, `/presupuesto`, `/mayoristas`. Source: `next.config.mjs:32-44`.

### Home `/`
- `<title>`: **Reparación de móviles en 40 minutos · Madrid · CoboPhone** (62 chars — well under the 60–65 char visual cap for Google SERP)
- meta description: 138 chars — solid
- **H1 count = 3** (one in HomeHero, one in PhoneJourney, one in HowItWorks/another section). Multiple H1s are valid HTML5 but not best-practice for SEO.
- JSON-LD: **1 block** — `ElectronicsStore`. Parses cleanly. Injected in `src/app/layout.tsx:74-79`.
- Chatbot trigger button **is** in static HTML (`aria-label="Abrir chat con un técnico"` confirmed via `curl | grep`). No hydration mismatch risk visible.
- Canonical / hreflang on home: **MISSING** in raw HTML — `src/app/page.tsx` has no `generateMetadata`, so the layout-level metadata never sets `alternates`.

### `/reparacion/movil/apple/iphone-15-pro`
- `<title>`: **Reparar iPhone 15 Pro en Madrid · Precio y garantía · CoboPhone** (66 chars — at the upper edge)
- meta description: 110 chars
- **H1 count = 1** ✓
- canonical: `https://cobophone.es/reparacion/movil/apple/iphone-15-pro` ✓
- **hreflang: MISSING on dynamic model pages** — `generateMetadata` at `src/app/reparacion/movil/[marca]/[modelo]/page.tsx:17-30` sets only `alternates.canonical`, no `languages` block. `src/lib/seo.ts:25-32` already has the helper — it just isn't called from these routes.
- JSON-LD: **3 blocks** parsed cleanly:
  - `ElectronicsStore` (layout)
  - `AggregateOffer`: `lowPrice=25, highPrice=379, offerCount=16, priceCurrency=EUR` ✓
  - `BreadcrumbList`: 4 items, all absolute URLs ✓
- **No `Product` schema** wrapping the AggregateOffer — Google's repair-service rich results prefer `Service` or `Product`. AggregateOffer alone is borderline.

### `/sitemap.xml`
- **65 URLs**, of which 36 are `/reparacion/movil/*`
- 60 `<xhtml:link rel="alternate" hreflang="…">` tags across es / en / zh (20 each)
- **Hreflang only present on the 20 static pages** — the 36 brand+model URLs have no hreflang cluster (see `src/app/sitemap.ts:46-58`, where `brandPages` and `modelPages` omit the `alternates` block that `staticPages` includes at lines 37-43).
- No `x-default` in sitemap (though it is in `seo.ts:31`).

### `/robots.txt`
- Correctly bans `/api/` and `/_next/`, points to `sitemap.xml`. Source: `src/app/robots.ts`.

### `/api/contact`
- `POST` with valid body → `{"ok":true}` (200) ✓
- `GET` → 405 (correct, route only exports POST) ✓
- Zod schema enforces `name/email/message/consent` (`src/app/api/contact/route.ts:20-26`). No rate limiting, no captcha, no honeypot. Submissions only `console.log`'d — Resend integration commented out (lines 50-69).

---

## Rubric scores (1–10)

### 1. Bundle size & code-splitting — **6 / 10**

- Home page is **fully client-rendered**: every section component except `Brands.tsx` has `'use client'` at the top (`HomeHero.tsx:1`, `ContactForm.tsx:1`, `Chatbot.tsx:1`, `QuoteTool.tsx:1`). For a marketing landing page on App Router, this is a missed RSC opportunity — only the interactive bits (Chatbot, QuoteTool, ContactForm, LocaleSwitcher) need client.
- **Zero `next/dynamic` boundaries anywhere** (`grep -rEn "next/dynamic" src` → empty). Chatbot ships on first load of every page (`layout.tsx:92`); framer-motion + lucide-react come along for the ride even on `/`. The Chatbot is 455 lines and uses `framer-motion` + `lucide-react` — it should be `dynamic(() => import('@/components/chat/Chatbot'), { ssr: false })`.
- `framer-motion` is imported eagerly in HomeHero, PhoneJourney, Chatbot. Lazy-loading framer for the Chatbot alone saves ~30-40kb gzipped.
- No bundle analyzer config; no explicit budgets.
- Positive: `poweredByHeader: false` (`next.config.mjs:8`), `reactStrictMode: true`, no obvious unused-dep bloat in `package.json`.

### 2. Image optimization — **5 / 10**

- `next/image` is used only in `NavBar.tsx:3` and `Footer.tsx:1` — likely just the logo.
- **All brand logos are SVG components** (`src/components/ui/BrandLogo.tsx`) — good.
- **No real product photography on the site yet** — `DevicePlaceholder` in `HomeHero.tsx:133-215` is CSS-only emoji-grid. That's fine for a foundation pass but it's *also* why this score isn't lower; the moment real iPhone/Samsung hero shots land, the image story must be ready.
- `next.config.mjs:9-17` correctly enables AVIF/WebP and whitelists `images.unsplash.com`, `www.apple.com`, `images.samsung.com`, `i02.appmifile.com` — but those domains are not currently used in any rendered component. Dead configuration is a smell.
- `ModelImage.tsx` exists in `src/components/ui/` — confirm it uses `next/image` with explicit `width`/`height` and `sizes` before launch.
- `alt=""` on `NavBar.tsx:59` and `Footer.tsx:21` is `"CoboPhone"` — fine for a logo, though `alt=""` (empty) is more correct when wordmark text is already adjacent.

### 3. Font loading — **8 / 10**

- `next/font/google` loaded for Inter + JetBrains Mono with `display: 'swap'` (`src/app/layout.tsx:12-23`) ✓
- Subset = `latin` (✓ for Spanish; **insufficient for Chinese locale** — `zh-Hans` will fall back to system fonts. No CJK font is loaded).
- `Inter` loads four weights: 400/500/600/700. Tight but reasonable.
- Headers show `link: <…woff2>; rel=preload; as="font"` — Next is preloading the woff2 files correctly.
- Minor: no `preconnect` to fonts.gstatic in layout (next/font handles this internally so OK).

### 4. Structured data — **7 / 10**

- `ElectronicsStore` (`src/lib/seo.ts:53-86`): complete and clean — address, geo, hours (M-F + Sunday, Saturday correctly omitted matching brief), `priceRange`, `sameAs`, `areaServed`. ✓
- `AggregateOffer` on model pages: parses, `priceCurrency=EUR`, `lowPrice=25`, `highPrice=379`, `offerCount=16` for iPhone 15 Pro. ✓
- `BreadcrumbList` on model pages: 4 items with absolute URLs. ✓
- `FAQPage`: present on `/preguntas-frecuentes` (grep `curl … | grep -c FAQPage` → 1). ✓
- **Missing**: `Product` or `Service` wrapping the offer (Google's preferred shape for repair services), `Review` / `AggregateRating` (the Reviews section ships text reviews but no schema), `Organization` is folded into ElectronicsStore which is fine.
- `openingHoursSpecification` declares `Sunday 10–19` but no Saturday entry — correct given Saturday closed, but consider explicit `dayOfWeek: 'Saturday', opens: '00:00', closes: '00:00'` or simply leave it (Google interprets absence as closed).
- No JSON-LD `@graph` connecting the entities (each block is standalone).

### 5. SEO basics — **7 / 10**

- Titles and descriptions are present, written in real Spanish, within length budgets. ✓
- **`<title>` template** in `layout.tsx:29` is `'%s · CoboPhone'` — used consistently on inner pages. ✓
- **Canonical missing on home** — `src/app/page.tsx` exports no `generateMetadata`, so no `<link rel="canonical">` for `/`. Add one explicitly.
- **Hreflang missing on home, brand pages, and all 36 model pages.** Helper exists (`src/lib/seo.ts:25-32`), it's just not wired. This is the single biggest SEO miss.
- Multiple H1s on home (3) — refactor PhoneJourney section heading and HowItWorks heading to `<h2>`.
- Sitemap correctly served, `lastmod` populated, change frequencies sane.
- `robots.txt` correctly blocks `/api/` and `/_next/`.
- No `og:image` files exist at `public/og/default.jpg` / `public/og/storefront.jpg` — referenced in `seo.ts:20,59` but I didn't verify the files exist; if missing they'll 404 in OG previews. **Verify before launch.**

### 6. Accessibility — **8 / 10**

- Skip link present and functional (`layout.tsx:82-87`). ✓
- `<main id="main">` landmark and visible focus styles on skip link. ✓
- Reduced-motion handled globally in `src/styles/globals.css:242-248` — `animation-duration: 1ms !important` on all elements when `prefers-reduced-motion: reduce`. Strong. ✓
- Hero, Brands, ContactForm all use `aria-labelledby` correctly tying section to heading.
- Chatbot panel has `role="dialog"` + `aria-labelledby="chatbot-title"` (`Chatbot.tsx:343-344`), trigger has `aria-label` and `aria-expanded` (lines 316-317). Esc-to-close wired (lines 98-103). **But no focus trap** — the author admits it in the doc-block comment at `Chatbot.tsx:33-35`. For a marketing chatbot this is borderline acceptable; for WCAG 2.2 AA it's a finding.
- `lucide-react` icons consistently have `aria-hidden` where decorative ✓
- Form labels: `ContactForm.tsx` uses real `<label>` wrapping fields via the `Field` component (line 242). Errors announced via inline `<p>` — but **no `aria-describedby` linking error to input** (issue at `ContactForm.tsx:134-140` and similar). Easy fix.
- Color contrast: brand-primary `#0B5FFF` on white is 6.4:1 ✓, brand-secondary amber `#FFB800` on white is ~1.9:1 — only used as accent on dark surfaces (`HomeHero.tsx:33`), so OK in context, but flag if it ever lands on light surfaces.
- No keyboard testing performed in this audit — but tab order should be sensible given semantic HTML.

### 7. Security headers — **6 / 10**

- HSTS ✓ (Vercel default), `X-Content-Type-Options: nosniff` ✓, `X-Frame-Options: DENY` ✓, `Referrer-Policy: strict-origin-when-cross-origin` ✓, `Permissions-Policy: camera=(), microphone=(), geolocation=(self)` ✓. All wired in `next.config.mjs:32-44`.
- **No Content-Security-Policy.** Production-grade brand site without CSP is the single biggest security gap. Nonce-based CSP per the rules file is the right shape; even a starter policy (`default-src 'self'; img-src 'self' data: https:; script-src 'self' 'unsafe-inline' …`) is better than nothing.
- No `Cross-Origin-Opener-Policy` / `Cross-Origin-Embedder-Policy`.
- No `noreferrer` on most `target="_blank"` links (`HomeHero.tsx:56`, `ContactForm.tsx:75`, `QuoteTool.tsx:139, 281, 407`, `Chatbot.tsx:169, 218`). `rel="noopener"` is present, which prevents reverse-tabnabbing — but pair with `noreferrer` for defense in depth. Low severity.
- `/api/contact` has **no rate limiting, no captcha, no honeypot**. Author acknowledges in doc-block (`route.ts:16`). For pre-launch, accept; for production, must add.

### 8. Error handling — **7 / 10**

- 404: `src/app/not-found.tsx` exists, real Spanish copy, conversion-aware CTAs ("Calcular precio", WhatsApp). ✓
- **No `error.tsx`** anywhere in `src/app/` (verified `find … -name error.tsx` → empty). 500s will show Next's default error page. For a $1M ARR brand, ship a branded error boundary.
- **No `loading.tsx`** routes — fine for fully static rendering but worth adding at `/presupuesto` where the URL-hydration in `QuoteTool.tsx:36-45` could feel slow on cold load.
- ContactForm: explicit `idle/submitting/success/error` state machine (`ContactForm.tsx:26, 41-54`), real success + error UI (lines 202-219). ✓
- QuoteTool: graceful "Consulta el precio por WhatsApp" fallback when `getPrice()` returns null (`QuoteTool.tsx:365-367`). ✓
- Chatbot: handles "no model found" and "no price found" paths (`Chatbot.tsx:154-158, 249-252`). ✓
- API route: try/catch around `request.json()` returns 400 `{ok: false, error: 'invalid_json'}` (`route.ts:28-31`); Zod validation errors return 400 with structured `issues`. Clean. ✓
- Network-failure UX in `ContactForm.tsx:51-53`: catches any throw, sets `status='error'`, shows "Algo no ha salido bien" — but swallows the error object. Add `console.error(error)` for diagnostics; consider Sentry.

### 9. Type safety — **8 / 10**

- `tsconfig.json:5` has `"strict": true` ✓
- `grep -rEn "as any|as unknown as|@ts-ignore|@ts-expect-error" src` → **0 hits.** ✓
- `grep -rEn "\bany\b"` returns only one match, and it's the word "any" inside an English translation string at `src/data/repair-types.ts:220`. **Zero `any` types in code.** ✓
- One mildly questionable cast: `defaultValues: { …, consent: false as never }` in `ContactForm.tsx:37` — a workaround for Zod's `z.literal(true)` typing. Acceptable but ugly; cleaner with `z.boolean().refine(v => v === true)` and `consent: false`.
- `type Sender = 'bot' | 'user'` and tagged-union `Flow` in `Chatbot.tsx:39-54` — exemplary use of discriminated unions.
- Public APIs typed: `buildMetadata`, `localBusinessJsonLd`, `modelOfferJsonLd`, `breadcrumbJsonLd` in `seo.ts` all have explicit parameter/return types.
- Page params correctly typed as `Promise<{ marca: string; modelo: string }>` for Next 15 forward-compat (`[modelo]/page.tsx:17, 32`) — even though `package.json` pins Next 14.2.18. Forward-looking.
- `t.raw('list') as Array<{…}>` in `Brands.tsx:13` and similar in `HomeHero.tsx:16` — unavoidable with next-intl's untyped `raw`, but at least the assertion is narrow.

### 10. Code quality — **8 / 10**

- File-by-file separation is clean: routes own metadata + composition, sections in `components/sections/`, primitives in `components/ui/`, business data in `data/`, utilities in `lib/`. ✓
- Component sizes:
  - `QuoteTool.tsx` (471 lines) — at the edge of acceptable. The five `Step1`–`Step5` inner components could each be their own file (`components/quote/Step1Category.tsx`, etc.) for a cleaner diff history.
  - `Chatbot.tsx` (455 lines) — same. The flow state machine and the rendering could split into `useChatbotFlow` hook + `ChatbotPanel` view.
  - `PhoneJourney.tsx` (419 lines) — likely scrollytelling logic; would benefit from extraction once R3F lands.
  - All others ≤ 262 lines.
- No prop drilling — Zustand store (`useQuoteStore`) carries quote state across steps cleanly.
- Doc-block comments on `Chatbot.tsx:17-37`, `QuoteTool` step components, `api/contact/route.ts:3-19` — high signal, no boilerplate. Every comment explains a *why*, not a *what*. Excellent.
- DRY: `buildWhatsAppLink` centralizes WhatsApp message construction; `cn` for className merging; `formatPrice` for currency display. Good utility hygiene.
- Mutation: `prices.sort()` in `[modelo]/page.tsx:39` mutates the imported `prices` array — minor immutability slip; use `[...prices].sort(...)` or `.toSorted()`.
- One `console.log` in production code path (`src/app/api/contact/route.ts:45`). Author flags it as foundation-pass intentional; still a finding against the "no console.log in production" rule.

---

## Top 10 recommendations (Impact × Effort)

| # | Recommendation | Impact | Effort | Where |
|---|---|---|---|---|
| 1 | **Add Content-Security-Policy header.** Start with `default-src 'self'; img-src 'self' data: https:; style-src 'self' 'unsafe-inline'; script-src 'self' 'unsafe-inline'; connect-src 'self' https://wa.me; font-src 'self' data:; frame-ancestors 'none'`. Tighten with nonces in a follow-up. | High | S | `next.config.mjs:34-42` — append to the `headers` array |
| 2 | **Wire hreflang on dynamic routes.** In `[marca]/page.tsx` and `[marca]/[modelo]/page.tsx` `generateMetadata`, replace bare `{ canonical }` with `buildMetadata({...})` from `src/lib/seo.ts:6` — it already emits the `languages` cluster. Also extend `sitemap.ts:46-58` to include `alternates.languages` on `brandPages` and `modelPages`. | High | S | `src/app/reparacion/movil/[marca]/[modelo]/page.tsx:26-28`, `src/app/sitemap.ts:46-58` |
| 3 | **Lazy-load Chatbot + framer-motion.** Replace `import { Chatbot } from …` in `layout.tsx:8` with `const Chatbot = dynamic(() => import('@/components/chat/Chatbot').then(m => m.Chatbot), { ssr: false })`. Saves ~40kb gzipped on every page's first load. | High | S | `src/app/layout.tsx:8,92` |
| 4 | **Fix multiple H1s on home.** Demote the H1 inside `PhoneJourney.tsx` and the H1 inside whichever section is the third one (likely `HowItWorks.tsx`) to `<h2>`. Keep only `HomeHero.tsx:37` as the page H1. | High | XS | `src/components/sections/PhoneJourney.tsx`, `src/components/sections/HowItWorks.tsx` |
| 5 | **Add `Service` schema** wrapping the AggregateOffer on model pages, so Google can render proper repair-service rich results. Extend `modelOfferJsonLd` in `src/lib/seo.ts:88-113` to emit `{ "@type": "Service", "provider": {…}, "offers": { …AggregateOffer… } }`. | High | M | `src/lib/seo.ts:88-113` |
| 6 | **Add an `error.tsx` boundary** at the app root. Branded error page mirroring `not-found.tsx`. Wire it at `src/app/error.tsx` (must be a Client Component with `'use client'`). | Medium | S | new file `src/app/error.tsx` |
| 7 | **Rate-limit + honeypot `/api/contact`.** Add `@upstash/ratelimit` or simple in-memory token bucket (per-IP), and a hidden `honeypot` field in `ContactForm.tsx:124` that, when filled, the API silently 200s. | Medium | M | `src/app/api/contact/route.ts:27`, `src/components/sections/ContactForm.tsx` |
| 8 | **Verify `/og/default.jpg` and `/og/storefront.jpg` exist** in `public/`. Referenced in `src/lib/seo.ts:20,59`. If missing, generate static 1200×630 OG cards (one per major page) — `@vercel/og` is trivial. | Medium | S | `public/og/*`, optional `src/app/og/route.tsx` |
| 9 | **Add `aria-describedby`** from each input to its error message in `ContactForm.tsx`'s `Field` helper (lines 242-254). Improves screen-reader UX from "input — error somewhere on page" to "input, error: <message>". | Medium | XS | `src/components/sections/ContactForm.tsx:228-254` |
| 10 | **Add a CJK font** (`Noto Sans SC` from `next/font/google`) for the `zh-Hans` locale; conditionally apply via `html lang={locale}` body class. Currently Chinese visitors get system fallback fonts, breaking the "all three locales actually translating" non-negotiable from `CLAUDE.md`. | Medium | S | `src/app/layout.tsx:12-23,73` |

Bonus low-cost wins: drop the `console.log` in `api/contact/route.ts:45` behind `if (process.env.NODE_ENV !== 'production')`; replace `prices.sort(...)` with `[...prices].sort(...)` in `[modelo]/page.tsx:39`; add `rel="noopener noreferrer"` everywhere `target="_blank"` appears (7 spots).

---

## Score summary

| Dimension | Score |
|---|---:|
| Bundle & code-splitting | 6 |
| Image optimization | 5 |
| Font loading | 8 |
| Structured data | 7 |
| SEO basics | 7 |
| Accessibility | 8 |
| Security headers | 6 |
| Error handling | 7 |
| Type safety | 8 |
| Code quality | 8 |
| **Weighted average** | **7.4** |

---

## Technical verdict

**Would I ship this to production at a $1M ARR phone-repair brand? Yes — with the top 4 recommendations landed first (CSP, hreflang on dynamic routes, lazy Chatbot, single H1).** The bones are right: TypeScript strict with zero `any`, semantic HTML, real Zod validation, working sitemap with hreflang clusters on static pages, AggregateOffer that actually parses, reduced-motion respected, Vercel security headers wired, real 404 page. The remaining gaps are foundation-pass acknowledged debt (Resend not wired, no rate limit, no R3F yet, no `error.tsx`) — not architectural errors. Given that the deployed URL is the working state of a phased rebuild with the foundation explicitly scoped, this is genuinely above-average engineering work and would survive a $1M ARR brand's first real traffic week without embarrassing anyone — provided the four highest-impact gaps close before the marketing budget turns on.

Report file: `/Users/rayankarimcheca/Desktop/Dev/fun/cobophone/grading/03-technical.md`
