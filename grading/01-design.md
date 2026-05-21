# CoboPhone — Design Grading (01)

**Judge:** Awwwards-tier brief, brutal-but-specific mode
**Date:** 2026-05-21
**Scope:** `/`, `/presupuesto`, `/presupuesto?dispositivo=movil&marca=apple&modelo=iphone-15-pro&reparacion=pantalla`, `/mayoristas`, `/reparacion/movil/apple/iphone-15-pro`, `/ubicacion`

Note on methodology: WebFetch returns markdown without CSS context, so it under-reports color and motion. Scores below are grounded in the actual token system (`src/styles/globals.css`), the live component code (`src/components/sections/*`, `src/components/ui/Button.tsx`, `src/components/layout/*`), and the page-by-page content seen via fetch.

---

## Scores

### 1. Visual hierarchy — **8/10**

The dark hero in `HomeHero.tsx` lands well: a single `clamp(2.75rem … 6rem)` H1 ("Reparamos tu móvil en 40 minutos."), a 36ch supporting paragraph, a primary-violet CTA paired with the WhatsApp green, and a 4-cell mono-numeric trust strip with 1px white hairline dividers (`gap-px bg-white/10 rounded-2xl ring-1 ring-white/10`). The eye flow is unambiguous: eyebrow → headline → sub → CTA → numbers. The `/reparacion/movil/apple/iphone-15-pro` page is weaker — a 20-row repair table all rendered as `≈ 40 min · 3m garantía: 299 €–379 €` text rows reads like a spreadsheet, not a price ladder; nothing tells you that "screen" is the volume product and "motherboard" is the moat. On `/presupuesto` the device picker grid is even but flat — no anchor card, no recommended path, every option weighted identically.

### 2. Type system — **7/10**

Real discipline in `globals.css`: tracking-tighter (`-0.04em`) on H1, tracking-tight on H2/H3, `font-variant-numeric: tabular-nums` on `.num`, OpenType features `ss01, cv01, cv11` turned on in body, and a clean fluid scale (`--text-5xl: clamp(3.75rem, 2.8rem + 4vw, 6rem)`). Mono-for-numerals is used consistently (trust strip `9:41`, prices, "Acto 3 / 5", "40 min" pills) which gives the site a real workshop-instrument feel. Two problems hold this back from a 9: (a) the entire stack runs on a single typeface (`var(--font-geist)` is both display and body in `globals.css`), so there is **zero pairing** — no editorial contrast between the brand voice headline and the technical body. (b) Long copy paragraphs at `text-lg leading-relaxed` and `max-w-2xl` show up identically on hero, mayoristas, ubicacion — a real type system would have a separate "lede" treatment.

### 3. Color discipline — **7.5/10**

The token system is the strongest design artifact in the repo. Brand primary is OKLCH `45% 0.24 305` (deep saturated violet), secondary is OKLCH `65% 0.27 350` (hot magenta), neutrals are violet-tinted (`oklch(18% 0.014 295)` for ink-900, `oklch(97% 0.008 295)` for paper). The dark hero uses both colors well — a violet `bg-brand-primary/20 blur-[160px]` on the top-right and a magenta `bg-brand-secondary/15 blur-[140px]` on the bottom-left in `HomeHero.tsx` lines 26–27. Magenta is correctly reserved for time-urgency moments (the "40 min" badge, the PhoneJourney act labels, the progress bar fill). What stops this from being a 9: the **light surfaces lose the brand entirely** — `bg-paper` sections (Brands grid, mayoristas "Por qué elegirnos", iPhone 15 Pro repair table) read as near-white with violet only appearing as a 1px chevron stamp or a hover color swap. There's no signature violet moment in light mode — no violet-tinted card, no magenta price callout — so the brand evaporates the second you leave a dark hero.

### 4. Composition & whitespace — **7/10**

`--space-section: clamp(4rem, 3rem + 5vw, 10rem)` is generous and the container widths (`--container-max: 1440px`, narrow 1080, prose 720) are correctly tiered. Hero uses a 7/5 column split on lg with `gap-10 lg:gap-16` — well-judged. Trust strip uses `gap-px` on a white/10 surface to create hairline-divided cells, which is a real composition move. Weaknesses: the homepage **device categories grid** and the **brands grid** are both uniform 4-col cards with the same radius, the same `shadow-card`, the same `ring-1 ring-ink-100`, the same hover lift (`hover:-translate-y-0.5`). That's three back-to-back grids on `/` with identical rhythm. The mayoristas pricing tiers are also a 3-col equal-weight grid — no "recommended" emphasis, no editorial break. Bento or asymmetric weighting would buy a full point here.

### 5. Motion craft — **8.5/10**

`PhoneJourney.tsx` is the standout. Five acts mapped to scroll progress (Pánico → Lágrimas → Carrera → Llegada → Reparado), each with **narrow 3% opacity swap bands** (lines 36–40) so two acts never linger in low-opacity limbo — that's a craft decision most teams miss. The phone-falling Y is `useTransform(scrollYProgress, [0, 0.16, 0.20], [-60, 240, 260])` with a coupled rotate, then a crack overlay appears between 13–18%. Act 3 has layered motion vectors: animated road dashes at 0.5s linear, building silhouettes at 6s linear, passing cars at 2.2s linear, hero car driven by scroll (`carX`), dust trail with per-particle delay. That's compositor-friendly (transform/opacity only) and feels intentional, not decorative. The `prefers-reduced-motion` fallback is a real two-card before/after, not just `animation: none` — that's good craft. Half-point off: the hero device placeholder uses CSS keyframes (`appFloat`) and the staggered `(i * 0.18) % 2.4` modulo for delays is clever but the float amplitude (4px) is so small it reads as a render glitch on a 4K monitor. The whole homepage is also still **CSS-only where the brief promised R3F** — the 3D commitment is unmet at this snapshot.

### 6. Detail polish — **7/10**

Good: focus-visible has a custom double-ring (`box-shadow: 0 0 0 2px var(--color-paper), 0 0 0 4px var(--color-brand-primary)`) that swaps to magenta on dark surfaces (`globals.css` lines 162–171). Selection color is brand violet at 22% alpha. `::selection` is set. Buttons have `active:scale-[0.98]` and `will-change-transform`. The "›" chevron-stamp component is a real motif. Shadow-pop uses the brand violet for the glow color (`0 8px 24px oklch(45% 0.24 305 / 0.28)`) — that's the kind of detail that signals an actual design system. Where it falls short: every card is `rounded-2xl` with `shadow-card → shadow-elevated` on hover and `hover:-translate-y-0.5`. The Brands grid card, the device hub card, the mayoristas reason card, and the location card all behave identically. There is no hover where a price reveals, no card that tilts, no number that counts up — micro-interactions are uniform and safe.

### 7. Photography & imagery — **4/10**

This is the weakest dimension. There is **no real photography** anywhere in the audited pages — no shop facade photo on `/ubicacion` (the page describes Calle Bembibre 5 in words only), no technician portraits, no parts/inventory photography on `/mayoristas`, no device hero photography on `/reparacion/movil/apple/iphone-15-pro`. The HomeHero "phone" is an SVG-and-gradient `DevicePlaceholder` with twelve fake app tiles (Mensajes/WhatsApp/BBVA/Glovo/Instagram/Spotify/Maps/Mail/Amazon/X/Cámara/Teléfono) drawn with emoji glyphs and `bg-gradient-to-br` color squares. The PhoneJourney shop facade is a hand-rolled `bg-shadow-blue rounded-t-3xl` rectangle with a "CoboPhone" awning. The brief in `CLAUDE.md` says no purple-gradient AI-aesthetic, but the actual hero device reads as exactly that — gradient app tiles inside a gradient frame. A real Madrid repair shop has photography assets; not using them is the single biggest tell that this is a rebuild snapshot rather than a finished product.

### 8. Brand cohesion — **7/10**

The voice is unusually disciplined for a tech rebuild — short Madrileño sentences in *tú* form, specific numbers, the working-shop quote *"Si no sabemos el fallo, es que no existe."* attributed to "Equipo CoboPhone" in `HomeHero.tsx` line 68. "Saturday closed, Sunday open" is owned as a feature in `/ubicacion` copy. Color tokens, focus rings, mono numerals, chevron stamps, and the violet+magenta blur palette all reinforce a single identity. Where cohesion breaks: the homepage's fake iPhone app-grid placeholder is decorative and brand-neutral (it could ship for any phone shop), the `/presupuesto` first step is a generic device grid, and `/ubicacion` reduces to address text + transit prose with no map embed visible. A SOTD jury would also note the missing hero photography and the absence of any signature "CoboPhone-only" visual gesture (a workshop-bench texture, a tool callout, a real technician shot).

### 9. Originality — **7/10**

PhoneJourney is genuinely original — the 5-act emotional narrative (Panic → Tears → Chase → Arrival → Repaired) is not a template move and the Madrid-specific copy ("Por la M-506 a toda velocidad. Dirección Cobo Calleja.", "Calle Bembibre 5. Marco te recibe en la puerta.") welds the animation to the brand. The OKLCH violet+magenta palette is unusual for the repair-shop category, which defaults to blue+amber or red+white. Where originality flags: the homepage section sequence (hero → metrics strip → narrative → 3-step explainer → category grid → brand catalog → reviews → B2B teaser → location → footer) is a perfectly conventional landing-page recipe; the mayoristas hero + pillars + reason cards + 3-tier pricing is the standard SaaS B2B template; the `/presupuesto` device picker is identical in shape to every competitor's step-1 picker. The motion and copy are original; the page architecture is not.

### 10. Restraint — **7.5/10**

Real restraint shown in: a single typeface across the system, only three brand colors (violet/magenta/green), no gradient text, no glassmorphism on UI chrome, badges using ringed translucent variants instead of solid pills, mono used only for numerals, and the explicit `CLAUDE.md` directive forbidding "innovador, revolucionario, soluciones, experiencia única" being honored in actual copy. The HomeHero's secondary tagline is one line. Where restraint slips: the hero stacks an eyebrow + H1 + paragraph + two CTAs + a pull-quote + a 4-cell trust strip + three trust badges in a single viewport. That's seven content blocks fighting for attention before scroll. The 4-cell trust strip + three trust badges below it is one duplication too many — the badges restate the strip's content (`40 min`, warranty, diagnostic) in a different shape.

---

## Top 10 Recommendations (ranked by impact × effort)

- **R1: Bring photography to the homepage hero and `/ubicacion`** (Impact: H, Effort: M)
  - What's wrong now: The hero is a CSS phone with twelve emoji-glyph "apps" and no real device, technician, or shop imagery. `/ubicacion` describes the shop in words but never shows it. This is the single largest gap between the brand promise and the rendered site.
  - What to do: Replace `DevicePlaceholder` with a real photograph of a phone mid-repair on the CoboPhone workbench (or an R3F scene per the brief), shot dark and tight so it composites onto `bg-shadow-blue`. Add a 16:9 storefront photo at the top of `/ubicacion` and a tight portrait of "Marco" (the name already referenced in PhoneJourney act 4) inside an `aside`.
  - Where to look in the code: `src/components/sections/HomeHero.tsx` lines 73–215 (replace `DevicePlaceholder`), `src/app/ubicacion/page.tsx`, optionally `public/photos/` as new asset directory.

- **R2: Make light-mode sections carry brand color** (Impact: H, Effort: L)
  - What's wrong now: Every `bg-paper` section (Brands grid, mayoristas "Por qué elegirnos", iPhone 15 Pro repair table) is functionally near-white with violet appearing only as a 1px chevron stamp or a hover color. The brand evaporates outside dark heroes.
  - What to do: Introduce one signature violet-tinted card surface (`bg: oklch(95% 0.04 305)` would be a `--color-paper-violet` token) and use it for the trust band, the "recommended" pricing tier, and the price ranges on repair detail pages. Add a magenta numeral treatment for the price column.
  - Where to look in the code: `src/styles/globals.css` (add token), `src/components/sections/Brands.tsx`, `src/app/mayoristas/page.tsx` `TierCard`, and the iPhone repair table page under `src/app/reparacion/...`.

- **R3: Break the repair detail table into a price ladder** (Impact: H, Effort: M)
  - What's wrong now: `/reparacion/movil/apple/iphone-15-pro` lists 20 repairs as identical rows. SIM unlock at €25–45 sits next to motherboard repair, screen at €299–379 sits next to camera glass. The volume product (screen) and high-margin moat (motherboard) get no visual weight.
  - What to do: Pull the top 3 repairs into a bento at the top — screen as the hero card with the largest price callout, battery + back glass as the secondary pair, then collapse the remaining 17 into a "Todas las reparaciones" disclosure. Use the magenta secondary on the screen card's CTA.
  - Where to look in the code: `src/app/reparacion/movil/[brand]/[model]/page.tsx` (or whichever file renders that route's body), `src/data/` for the repair list.

- **R4: Add a typographic pair** (Impact: M, Effort: L)
  - What's wrong now: Headlines and body both render in Geist. There is no editorial contrast between the brand voice (short, Madrileño, declarative) and the technical body (specs, prices, hours). Type carries one note across an octave that should swing.
  - What to do: Pair Geist (or whatever the body remains) with a tight display serif or a condensed grotesque for H1/H2 only. Inter Display, Söhne Breit, or a free option like Instrument Serif would all earn the H1 "Reparamos tu móvil en 40 minutos." moment.
  - Where to look in the code: `src/styles/globals.css` lines 42–45 (`--font-display`), `src/app/layout.tsx` for the `next/font` loader.

- **R5: De-duplicate the hero trust signals** (Impact: M, Effort: L)
  - What's wrong now: The hero shows a 4-cell mono trust strip *and then* three pill badges restating "40 min", "3 meses garantía", "Diagnóstico gratuito". Two voices for the same claim weakens both.
  - What to do: Keep the 4-cell strip (it has the 20,000+ repairs / 20 years numbers that the badges don't) and delete the three pill badges below it. Move the WhatsApp-response-time signal ("~3 min") to a small line under the WhatsApp CTA instead.
  - Where to look in the code: `src/components/sections/HomeHero.tsx` lines 95–105.

- **R6: Differentiate the homepage's three back-to-back grids** (Impact: M, Effort: M)
  - What's wrong now: Device categories, then brands, then reviews carousel all use 4-col cards with `rounded-2xl shadow-card hover:shadow-elevated ring-1 ring-ink-100 hover:-translate-y-0.5`. Three identical rhythms in a row.
  - What to do: Make the device categories a single horizontal scroll-snap rail with a wider hero card (Móvil), keep brands as the 4-col grid, and reshape reviews into an editorial 2-up pull-quote with a real Google star icon and reviewer initials. Three different shapes carry three different intents.
  - Where to look in the code: `src/components/sections/Services.tsx` (categories), `src/components/sections/Brands.tsx`, `src/components/sections/Reviews.tsx`.

- **R7: Give `/presupuesto` step 1 a recommended path** (Impact: M, Effort: L)
  - What's wrong now: Seven device options laid out as an even grid weight Móvil and Patinete equally. ~85% of real traffic is phone screen repair; the UI gives that no signal.
  - What to do: Render Móvil as a 2x-wide hero tile at the top of the grid with a magenta "Lo más común" eyebrow and a sample price ("desde 79 €") visible. Demote tablet/portátil/etc to a secondary row.
  - Where to look in the code: `src/app/presupuesto/page.tsx`, `src/components/quote/QuoteTool.tsx`.

- **R8: Add an embedded map and storefront facade to `/ubicacion`** (Impact: M, Effort: M)
  - What's wrong now: `/ubicacion` is address text + transit prose + contact channels. The brief lists Mapbox GL JS in the stack but the rendered page shows no map and no facade photograph.
  - What to do: Add a Mapbox GL embed pinned to Calle Bembibre 5 with a custom violet marker, frame it inside the same `ring-1 ring-ink-100 rounded-2xl` surface used elsewhere, and place a 16:9 storefront photo above it. The "Aparcamiento gratuito a 30 metros" line earns a small inline icon next to the map.
  - Where to look in the code: `src/app/ubicacion/page.tsx`, `next.config.mjs` for `NEXT_PUBLIC_MAPBOX_TOKEN`.

- **R9: Make the "Pro" tier on `/mayoristas` win the page** (Impact: M, Effort: L)
  - What's wrong now: Starter / Pro / Volume are rendered as three equal-weight cards. Pro is the realistic ICP and has the best margin, but visually it's a coin flip.
  - What to do: Scale Pro to 1.05x, give it a `bg-shadow-blue` dark surface against the two light tiers, put the magenta "Recomendado" badge on it, and lift its shadow. Keep the others as outline.
  - Where to look in the code: `src/app/mayoristas/page.tsx` `TierCard` (the file references one near line 119).

- **R10: Add a real R3F moment to deliver on the "5 sanctioned 3D places"** (Impact: H, Effort: H)
  - What's wrong now: `CLAUDE.md` explicitly sanctions R3F in five places: home hero, quote-tool brand picker, per-service hero, 20-years timeline, B2B portal hero. The current snapshot has zero. The HomeHero file even has a comment ("placeholder for the R3F scene") and ships CSS instead.
  - What to do: Pick the highest-leverage one — the home hero — and ship an R3F disassembling/reassembling phone tied to `scrollYProgress` with three meshes (screen, battery, frame), a single directional light, and a lazy-loaded canvas (`next/dynamic` with `ssr: false`). This is the move that turns the site from agency-portfolio to SOTD-tier.
  - Where to look in the code: `src/components/sections/HomeHero.tsx` (replace `DevicePlaceholder`), `design/3d-direction.md` for the agreed motion language, `package.json` already lists R3F + drei + postprocessing per the brief.

---

## Overall design verdict

**Agency-portfolio-tier with one foot in regional-award territory, held back from Awwwards SOTD by missing photography and unshipped R3F.**

The token system in `globals.css` (OKLCH brand pair, violet-tinted neutrals, mono-numeral discipline, branded focus rings) and the PhoneJourney 5-act scroll animation (narrow opacity swap bands, layered motion vectors per act, real reduced-motion fallback) are SOTD-grade craft. The copy discipline is rare. But three things stop the jury from giving this a site of the day: (1) every "hero device" is a CSS-and-emoji placeholder where a real phone or technician photograph would carry the brand, (2) light-mode sections discard the brand color and revert to near-white card grids that any Tailwind starter ships with, (3) the 3D commitment the brief leans on as the differentiator is unmet at this snapshot. Land R1, R2, R3, and R10 and this is a credible SOTD submission; ship as-is and it's a strong agency-portfolio entry that wins regional awards but not the international shortlist.
