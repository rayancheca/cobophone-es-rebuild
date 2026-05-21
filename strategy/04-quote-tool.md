# 04 — Instant quote tool spec

> The single most important interactive surface on the site. Detailed spec.

## Goal

Answer the user's #1 question — "¿cuánto cuesta?" — in 30 seconds, then convert that answer into a booked appointment or a WhatsApp lead, with full context preserved.

## Surface

Lives at `/presupuesto` (Spanish), `/en/quote`, `/zh/baojia` (or similar locale-appropriate slug).

Embedded in two compact forms:
1. **Home-page hero variant.** First-step picker only ("¿Qué dispositivo?"); selecting an item navigates to `/presupuesto?dispositivo=...`.
2. **Per-page sidebar variant.** Sticky on model pages and brand pages, pre-filled with that page's context.

## URL state

Every step persists to the URL so links are shareable, Google can index high-intent permutations, and back-button works correctly:

```
/presupuesto
/presupuesto?dispositivo=movil
/presupuesto?dispositivo=movil&marca=samsung
/presupuesto?dispositivo=movil&marca=samsung&modelo=galaxy-s23
/presupuesto?dispositivo=movil&marca=samsung&modelo=galaxy-s23&reparacion=pantalla
```

The price-reveal screen is a synthetic state with the same URL pattern, no `&step=` parameter — the step is derived from which params are present.

## Flow

### Step 1: Device category

A 7-icon grid. One question only: "¿Qué tipo de dispositivo?"

- Móvil
- Tablet
- Portátil
- Smartwatch
- Consola
- Televisión
- Patinete eléctrico

Each card: large icon, label, "X reparaciones disponibles" microcopy. Hick's Law applied — never 8+.

### Step 2: Brand picker

For mobile/tablet/portátil — show brand logo grid.
For console/TV/scooter — skip brand step, go directly to repair-type picker (Hick's-Law-aware — those categories have less brand variation in repair context).

Top 7 brands shown by default in popularity order (Samsung, Apple, Xiaomi, Oppo, Realme, Huawei, Google). "Ver todas las marcas" expands to show the long tail.

Each brand card: SVG logo, optional brand color hairline accent. Hover/focus state animates the logo subtly.

On selection, a small 3D scene of a phone in that brand's signature color rotates into view (sanctioned 3D moment #2, see design/3d-direction.md). Stays for ~1.5s, then dissolves into step 3.

### Step 3: Model picker

Searchable list with photos. Top 8 models by popularity shown immediately. "Ver todos los modelos (N)" expands.

Each model card: image (manufacturer press-kit), name, release year as small label, "Más popular" / "Lo reparamos a diario" badge for the top 3.

Search bar above accepts model number ("SM-S911B"), partial name ("galaxy s23"), or alias.

### Step 4: Repair-type picker

Icon-list (vertical on mobile, horizontal cards on desktop), 6 most common at top:
- Cambio de pantalla
- Cambio de batería
- Conector de carga
- Cámara
- Tapa trasera
- Daño por agua

"Otros problemas" expands a long list. Each row: icon, name, "≈ X min" duration, warranty months badge.

**Default bias:** the most-common-for-this-model repair type is pre-highlighted with a "Lo más frecuente" stamp.

### Step 5: Price reveal

The peak moment. Animate it.

```
┌─────────────────────────────────────────────┐
│  Samsung Galaxy S23 — Cambio de pantalla    │
│                                              │
│         €129 – €159                          │
│                                              │
│  ✓ 40 minutos de reparación                  │
│  ✓ 3 meses de garantía                       │
│  ✓ Diagnóstico gratuito                      │
│                                              │
│  Precio estimado.                            │
│  Confirmamos en 2 minutos por WhatsApp.      │
│                                              │
│  [ Reservar reparación ]                     │
│  [ Hablar con un técnico → WhatsApp ]       │
│                                              │
│  · Sube una foto del daño (opcional)         │
└─────────────────────────────────────────────┘
```

The number animates in: scale 0.9 → 1.0 over 400ms with `ease-out-expo`. Tabular-nums, JetBrains Mono, large (text-5xl on desktop). Brand-amber accent on the price (the urgency color).

Anchor against new-phone price below the fold: "Comprar un Galaxy S23 nuevo cuesta unos €899. Repararlo cuesta unos €129."

### Step 6: Book or WhatsApp

If "Reservar reparación":
- Compact form: name (required), phone (required, validated for Spanish format), email (optional), preferred date/time slot (radio: today / tomorrow / pick-a-day), flow (walk-in vs mail-in radio), optional damage photo upload
- Submit → POST to `/api/lead` → confirmation screen

If "Hablar con un técnico":
- WhatsApp deep link with prefilled message:
  > "Hola, mi Samsung Galaxy S23 necesita cambio de pantalla. Precio estimado: €129–€159. ¿Cuándo podéis recibirme?"
- Track click as a conversion event

If "Subir foto":
- Native file input, accepts images, max 8MB
- Preview inline before submit
- Attaches to WhatsApp via the wa.me link's text param (links to a Vercel-hosted preview of the photo) or to the lead form

## Confirmation screen (the peak-end moment)

```
┌──────────────────────────────────────────────┐
│  ✓ Recibido.                                 │
│                                              │
│  Te llamamos en 5 minutos para confirmar.    │
│                                              │
│  [Photo of Marco at the bench]               │
│  Marco · Técnico desde 2012                  │
│                                              │
│  · Tu reparación: Samsung Galaxy S23 —       │
│    cambio de pantalla                        │
│  · Precio confirmado al recibir el equipo    │
│  · Garantía: 3 meses                         │
│  · WhatsApp: 💬 si tienes dudas              │
│                                              │
│  [+] Añadir al calendario                    │
└──────────────────────────────────────────────┘
```

No further CTAs. This is the reward.

## State management

- Zustand store: `useQuoteStore` with `{ category, brandSlug, modelSlug, repairTypeSlug, customer, photoUrl, currentStep, history }`
- URL is the source of truth; Zustand syncs to/from `useSearchParams()`
- Each step component reads from URL/store and dispatches actions

## Component breakdown

```
<QuoteToolPage>
  <QuoteToolProgressBar />        // accelerating goal-gradient bar
  <QuoteToolBreadcrumb />          // category / brand / model selected so far
  <Step1Category />                // /presupuesto
  <Step2Brand />                   // ?dispositivo=
  <Step3Model />                   // ?dispositivo=&marca=
  <Step4RepairType />              // &modelo=
  <Step5PriceReveal />             // &reparacion=
  <Step6BookOrWhatsapp />          // user clicked "Reservar"
  <ConfirmationScreen />           // POST success
  <WhatsAppEscapeHatch />          // always present sticky
</QuoteToolPage>
```

## Lazy loading

Each step component dynamically imports on mount. The 3D phone scene at step 2 is its own dynamic import with a static PNG fallback for `prefers-reduced-motion` and below-768px viewports.

## Analytics events

Fired to the Vercel/Plausible stub:
- `quote_step1_complete` { category }
- `quote_step2_complete` { brand }
- `quote_step3_complete` { model }
- `quote_step4_complete` { repairType }
- `quote_price_shown` { priceMin, priceMax, model, repairType }
- `quote_whatsapp_clicked` { context }
- `quote_form_submitted` { flow }
- `quote_confirmed` { leadId }

## Accessibility

- Each step is a `<form>` with `<fieldset>` and `<legend>`
- Radio groups (not custom div clicks) under the hood, styled
- `aria-live="polite"` on the breadcrumb and the progress bar
- Keyboard-navigable card grids (arrow keys move focus, Enter selects)
- Photo upload has a visible `<label>` and an `aria-describedby` for file-size limits

## Edge cases

- **Direct deep link to an invalid model:** render a "ese modelo no está en nuestro catálogo todavía" state with a WhatsApp lead capture
- **Network failure on submit:** retain form state, show toast with retry, also offer WhatsApp as escape hatch
- **Photo too large:** client-side validation with a friendly resize suggestion
- **Reduced-motion user:** no 3D scenes; fade-only transitions; price reveal does not animate
