# REVIEW.md — Running decisions log

> Decisions, rationale, and trade-offs as they happen. Newest at top.

---

## 2026-05-21 — Research returned (R1, R3+R5, R6, R7)

**Confirmed facts (R1 — current site forensics):**
- Real numbers: **20 years / 20,000 devices repaired / 211,037 customers**. Elementor counters fail to fire on slow Android, leaving "+0/+0/+0" in production. Note: 211k satisfied customers is unsupported by zero reviews on the site — it's a credibility liability unless we attach proof. **Decision:** drop the 211k claim, anchor on "20 años + 20.000 reparaciones + Google rating live" until provable.
- Verbatim hero today: "Reparación Móviles en 40 MINUTOS - Reparamos móviles en todo Madrid"
- Verbatim tagline (buried, strong): "Si no sabemos el fallo es que no existe" — **adopt as secondary tagline**
- Brand counts (home grid): Samsung 128, Xiaomi 112, Oppo 65, Realme 51, iPhone 38, Huawei 27, Google 8 = 369. Inconsistent with /reparacion-moviles (adds LG 43, Honor 15, ZTE 13, Motorola 7 = 624).
- Slug typo live in production: `/categoria-producto/samsung/reparacion-tellefonos-samsung` (extra `l`) — **redirect both spellings to the new clean slug**
- tienda.cobophone.es is operated as **"Cobotech International"** — a separate B2B brand identity. Copyright "© 2023 | Cobotech International". 818-SKU iPhone catalog under it, ~20× the depth of the consumer site.
- **Single shared WhatsApp thread** `wa.me/message/Y7WTOGB7WOXGP1` for ALL traffic — B2C + B2B + wholesale, no segmentation. **Decision:** keep one number for the pitch but pre-fill messages with `[B2C]` / `[MAYORISTA]` tags so the team can triage; flag in HANDOFF.md that production should split into B2C / B2B WhatsApp numbers.
- Hours: only 4 days listed on home (Lun, Vie, Sáb=cerrado, Dom). Contact page contradicts. Real hours are M–F 10–19, Sat closed, Sun 10–19 per brief.
- `pp.cobophone.es` is offline (ECONNREFUSED, no Wayback history) — **ghost surface, ignore**
- No structured data beyond basic `Organization` + `WebSite`. No `LocalBusiness`, `Service`, `Product`, `Offer`, `FAQPage`, `Review`.
- Footer year stale on both surfaces ("© 2023").
- Stack: WordPress + Elementor + WooCommerce + Yoast (main); separate Woostify + SEOPress + Joinchat on tienda.
- The 40-minute promise appears **once**, in the home hero only — not in title, meta, OG, H1, or any other page. This is the brand's largest unforced error.

**R7 — Madrid local SEO baseline (key:** CoboPhone owns the Cobo Calleja B2B keyword and the south-Madrid suburb pages; absent from Madrid head terms. **Decision:** prioritize en + zh-Hans hreflang on the **mayoristas + tienda** surfaces only (not the full site) to focus translation budget where it converts.

**R3+R5 — Competitors:** no Spanish repair shop combines Back-Market-grade trust UX (per-attribute condition grading, designed warranty page, real reviews per attribute) with local Madrid repair. **This gap is CoboPhone's single largest differentiation opportunity.** Adopt Back Market's four-pillar trust strip, Certideal's per-attribute grading for the /tienda, and a designed warranty page modeled on Back Market's "Quality."

**R6 — 3D / awards:** restrained single-device hero (Spline-or-R3F) with scroll-tied state transformation; Apple/Stripe-tier type-first restraint; hard motion budget: one signature ambient motion + three purposeful moments per page max.

**Adjustments to plan:**
- Locale prefixes: full ES coverage, EN + ZH limited to home + tienda + mayoristas + contact + ubicacion + key model pages (not blog, not legal). Reduces translation surface ~60%.
- Secondary tagline added: "Si no sabemos el fallo, es que no existe."
- 211k stat replaced with "+20.000 reparaciones · 20 años · ⭐ Google live"
- B2C / B2B / wholesale CTA paths split visually even if they share the WhatsApp number behind the scenes.

---

## 2026-05-21 — Foundation pass complete

**Deliverable:** working Next.js site at `cobophone/`, two commits, 65 prerendered URLs, all primary routes return HTTP 200, build passes typecheck, bundle under 200KB target.

**Pages built to depth:** home, /presupuesto (instant-quote tool with URL-deep-linkable state through all 6 steps), /mayoristas (B2B portal with pricing tiers + form), /reparacion (device hub), /reparacion/movil/[marca] (brand hubs for all 8 brands), /reparacion/movil/[marca]/[modelo] (29 model pages with AggregateOffer JSON-LD), /ubicacion, /garantia, /contacto, designed 404.

**Strategic shifts during build:**
- Locale routing → cookie-based for foundation pass; route-based `[locale]/...` migration documented in HANDOFF §7. Reduces complexity now without losing the multilingual story.
- 3D scenes → CSS placeholder for home hero; full R3F integration plan in `/design/3d-direction.md` and HANDOFF §6. Keeps initial bundle under budget and lets the foundation prove out before adding GLB weight.
- Mapbox → designed map placeholder; real token wiring in HANDOFF §5. Same reasoning.

**Key facts surfaced into the site:**
- 40-min promise now in title, H1, and as a recurring chip
- "Si no sabemos el fallo, es que no existe" rescued from buried copy into the hero
- Real counter numbers (20 / 20.000 / 3 months / 40 min) replacing the broken "+0/+0/+0"
- 369-product catalog audit surfaced visibly in the brand grid model counts
- 818-iPhone-SKU wholesale catalog surfaced visibly in the B2B teaser
- Slug typo (`reparacion-tellefonos-samsung`) handled via 301 redirect in next.config

**Ready for pitch.** Live URL pending Vercel deploy (HANDOFF §4); local `npm start` confirmed.

---

## 2026-05-21 — Project kickoff

**Workspace:** Created `cobophone/` subdirectory inside `~/Desktop/Dev/fun/`. Initialized git. Scaffolded `research/`, `strategy/`, `design/`, `data/`, `components/`, `public/`, `src/`, `messages/`, `reports/`, `pitch/` folders.

**Skeleton docs:** `CLAUDE.md`, `REVIEW.md`, `PITCH.md`, `HANDOFF.md`, `QUESTIONS.md`, `README.md` placeholders.

**Phase 1 launch:** Spawning research subagents R1–R8 in parallel. R1 = current site forensics, R2 = brand extraction, R3 = Spanish phone-repair competitors, R4 = Spanish electronics e-commerce, R5 = global refurb + repair, R6 = award-winning tech / 3D, R7 = Madrid local SEO, R8 = conversion psychology synthesis.

**Working hypothesis on positioning:** CoboPhone owns "40-minute repair, transparent pricing, 20 years of trust, the only repair shop with a real B2B parts arm in Cobo Calleja." North-star metric: instant-quote tool completion rate.

**Working hypothesis on direction:** confident technical-calm, closer to Apple Support / Nothing / Linear than to MediaMarkt. Spanish industrial heritage. Service-tech aesthetic. Sparing 3D used at moments of brand assertion.

---
