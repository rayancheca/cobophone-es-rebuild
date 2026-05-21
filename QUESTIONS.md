# QUESTIONS.md — Open items for Rayan

> Anything that needs human input before launch. Write here, never block the build.

## Blockers before going live (post-pitch, pre-production)

- [ ] **Google Business reviews:** Need API access to Google Places to fetch real CoboPhone reviews. Without API key, testimonials are placeholders marked `[VERIFY]` in code. Provide Places API key or paste 6–10 verified review excerpts.
- [ ] **Live counters:** "20 años de servicio / +X dispositivos reparados / +Y clientes satisfechos / Z estrellas medias". Need the real numbers from the back office. Current site shows zeros — that's the bug.
- [ ] **Photo shoot:** Current site photography is uneven. Production needs: 6–10 store interior, 4 technician portraits (with consent), 8 macro device/part shots, 4 workshop-in-action photos. For now, using harvested current-site imagery + manufacturer press kits.
- [ ] **Brand colors:** Working palette is a hypothesis (`#0B5FFF` primary, `#FFB800` secondary, `#00C48C` accent). Need confirmation or alternative direction from the founders before final pass.
- [ ] **Logo SVG:** Current logo is a 270×270 raster. Need the vector source from the founders, or budget to redraw it.
- [ ] **Chinese voice verification:** `/zh/` translations of technical vocabulary (cambiar pantalla, batería, conector de carga, mayorista) should be reviewed by a native Mandarin speaker familiar with Cobo Calleja B2B context. Strings marked `[VERIFY-ZH]` in `messages/zh.json`.
- [ ] **Pricing matrix:** Real per-model × per-repair-type price ranges. Currently using market-rate estimates derived from competitor analysis. Replace with CoboPhone's internal pricing before launch.
- [ ] **Service area data:** Confirm full list of neighborhoods covered with free pickup vs. paid courier. Currently using the 11 listed on the existing site.
- [ ] **Privacy / legal:** RGPD-compliant cookie banner and privacy policy require Spanish counsel review. Boilerplate scaffolded; do NOT publish as-is.
- [ ] **WhatsApp Business API:** Production version should integrate the WhatsApp Business Cloud API for two-way messaging analytics. Mockup uses `wa.me/message/Y7WTOGB7WOXGP1` deep links.
- [ ] **Stripe:** Test mode only in this build. Production cutover requires CoboPhone's real Stripe credentials and tax configuration (IVA 21%).
- [ ] **Resend (email):** Test mode only. Production requires sender domain verification on `cobophone.es`.
- [ ] **Mapbox token:** Free tier is sufficient. Need a production token from the founders' Mapbox account or a new one created for the brand.
- [ ] **Mail-in courier integration:** Production needs real Correos / SEUR API integration for prepaid label generation. Mockup stubs the response.

## Non-blocking but worth answering

- [ ] B2B portal — keep at `/mayoristas` as designed front door, OR migrate everything from current `tienda.cobophone.es` into this new platform? Recommendation: build the front door now, plan unification as a Phase 2 engagement.
- [ ] Blog — migrate existing posts (3–5 found on current site) or start clean with 6 new editorial posts (40-minute promise, what's actually wrong when your phone won't charge, how to mail in a repair, why Sunday is open and Saturday is closed, the Cobo Calleja parts ecosystem, repair vs. replace decision)?
- [ ] Phone resale (Redmi / Realme / TCL) — is this still a live business line? Worth a real `/tienda` or fold into mayoristas?
- [ ] English voice — neutral international or British/American leaning? Neutral assumed.

---
