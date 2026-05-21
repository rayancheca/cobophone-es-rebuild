# 00 — Design direction

## North star

**Confident, technical, calm.** Electronics-grade trust, not consumer-electronics-marketing energy. Closer to Apple Support / Nothing / Linear than to MediaMarkt. Spanish industrial heritage. Service-tech aesthetic. Future-tech accent used sparingly at moments of brand assertion.

## The four pillars (rooted in R6 + R3+R5 research)

1. **Restraint as a flex.** Apple-grade. No parallax overload. No diagonal scroll. No marquee. One signature ambient motion per page, max three purposeful moments. The product (the device, the repair) is the show.
2. **Type-first hierarchy.** Stripe and Linear demonstrate that credibility comes from disciplined typography and proof points, not from animation theatrics. Display sizes are large and confident. Body weights are light. Hierarchy is size + weight + space, never color noise.
3. **One signature motif.** Nothing has the dot-matrix glyph; Stripe has the wave. CoboPhone gets the **certification chevron + dot-grid** — a workshop-bench gridded backdrop with subtle chevron stamps that punctuate trust signals (warranty, 40-minute, diagnostic, garantía). Repeating, instantly recognizable.
4. **Real over generic.** Every visual must reference something real on the page. If we ship a 3D phone, it's a real phone being repaired. If we ship a counter, it's a real number. If we ship a review, it's a verified one or marked `[VERIFY]`.

## The three contexts

### Light (default) — consumer-facing
Bright workshop surfaces. White (`#FFFFFF`) canvas with paper (`#FAFBFC`) for subtle elevation. Ink-900 text. The brand-violet (`~#6B21A8`) used sparingly on primary CTAs and live indicators. Brand-magenta (`~#E11D8F`) **only** on time-sensitive callouts (the 40-minute stamp, scarcity-of-slots indicators, price reveals).

### Dark (hero + 3D moments)
Deep violet-black (`oklch(15% 0.10 295)`) as background. Brand-violet saturates slightly. Magenta gets brighter to maintain contrast. Type contrast holds at 7:1 (AAA). Used for the home hero, the 3D scenes, the B2B mayoristas portal background.

### Palette rationale
The live cobophone.es uses purple + magenta as its core identity (logo bar black, gradient banner magenta-to-violet). We honor that — the brand keeps its color memory in customers' heads — but we drop the loud gradient and use the purple with discipline: as a confident primary on calm white space, with magenta as a deliberate accent for time-urgency moments only.

### B2B (mayoristas surface)
Tonal shift: heavier, more industrial, more chrome. Same brand-blue primary. Less amber. More mono. Conveys "this is the parts side, not the consumer side" without breaking brand cohesion.

## What this is NOT

- Not a startup brand
- Not a luxury brand
- Not a Gen-Z youth brand
- Not a generic Tailwind landing page with three feature cards and a pricing table
- Not dark-mode by default (Framer goes dark; we don't — refurb-trust audiences expect a bright, trustworthy white surface, per Back Market evidence)
- Not glassmorphism, neumorphism, or "gradient blob" hero patterns
- Not 12 different micro-animations competing for attention

## What earns its place on the screen

Each element must answer one of:
- Does it directly support the primary CTA?
- Is it a trust signal that lowers conversion friction?
- Is it semantic information the user needs to make a decision?

If none of the three, it's removed.

## References (from R6 tear-down)

- **Apple iPhone product page** — hero restraint, scroll-tied 3D, single CTA
- **Nothing** — signature motif as visual language
- **Linear** — embed real-looking state transitions as trust signals
- **Stripe** — one signature ambient motion, type-first credibility
- **Back Market** — Spanish refurb-trust UX patterns to adopt
- **Certideal** — per-attribute condition grading inspiration for /tienda
- **Codrops collective** — scroll-driven 3D study material, used judiciously
