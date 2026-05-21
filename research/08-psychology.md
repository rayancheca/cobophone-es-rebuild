# R8 — Conversion Psychology & UX Heuristics Evidence Base

> Synthesis of the behavioral / cognitive principles that should be baked into every section of the CoboPhone redesign. Per the brief, every section should reference at least one of these in an inline code comment so the rationale stays auditable.

---

## Cialdini's 7 principles of influence

| Principle | Mechanism | How it applies to a phone-repair site |
|---|---|---|
| **Reciprocity** | People feel obliged to repay what they receive | Free diagnostic. Free pickup inside the Madrid zone. Free shipping label for mail-in. These are not loss-leaders — they are reciprocity primers. |
| **Commitment & consistency** | People want to act consistently with prior commitments | The multi-step instant-quote tool is a commitment ladder: device → brand → model → repair → price. Each click increases follow-through. Show progress to make completion feel inevitable. |
| **Social proof** | People look to others' behavior in uncertainty | Real (non-zero) counters: years, devices repaired, customers served. Google review aggregate. A live "última reparación hace 7 min" ticker (real if data exists, else marked `[VERIFY]`). B2B client logos. |
| **Authority** | People defer to credible experts | 20 years on every primary page. Technician portraits with names + years of experience. Manufacturer parts-supplier badges. Repair-process transparency (show the bench, the tools, the multimeter). |
| **Liking** | People are persuaded by people/brands they like | Warm photography of real technicians, not stock. Human language. Founder story that names the founders. Owning the Cobo Calleja awkwardness ("Sí, sabemos cómo llegar es un poco lío"). |
| **Scarcity** | Scarce things feel more valuable | The 40-minute promise is real scarcity-of-time, not fake stock scarcity. Forbidden: "only 3 left" lies on a service business. Permitted: "siguiente hueco disponible: hoy 14:30" if it can be computed truthfully. |
| **Unity** | We comply with people we consider "us" | The B2B portal speaks to repair-shop owners as community: "Somos uno de vosotros — empezamos como vosotros." Cobo Calleja Chinese-speaking customers get a `/zh/` locale that says the same thing in their language. |

## Fogg Behavior Model: B = MAT

Behavior happens when **M**otivation, **A**bility, and a **T**rigger converge simultaneously.

- **Motivation** is already high — the user has a broken phone, they're in pain. Don't waste pixels on persuasion; they don't need convincing.
- **Ability** is the bottleneck. Lower friction wherever possible: pre-select the most common repair, accept photos uploaded directly from the phone, default the pickup address to the user's geolocated city, allow WhatsApp as a one-click escape hatch from any form.
- **Trigger** must be visually unambiguous. Primary CTA per page is one button, sized and colored to be unmistakable. Above the fold, always.

The implication: optimizing the site for "more persuasion" is the wrong lever. Optimizing for "less friction" is the right one.

## Nielsen's 10 usability heuristics

1. **Visibility of system status** — every form field shows live validation; every async action shows progress; the quote tool shows a step counter.
2. **Match between system and the real world** — Spanish-first vocabulary, no jargon ("cambio de pantalla" not "screen replacement," "tapa trasera" not "rear housing").
3. **User control & freedom** — every step of the quote tool has a "atrás" button; every modal has an explicit close; the locale switcher preserves the path.
4. **Consistency & standards** — primary CTA color, size, and placement consistent across pages.
5. **Error prevention** — phone-number field accepts Spanish formats; CIF validator on the B2B form prevents bad submissions before they happen.
6. **Recognition rather than recall** — model picker shows phone images, not text-only lists.
7. **Flexibility & efficiency of use** — power users (repair-shop owners) get keyboard shortcuts and a /mayoristas express form; first-timers get the guided flow.
8. **Aesthetic & minimalist design** — every element on a page earns its place; if it doesn't directly support the primary CTA or a trust signal, it's removed.
9. **Help users recognize, diagnose, and recover from errors** — error states are designed, not default browser alerts; suggest the fix inline.
10. **Help and documentation** — FAQ accessible from every page footer; WhatsApp escape hatch always one click away.

## Hick's Law

Decision time scales logarithmically with the number of choices. Implication: **never present more than 7 categories at once.** The device-category grid shows exactly 7 categories (móvil, tablet, portátil, smartwatch, consola, tv, patinete). The brand grid shows the top 7 brands by volume; "Ver todas" expands the rest. The repair-type list shows the 6 most common; rare types collapse under "Otros."

## Fitts's Law

Targets that are larger and closer are faster to acquire. Implication:
- Primary CTAs are min 44×44px on mobile (Apple HIG), preferred 56×56px for the lead button
- Sticky bottom WhatsApp CTA on mobile sits in the thumb-zone (right side, 16px from the bottom edge)
- Form-field tap targets fill the full row width

## Peak-End Rule

People remember the most emotionally intense moment of an experience and the final moment, not the average. Implication:
- The peak moment is the price reveal in the quote tool. Animate it. Tabular figures, large size, the brand-amber accent. Confidence stamp.
- The end moment is the confirmation screen after booking. This is the most important screen on the site. It should not be a default Stripe redirect. It should be a designed brand moment: "Recibido. Te llamamos en 5 minutos para confirmar." A technician portrait. A photo of the workshop. Next steps. Calendar link.

## Default Bias

People stick with whatever option is pre-selected. Implication:
- Quote tool pre-selects the most-common repair type per model (screen for iPhone 11, battery for iPhone 12, etc.)
- Pickup-vs-walkin defaults to walk-in (lower friction, no logistics)
- Mail-in flow pre-selects "send me a prepaid label" not "I'll arrange my own shipping"
- Locale defaults to Spanish, with browser-language detection switching only if it's a strong match (en-US, en-GB, zh-CN, zh-TW)

## Loss Aversion

A loss feels ~2× the magnitude of an equivalent gain. Implication:
- Frame the value proposition as "no pierdas un día sin tu móvil" rather than "ahorra tiempo"
- On the warranty page, lead with what could go wrong without warranty, not the upside of having one
- For data backup: "Tus fotos no se pierden. Lo hacemos antes de tocar la pantalla."

## Anchoring

The first number people see frames the rest. Implication:
- Per-model pages show the cost of a new iPhone 15 ($1200+) next to the cost of a screen repair (€89-€149). The €89 anchors against €1200, not against "is this a fair price for a service?"
- Quote tool shows the price range — never a single number — because a range with a low anchor (€89) feels better than a single number (€129)

## Goal-Gradient Effect

Effort and motivation increase as people perceive themselves closer to the goal. Implication:
- Quote tool progress bar accelerates: step 1 fills 30% of the bar (not 25%), step 2 fills 60%, step 3 fills 85%. The illusion of fast progress pulls users through.
- Form labels say "Último paso" on the final field

## Cognitive Load (Sweller)

Working memory holds 4 ± 1 chunks. Implication:
- No page asks the user to remember information from a previous page
- The quote tool's price reveal includes a summary of the device + repair selected (no need to scroll back to verify)
- Comparison tables show max 3 columns at once

## The IKEA effect

People value things more when they participate in creating them. Implication:
- The quote tool itself is the IKEA assembly: the user builds their quote, so they're psychologically more committed to following through
- Mail-in flow lets the user choose the pickup date/time slot — they're "designing" their own repair

## Baymard Institute findings (commerce-specific)

From Baymard's checkout abandonment studies and mobile commerce UX research:
- 17% of checkout abandonment is "too long / complicated checkout" — keep the booking form ≤4 fields above the fold
- 18% is "did not trust the site with credit card info" — display Stripe + bank logos prominently at the payment step
- Mobile users abandon ~85% of carts on average — every mobile-only optimization compounds
- Sticky add-to-cart / sticky CTA on mobile lifts conversion 10-25% on commerce sites
- Filters that "live update" the result count outperform filters that require an Apply button

## Nielsen Norman Group: local-service-business sites

NN/g's research on local-service patterns:
- Address, hours, and phone in the header AND footer (redundancy is feature, not bug)
- A real photo of the storefront on the contact page (not a stock image) increases trust scores
- Hours need a real-time "open now / closed / opens in X" indicator — static hours feels stale
- Reviews need source attribution (Google badge, Trustpilot badge) — generic testimonials underperform
- For mobile users searching "service near me," directions are the primary CTA

---

## Synthesized into the redesign

The conversion architecture chooses one or two principles per section:

| Section | Primary principle | Secondary |
|---|---|---|
| Home hero | Authority (20 years, technician) | Scarcity (40-min promise) |
| Trust strip (stats) | Social proof | — |
| Quote tool | Commitment ladder | Goal gradient + default bias |
| Service grid | Hick's Law (7 categories) | Recognition over recall |
| Brand grid | Recognition | Hick's Law (top 7 + expand) |
| Reviews | Social proof + source attribution | Liking |
| Map / location | NN/g local-service patterns | Reciprocity (free parking info) |
| B2B teaser | Unity ("somos uno de vosotros") | — |
| Warranty page | Loss aversion lead | Authority (specific terms) |
| Confirmation screen | Peak-end | Reciprocity (free follow-up) |
| Mobile sticky CTA | Fitts's Law | Trigger (Fogg) |

This is the cheat sheet developers should reference when wiring sections.

---

_End of psychology synthesis._
