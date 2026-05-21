# 05 — SEO strategy

## Principles

- **Helpful Content–compliant.** No keyword stuffing. The current site is a textbook example of what Google has downgraded — phrases like "reparacion de moviles arreglar pantalla movil cambiar pantalla movil" in body, alt, anchor. We replace that with entity-based SEO: each page is about one device or one repair, with clear semantic structure.
- **Structured data on every page** that has a relevant schema.org type.
- **Programmatic SEO with quality gates.** ~370 model pages × 6 repair types × 11 service areas = ~24,000 possible permutations. We start by generating the high-value subset (brand hubs, top-50 models per brand, all repair-type hubs, all 11 service areas) and gate the long tail behind content-depth checks.
- **Mobile-first.** The audience searches mobile. Every page must render < 2s on 4G with a single sub-2.5s LCP.

## Title & meta templates

| Page | Title template | Meta description template |
|---|---|---|
| Home | `Reparación de móviles en 40 minutos · Madrid · CoboPhone` | `Reparamos tu móvil, tablet, portátil y consola en 40 minutos en Madrid. Garantía de 3 meses. Desde 2005.` |
| Device category | `Reparación de {device} en Madrid · CoboPhone` | `Cambio de pantalla, batería y diagnóstico de {device}. {n} marcas. Desde €{X}. Garantía 3 meses.` |
| Brand hub | `Reparación de {brand} en Madrid · {n} modelos · CoboPhone` | `Pantalla, batería, cámara y conector de carga para todos los modelos {brand}. Precio cerrado.` |
| Model page | `Reparar {model} en Madrid · Precio y garantía · CoboPhone` | `{model}: cambio de pantalla desde €{X}, batería desde €{Y}, conector de carga desde €{Z}. 40 min. Garantía 3 meses.` |
| Repair-type | `{Repair} de {device} en Madrid · CoboPhone` | `{Repair} en 40 minutos. Precio cerrado por modelo. Garantía 3 meses. Diagnóstico gratuito.` |
| Quote tool | `Presupuesto de reparación en 30 segundos · CoboPhone` | `Calcula el coste de reparar tu móvil, tablet o consola en 30 segundos. Sin compromiso.` |
| Tienda | `Móviles reacondicionados con garantía · CoboPhone` | `Redmi, Realme y TCL revisados y con garantía. Recogida gratuita en tienda Madrid.` |
| Mayoristas | `Mayorista de repuestos móviles en Cobo Calleja · CoboPhone` | `Pantallas, baterías y piezas al por mayor desde el centro logístico de Cobo Calleja. Envío 24h a toda España.` |
| Service area | `Reparación de móviles en {area} · CoboPhone` | `Reparamos tu móvil en {area} con recogida {free|paid}. 40 minutos. Garantía 3 meses.` |
| Blog post | `{title} · Blog CoboPhone` | (per-post excerpt, ≤155 chars) |
| Location | `Tienda CoboPhone en Cobo Calleja · Cómo llegar · Madrid` | `Calle Bembibre 5, Polígono Cobo Calleja, Fuenlabrada. Abierto domingo, cerrado sábado. Aparcamiento gratuito.` |

## Structured data (JSON-LD)

Implement via `src/lib/seo.ts` helpers. Per page:

### LocalBusiness (home + /ubicacion)

```json
{
  "@context": "https://schema.org",
  "@type": "ElectronicsStore",
  "@id": "https://cobophone.es/#business",
  "name": "CoboPhone",
  "image": "https://cobophone.es/og/storefront.jpg",
  "telephone": "+34-...",
  "email": "info@cobophone.es",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Calle Bembibre 5, Local A",
    "addressLocality": "Fuenlabrada",
    "addressRegion": "Madrid",
    "postalCode": "28947",
    "addressCountry": "ES"
  },
  "geo": { "@type": "GeoCoordinates", "latitude": 40.2839, "longitude": -3.7977 },
  "openingHoursSpecification": [
    { "@type": "OpeningHoursSpecification", "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday"], "opens": "10:00", "closes": "19:00" },
    { "@type": "OpeningHoursSpecification", "dayOfWeek": "Sunday", "opens": "10:00", "closes": "19:00" }
  ],
  "sameAs": ["https://facebook.com/cobophonespain", "https://instagram.com/cobophonespain"],
  "aggregateRating": { "@type": "AggregateRating", "ratingValue": "[VERIFY]", "reviewCount": "[VERIFY]" }
}
```

### Service (per device-category + per repair-type page)

```json
{
  "@type": "Service",
  "serviceType": "Reparación de pantalla de móvil",
  "provider": { "@id": "https://cobophone.es/#business" },
  "areaServed": { "@type": "AdministrativeArea", "name": "Comunidad de Madrid" },
  "hasOfferCatalog": { "@type": "OfferCatalog", "name": "Modelos compatibles", "itemListElement": [/* model offers */] }
}
```

### Offer / AggregateOffer (per-model page)

```json
{
  "@type": "AggregateOffer",
  "name": "Reparación Samsung Galaxy S23",
  "priceCurrency": "EUR",
  "lowPrice": "39",
  "highPrice": "199",
  "offerCount": 6,
  "offers": [
    { "@type": "Offer", "name": "Cambio de pantalla", "price": "129", "priceCurrency": "EUR" },
    ...
  ]
}
```

### Product (per tienda product)

`Product` + `Offer` + `AggregateRating` (when verified).

### FAQPage (`/preguntas-frecuentes` + per-service-page FAQs)

### Article (each blog post) — with `author`, `datePublished`, `image`, `publisher` referencing the LocalBusiness `@id`.

### BreadcrumbList — on every nested page.

### Organization + `sameAs` — in the root `<head>`, references LocalBusiness.

## Sitemap.xml strategy

`src/app/sitemap.ts` — Next.js dynamic sitemap. Segments via subdirectories:

```
/sitemap.xml                 # index referencing the segments
/sitemap-pages.xml           # static pages
/sitemap-products.xml        # tienda products
/sitemap-models.xml          # repair model pages
/sitemap-blog.xml            # blog posts
/sitemap-locations.xml       # zonas
```

Each entry includes `<changefreq>`, `<priority>`, and `<xhtml:link rel="alternate" hreflang>` cluster.

## robots.txt

`src/app/robots.ts`:

```
User-agent: *
Allow: /
Disallow: /api/
Disallow: /_next/
Sitemap: https://cobophone.es/sitemap.xml
```

Production-only — staging/preview environments emit `Disallow: /`.

## hreflang

Every page emits a `<link rel="alternate" hreflang>` cluster for `es-ES`, `en`, `zh-Hans`, plus `x-default` pointing to the Spanish version.

```html
<link rel="alternate" hreflang="es-ES" href="https://cobophone.es/reparacion/movil/samsung/galaxy-s23" />
<link rel="alternate" hreflang="en" href="https://cobophone.es/en/repair/mobile/samsung/galaxy-s23" />
<link rel="alternate" hreflang="zh-Hans" href="https://cobophone.es/zh/weixiu/shouji/samsung/galaxy-s23" />
<link rel="alternate" hreflang="x-default" href="https://cobophone.es/reparacion/movil/samsung/galaxy-s23" />
```

## Internal linking pattern

- **Brand hubs → top 8 models** (visible) and "Ver todos los modelos (N)" expanding to the rest
- **Model pages → brand hub + 2 neighboring models** (related-models block) + 6 repair-type pages
- **Service-area pages → other service areas** (cross-link ring in footer) + brand hubs + repair-type pages
- **Blog posts → 2-3 contextual model pages** based on `relatedModelSlugs`
- **Mayoristas → tienda** (cross-business bridge) + service pages (consumer trust signal)

## Anchor text

Descriptive, never "haz clic aquí". The model page links to its brand hub via the brand name; the brand hub links to its category via the category name. Internal anchors use the same phrasing the target page's H1 uses.

## On-page basics

- One H1 per page
- Semantic heading hierarchy (no skipping)
- `<article>` for blog posts and per-model pages
- `<section>` with `aria-labelledby` for each major page section
- Image alt text in the active locale, descriptive of the device + state, not keyword-stuffed
- `lang` attribute set per locale; `dir="ltr"` (all three target locales)

## Performance budgets (must-meet)

- LCP < 2.0s on mobile 4G
- INP < 200ms
- CLS < 0.05
- Initial JS bundle < 200KB gzipped
- Initial CSS < 30KB
- Hero LCP image preloaded with `priority` + `fetchpriority="high"`
- All other images lazy with `loading="lazy"`
- Fonts: max 2 families × 2 weights, subset for Spanish + English + simplified Chinese (Noto Sans SC)
- 3D scenes lazy-loaded with static fallbacks for mobile + reduced-motion + slow-network

## Migration from WordPress URLs

Capture the existing cobophone.es URL set (research subagent R1) and 301 in `next.config.js`:

```js
async redirects() {
  return [
    { source: '/reparacion-moviles', destination: '/reparacion/movil', permanent: true },
    { source: '/contactanos-reparacion-moviles', destination: '/contacto', permanent: true },
    { source: '/blog-reparacion-moviles', destination: '/blog', permanent: true },
    { source: '/blog-reparacion-moviles/:slug', destination: '/blog/:slug', permanent: true },
    // ... full mapping after R1 returns
  ];
}
```

## OG images

`next/og` generates per-page OG images at runtime. Template:

- Background: `--shadow-blue` (#0B1B3A) with subtle grain
- Brand mark top-left
- Page title in display type
- Sub-line in JetBrains Mono with the page's primary stat (price, duration, count)
- "cobophone.es" in the bottom-right

One template per page-type — home, device, brand, model, repair-type, location, blog post.

## Analytics & search console

- Vercel Analytics (script tag for prod)
- Plausible self-hosted-friendly tag (commented out — wire after approval)
- Search Console verification meta tag (placeholder in `<head>`)
- Google Business Profile integration (review API) — `[VERIFY: needs Places API key]`
