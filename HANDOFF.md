# HANDOFF.md — Operating manual

> What this site is, how to extend it, and how to migrate it to production.

---

## 1. Day-to-day editing

### Adding a model

1. Open `src/data/models.ts`
2. Append a new entry with: `id`, `brandId`, `brandSlug`, `slug`, `name`, `year`, `image`, `repairTypes` (array of repair-type slugs from `repair-types.ts`), `popularityScore` (0-100), optional `msrpAtRelease` and `knownIssues`
3. Open `src/data/prices.ts` and append the price rows for each (modelSlug, repairSlug) pair using the `p()` helper
4. The model gets auto-generated:
   - A model page at `/reparacion/movil/[brand]/[model-slug]` (SSG via `generateStaticParams`)
   - An entry in the brand hub's top-models grid (if popularityScore is in the top 8)
   - A node in the quote tool's model picker
   - A sitemap entry
   - AggregateOffer + BreadcrumbList JSON-LD

### Adding a brand

Edit `src/data/brands.ts`. Add the SVG logo to `/public/brands/`. The brand auto-flows into:
- The home brand grid (under "Marcas" — sorted by `sortOrder`)
- The quote tool's brand picker
- A brand hub page at `/reparacion/movil/[brand-slug]`
- The legacy WordPress redirect `/categoria-producto/[brand]` → `/reparacion/movil/[brand]` (already configured in `next.config.mjs`)

### Adding a service area

Edit `src/data/location.ts` → `serviceAreas`. The new area auto-flows into the sitemap. Page rendering for individual `/zonas/[area]` URLs is scaffolded in `strategy/01-sitemap.md` but not yet implemented — see "Backlog" below.

### Updating copy

All UI strings live in `messages/es.json` (canonical), `messages/en.json`, and `messages/zh.json`. The Chinese file has tech vocabulary flagged for native-speaker review (see QUESTIONS.md).

Inline body copy in `mayoristas/page.tsx`, `garantia/page.tsx`, `ubicacion/page.tsx`, etc. is currently Spanish-only — extract to `messages/*.json` when ready for full multilingual coverage.

### Replacing product imagery

Drop new images under `/public/models/[brand-slug]/[model-slug].jpg` (or `.webp` — Next.js will serve AVIF/WebP automatically). Reference them by the `image` field in `models.ts`. Manufacturer press-kit URLs:

- Apple: https://www.apple.com/newsroom/images/
- Samsung: https://news.samsung.com/global/photos
- Xiaomi: https://www.mi.com/global/discover/press
- Google: https://www.google.com/about/press/

Always set the `imageSource` field on the Model record for licensing audit.

---

## 2. Migration to a CMS (recommended: Sanity)

The TypeScript content model in `strategy/02-content-model.ts` mirrors the runtime types in `src/data/types.ts`. To migrate:

1. Set up Sanity at sanity.io with the project
2. Define schemas for `Brand`, `Model`, `RepairType`, `Service`, `Price`, `Review`, `Location`, `ServiceArea`, `BlogPost`
3. Replace the `data/*.ts` files with Sanity GROQ queries wrapped in `unstable_cache` for ISR
4. Migrate the curated data in `data/*.ts` into Sanity via the CLI bulk import
5. Set up incremental revalidation via `app/api/revalidate/route.ts` triggered by Sanity webhooks

Alternative: **Payload CMS** (self-hosted, TypeScript-native, lives in the same repo as the Next.js app). Faster setup for the team's first CMS.

## 3. The full WordPress data migration

The current cobophone.es has:
- **624 brand-categorized repair pages** (Samsung 128 + Xiaomi 112 + …) — see `research/01-current-site-audit.md` §6
- **818 iPhone wholesale SKUs** on `tienda.cobophone.es` (under "Cobotech International")
- **Blog posts** in WordPress at `/blog-reparacion-moviles/*`

Migration sequence:
1. Export WordPress XML via Tools → Export
2. Parse with `wp-export-to-md` or similar; map each WP category → our `Brand`, each WP product → our `Model`, each WP post → our `BlogPost`
3. Reconcile the typo'd Samsung slug (`reparacion-tellefonos-samsung`) via the redirect already in `next.config.mjs`
4. Migrate the `tienda.cobophone.es` WooCommerce catalog to Stripe Products + Prices (test mode first)

## 4. Deploy to Vercel

```bash
# From the repo root
vercel link              # link to a Vercel project
vercel env pull          # pull env vars locally for testing
vercel --prod            # deploy to production
```

Required env vars (set in Vercel dashboard):

```
NEXT_PUBLIC_SITE_URL=https://cobophone.es
NEXT_PUBLIC_MAPBOX_TOKEN=<your-mapbox-public-token>
STRIPE_SECRET_KEY=sk_test_...
STRIPE_PUBLISHABLE_KEY=pk_test_...
RESEND_API_KEY=re_...
RESEND_FROM_EMAIL=hola@cobophone.es
WHATSAPP_PHONE_NUMBER=+34911234567   # placeholder — production CCD comes later
SENTRY_DSN=<optional>
```

DNS:
- Add `cobophone.es` as a custom domain in Vercel
- Add the A record + CNAME per Vercel's instructions
- For the `tienda.cobophone.es` subdomain — keep it on WordPress for now or migrate per the staged-rollout plan in PITCH.md

## 5. Production integrations (deferred from foundation pass)

### Mapbox

1. Get a public access token from mapbox.com (free tier covers ~50k loads/mo, sufficient)
2. Set `NEXT_PUBLIC_MAPBOX_TOKEN` in Vercel
3. Replace `<MapPlaceholder />` in `src/components/sections/LocationBlock.tsx` with a real `react-map-gl` `<Map>` — coordinates are already in `src/data/location.ts` (lat/lng).

### Stripe Checkout (for /tienda)

1. `npm install stripe @stripe/stripe-js`
2. Create `src/app/api/checkout/route.ts` with a Server Action that creates a Stripe Checkout session
3. Test cards: `4242 4242 4242 4242` (success), `4000 0000 0000 9995` (decline)
4. **Do NOT use real Stripe credentials in the foundation deploy** — keep test mode

### Resend (lead capture email)

1. Sign up at resend.com, verify the `cobophone.es` sender domain
2. `npm install resend`
3. Create `src/app/api/lead/route.ts` to receive form submits, log to a `leads` table (or send to a Google Sheet via webhook), and email the team

### WhatsApp Business

Foundation pass uses `wa.me/message/Y7WTOGB7WOXGP1` deep links (the legacy thread). Production should split into:

- `B2C` WhatsApp number for repair-customer inquiries
- `B2B` WhatsApp number for mayoristas (potentially via WhatsApp Business Cloud API for two-way analytics + auto-replies)

The `buildWhatsAppLink()` helper in `src/lib/utils.ts` is the single point of indirection — swap the base URL there.

### Google Places API (real reviews)

Per QUESTIONS.md — provision a Google Cloud project, enable Places API, restrict the key to the production domain, then replace the placeholder `reviews` array in `src/data/location.ts` with a `unstable_cache`-wrapped server fetch.

## 6. The R3F 3D scenes

Per `design/3d-direction.md`, five 3D moments are sanctioned. The foundation pass ships a CSS approximation of the home-hero device placeholder. To add the full R3F scene:

```bash
npm install three @react-three/fiber @react-three/drei @react-three/postprocessing gsap @studio-freight/lenis
```

Then:

1. Create `src/components/three/HeroPhoneScene.tsx` — R3F Canvas + GLB phone model
2. Replace `<DevicePlaceholder />` in `src/components/sections/HomeHero.tsx` with `<HeroPhoneScene />`
3. Wire GSAP ScrollTrigger to drive scene state via Zustand (pattern documented in `design/3d-direction.md`)
4. Add the GLB asset under `/public/3d/` — source from Sketchfab CC-BY or commission custom
5. Generate a static PNG fallback for reduced-motion + mobile + slow-network users — script lives at `/scripts/capture-3d-fallbacks.ts` (to be written)

Hard performance constraints reminders:
- `dpr={[1, 2]}`, `frameloop="demand"` where possible
- `gl={{ antialias: false }}` for mini-scenes; `true` only for home hero
- Total GLB weight ≤ 1MB Draco-compressed
- Test on a Pixel 4a-class device — drop below 50fps → simplify scene

## 7. Multilingual route migration

Foundation pass uses cookie-based locale switching (no URL prefix for `en` or `zh`). To enable route-based locales with proper hreflang:

1. Move all pages from `src/app/*` into `src/app/[locale]/*`
2. Restore the next-intl middleware in `src/middleware.ts`:
   ```ts
   import createMiddleware from 'next-intl/middleware';
   import { locales, defaultLocale } from './i18n/request';
   export default createMiddleware({ locales, defaultLocale, localePrefix: 'as-needed' });
   export const config = { matcher: ['/((?!api|_next|_vercel|.*\\..*).*)'] };
   ```
3. Update `i18n/request.ts` to read locale from the route param instead of the cookie
4. Re-enable hreflang clusters in `src/lib/seo.ts` (currently structured but tied to root URLs)

The message JSON files (`messages/es.json`, `messages/en.json`, `messages/zh.json`) are already structured for this move.

## 8. Performance & accessibility audit

Run before pushing to production:

```bash
# Lighthouse against home + a model page + the quote tool
npm run build && npm run start &
npx lighthouse http://localhost:3000 --view --preset=desktop
npx lighthouse http://localhost:3000 --view --preset=mobile
npx lighthouse http://localhost:3000/presupuesto --view --preset=mobile
npx lighthouse http://localhost:3000/reparacion/movil/apple/iphone-15-pro --view --preset=mobile
```

Targets: ≥95 on Performance / Accessibility / Best Practices / SEO on every primary page.

Manual a11y checks:
- Keyboard navigation start-to-finish on the quote tool
- VoiceOver run on the home page + per-model page
- Color contrast on every dark-surface variant (4.5:1 body, 3:1 large text, AAA where possible)

## 9. Backlog (post-foundation)

Pages scaffolded in `strategy/01-sitemap.md` but not yet built — straightforward extensions:

- [ ] `/reparacion/tablet`, `/portatil`, `/smartwatch`, `/consola`, `/television`, `/patinete-electrico` (per-device hubs)
- [ ] `/zonas` index + `/zonas/[area]` per service area (~11 pages, programmatic)
- [ ] `/recogida` (mail-in flow)
- [ ] `/sobre-nosotros` (with 3D 20-years timeline)
- [ ] `/tienda` + `/tienda/[brand]/[model]` (phone resale + Stripe checkout)
- [ ] `/blog` + `/blog/[slug]` (migrate WordPress posts)
- [ ] `/preguntas-frecuentes` (FAQPage schema)
- [ ] `/legal/privacidad`, `/legal/aviso-legal`, `/legal/cookies`, `/legal/accesibilidad`
- [ ] Cookie consent banner (RGPD-compliant — requires Spanish counsel review)
- [ ] Programmatic OG image generation via `next/og`
- [ ] Long-tail model coverage: extend `models.ts` from ~30 to the full 624-model catalog from the audit

## 10. Working with this codebase under Claude Code

`CLAUDE.md` at the repo root is the working context. Update it whenever a major architectural decision changes (e.g., switching CMS, swapping from cookie-based locales to route-based, adopting R3F).

Run `git log --oneline` to see phase-boundary commits. Convention is:

```
feat(phase-N): summary
```
