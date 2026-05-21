# Cobophone — Current Site Forensic Audit (R1)

> Researcher: subagent R1
> Date captured: 2026-05-21
> Surfaces audited: `cobophone.es` (home, /reparacion-moviles, brand categories, contact, blog), `tienda.cobophone.es` (B2B/wholesale storefront), `pp.cobophone.es` (dead — see §1.4)
> Method: WebFetch + raw `curl` HTML inspection (`/tmp/cobo_home.html`, `/tmp/cobo_tienda.html`)

---

## Section 1 — Tech stack & vintage

### 1.1 Main site `cobophone.es`

| Layer | Signal |
|---|---|
| CMS | WordPress |
| Theme | `hello-elementor` (Elementor's blank stub theme — i.e. the page is built entirely in Elementor) |
| Page builder | **Elementor + Elementor Pro** |
| Commerce | **WooCommerce** (cart shows `0,00€` empty state) |
| Search | **Advanced Woo Search** (FiboSearch-style — confirmed by `[fibosearch]` shortcode leaking onto the rendered page and by `wp-content/plugins/advanced-woo-search/` asset path) |
| WhatsApp widget | **Chaty** (`wp-content/plugins/chaty/css/chaty-front.min.css`, `chaty/js/cht-front-script.min.js`) |
| SEO plugin | **Yoast SEO v27.6** (`<!-- This site is optimized with the Yoast SEO plugin v27.6 -->`) |
| Analytics | Google Site Kit + `gtag.js` with EU consent-mode default-deny |
| Ads / pixels | `woocommerce-google-adwords-conversion-tracking-tag` plugin present. **No Facebook Pixel / `fbq` detected on the main site.** |
| Payments | `woocommerce-gateway-amazon-payments-advanced` |
| Consent | `wp-consent-api` |

Build vintage: logo asset stamped `2020/06/Diseno-sin-titulo-10.png`; favicon set at `2023/03/cropped-LOGO-COBOPHONE-01-*.png`; `article:modified_time` of the home page is **`2025-04-21T11:34:52+00:00`**, so the site is being touched, but stylistically and from a brand-identity standpoint it is frozen in 2020–2023.

### 1.2 B2B store `tienda.cobophone.es`

| Layer | Signal |
|---|---|
| CMS | WordPress (separate install) |
| Theme | **`woostify` / `woostify-pro`** (different from main site) |
| Page builder | Elementor (same) |
| Commerce | WooCommerce + **`woocommerce-currency-switcher`** + **`woocommerce-payments`** |
| Marketplace plugin | **`dokan-lite`** — multi-vendor capability is installed but unused |
| WhatsApp widget | **Joinchat (`creame-whatsapp-me`)** — different plugin from main site's Chaty |
| Forms | **Contact Form 7** (main site appears to use Elementor Pro forms instead) |
| SEO plugin | **SEOPress Pro** (different from main site's Yoast) |
| Other | `jetpack`, `facebook-for-woocommerce`, `google-listings-and-ads` |
| Brand owner | Footer reads **`Copyright © 2023 | Cobotech International`** — _not_ Cobophone |

This is effectively a **separate brand identity** stitched to a subdomain — different theme, different SEO plugin, different chat plugin, different forms plugin, different copyright entity ("Cobotech International").

### 1.3 No multilingual stack

- No `hreflang` tags on the home page.
- No WPML, Polylang, Weglot, or TranslatePress assets in the page source.
- `<html lang="es">` only, `og:locale = es_ES` only.

### 1.4 `pp.cobophone.es` is dead

- `curl https://pp.cobophone.es/` → **`ECONNREFUSED`** (TCP-level refusal, not 404).
- Host-header spoof to the main origin returns a 146-byte stub (no content rendered).
- Wayback Machine has **no captures** for `pp.cobophone.es` (web.archive.org returned 404 for `web/2024/https://pp.cobophone.es/`).
- The "third visual identity" claim is therefore unverifiable from external evidence — it is either offline, internal-only, or has never been publicly indexed. **Treat as a ghost surface that exists in the brief but cannot be confirmed externally.**

---

## Section 2 — SEO & content failures (verbatim Spanish)

### 2.1 Keyword-stuffed title and hero

- Page title (home): **`Reparacion de moviles, arreglar pantalla movil`** — no accents, no brand, comma-joined keyword list.
- Meta description (home): **`Reparacion de moviles de todos los modelos, Arreglar pantalla movil es fácil con CoboPhone, Consulta el valor de Cambiar pantalla movil.`**
- Hero subheadline (home): **`Reparación Móviles en 40 MINUTOS - Reparamos móviles en todo Madrid`**
- Hero CTA strip (home): **`Busca tu móvil - Reparacion DE mOviles- Arreglar pantalla movil - CAMBIAR PANTALLA MOVIL`**
  - Inconsistent capitalisation (`DE mOviles`).
  - No accents on "Reparacion" / "moviles" / "pantalla" / "movil".
  - Three near-duplicate keyword phrases mashed into one button line.

### 2.2 H1 audit

| Page | H1 status |
|---|---|
| `/` (home) | `REPARACION DE MOVILES` — uppercase, no accent, no brand. |
| `/reparacion-moviles` | **No H1 at all.** Opens with prose "La reparación de móviles es un servicio importante…" then a section header `REPARACION DE MOVILES EXPRES`. |
| `/blog-reparacion-moviles` | **No H1** — the visible heading is just `Archivos`. |
| `/contactanos-reparacion-moviles` | `CONTACTANOS`. |
| `/categoria-producto/samsung/reparacion-tellefonos-samsung` | `Categoría: Reparación teléfonos Samsung` (note: URL slug contains typo **`tellefonos`**, not `telefonos`). |
| `/categoria-producto/xiaomi/reparacion-telefonos-xiaomi` | `Categoría: Reparación Teléfonos Xiaomi`. |
| `tienda.cobophone.es/categoria-producto/iphone` | A single, ~50-word run-on that has been jammed into the H1 slot: `Venta de recambios y repuestos para IPhone compatibles y originales, Venta de pantalla en Madrid, Fuenlabrada, Cobo Calleja. Garantía y envíos a toda España. Service Pack.` |

### 2.3 Page titles across the surface

- `/reparacion-moviles`: **`Reparación de móviles -Cambio de pantalla- Todos los modelos`**
- `/contactanos-reparacion-moviles`: **`CONTACTANOS - Cobophone Reparacion de Moviles`**
- `/blog-reparacion-moviles`: **`BLOG - Cobophone Reparacion de Moviles`**
- `/categoria-producto/samsung/...`: **`Reparación teléfonos Samsung archivos - Cobophone Reparacion de Moviles`** (the word `archivos` — "archives" — is leaking from the WordPress archive template).
- `tienda.cobophone.es`: **`Venta de Repuestos Móviles y Cambio de Pantalla en Fuenlabrada`** (decent — clearly written by a different hand).

### 2.4 Structured data — almost none

Home-page JSON-LD inventory:

- `WebSite`
- `WebPage`
- `Organization`
- `BreadcrumbList` + `ListItem`
- `ImageObject`
- `SearchAction` + `EntryPoint` + `PropertyValueSpecification` + `ReadAction`

**Absent across both `cobophone.es` and `tienda.cobophone.es`:** `LocalBusiness`, `Service`, `Product`, `Offer`, `FAQPage`, `HowTo`, `Review`, `AggregateRating`. For a Madrid local-service-area business with hundreds of repair SKUs and a wholesale arm, the missing `LocalBusiness` + `Product` + `AggregateRating` schema is a major SEO miss.

### 2.5 URL hygiene

- Live URL slug typo on the Samsung brand category: **`/categoria-producto/samsung/reparacion-tellefonos-samsung`** (extra `l` in `tellefonos`). The link is repeated identically from the homepage and the repair landing — so the typo is propagating.
- Mixed slug grammar across brands:
  - Samsung: `reparacion-tellefonos-samsung` (typo + plural)
  - Xiaomi: `reparacion-telefonos-xiaomi`
  - Oppo: `reparacion-telefonos-oppo`
  - Realme: no slug suffix at all, just `/categoria-producto/realme`
  - iPhone: `reparacion-movil-iphone` (singular)
  - Huawei: `reparacion-telefonos-huawei`
  - Google: `reparacion-telefonos-google`
- The Samsung archive title literally contains the word `archivos` (WordPress's default "archive" string was never customised).

---

## Section 3 — Trust signal audit

### 3.1 Counter widgets — confirmed broken on-load, real numbers underneath

Elementor counters in the homepage HTML:

```
data-to-value="20"      → "Años de servicio"
data-to-value="20000"   → "Equipos reparados"
data-to-value="211037"  → "Clientes satisfechos"
```

`data-from-value="0"` and `data-duration="2000"` are set. The values are real, but **both WebFetch passes (which render the DOM but do not always trigger Elementor's scroll-into-view counters)** rendered the section as `+ 0 / + 0 / + 0`. So on any device where:
- the user has not scrolled to the section,
- JS is throttled,
- or the IntersectionObserver-based animation never fires (common on slow Android devices, which are the exact demographic walking into a Cobo Calleja phone-repair shop),

the visitor sees **three plus-zero counters** ("Años de servicio + 0", "Equipos reparados + 0", "Clientes satisfechos + 0"). The brief writer's "stat counters showing 0" claim is **confirmed in practice** even though the underlying data is non-zero.

Additionally: claiming **211,037 satisfied customers** on a shop with no Google review widget and no testimonials is unsupported — this counter is a credibility liability, not an asset.

### 3.2 Testimonials section — empty, confirmed

- A `TESTIMONIOS - REPARACION MOVILES` section heading exists on the home page.
- No customer testimonials are rendered inside it (confirmed in both WebFetch and raw HTML).
- The slot is reserved but unfilled — visitors see a heading with nothing underneath.

### 3.3 Footer copyright — confirmed stale

- `cobophone.es` footer: **`© Cobophone 2023. Todos los derechos reservados www.cobophone.es`** — confirmed verbatim across home, `/reparacion-moviles`, `/contactanos-reparacion-moviles`, and Samsung category page.
- `tienda.cobophone.es` footer: **`Copyright © 2023 | Cobotech International`** — same year, different entity name.

It is **2026**. The footer year is three years out of date, on both surfaces.

### 3.4 Opening hours — confirmed contradictory

Raw HTML from `cobophone.es/`:

```
Lunes : 10 am a 7 pm
Viernes : 10 am a 7 pm
Sábado : Cerrado
Domingo : 10 am a 7 pm
```

Only **four** days are listed (Lunes, Viernes, Sábado, Domingo). Martes / Miércoles / Jueves are silently missing. Contact page also says `Domingo a viernes 10:00 – 19:00` and **omits Saturday entirely**.

Net result: a customer cannot tell from this site whether Cobophone is open on a Tuesday. And Sunday-open / Saturday-closed is inverted from the typical Spanish retail rhythm — possible but undeclared in any explanatory copy.

### 3.5 Twenty-years claim, no proof

- `20 años de experiencia en la reparación móviles` (home).
- `Si no sabemos el fallo es que no existe` (home — strong tagline, currently buried).
- No Google reviews widget, no Trustpilot, no logo strip of B2B partners, no certifications (Apple IRP, Samsung authorised, etc.), no team photos, no shop interior photos cited in the body audit.
- Garantía mentioned in `/reparacion-moviles` headline (`GARANTIA`) but no terms link, no duration stated.

### 3.6 The 40-minute promise

- Appears **once**, in the home hero, as `Reparación Móviles en 40 MINUTOS - Reparamos móviles en todo Madrid`.
- Does **not** appear in the title tag, meta description, OG tags, H1, brand category pages, contact page, or repair landing page.
- It is the strongest differentiator on the site and is currently a one-line decoration.

---

## Section 4 — Conversion architecture audit

### 4.1 No instant-quote tool

- Brand category pages (Samsung, Xiaomi) have a `Pide tu presupuesto` button — but it deep-links to **WhatsApp**, not to a structured quote form with model → fault → price.
- No price visible on any category page on the main site (`0,00€` only refers to the empty cart).
- No model picker, no fault picker, no estimated repair-time output.
- The "quote" experience is: visitor clicks → WhatsApp opens → visitor types → human replies. That is the entire funnel.

### 4.2 Forms

- Contact page form fields: `Nombre`, `Correo electrónico`, `Numero de contacto`, `Nombre de empresa`, `Mensaje`.
- `Nombre de empresa` (company name) on a B2C repair contact form is a **mixed B2C/B2B tell** — the form is trying to serve both audiences and ends up generic for both.
- No phone-OS field, no model field, no fault field, no budget field, no preferred-channel field, no consent checkbox visible.

### 4.3 CTA inventory

| Surface | Primary CTA | Destination |
|---|---|---|
| Home hero | `Busca tu móvil` | Internal anchor (no real flow behind it) |
| Home brand grid | Brand name links | `/categoria-producto/<brand>/...` (typo'd for Samsung) |
| Repair landing | `Llamanos o escribenos` (appears twice) | `wa.me/message/Y7WTOGB7WOXGP1` |
| Category pages | `Pide tu presupuesto` | `wa.me/message/Y7WTOGB7WOXGP1` |
| Contact page | Contact form + WhatsApp + phone | Form, `wa.me/...`, `tel:` |
| tienda.cobophone.es | `Solicita tu presupuesto` | `wa.me/message/Y7WTOGB7WOXGP1` (same link, different brand entity) |

Every meaningful CTA — across both the consumer site and the wholesale store branded "Cobotech International" — points at **the same WhatsApp message thread**. There is no segmentation of B2C vs B2B intent at first contact.

### 4.4 No live availability, no booking

- No "reservar hora" calendar.
- No "puedo dejarlo a las 16:00" slot picker.
- No queue status ("3 reparaciones por delante").
- No drop-off vs pickup vs courier flow.
- No address-based "ven a buscarlo" flow despite "todo Madrid" claim.

### 4.5 Empty alt attributes

Of 18 `<img>` tags on the home page, **7 have empty `alt=""`** — 39% of imagery is invisible to screen readers and to Google Image search. Not catastrophic but lazy.

---

## Section 5 — Multilingual / locale gaps

### 5.1 No language switcher anywhere

- No `hreflang` on the home page.
- No WPML / Polylang / Weglot / TranslatePress plugin loaded.
- `<html lang="es">`, `og:locale="es_ES"` only.
- No `lang="en"` / `lang="fr"` / `lang="zh"` variants linked.

### 5.2 Audience reality vs language coverage

Cobo Calleja, Fuenlabrada is **the largest Chinese-business polígono in Spain** (Asia-trade wholesale hub serving Iberia). The B2B wholesale customers of `tienda.cobophone.es` are disproportionately Chinese-Spanish merchants and African / French-speaking importers operating throughout Iberia and the Maghreb corridor. The site:

- has **zero Chinese (zh-CN / zh-TW) translation**,
- has **zero French translation** despite the Maghreb / sub-Saharan importer base,
- has **zero English translation** despite English being the default lingua franca for cross-border parts trading.

The "French/English text leaks" claim in the brief could not be confirmed in the pages audited — the site is monolithic Spanish. The leak the brief writer remembered may live on the `pp.cobophone.es` ghost surface that is currently offline. **However**, the absence of any multilingual support at all is more damning than a few leaked French strings would have been.

### 5.3 Geographic copy is Madrid-only

- `Reparamos móviles en todo Madrid` (home).
- Contact address only: `Calle Bembibre Nº5, Local A – Pol. Ind. Cobo Calleja, Fuenlabrada 28047 Madrid`.
- Blog post: `¿Cuánto tarda cambiar la pantalla de un iPhone en Getafe?` — single-city long-tail attempt.
- tienda meta-description still says `…Cambio de Pantalla en Fuenlabrada` — wholesale customers in Barcelona, Sevilla, or Lisbon are not addressed.

---

## Section 6 — Brand-by-brand model catalog coverage

### 6.1 Main site (`cobophone.es`) — repair categories

Verbatim counts from the home page and `/reparacion-moviles` landing:

| Brand | Repair-category count (home page) | Repair-category count (`/reparacion-moviles`) |
|---|---|---|
| Samsung | **128** | 128 |
| Xiaomi | **112** | 112 |
| Oppo | **65** | 65 |
| Realme | **51** | 51 |
| iPhone | **38** | 38 |
| Huawei | **27** | 27 |
| Google | **8** | 8 |
| LG | not shown on home | 43 |
| Honor | not shown on home | 15 |
| ZTE | not shown on home | 13 |
| Motorola | not shown on home | 7 |

**Total visible on home page: 369** (matches the brief). **Total across both pages: 624.** Brand-list inconsistency between the home grid (7 brands) and the repair landing (11 brands) is itself a problem — same data, two different cuts, no canonical source.

### 6.2 Samsung sub-series (from category page)

`Categoría: Reparación teléfonos Samsung` reveals six series: **Samsung A, J, M, Note, S, Z**. Numerical breakdown leaked from the WebFetch (67 + 5 + 19 + 7 + 24 + 5 = 127) matches the 128 ± 1 claim. No specific model names exposed at the series level — visitor must click in.

### 6.3 Xiaomi sub-series

Three series only on the category page: **Mi (36), POCO (13), Redmi (48)**. Total = 97, **not** 112. There is a 15-unit gap between the home-page count and the category-page sub-series counts — either uncategorised SKUs or a stale counter on the home grid.

No **Redmi Note** as a distinct sub-series despite Redmi Note being one of the most-repaired phone families in Spain — a real catalog gap, not just a UI gap.

### 6.4 iPhone — main site vs `tienda`

- Main site `/categoria-producto/movil-iphone/reparacion-movil-iphone`: 38 repair categories (per home grid).
- `tienda.cobophone.es/categoria-producto/iphone/`: **818 SKUs** across the full iPhone range (6 → 15 Pro Max, plus SE 2020/2022, XR, XS, XS Max, Mini, Plus). Pagination = 41 pages × 20.

So `tienda` carries **>20× the iPhone depth** of the consumer-facing site — but the consumer site doesn't link the depth, doesn't surface it, and doesn't even mention that a wholesale catalog exists.

### 6.5 Sample iPhone subcategory URLs harvested from tienda

```
/categoria-producto/iphone/iphone-6
/categoria-producto/iphone/iphone-6-plus
/categoria-producto/iphone/iphone-6s
/categoria-producto/iphone/iphone-6s-plus
/categoria-producto/iphone/iphone-7
/categoria-producto/iphone/iphone-7-plus
/categoria-producto/iphone/iphone-8
/categoria-producto/iphone/iphone-8-plus
/categoria-producto/iphone/iphone-se-2020
/categoria-producto/iphone/iphone-11
/categoria-producto/iphone/iphone-11-pro
/categoria-producto/iphone/iphone-11-pro-max
/categoria-producto/iphone/iphone-12
/categoria-producto/iphone/iphone-12-mini
/categoria-producto/iphone/iphone-12-pro
/categoria-producto/iphone/iphone-12-pro-max
/categoria-producto/iphone/iphone-13
/categoria-producto/iphone/iphone-13-mini
/categoria-producto/iphone/iphone-13-pro
/categoria-producto/iphone/iphone-13-pro-max
/categoria-producto/iphone/iphone-14
/categoria-producto/iphone/iphone-14-plus
/categoria-producto/iphone/iphone-14-pro
/categoria-producto/iphone/iphone-14-pro-max
/categoria-producto/iphone/iphone-15
/categoria-producto/iphone/iphone-15-pro
/categoria-producto/iphone/iphone-15-pro-max
```

(iPhone 16 / 16 Pro / 16 Pro Max not present as of capture — a freshness gap if the site is truly being maintained.)

### 6.6 Sample part categories on tienda

Part families surfaced in WebFetch: **Pantallas, Baterías, Chasis, Cámaras, Conectores de carga, Vibradores, Tornillos, Tapas traseras**. Sample prices range **€2.50–€10.00**, marked **`Iva no Incluido`** (VAT excluded — standard B2B wholesale convention).

### 6.7 Three identities, summarised

| Identity | Where | Theme | Copyright | Forms | Chat plugin | SEO plugin |
|---|---|---|---|---|---|---|
| Cobophone (B2C repair) | `cobophone.es` | hello-elementor | `© Cobophone 2023` | Elementor forms | **Chaty** | **Yoast** |
| Cobotech International (B2B parts) | `tienda.cobophone.es` | **woostify-pro** | `© 2023 Cobotech International` | **Contact Form 7** | **Joinchat** | **SEOPress Pro** |
| "pp" (alternate experience) | `pp.cobophone.es` | **OFFLINE (ECONNREFUSED)** — not in Wayback | unknown | unknown | unknown | unknown |

The brief's "three different visual identities across subdomains" is **partially confirmed**: two are confirmed (Cobophone vs Cobotech), the third is plausibly real but is currently un-reachable.

---

## Section 7 — WhatsApp deep-link inventory

Every WhatsApp deep link on every page audited resolves to **the same destination**:

```
https://wa.me/message/Y7WTOGB7WOXGP1
```

| Surface | Occurrences of `wa.me/message/Y7WTOGB7WOXGP1` |
|---|---|
| `cobophone.es/` | multiple (hero, brand grid, sticky widget via Chaty) |
| `/reparacion-moviles` | 2 ("Llamanos o escribenos" × 2) |
| `/contactanos-reparacion-moviles` | 3 |
| `/categoria-producto/samsung/...` | 1 (`Pide tu presupuesto`) |
| `/categoria-producto/xiaomi/...` | 1 (`Pide tu presupuesto`) |
| `tienda.cobophone.es/` | multiple (sticky widget via Joinchat, `Solicita tu presupuesto`) |
| `tienda.cobophone.es/categoria-producto/iphone/` | present |

Phone numbers also present (text-only, no `tel:` deep links audited):

- **+34 631 18 83 49** (mobile — assumed primary)
- **+34 916 422 257** (landline)
- Email: **info@cobophone.es**

Key insight: a wholesale buyer in Cobo Calleja asking for **120 iPhone 14 Pro screens** and a retail customer asking why their **iPhone 7 home button doesn't work** land in the same WhatsApp inbox with no pre-routing, no pre-qualification, and no context tag. That is the entire conversion architecture of both businesses.

---

## Section 8 — Top 10 most-impactful problems, ranked

| # | Severity | Problem | One-line fix |
|---|---|---|---|
| 1 | **CRITICAL** | Counter widgets render as `+0 / +0 / +0` before scroll-trigger fires, killing trust above the fold. (Underlying data is `20 / 20000 / 211037` but unverifiable and likely inflated.) | Replace animated counters with a static, *defensible* trust block: real Google rating + review count, real years in business, real shop photo. |
| 2 | **CRITICAL** | Empty `TESTIMONIOS` section header on the home page — promised social proof, delivered nothing. | Pull live Google reviews via Place ID widget, or remove the heading entirely until real testimonials are wired in. |
| 3 | **CRITICAL** | No instant-quote tool. Every brand-category CTA dumps the visitor into the same WhatsApp thread (`wa.me/message/Y7WTOGB7WOXGP1`) with zero qualification. | Build a model → fault → price → time estimator on the landing page; only escalate to WhatsApp once the quote is on screen. |
| 4 | **CRITICAL** | Three identities, one shared WhatsApp thread: B2C (Cobophone), B2B (Cobotech International on `tienda.`), and dead `pp.`. No routing between them. | Unify under a single brand surface with an explicit "Particulares / Tiendas y técnicos" switch at first interaction; route to different WhatsApp numbers and different funnels. |
| 5 | **HIGH** | 40-minute repair promise — the single strongest differentiator — appears once and is buried in a hero subline. Not in `<title>`, meta, OG, H1, or any category page. | Promote "Reparación en 40 minutos" to the H1, page title, OG card, and every brand-category hero. Add a visible countdown demo. |
| 6 | **HIGH** | Footer `© Cobophone 2023` and `© Cobotech International 2023` on a site being audited in 2026. | Dynamic year in footer template; this is one line of PHP. |
| 7 | **HIGH** | Opening-hours block lists only 4 of 7 days (Lunes, Viernes, Sábado, Domingo) and Sunday-open / Saturday-closed is inverted from Spanish norms with no explanation. | Replace with full 7-day schedule + LocalBusiness JSON-LD + a one-line "abrimos domingos para Cobo Calleja" explanation. |
| 8 | **HIGH** | URL slug typo `reparacion-tellefonos-samsung` on the highest-volume brand category, propagated identically from home and repair landing. | Fix slug, 301 the old URL, regenerate Yoast XML sitemap. |
| 9 | **HIGH** | No multilingual support at all (no hreflang, no plugin) — in a polígono whose B2B buyer base is heavily Chinese-Spanish and French-speaking importers. | Ship at minimum **ES / EN / ZH / FR** for `tienda.` first (B2B has clearer ROI), then propagate to consumer site. |
| 10 | **MEDIUM** | No `LocalBusiness`, `Service`, `Product`, `FAQPage`, or `AggregateRating` JSON-LD. Only generic `WebSite` / `Organization` / `BreadcrumbList`. | Add `LocalBusiness` + `Service` schema on the main site, `Product` + `Offer` schema on `tienda.` SKUs, `FAQPage` on the repair landing. |

### Additional findings worth noting (not in top 10 but flagged)

- **Title-tag word `archivos` leaks** from WordPress's default archive template — `Reparación teléfonos Samsung archivos - Cobophone Reparacion de Moviles`. Yoast template override is one-line.
- **39% of homepage images have empty `alt=""`** (7 of 18). Accessibility + image-SEO regression.
- **Brand grid on the home page only shows 7 brands** while `/reparacion-moviles` shows 11 — LG (43), Honor (15), ZTE (13), Motorola (7) are hidden from the homepage entrypoint despite representing **78 additional repair categories**.
- **Xiaomi catalog gap**: 112 claimed on home, only 97 visible across Mi/POCO/Redmi sub-series — 15 SKUs unaccounted for, and **no Redmi Note** sub-series surfaced.
- **Tienda's H1 is a 50-word run-on sentence**, not a heading — major on-page SEO regression.
- **`pp.cobophone.es` is offline at TCP level** (ECONNREFUSED) and has no Wayback Machine history — either kill the DNS record or restore the surface; leaving a dead third-party hostname in the brand surface is a liability.
- **Logo asset is `Diseno-sin-titulo-10.png`** (literally "Design without title -10") — a Canva default filename shipped to production since 2020. Aesthetically and operationally a tell.

---

### Appendix A — Verbatim Spanish strings worth quoting in the pitch

- `Reparación Móviles en 40 MINUTOS - Reparamos móviles en todo Madrid`
- `Busca tu móvil - Reparacion DE mOviles- Arreglar pantalla movil - CAMBIAR PANTALLA MOVIL`
- `20 años de experiencia en la reparación móviles`
- `Si no sabemos el fallo es que no existe`
- `Reparamos tu móvil en minutos`
- `Precios especiales para tiendas de reparación`
- `Precios MAYORISTAS`
- `Pide tu presupuesto`
- `Solicita tu presupuesto`
- `Lunes : 10 am a 7 pm / Viernes : 10 am a 7 pm / Sábado : Cerrado / Domingo : 10 am a 7 pm`
- `© Cobophone 2023. Todos los derechos reservados`
- `Copyright © 2023 | Cobotech International`
- `Reparación teléfonos Samsung archivos - Cobophone Reparacion de Moviles` (title-tag leak)
- `Venta de recambios y repuestos para IPhone compatibles y originales, Venta de pantalla en Madrid, Fuenlabrada, Cobo Calleja. Garantía y envíos a toda España. Service Pack.` (the tienda iPhone "H1")

### Appendix B — Logo URLs (current assets)

- Primary site logo (2020 Canva export): `https://cobophone.es/wp-content/uploads/2020/06/Diseno-sin-titulo-10.png` (PNG, ~1080×1080 source, served at multiple WordPress responsive sizes)
- Favicon set (2023 refresh): `https://cobophone.es/wp-content/uploads/2023/03/cropped-LOGO-COBOPHONE-01-{32,180,192,270}.png`
- OG share image: `https://cobophone.es/wp-content/uploads/2023/03/Diseno-sin-titulo-38.png` (1366×768)
- `tienda.cobophone.es` logo: embedded as `data:image/svg+xml;base64,…` (inline SVG, not externally linked)

### Appendix C — Color palette in source CSS (frequency-ranked, main site)

| Hex | Count | Likely role |
|---|---|---|
| `#4AA485` | 5 | Brand green (primary accent) |
| `#ffffff` | 4 | Background |
| `#ffab00` | 2 | Yellow accent |
| `#49E670` | 2 | Brand green variant |
| `#37AA66` | 2 | Brand green variant |
| `#000100` | 2 | Near-black text |
| Plus WordPress default palette swatches (`#cf2e2e`, `#ff6900`, `#fcb900`, `#7bdcb5`, `#8ed1fc`, `#0693e3`, `#abb8c3`, `#9b51e0`, `#f78da7`, `#dd0000`, `#FF6060`, `#FAFAFA`, `#32373c`, `#1E88E5`) | 1 each | Unedited Gutenberg defaults — design system never disciplined |

Tienda hex frequency: `#000000` (462 occurrences — heavy black), `#ffffff` (17), `#666666` (14), `#4405BB` (3 — purple accent), `#25d366` (3 — WhatsApp green). **The two sites do not share a brand-color system**: main site is green-led; tienda is black + a single purple accent + WhatsApp green. Confirms "different visual identities" at the design-token level.

Font family declared on the main site CSS: `var( --e-global-typography-text-font-family ), Montserrat` — i.e. Montserrat fallback with an Elementor global override. Tienda CSS does not declare a custom font family inline (relies on theme defaults from `woostify`).
