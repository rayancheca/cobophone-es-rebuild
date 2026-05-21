# 01 — Sitemap & information architecture

> All routes localized under `/[locale]/` (es | en | zh). Spanish is the default, served at the root (Next-intl can be configured `localePrefix: 'as-needed'`).

## Public routes

```
/                                                Home (the brand surface + 7-step funnel)
/reparacion                                      Repair hub (all device categories)
  /reparacion/movil                              Mobile-phone repair
    /reparacion/movil/[marca]                    Brand pages: samsung, apple, xiaomi, oppo, realme, huawei, google, sony
      /reparacion/movil/[marca]/[modelo]         Per-model: ~370 generated pages
  /reparacion/tablet                             Tablet repair (Apple iPad + Android)
  /reparacion/portatil                           Laptop repair
  /reparacion/smartwatch                         Smartwatch repair
  /reparacion/consola                            Console repair (PS / Xbox / Nintendo)
  /reparacion/television                         TV / LED repair
  /reparacion/patinete-electrico                 E-scooter repair

/presupuesto                                     Instant-quote tool (the killer feature)
                                                 Deep-linkable: ?dispositivo=movil&marca=samsung&modelo=galaxy-s23&reparacion=pantalla

/tienda                                          Phone resale (Redmi / Realme / TCL — light catalog)
  /tienda/[marca]/[modelo]                       Per-model product detail

/mayoristas                                      B2B portal — the designed front door
                                                 (Links out to the existing tienda.cobophone.es with explanation)

/recogida                                        Pickup & mail-in repair flow (4 steps)

/garantia                                        Warranty terms, in plain Spanish

/sobre-nosotros                                  Story, founders, the 20-year journey + 3D timeline

/ubicacion                                       Store, directions (Mapbox), parking, transit, hours

/zonas                                           Service-area hub
  /zonas/fuenlabrada
  /zonas/getafe
  /zonas/leganes
  /zonas/alcorcon
  /zonas/parla
  /zonas/humanes
  /zonas/mostoles
  /zonas/villaverde
  /zonas/usera
  /zonas/madrid-centro
  /zonas/[area]                                  Programmatic generator

/blog                                            Blog index
  /blog/[slug]                                   Blog post

/contacto                                        Contact: WhatsApp-first surface + form + phone + email

/preguntas-frecuentes                            FAQ (with FAQPage schema)

/legal/privacidad
/legal/aviso-legal
/legal/cookies
/legal/accesibilidad
```

## Locale prefixes

- `es` — default, served at `/`
- `en` — served at `/en/...`
- `zh` (zh-Hans) — served at `/zh/...`

## Programmatic SEO surface

- 7 device categories
- ~8 mobile brands × ~50 models each = ~370 model pages
- 6 repair-type subdivisions per model when content depth exists
- 11 service areas
- Hreflang clusters: each canonical page exposed in 3 locales

That's ~1,400 indexable surfaces at launch, scaling to ~24,000 if all model × repair × area permutations are generated (gated by content quality).

## Navigation

**Primary nav (desktop):**
- Reparación (dropdown to device categories)
- Tienda
- Mayoristas
- Recogida
- Ubicación
- ES | EN | 中文 (locale switcher)
- Sticky CTA: "Pedir presupuesto"

**Primary nav (mobile):**
- Hamburger drawer with the same items
- Sticky bottom bar: ⓘ Presupuesto · 💬 WhatsApp · 📍 Cómo llegar

**Footer:**
- 4-column grid: Servicios · Empresa · Mayoristas · Legal
- Address + map preview + hours + phone + WhatsApp
- Newsletter (boilerplate, hook to Resend later)
- Social: facebook.com/cobophonespain · instagram.com/cobophonespain
- Locale switcher (redundant with header — NN/g pattern)
- Copyright with auto-year

## Internal linking pattern

- Every brand hub links to its top 8 models + "Ver todos los modelos (N)"
- Each model page links to the brand hub, two neighboring models, and the matching repair type
- Service-area pages cross-link to all other service-area pages (footer ring)
- Blog posts internal-link to relevant model pages and repair types
- Mayoristas portal cross-links to /tienda for retail context
