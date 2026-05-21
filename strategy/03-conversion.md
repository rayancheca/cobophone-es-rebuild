# 03 — Conversion architecture

> Per primary page: one primary CTA, two secondary CTAs, trust signals, Cialdini principles, drop-off risk + mitigation.

---

## Home (`/`)

- **Primary CTA:** "Pedir presupuesto" → opens the instant-quote tool (`/presupuesto`)
- **Secondary 1:** "Habla por WhatsApp" → `wa.me/message/Y7WTOGB7WOXGP1` with prefilled context
- **Secondary 2:** "Cómo llegar a la tienda" → scrolls to map / opens directions
- **Trust signals:** 4 stat counters (real, not zero), Google review aggregate, "Garantía 3 meses" badge, technician portrait in the hero, "Reparamos en 40 minutos" stamp
- **Cialdini:** Authority (20 years + technician) + Scarcity (40-min promise) + Social proof (counters + reviews) + Reciprocity (free diagnostic mentioned)
- **Drop-off risk:** users scrolling past the hero without engaging the quote tool
- **Mitigation:** sticky bottom-bar on mobile with quote + WhatsApp; second quote-tool preview embedded mid-page; final CTA before footer

---

## Reparación hub (`/reparacion`)

- **Primary CTA:** Pick your device category (icon grid; click goes to category page)
- **Secondary:** "No sé qué tipo de reparación necesito" → WhatsApp with that exact prefilled message
- **Trust signals:** 40-minute badge on each category card where applicable; warranty badge
- **Cialdini:** Recognition (icon grid > text list) + Authority (each category shows "X tipos de reparación / Y años de experiencia")
- **Drop-off risk:** category overload
- **Mitigation:** Hick's Law — 7 categories max, not 14 sub-categories

---

## Per-device pages (e.g., `/reparacion/movil`)

- **Primary CTA:** "Calcula el precio de tu reparación" → quote tool pre-filtered to this device
- **Secondary 1:** Brand grid (click → brand page)
- **Secondary 2:** WhatsApp with category context
- **Trust signals:** brand logos (manufacturer recognition), repair-type list with average duration, common failure modes ("Si tu móvil…"), warranty + diagnostic policy
- **Cialdini:** Authority (we know your device) + Reciprocity (free diagnostic) + Liking (warm category copy)
- **Drop-off:** users uncertain whether their specific model is covered
- **Mitigation:** search bar above the brand grid ("¿No ves tu marca? Búscalo")

---

## Per-brand pages (e.g., `/reparacion/movil/samsung`)

- **Primary CTA:** Pick your model
- **Secondary:** "Ver todos los modelos (N)" expands the long tail
- **Trust signals:** brand-specific issue knowledge ("Reparamos la pantalla curva del Galaxy S22 sin romper el marco — lo hemos hecho X veces")
- **Cialdini:** Authority (brand-specific expertise) + Default bias (top 8 models pre-shown)
- **Drop-off:** model not listed
- **Mitigation:** "¿No ves tu modelo? Mándanos un mensaje" → WhatsApp

---

## Per-model pages (e.g., `/reparacion/movil/samsung/galaxy-s23`)

- **Primary CTA:** "Reservar reparación" → quote tool with model pre-selected
- **Secondary 1:** Price-range table with each repair type → click goes to quote tool
- **Secondary 2:** WhatsApp with model + repair context
- **Trust signals:** known issues for this specific model, anchored against new-phone cost (€1200 anchor vs €149 repair), warranty terms, "última reparación de este modelo hace X días" if data available
- **Cialdini:** Anchoring (new-phone price) + Authority (specific model expertise) + Loss aversion (data loss framing)
- **Drop-off:** sticker shock on price range
- **Mitigation:** lead with the LOW end of the range; explain what determines the high end transparently

---

## Instant quote tool (`/presupuesto`)

The heart of the site. Detailed spec in `04-quote-tool.md`.

- **Primary CTA:** "Reservar reparación" at the end of the flow
- **Secondary:** "Hablar con un técnico" (WhatsApp escape hatch) — always visible
- **Trust signals:** progress bar accelerating, technician avatar at confirmation, "responde en ~3 min" status
- **Cialdini:** Commitment ladder + Goal gradient + Default bias (most-common repair pre-selected)
- **Drop-off:** drop-off after price reveal
- **Mitigation:** show the range, not a single number; offer WhatsApp clarification one click away; one-tap photo upload

---

## Tienda (`/tienda`)

- **Primary CTA:** Filter by brand / browse catalog
- **Secondary:** "Comparar modelos" tool
- **Trust signals:** condition grading with explanation, warranty, "Recogida gratuita en tienda" badge
- **Cialdini:** Social proof (model reviews) + Anchoring (compare to new) + Liking (warm product photography)
- **Drop-off:** no model matches what they want
- **Mitigation:** "Buscamos el modelo que quieres" — WhatsApp lead capture for out-of-stock requests

---

## Mayoristas (`/mayoristas`)

- **Primary CTA:** "Solicitar acceso" → B2B inquiry form
- **Secondary 1:** "Ver catálogo de piezas" → tienda.cobophone.es (designed link card, not raw)
- **Secondary 2:** "Hablar por WhatsApp" / WeChat
- **Trust signals:** 20 years; Cobo Calleja location = fastest shipping in Spain; pricing tiers with concrete EUR thresholds; B2B client logo wall
- **Cialdini:** Unity ("somos uno de vosotros") + Authority (volume + location) + Reciprocity (free first-order discount stamp)
- **Drop-off:** tax-ID / volume validation friction
- **Mitigation:** allow "estoy explorando" path that skips CIF validation; route those leads to a softer follow-up

---

## Recogida (`/recogida`)

- **Primary CTA:** Start the 4-step mail-in flow
- **Secondary:** "¿Vives en Madrid? Pasa por la tienda" → location page
- **Trust signals:** prepaid label visual, "no pagas hasta confirmar el diagnóstico," tracking promise
- **Cialdini:** Reciprocity (free label) + Loss aversion ("no pierdas días sin tu móvil")
- **Drop-off:** address-entry friction
- **Mitigation:** geolocation + autocomplete

---

## Garantía (`/garantia`)

- **Primary CTA:** "Pedir presupuesto" (yes, even here — they're high-intent)
- **Secondary:** "Ver términos completos" — opens the full text inline, no PDF download
- **Trust signals:** plain Spanish; what's covered + what's not, equally bold; claim process in 3 steps
- **Cialdini:** Authority (specific terms) + Loss aversion (lead with risk)
- **Drop-off:** legalese fatigue
- **Mitigation:** keep total length under 600 words; use a 2-column "covered / not covered" table

---

## Ubicación (`/ubicacion`)

- **Primary CTA:** "Cómo llegar" → opens directions in Maps app (mobile) or shows route (desktop)
- **Secondary 1:** "Llámanos / WhatsApp"
- **Secondary 2:** "Reservar reparación" (quote tool)
- **Trust signals:** real storefront photo (not stock), real-time "Abierto / Cerrado / Abre en X," transit + parking notes, Sunday-open / Saturday-closed schedule explained
- **Cialdini:** NN/g local-service pattern + Liking (own the awkward location)
- **Drop-off:** "is this place legit?"
- **Mitigation:** 20-years stamp, founders' photo, Google business badge

---

## Confirmation screen (post-booking)

The most important screen on the site. Peak-end rule.

- **No CTA.** This screen is the reward, not another funnel step.
- **Trust signals:** designed brand moment — technician portrait, workshop photo, your specific booking summary, what happens next ("Te llamamos en 5 minutos para confirmar"), calendar event for the appointment, WhatsApp shortcut "tengo una duda"
- **Cialdini:** Reciprocity (next-step proactive call) + Liking (warm closure)
