# 03 — Spanish Phone-Repair Competitor Teardown

Scope: direct Spanish-market competitors to CoboPhone's repair + B2B-parts surface. Studied the national chain leader (Phone House), two pure-play web players (iRepair.es in Denia, MovilFacil), three Madrid-local independents discovered via search (Mobile Centre, Fixel, Europa 3G), one extra Madrid SEO-heavy site (iRepairPhone), and the handyman-platform pattern (Reparalia — domain currently misconfigured TLS, supplemented via search). All findings dated May 2026.

---

## 1. Phone House — `reparaciones.phonehouse.es`

- **Who:** The category gorilla. 450+ retail locations across Spain, manufacturer-accredited official service for Samsung, Apple, Sony, ZTE, bq, etc. Repair is a sub-brand of a phone-and-plan retailer, not the core business.
- **Primary CTA:** "Reparar móvil" — single dominant button heading the service offerings.
- **Pricing transparency:** Mixed and the strongest in Spain. Screen replacements start from "desde 19,95€" with specific model pricing listed (€65–€352 range). Battery from €14. Charge connector from €37. They have an actual quote calculator at "¿Cuánto cuesta reparar mi teléfono?".
- **Booking flow:** Three pathways — (1) in-store via store locator, (2) online quote calculator, (3) home pickup/delivery for 9,99€ flat. Repair tracking via email + web portal. The loaner-phone offer (20€ deposit if insured, 50€ deposit if not) is a real differentiator.
- **Warranty verbatim:** "Conservas la garantía de tu fabricante" / "Las reparaciones bajo presupuesto están garantizadas por 1 año (sobre la intervención realizada)". Plus a price-match promise: "Te devolvemos el 110% de la diferencia" if a customer finds a cheaper official repair within 7 days.
- **Trust signals:** "450+ tiendas", "200+ profesionales acreditados", "Servicio Técnico Oficial" badge, manufacturer logos (Samsung, Apple, Sony, ZTE, bq), "20+ años de experiencia".
- **Visual identity:** Corporate blue-on-white (Phone House's signature red is reserved for the parent retailer; repair lives in a cooler palette). Icon-driven repair-type nav (battery / charger / screen). Large hero, minimal whitespace, sans-serif corporate type. Photography style is generic stock — technicians in lab coats.
- **Cleverest pattern to borrow:** **"Desde X€" + a few explicit model prices.** It signals transparency without committing to a full price grid that would be impossible to maintain across hundreds of models. The 110% price-match is also a borrowable trust device with almost no real claim cost.
- **Biggest anti-pattern to avoid:** **No turnaround-time commitment.** They name "Centros de Reparación Express" but never say "60 minutes" or "same-day." A repair customer's #1 question is "when do I get my phone back?" and Phone House actively hides the answer.

Source: https://reparaciones.phonehouse.es/, https://reparaciones.phonehouse.es/como-funciona, https://ayuda.phonehouse.es/hc/es/categories/360002657339-Reparaciones-en-Phone-House

---

## 2. iRepair.es (Denia)

- **Who:** Single-location coastal repair shop (Denia, Alicante), 30-minute promise.
- **Primary CTA:** "Presupuesto" (quote) and "A domicilio" (home service) side-by-side.
- **Pricing transparency:** Zero. Quote-only, WhatsApp-driven.
- **Booking flow:** Walk-in + WhatsApp + home pickup. No online scheduling.
- **Warranty verbatim:** "Garantía de satisfacción: Te ofrecemos garantía en todas nuestras reparaciones." (Vague, no duration named.)
- **Trust signals:** Big claim "cientos y miles de pantallas reparadas", a section header for testimonials — but the section is empty.
- **Visual identity:** Light-blue placeholder SVGs (clearly an unfinished theme install), clean sans-serif, generic professional layout.
- **Condition grading:** N/A (repair shop only).
- **Cleverest pattern:** "Rompe 2 Paga 1" — a loyalty/insurance promo where the second repair within a window is free. Real lock-in mechanic for repeat customers.
- **Biggest anti-pattern:** **An empty testimonials section is worse than no section.** Header reading "Que dicen de nosotros" above whitespace actively destroys credibility. If you don't have reviews, hide the slot.

Source: https://www.irepair.es

---

## 3. Mobile Centre Madrid — `mobilecentre.es`

- **Who:** Madrid Centro independent, C/ Princesa 3 near Plaza de España. Screen + battery + diagnostics focus.
- **Primary CTA:** "Repara tu móvil ahora" — WhatsApp deep-link appearing 5+ times (722 484 298).
- **Pricing transparency:** Quote-only, but at least they verbalize the philosophy: "presupuesto claro, con IVA incluido, antes de empezar." Free diagnosis advertised.
- **Booking flow:** Walk-in dominant, WhatsApp secondary, phone call (91 548 04 77) tertiary. No online booking.
- **Warranty verbatim:** "Las reparaciones cuentan con garantía según el tipo de intervención y pieza utilizada." (Hedge language — no duration.)
- **Trust signals:** Weakest of the Madrid set. SSL badge, Visa/Mastercard logos, empty testimonial section.
- **Visual identity:** Professional blue/white, real technician photos at workbench, Madrid landmark references (Plaza de España, Gran Vía) as local-SEO signal. Clean sans-serif. The location framing — "estamos a 2 minutos de Plaza de España" — is genuinely good local-trust copy.
- **Cleverest pattern:** **Diagnosis free + price-before-work commitment.** "Presupuesto sin compromiso" is generic but the IVA-included framing is unusual and removes a real friction point.
- **Biggest anti-pattern:** **Madrid-landmark name-dropping with no map.** They mention Plaza de España, Gran Vía, Princesa — but the page has no embedded map, no walking-direction language, no neighborhood photography. Local-SEO words without local-trust visuals.

Source: https://mobilecentre.es/

---

## 4. Fixel Madrid — `fixelmovil.com`

- **Who:** Two-location Madrid repair shop (Bravo Murillo + San Bernardo) that also sells refurbished devices. Closest functional twin to CoboPhone — repair + resale + B2C.
- **Primary CTA:** "Llama a un especialista" — phone-number forward (+34 690 086 043).
- **Pricing transparency:** Mixed. Refurbished products show exact prices ("Desde 199€"). Repair services are quote-only.
- **Booking flow:** Walk-in primary. Free pickup/delivery within M-30 (city core), paid nationwide. Phone-first. No online booking form.
- **Warranty verbatim:** "Garantía en reparaciones: cada servicio técnico cuenta con una garantía que respalda la calidad de nuestro trabajo." Refurbished: "12 meses de garantía".
- **Trust signals:** **Strongest of the Madrid set.** 2,000+ Google reviews badge, "más de 10 años de experiencia", certified refurbished badges, **free loaner phone if repair exceeds 24h** (matches Phone House's loaner play at the independent level).
- **Visual identity:** Clean white/neutral, heavy on product photography, sans-serif, lifestyle hero shots. Less corporate than Phone House, more polished than Mobile Centre.
- **Cleverest pattern:** **Sustainability framing for repairs.** "Contribuyes a un consumo más responsable y al cuidado del planeta" sits next to the repair CTA. They reposition repair away from "I'm cheap" into "I'm responsible" — same move Back Market and Refurbed pull at scale, almost no Spanish repair shops do it.
- **Biggest anti-pattern:** **Fragmented CTAs.** Phone call, store visit, "see refurb collection," and "schedule pickup" all compete on the same fold. The user cannot tell which is the primary path. A single dominant CTA per surface beats four equal ones.

Source: https://fixelmovil.com/

---

## 5. Europa 3G Madrid — `europa3gmadrid.com`

- **Who:** 15-year Madrid repair shop, C/ Jorge Juan 133. iPhone + Samsung + all major brands.
- **Primary CTA:** "Reparamos tu móvil en 45 minutos sin cita previa" — copy-led, not button-led. The headline IS the CTA.
- **Pricing transparency:** Zero. Quote-only via phone (911 595 969) or WhatsApp.
- **Booking flow:** Walk-in dominant, same-day pickup/delivery across Madrid, WhatsApp.
- **Warranty verbatim:** "6 Meses de garantía" general; "Pantallas originales con garantía de hasta 12 meses" for OEM parts.
- **Trust signals:** **Best in the Madrid set, by a wide margin.** 7,450+ Google reviews at 4.9/5, individual testimonials with photos and device-model named, "15+ Años de experiencia", "15,000+ Dispositivos reparados". They also offer ScalaPay 0% financing in 3 installments — repair-as-financed-service is uncommon and clever.
- **Visual identity:** "Europa 3G Madrid" wordmark, blue/white, technician-at-work hero, clean sans-serif corporate. Nothing special visually — the proof points carry the trust.
- **Cleverest pattern:** **Brand-first navigation.** They lead with 15+ device manufacturer logos instead of repair-type categories. Mirrors how the customer thinks ("I have an iPhone, what do you offer?") rather than how the technician thinks ("we do screens, batteries, connectors").
- **Biggest anti-pattern:** **Zero pricing despite overwhelming social proof.** With 7,450 5-star reviews and 15,000 devices repaired, they have every right to publish a price grid. Hiding prices behind a phone call wastes their credibility lead.

Source: https://www.europa3gmadrid.com/

---

## 6. iRepairPhone Madrid — `irepairphone.es`

- **Who:** Madrid walk-in repair, "sin cita previa, en 30 minutos" promise.
- **Primary CTA:** "Pregunta por WhatsApp" (617 610 881).
- **Pricing transparency:** Zero. No pricing anywhere on site.
- **Booking flow:** WhatsApp + phone only.
- **Warranty verbatim:** Not stated on the page surveyed.
- **Trust signals:** Mostly the "30 minutos sin cita" promise and exhaustive device lists (down to "iPhone 17e").
- **Visual identity:** Wordmark "iREPAIRPHONE", otherwise generic.
- **Cleverest pattern:** **Hyper-granular device-model pages for SEO.** Hundreds of indexed URLs (one per phone model) with near-identical templates capture long-tail "reparar [exact model] Madrid" queries.
- **Biggest anti-pattern:** **No prices, no warranty named, no reviews shown.** They've built SEO inventory but every landed page is a dead-end conversion-wise — the user has to message to learn anything substantive.

Source: https://irepairphone.es/reparaciones-de-moviles

---

## 7. Reparalia — handyman platform

Note: `reparalia.es` returned a TLS certificate alt-name error during research (server config issue, May 2026). Supplementing via known platform pattern: Reparalia is a multi-trade home-services aggregator (plumbing, electrical, appliances) where repair-shop bookings sit alongside other home services. Pattern is quote-request-driven, insurance-partner-driven, not a phone-repair-native experience. Not a meaningful UX competitor to CoboPhone but worth naming as a "do not become this" — being a node in someone else's marketplace strips the brand of all visual identity.

---

## Synthesis — Spanish repair landscape

### Patterns common to the Spanish market

- **Walk-in dominance.** Every player except Phone House defaults to walk-in plus WhatsApp. Online booking is essentially absent at the independent level.
- **Quote-only pricing.** Phone House is the only player with published "from X€" pricing. Independents universally hide price behind WhatsApp, even when they have 7,000+ reviews to back transparency.
- **Generic warranty language.** "Garantía en reparaciones" with no named duration is the default. Only Europa 3G ("6 meses", "hasta 12 meses") and Phone House ("1 año") name a number.
- **Empty testimonials sections.** Multiple shops scaffold a "what customers say" UI section and then leave it blank. Visual debt that actively destroys trust.
- **WhatsApp as primary conversion surface.** The funnel for every independent ends in `wa.me/`. Web is a brochure; sales happen in chat.

### Where the Spanish market is weak (CoboPhone opportunity surface)

1. **No one publishes a real price grid.** Phone House does "from" pricing; nobody does what Back Market does for refurb — clear, per-model, in-page prices for the top 30 devices.
2. **No one names a turnaround time AND a warranty together.** "60 minutes + 1 year warranty" said simultaneously and visually is empty space.
3. **No one localizes the trust visually.** Madrid shops mention landmarks; none show photos of the actual storefront, the actual technician, the actual neighborhood.
4. **No one treats B2B parts wholesale as a designed surface.** It's universally a hidden phone-call business. CoboPhone's wholesale side is a real differentiator if it gets a real page.
5. **No one borrows the refurb-marketplace trust playbook for repairs.** Condition grading, point-count inspection, sustainability framing — these are sitting unused in the repair vertical.

Source set: https://reparaciones.phonehouse.es/, https://www.irepair.es, https://mobilecentre.es/, https://fixelmovil.com/, https://www.europa3gmadrid.com/, https://irepairphone.es/, https://www.backmarket.es/, https://madrid.place/tienda-reparacion-moviles/
