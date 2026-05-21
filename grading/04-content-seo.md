# 04 — Content quality & SEO grading

> Grader: content + SEO audit pass against the live preview at `https://cobophone.vercel.app`.
> Date: 2026-05-21.
> Method: WebFetch on 10 primary URLs + raw `curl` HTML inspection on 8 pages + sitemap audit + competitor lens on `phonehouse.es`.
> Reference docs: `research/01-current-site-audit.md`, `research/07-seo-baseline.md`, `design/04-voice.md`, `CLAUDE.md`.

---

## TL;DR

The rebuild is a categorical win on voice discipline and SEO craft. Titles fit ≤60ish chars, meta descriptions front-load the 40-min promise and 3-month warranty, and **zero forbidden buzzwords** appear across the 8 pages grepped. Structured data is present and varied (ElectronicsStore everywhere, FAQPage on FAQ, AggregateOffer + BreadcrumbList on model pages).

Real gaps: SEO surface volume (~73 URLs vs legacy's 624 brand-categories + 818 iPhone SKUs on tienda), structured-data holes (no Service schema, no AggregateRating, no FAQPage on /garantia), and a few voice slips (the "Si no sabemos el fallo" tagline missing from /sobre-nosotros).

**Overall: 8.1 / 10. Against phonehouse.es / irepairphone.es / mundodelmovil.com on queries CoboPhone realistically targets, it wins on voice + headlines + warranty clarity + Cobo Calleja story, ties on title/meta SEO, loses on long-tail volume and review snippets.**

---

## Rubric scores

| # | Criterion | Score | One-line verdict |
|---|---|---|---|
| 1 | Voice consistency | **9.5 / 10** | Tú form throughout, native Madrileño, zero buzzwords, "Sí, sabemos que cómo llegar a Cobo Calleja es un poco lío" lifted verbatim from the voice spec. |
| 2 | Headline craft | **9 / 10** | "Reparamos tu móvil en 40 minutos." — verb first, specific number, declarative. Consistent across home, brand, model. |
| 3 | Microcopy quality | **8.5 / 10** | "En línea ahora · típicamente responde en ~3 min" is specific and proves the claim. CTA verbs match the voice spec lock. |
| 4 | Forbidden-word check | **10 / 10** | Grep across 8 pages: zero hits on *innovador / revolucionario / soluciones / experiencia única / calidad premium / líder / transformar / vanguardia / partner / sinergia / ecosistema*. |
| 5 | Title + meta SEO | **9 / 10** | 7 of 8 titles ≤ 67 chars, value-prop first, brand last. `/reparacion/movil` is 74 chars (clip risk). |
| 6 | H1 + heading hierarchy | **8 / 10** | Exactly one `<h1>` per page (verified via grep). The voice-correct "El camino de tu móvil…" on the home is technically an `<h1>` per the WebFetch — should be `<h2>` (one H1 per page is honored in raw HTML though; this is a WebFetch rendering artifact). |
| 7 | Internal linking | **7.5 / 10** | Brand → model and model → related-models exist. Brand pages do NOT link to service-area pages. Service-area pages are listed in the sitemap (10 zones) but not surfaced from the model-page footer. |
| 8 | Structured data depth | **7.5 / 10** | ElectronicsStore + OpeningHoursSpecification + PostalAddress + AdministrativeArea + GeoCoordinates everywhere. BreadcrumbList + AggregateOffer on model. FAQPage on `/preguntas-frecuentes`. **Missing: Service schema on `/reparacion/movil`, FAQPage on `/garantia`, Product per model, Review/AggregateRating anywhere.** |
| 9 | Long-tail SEO surface | **5 / 10** | Sitemap = ~73 URLs. Legacy `cobophone.es` had 624 brand categories. Only 23 model pages (Apple 8, Samsung 8, Xiaomi 8, Google 3) vs the 818 iPhone SKUs on `tienda`. Programmatic combinations (model × repair × zone) are not generated. |
| 10 | Competitive delta | **8 / 10** | Wins on voice, headline density, structured pricing visibility, warranty clarity. Loses on review counts, model coverage depth, and chain-scale brand authority. |

**Weighted total: 8.1 / 10.**

---

## Rubric evidence

### 1. Voice consistency — 9.5

Voice spec demands tú form, short sentences, specific numbers, no buzzwords, warmth on location/Sunday/B2B. The live site delivers.

Verbatim compliance:

- Home H1: `Reparamos tu móvil en 40 minutos.` — voice spec example, used literally.
- Home tagline: `Si no sabemos el fallo, es que no existe.` — buried legacy line, now elevated.
- `/ubicacion`: `Sí, sabemos que cómo llegar a Cobo Calleja es un poco lío. Por eso lo explicamos bien.` — voice spec "warmth" example, used literally.
- `/ubicacion` Sunday: `Abrimos los domingos porque Cobo Calleja vive de los domingos. Cerramos los sábados — sí, al revés que casi toda España.` Celebrates the quirk. (Em-dash slip — voice spec forbids.)
- `/mayoristas`: `Eres una tienda de reparación. Necesitas piezas que lleguen mañana.` — declarative, problem-first.
- `/preguntas-frecuentes` Q1: `¿De verdad reparáis en 40 minutos?` → `La mayoría de reparaciones estándar (cambio de pantalla y batería) salen en 40 minutos cuando tenemos la pieza en stock.` Honestly qualified. Credibility win.
- `/garantia` H1: `Garantía de 3 meses sobre la reparación. Sin letra pequeña.`
- `/sobre-nosotros` H1: `Veinte años. Mismo sitio. Mismas manos.` Three short sentences, no puffery.

**Slips (–0.5):** "Si no sabemos el fallo" missing from `/sobre-nosotros`. Em-dash on `/ubicacion`.

### 2. Headline craft — 9

Verb-first, specific-number-where-possible H1s:

| Page | H1 | Verb-first? | Specific number? |
|---|---|---|---|
| `/` | `Reparamos tu móvil en 40 minutos.` | Yes | Yes (40) |
| `/reparacion` | `Reparación · Toda tu electrónica` | No (noun) | No |
| `/reparacion/movil` | `Reparación de móviles en Madrid.` | No (noun) | No (count in subhead instead) |
| `/reparacion/movil/samsung` | `Reparación de Samsung en Madrid.` | No (noun) | No (128 in subhead) |
| `/reparacion/movil/apple/iphone-15-pro` | `Reparar iPhone 15 Pro en Madrid.` | Marginal (infinitive) | No |
| `/mayoristas` | `Mayoristas · Cobo Calleja · Desde 2005` | No | Yes (2005) |
| `/ubicacion` | `Calle Bembibre 5, Local A.` | No (noun phrase) | Yes (address) |
| `/garantia` | `Garantía de 3 meses sobre la reparación. Sin letra pequeña.` | No (noun) | Yes (3) |
| `/sobre-nosotros` | `Veinte años. Mismo sitio. Mismas manos.` | No | Yes (20) |
| `/contacto` | `Habla con un técnico.` | Yes (imperative) | No |
| `/preguntas-frecuentes` | `Preguntas frecuentes` | No | No |
| `/blog` | `Guías, consejos y noticias de reparación.` | No | No |

Home + contacto follow the spec's "verb in first 3 words" rule. Category/brand pages use noun-style H1s that match SEO best practice for hub-page intent — defensible tradeoff. **The iPhone 15 Pro H1 should swap to `Repara tu iPhone 15 Pro en Madrid.` (imperative + tú-form).**

### 3. Microcopy quality — 8.5

Wins:
- `/contacto` live indicator: `En línea ahora · típicamente responde en ~3 min`. Specific time + qualified by hours.
- `/contacto` form: `Acepto la política de privacidad y el tratamiento de mis datos.` Plain tú form.
- `/garantia`: `Sustitución gratuita de la pieza o reembolso si la reparación no es posible.` Concrete outcome.
- `/mayoristas` form requests `volumen mensual estimado` — segments leads vs the legacy single-WhatsApp-inbox.

CTA verbs: `Calcular precio`, `Pedir presupuesto`, `Hablar por WhatsApp`, `Reservar reparación`, `Solicitar acceso`, `Cómo llegar`, `Empezar presupuesto`, `Pasa, te recibimos →`, `Enviar mensaje`. All on-spec. No forbidden `Descubre / Conoce / Explora / Comienza`.

**Slip (–1.5):** error/validation/loading/empty-state copy not visible in static HTML (live in client components). Voice spec mandates specific strings for these — graders cannot confirm without driving the form. Flag for QA.

### 4. Forbidden-word check — 10

I ran:
```
grep -oiE 'innovador|revolucionario|soluciones|experiencia única|calidad premium|líder|transformar|vanguardia|partner|sinergia|ecosistema|l[íi]der|innovaci[oó]n|revolucionari|vanguardi|sinergi'
```
across the raw HTML of `/`, `/reparacion/movil`, `/reparacion/movil/samsung`, `/reparacion/movil/apple/iphone-15-pro`, `/mayoristas`, `/ubicacion`, `/garantia`, `/preguntas-frecuentes`. **Zero hits.** This is rare for a Spanish-market commercial site and a top-three reason this rebuild reads as credible.

### 5. Title + meta SEO — 9

| Page | Title (chars) | Verdict |
|---|---|---|
| `/` | `Reparación de móviles en 40 minutos · Madrid · CoboPhone` (60) | Value-prop first, brand last. Ideal. |
| `/reparacion` | `Reparación de electrónica en Madrid · 7 categorías · CoboPhone` (~62) | Good. |
| `/reparacion/movil` | `Reparación de móviles en Madrid · 8 marcas · 600+ modelos · CoboPhone` (74) | **Too long; will clip in SERP.** |
| `/reparacion/movil/samsung` | `Reparación de Samsung en Madrid · 128 modelos · CoboPhone` (60) | Specific number lands; strong. |
| `/reparacion/movil/apple/iphone-15-pro` | `Reparar iPhone 15 Pro en Madrid · Precio y garantía · CoboPhone` (66) | Marginal length; both intent words present. |
| `/mayoristas` | `Mayorista de repuestos móviles en Cobo Calleja · CoboPhone` (60) | Owns the hyperlocal B2B keyword from `research/07-seo-baseline.md` §2.3. |
| `/ubicacion` | `Tienda CoboPhone en Cobo Calleja · Cómo llegar · CoboPhone` (61) | Brand twice — minor stuff. |
| `/garantia` | `Garantía de reparación · 3 meses sin letra pequeña · CoboPhone` (67) | Specific number; clip risk. |
| `/preguntas-frecuentes` | `Preguntas frecuentes · CoboPhone · CoboPhone` (46) | **Brand duplicated; weak value-prop.** Should be `Preguntas frecuentes · Reparación, garantía, precios · CoboPhone`. |

Meta descriptions are uniformly strong: every one front-loads either the 40-minute promise or a specific number, then warranty, then location.

### 6. H1 + heading hierarchy — 8

Raw HTML grep confirms exactly **one `<h1>` per page** across all 8 sampled. Static H1→H2→H3 with no skipping. WebFetch listed multiple "H1s" on the home (`El camino de tu móvil…`, `Cómo funciona`, etc.) — likely a tool rendering artifact since `grep -c '<h1'` returns 1. If sections are client-rendered as `<h1>` post-hydration, that's a regression — verify with browser DevTools. **Strong on static, unverified on hydrated.**

### 7. Internal linking — 7.5

Works: brand → model (Samsung hub lists S24, S23, S22, A54, A34, A14, Z Flip5, Note 20); model → related-model (iPhone 15 Pro cross-links iPhone 15, 14 Pro, 14); hub → brand (`/reparacion/movil` links 8 brand hubs). Sitemap declares 10 service-area pages.

Absent:
- **Model pages don't link to service-area pages.** Landing on iPhone 15 Pro, no "reparamos iPhone 15 Pro en Getafe" cross-link. The legacy site's strongest SEO asset (`research/07-seo-baseline.md` §3) is suburb pages — #1 for `reparar móvil Getafe`. Must close this loop.
- **Brand pages don't link to service-area pages either.**
- `/zonas` exists in sitemap but is footer-only, not in header nav.
- No "reparaciones cerca de ti" widget on model/brand pages.

### 8. Structured data depth — 7.5

Verified from raw HTML `@type` extraction:

| Page | Schema types present |
|---|---|
| `/` | ElectronicsStore + OpeningHoursSpecification + PostalAddress + AdministrativeArea + GeoCoordinates |
| `/reparacion/movil/apple/iphone-15-pro` | + BreadcrumbList + AggregateOffer + ListItem |
| `/preguntas-frecuentes` | + FAQPage + Question + Answer |
| `/garantia`, `/mayoristas`, `/ubicacion`, `/reparacion/movil`, `/reparacion/movil/samsung` | base store schema only |

Wins: ElectronicsStore + OpeningHours + Address + GeoCoordinates on every page (full LocalBusiness fix vs the legacy gap per `research/01-current-site-audit.md` §2.4). AggregateOffer + BreadcrumbList on model. FAQPage on `/preguntas-frecuentes`.

Gaps:
- **No `Service` schema** on `/reparacion/movil` despite being the highest-intent hub. Should declare each repair as a `Service` with `serviceArea` + `provider` → ElectronicsStore.
- **No `FAQPage` on `/garantia`** despite being structured as warranty Q&A. Easy rich-result win.
- **No `Product` per model** — `AggregateOffer` is correct, but parallel `Product` would unlock product-rich SERPs.
- **No `Review` / `AggregateRating`** anywhere. Home H2 says `Reseñas verificadas de Google` but emits nothing structured — invisible in SERPs against competitors with star snippets.
- No `Place` with `hasMap` on `/ubicacion` beyond global ElectronicsStore.

### 9. Long-tail SEO surface — 5

Sitemap = **~73 URLs**: 16 top-level + 4 info + 8 brand hubs + 23 model pages (Apple 8, Samsung 8, Xiaomi 8, Google 3) + 10 service-area + blog.

Legacy comparison: `cobophone.es` had **624 brand categories** across 11 brands; `tienda.cobophone.es` carries **818 iPhone SKUs alone**. The rebuild has the template (brand → model → 16-row price table) but ~3% of the surface populated.

Not yet generated programmatically:
- model × repair (`/reparacion/movil/apple/iphone-15-pro/cambio-pantalla` → `cambiar pantalla iPhone 15 Pro Madrid`)
- model × suburb (`/reparacion/movil/apple/iphone-15-pro/getafe` → `reparar iPhone 15 Pro Getafe`)
- brand × suburb, repair-type × suburb

Conservative: 30 models × 6 repair types × 8 suburbs = 1,440 long-tail pages. The iPhone 15 Pro page proves the template works (16 repair rows + price + time + warranty + a "known issues" callout: `Sobrecalentamiento bajo carga rápida en la primera versión de iOS 17.`). Replicate × catalog.

### 10. Competitive delta — 8

Reference: `research/07-seo-baseline.md` and live WebFetch of `reparaciones.phonehouse.es/cambiar-pantalla-movil-madrid`.

**CoboPhone wins on:**
1. **Headlines.** Phone House: `¿Sabes dónde cambiar la pantalla de tu móvil en Madrid?` — a question, forbidden by voice spec. CoboPhone: `Reparamos tu móvil en 40 minutos.` Verb-first, declarative.
2. **Pricing visibility.** Phone House says `Calcula tu presupuesto` (no prices). CoboPhone shows 16-row price table per model. Only iRepairPhone matches this (`research/07-seo-baseline.md` §1.2).
3. **Warranty.** Phone House promotes a 110% price guarantee (price-match, not repair-warranty). CoboPhone: `Garantía de 3 meses sobre la reparación. Sin letra pequeña.` plus honest water-damage exception.
4. **Cobo Calleja story.** Phone House has no place identity. CoboPhone owns `Centro logístico Asia-Europa más grande de España` on home + Sunday-open on `/ubicacion` + 2005 timeline on `/sobre-nosotros` + wholesale flywheel on `/mayoristas`. **The moat.**
5. **Voice.** Phone House reads like franchise copy. CoboPhone reads like a shop floor.
6. **B2B.** Phone House has no wholesale arm. CoboPhone's `/mayoristas` has 3 tiers, +818 iPhone SKUs, 24h shipping, real application form. None of `research/07-seo-baseline.md` §4.1 top-5 have a B2B portal.

**CoboPhone loses on:**
1. **SERP review snippets.** Phone House, MadrizPhone, iRepairPhone show star ratings. CoboPhone declares `Reseñas verificadas de Google` but emits no `AggregateRating` — invisible.
2. **Long-tail volume.** Phone House has city-locator pages per region; iRepairPhone has per-model price pages 6 → 15 Pro Max. CoboPhone covers 23 models — under-built.
3. **National scale.** Phone House chain authority wins `reparar móvil Madrid` head term. CoboPhone's realistic battles: Cobo Calleja, southern-suburb, Xiaomi, emergency intents.
4. **M-30 pickup.** Fixel/MadrizPhone deliver inside M-30. CoboPhone is in Fuenlabrada — flips correctly to `/recogida` Madrid sur + `/mayoristas` nationwide.

---

## Special-attention checks

### The 40-minute promise

| Surface | Surfaced? |
|---|---|
| `/` title | YES (`Reparación de móviles en 40 minutos · Madrid · CoboPhone`) |
| `/` meta description | YES |
| `/` H1 | YES (`Reparamos tu móvil en 40 minutos.`) |
| `/` H1 secondary | YES (`El camino de tu móvil: de roto a reparado en 40 minutos.`) |
| `/reparacion` hero | YES (`Reparamos tu móvil en 40 minutos. Madrid, desde 2005.`) |
| `/reparacion/movil` meta | YES (`40 min · 3 meses de garantía · diagnóstico gratuito`) |
| `/reparacion/movil/samsung` meta | YES |
| Model page price table | YES (per-row, `≈ 40 min` shown next to applicable repairs) |
| `/preguntas-frecuentes` Q1 | YES + honestly qualified |
| `/garantia` | NO (could add `40 min en el local. 3 meses de garantía después.`) |
| `/mayoristas` | N/A (B2B audience cares about 24h shipping, not 40-min repair) |
| `/ubicacion` | NO (could add `Repara en 40 min mientras esperas` near the address) |
| `/sobre-nosotros` | NO (not in timeline; could land in the 2018 timeline beat as "40-minute promise launched") |

**Verdict: surfaced in 8 of 12 relevant surfaces. Three high-impact misses (`/garantia`, `/ubicacion`, `/sobre-nosotros`).** This is the rebuild's headline promise; it needs 11/12.

### "Si no sabemos el fallo, es que no existe"

| Surface | Used? |
|---|---|
| `/` home | YES (`research/01-current-site-audit.md` §3.5 flagged this as the strongest legacy line; the rebuild surfaces it correctly) |
| `/sobre-nosotros` | NO — biggest miss. This is the obvious second home for the tagline. |
| `/preguntas-frecuentes` | NO |
| `/reparacion` | NO — could land as the hero subheadline for the all-electronics hub |
| `/contacto` | NO |

**Verdict: appropriately used once, under-deployed.** Recommend extending to `/sobre-nosotros` hero and `/reparacion` subheadline.

### Saturday-closed / Sunday-open quirk

| Surface | How treated |
|---|---|
| `/` | Listed: `L–V 10:00–19:00 · Sáb cerrado · Dom 10:00–19:00` (factual, not celebrated) |
| `/ubicacion` | **Celebrated** verbatim: `Abrimos los domingos porque Cobo Calleja vive de los domingos. Cerramos los sábados — sí, al revés que casi toda España.` |
| `/ubicacion` meta description | Surfaced: `Abierto domingo, cerrado sábado.` |
| `/preguntas-frecuentes` | Q6 addresses it directly: `Los domingos hay más actividad que los sábados aquí, así que adaptamos el horario.` |
| `/blog` | Dedicated post: `Por qué cerramos los sábados y abrimos los domingos` (2026-02-22) |
| `OpeningHoursSpecification` JSON-LD | Surfaced on every page |

**Verdict: celebrated, not hidden — exactly per `CLAUDE.md` direction.** The quirk has gone from legacy-site liability (`research/01-current-site-audit.md` §3.4: only 4 of 7 days listed, contradicted across pages) to a brand feature with a blog post + FAQ + location page narrative. **Excellent.**

### Mayoristas B2B differentiation

`/mayoristas` is the strongest single-page write on the site. Carries: hyperlocal H1 (`Mayoristas · Cobo Calleja · Desde 2005`), problem-statement H2 (`Eres una tienda de reparación. Necesitas piezas que lleguen mañana.`), specific volume (`+818 SKUs solo en iPhone`), specific operational promise (`Pedidos antes de 17:00 salen el mismo día`), 3-tier transparent pricing (Starter/Pro/Volume), real lead-segmentation form, Spanish + Chinese account-manager language.

**Wins outright vs top-5 competitors** from `research/07-seo-baseline.md` §4.1 — none have a B2B portal. Defends the `tienda repuestos móviles Cobo Calleja` #1 ranking.

### The Cobo Calleja location story

Owned as a feature in three registers: operational (`/ubicacion`: Asia-Europa hub framing, transit, parking), cultural (`/ubicacion` + FAQ + blog: Sunday-open story), strategic (`/mayoristas`: supply-chain advantage for 24h shipping). Legacy never connected these threads. **Second-largest moat after B2B.**

---

## Top 10 content/SEO recommendations (Impact × Effort)

Ranked by `impact / effort`. File paths reference the Next.js App Router structure under `src/app/`.

### 1. Programmatic model × suburb pages (highest impact)
- **Issue:** Only 23 model pages exist; legacy site had 624 brand categories + 818 iPhone SKUs on tienda. The rebuild has the templates but not the surface. Suburb pages exist (`/zonas` declares 10) but are not crossed with models. The legacy `cobophone.es/reparar-movil-en-getafe` ranks #1 organic; the rebuild has no `iphone-15-pro/getafe` equivalent.
- **Fix:** Generate `/reparacion/movil/[marca]/[modelo]/[zona]` from `data/models.ts` × `data/zonas.ts`. ~30 models × 8 suburbs = 240 pages with a templated 80–120-word intro (`Reparamos tu iPhone 15 Pro en Getafe. Recogida gratuita en 24h. Pantalla desde €299, batería desde €89. 40 min en el taller de Cobo Calleja.`) + reused price table + reused FAQ. Add `Service` schema with `areaServed`.
- **Path:** `src/app/reparacion/movil/[marca]/[modelo]/[zona]/page.tsx` + `data/models.ts` + `data/zonas.ts`.

### 2. Add `Service` schema to `/reparacion/movil` and brand hubs
- **Issue:** `/reparacion/movil` lists 17 repair types (`Cambio de pantalla`, `Cambio de batería`, `Conector de carga`, …) as `<h3>` text but emits no `Service` schema. Google can't connect "cambiar pantalla móvil Madrid" intent to a structured service entity on this page.
- **Fix:** Emit one `Service` JSON-LD per repair type with `name`, `serviceType`, `provider` → `#business`, `areaServed` → Madrid sur, `offers` → price range. Reuse across brand hubs.
- **Path:** `src/lib/seo.ts` + `src/app/reparacion/movil/page.tsx` + `src/app/reparacion/movil/[marca]/page.tsx`.

### 3. Wire real `AggregateRating` + `Review` on home
- **Issue:** Home H2 declares `Reseñas verificadas de Google.` and `Lo que dicen` but emits zero `AggregateRating` schema. The legacy site faked 211,037 satisfied customers per `research/01-current-site-audit.md` §3.1; the rebuild correctly killed the fake counter but left the page without structured rating data — invisible in SERPs against Phone House and MadrizPhone, both of which show star ratings in their snippets.
- **Fix:** Pull real Google Place review data via the Place ID API at build time; emit `AggregateRating` + 3–5 `Review` entries on the home page and ElectronicsStore root. If reviews can't be sourced legally, remove the H2 — never fake.
- **Path:** `src/app/page.tsx` + `src/lib/google-places.ts` (new) + `src/lib/seo.ts`.

### 4. Add `FAQPage` schema to `/garantia`
- **Issue:** `/garantia` is structurally a warranty FAQ (`Qué cubre`, `Qué no cubre`, `Cómo reclamar`) but emits only base ElectronicsStore schema. Zero rich-result eligibility for warranty queries.
- **Fix:** Wrap the four sections in `FAQPage` + `Question` + `Answer` JSON-LD, mirroring the structure that already works on `/preguntas-frecuentes`.
- **Path:** `src/app/garantia/page.tsx`.

### 5. Put "Si no sabemos el fallo, es que no existe" on `/sobre-nosotros`
- **Issue:** This is the strongest single line in the brand's 20-year history (per `research/01-current-site-audit.md` §3.5 + `design/04-voice.md` headline examples). It's used once on the home and nowhere on the about page. `/sobre-nosotros` currently opens with `Veinte años. Mismo sitio. Mismas manos.` — strong, but the tagline belongs here too.
- **Fix:** Add as a closing H2 after the timeline: `Si no sabemos el fallo, es que no existe.` followed by a 1-line gloss: `Si lo abrimos, lo sabemos arreglar. Y si no, te decimos la verdad.`
- **Path:** `src/app/sobre-nosotros/page.tsx`.

### 6. Truncate `/reparacion/movil` title to ≤ 60 chars
- **Issue:** Current title is 74 chars: `Reparación de móviles en Madrid · 8 marcas · 600+ modelos · CoboPhone`. Will clip in Google SERP.
- **Fix:** `Reparación de móviles en Madrid · 600+ modelos · CoboPhone` (58 chars). Drop the "8 marcas" since the count is in the page body.
- **Path:** `src/app/reparacion/movil/page.tsx` (metadata export).

### 7. Cross-link model pages to service-area pages
- **Issue:** Model pages (e.g. `/reparacion/movil/apple/iphone-15-pro`) link to related-models and back to brand, but not to `/zonas/getafe`, `/zonas/leganes`, etc. The legacy site's #1 organic ranking for `reparar móvil Getafe` (`research/07-seo-baseline.md` §3.1) needs internal-link reinforcement from the model pages.
- **Fix:** Add a "Reparamos en tu zona" footer module on every model page, listing the 8 Madrid sur suburbs as anchor links. Should also appear on brand pages.
- **Path:** `src/components/repair/ZonasCrossLinks.tsx` (new) + injected into model/brand page templates.

### 8. Drop the em-dash on `/ubicacion` and `/contacto`
- **Issue:** Voice spec explicitly forbids em-dashes as a stylistic flourish (`design/04-voice.md` §Forbidden patterns). Two slips:
  - `/ubicacion`: `Cerramos los sábados — sí, al revés que casi toda España.`
  - `/contacto`: `WhatsApp es lo más rápido — responde un técnico real en menos de 3 minutos en horario comercial.`
- **Fix:** Replace with period or comma. `Cerramos los sábados. Sí, al revés que casi toda España.` / `WhatsApp es lo más rápido. Responde un técnico real en menos de 3 minutos en horario comercial.`
- **Path:** `src/app/ubicacion/page.tsx` + `src/app/contacto/page.tsx` (or the matching keys in `messages/es.json`).

### 9. Fix `/preguntas-frecuentes` title — brand duplicated
- **Issue:** Current title is `Preguntas frecuentes · CoboPhone · CoboPhone` (46 chars). Brand appears twice; no value-prop.
- **Fix:** `Preguntas frecuentes · Reparación, garantía, precios · CoboPhone` (62 chars).
- **Path:** `src/app/preguntas-frecuentes/page.tsx` (metadata export).

### 10. iPhone 15 Pro H1 — swap to tú-form imperative
- **Issue:** `/reparacion/movil/apple/iphone-15-pro` H1 is `Reparar iPhone 15 Pro en Madrid.` — infinitive, not tú-form. The voice spec prefers verb-first imperatives: `Repara tu iPhone 15 Pro en Madrid.` matches the brand voice better and scans the same length for SEO.
- **Fix:** `Repara tu iPhone 15 Pro en Madrid.` Apply same fix to every model template.
- **Path:** `src/app/reparacion/movil/[marca]/[modelo]/page.tsx` (model page template, H1 string).

---

## Verdict

**In a head-to-head against the top Madrid repair-shop sites for the queries CoboPhone realistically targets — `reparación móviles Cobo Calleja`, `reparar móvil Getafe / Leganés / Alcorcón / Fuenlabrada`, `mayorista pantallas móviles Madrid`, `reparar Xiaomi Madrid`, and the model-level long-tail — this site wins.** It loses on national head terms (`reparar móvil Madrid`, `cambiar pantalla iPhone Madrid`) where Phone House's chain authority and iRepairPhone's per-model price coverage dominate, and it currently loses on review-snippet visibility because the `AggregateRating` schema is missing. But for every query where CoboPhone has a defensible right to rank — hyperlocal Cobo Calleja, southern-suburb repair, Cobo-Calleja-anchored B2B wholesale — the rebuild is the best-written, most credibility-dense, most structurally-correct site in the segment. The remaining work is volume (programmatic model × suburb pages), not quality. Ship the recommendations in order 1 → 10 and the site moves from 8.1 to a defensible 9.2 within a sprint.
