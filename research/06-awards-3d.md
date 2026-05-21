# Awards & 3D Tear-Down — Visual Bar for CoboPhone Rebuild

Subagent: R6
Date: 2026-05-21
Scope: Pitch-quality reference deck of award-winning tech, product, and 3D web sites that should set the visual and interactive bar for the cobophone.es rebuild.

---

## 1. Site-by-site tear-downs

### 1.1 Apple — iPhone 17 Pro
URL: https://www.apple.com/iphone-17-pro/
What they make: Flagship smartphone product page. The gold standard.

- Palette: near-pure white and near-pure black canvas, with one device-finish color (cosmic orange) carrying the entire emotional payload of the page. No second accent.
- Type: San Francisco family. Display weights are large and confident; body weight is light. Hierarchy comes from size and weight, never color.
- Hero: video-as-hero cycling product angles in cosmic orange, with a single Buy CTA. No headline gymnastics.
- Interactive: 3D product viewer (orbit / inspect aluminum unibody, vapor chamber, ceramic shield), AR "view in your space." Scroll triggers section-by-section reveals; transitions are calm, not pyrotechnic.
- Awwwards-grade vs restraint: this is restraint as a flex. The product is the show. No parallax overload, no color-cycle-on-scroll, no diagonal scroll, no marquee. The 3D and AR are technical, not decorative.
- Informs CoboPhone: the hero should let the device do the talking — one finish color, generous black/white canvas, one CTA, restraint over flourish.

### 1.2 Nothing
URL: https://nothing.tech
What they make: Transparent-material consumer electronics (phones, headphones).

- Palette: monochrome — bright white, deep black, with product imagery doing the color work. Minimal brand color.
- Type: Nothing's proprietary dot-matrix glyph display ethos bleeds into the marketing site — clean sans-serif body, oversized hierarchical headings, lots of negative space.
- Hero: campaign photography (e.g. Charli xcx Headphone (a) endurance test by Aidan Zamiri) shot in minimalist setups. Product isolated against neutral ground.
- Interactive: discover-grid of products with hover affordances. The "Glyph" dot-matrix motif is the signature visual language — it appears as notification light on hardware and as a UI vocabulary in the marketing surface.
- Awwwards-grade vs restraint: their flex is the constraint itself. Limited color, generous whitespace, transparent-material photography. No animation theatrics needed.
- Informs CoboPhone: a signature visual motif (for them: dot-matrix glyph) is worth more than ten micro-interactions. CoboPhone needs its own — a single repeating motif tied to refurbishment (grading dots, condition bars, certification chevron).

### 1.3 Linear
URL: https://linear.app
What they make: Project management for software teams. App-tier polish reference.

- Palette: neutral white/gray foundation with blue UI accents and CDN-served gradient hero imagery (the `f=auto` image endpoints suggest sophisticated baked-in gradient meshes).
- Type: large bold display headlines, monospace for code snippets (HomeScreen.tsx) to signal developer credibility.
- Hero: bold positioning headline ("The product development system for teams and agents") with two CTAs. Below: five-section vertical narrative — hero, three-pillar features, workflow demos, social proof, changelog/CTA.
- Interactive: live state transitions ("Todo → In Progress"), avatar updates with temporal markers ("2 min ago"), progressive disclosure inside contained cards. Polish through information architecture and interaction authenticity rather than geometric flourishes.
- Awwwards-grade vs restraint: extremely restrained. No magnetic cursor, no marquee, no scroll-jacking. The polish is in spacing consistency, timing of state transitions, and authentic-looking embedded demos.
- Informs CoboPhone: embed real-looking certification states (the 31 control points, the diagnostic checks) as live mini-demos. Treat trust signals as interaction, not as a static badge wall.

### 1.4 Vercel
URL: https://vercel.com
What they make: Frontend deployment platform.

- Palette: high-contrast black/white with selective accent gradients; theme switcher (system/light/dark) is first-class.
- Hero: animated globe visualization — nodes pulse to indicate edge activity. Performance metrics as proof ("build times went from 7m to 40s," "95% reduction in page load").
- Interactive: light/dark mode parity is taken seriously — every card has a dark and light variant rendered as if both were the primary design.
- Awwwards-grade vs restraint: the globe pulse is the only "showy" element; everything else is metric-driven storytelling.
- Informs CoboPhone: if we ship a 3D hero element, it must be tied to something real (Vercel's globe shows actual edge activity). CoboPhone's hero device should feel like it's *the* device for sale, not generic stock.

### 1.5 Stripe
URL: https://stripe.com (and /en-es)
What they make: Payments infrastructure. Credibility-through-design benchmark.

- Palette: signature Stripe indigo `#635BFF` family; wave-mesh gradient (the famous animated wave) as hero backdrop. Wave fallback PNG (`wave-fallback-desktop.png`) ships for low-power devices.
- Type: Söhne (custom) and Inter — geometric, modern, readable at every scale. Used with disciplined hierarchy.
- Hero: animated wave gradient + headline "Financial infrastructure to grow your revenue" + quantified credibility ("$1.9tn payments volume," "99.999% uptime," "50% of Fortune 100 companies").
- Interactive: SVG wave animates continuously but slowly; carousel and accordion product reveals scroll-triggered.
- Awwwards-grade vs restraint: the wave is iconic — one signature motion element carries the entire visual identity. Everything else is type and proof.
- Informs CoboPhone: pick one signature ambient motion (for Stripe: the wave) and let it carry the brand. Don't ship five competing animations.

### 1.6 Framer
URL: https://www.framer.com
What they make: AI-assisted site builder.

- Palette: dark-mode dominant; accent example `#35E2EB` (Holo Shader feature tint).
- Hero: "Build better sites, faster" with dual CTAs ("Start for free" / "Start with AI") — note the AI primary positioning.
- Interactive: feature sections (AI, Design, CMS, Collaborate) with expandable previews; the site itself is the showcase for what you can build in Framer.
- Informs CoboPhone: dual-CTA pattern is worth borrowing (e.g. "Browse phones" / "Sell yours"). Dark-mode-by-default is risky for e-commerce — most refurb shoppers expect a bright, trustworthy white surface.

### 1.7 Spline
URL: https://spline.design
What they make: Browser-based 3D design tool.

- Hero: interactive 3D viewer with "Drag with two fingers to orbit" affordance — the hero is the product.
- Templates shown: interactive websites, 3D product mockups (notably iPhone renders), animated characters, 3D logos, industrial visualizations.
- Tech: production-ready real-time 3D embed via their viewer component (`@splinetool/react-spline`).
- Informs CoboPhone: Spline is a credible path to the hero 3D phone — no need to hand-roll Three.js scene graph for a single product reveal. Export from Spline, embed via React.

### 1.8 Back Market ES
URL: https://www.backmarket.es
What they make: Spanish-language refurb e-commerce leader. Direct category benchmark.

- Hero copy: *"Donde el mundo compra tecnología reacondicionada"* — immediate value prop, then four trust signals (expert reconditioning, "up to 100 control points," 30-day trial, 2-year warranty).
- Palette: minimalist white background, black text, accent colors on price tags. The famous Back Market green is restrained on the ES home — used for sustainability framing, not as a dominant brand fill.
- Type: clean hierarchical sans-serif. Big category headers, tight product cards.
- Trust signal stack (this is the playbook): rating with count `4,4/5 (82.942)`, condition grade ("Prémium," "Excellent"), `2 años de garantía`, `Ahorra 22,00 €`, `Último precio más bajo`, `Bajada de precio` tags.
- Product card surface: storage option, condition grade, SIM compatibility (`SIM física + eSIM`), rating aggregate.
- Informs CoboPhone: this is the de-facto credibility pattern in our market. The four-pillar trust strip near the hero is non-negotiable. Condition grades must be a first-class visual element, not a footnote.

### 1.9 Awwwards — recent Sites of the Month
URL: https://www.awwwards.com/awards-of-the-month/

- **Oryzo AI** — Lusion — Apr 2026 SOTM + Developer Award. AI platform; Lusion's signature WebGL polish.
- **GQ & AP The Extraordinary Lab** — Immersive Garden — Mar 2026 SOTM + Developer Award. Editorial/experiential.
- **The Renaissance Edition** — Shopify Design — Feb 2026 SOTM + Developer Award + Business & Services Honors. E-commerce editorial — most directly relevant to CoboPhone.
- **Bruno's Portfolio** — Bruno Simon — Jan 2026 SOTM + Developer Award + Portfolio Honors. Drive-a-car 3D portfolio.
- **MindMarket** — Louis Paquet — Dec 2025 SOTM + Developer Award. Marketplace.

### 1.10 Bruno Simon
URL: https://bruno-simon.com
What it is: Portfolio rendered as a drivable 3D city. Three.js + TSL (works in WebGL and WebGPU) + Rapier physics + Howler audio. MIT-licensed source.
- Why it's award-tier: navigation is a metaphor, not a menu. Hidden achievements reward exploration. Cross-input support (mouse, mobile, gamepad).
- Informs CoboPhone: this is the wrong direction for a refurb shop (commerce needs clarity, not exploration), but the lesson is that *one* signature interactive moment beats ten generic ones.

### 1.11 Lusion
URL: https://lusion.co
- Scroll-activated narrative with layered reveals. Custom brand worlds per project, not a templated portfolio.
- Informs CoboPhone: tailored per surface — landing, product, sell-your-phone flow should each have their own visual register, not the same hero/grid/grid/footer stamp.

### 1.12 Immersive Garden
URL: https://www.immersive-g.com
- Heritage-brand clients (Cartier, Louis Vuitton, Dior, Longines). Restrained dark palette, high-contrast white type, editorial motion.
- Verbs in their case-study labels: *Step into, Dive into, Explore* — spatial metaphors.
- Informs CoboPhone: language matters. "Examina el dispositivo" beats "Ver detalles."

### 1.13 Codrops references

**80s Business Tech / Shader.se WebGPU scroll pipeline** — https://tympanus.net/codrops/2026/05/19/80s-business-tech-seamless-scene-transitions-inside-shader-ses-scroll-driven-webgpu-pipeline/
- Page-section config array tracks scroll position; off-screen sections skip *all* GPU work.
- Scenes render in reverse order via FBO chain; next scene's output feeds the current scene as an input texture.
- "Render offset" pre-renders each scene slightly before it enters view — zero-glitch transitions.
- Two transition modes: screen-space sampling (geometry-agnostic 2D reveals) and frustum-matched plane (camera physically aligns to a 3D surface like a monitor).
- For CoboPhone: this is exactly the pattern for a hero phone that transforms between condition states (new → graded → certified → boxed) without seams.

**GSAP gravity mouse trail** — https://tympanus.net/codrops/2026/05/20/made-with-gsap-building-a-fun-gravity-based-mouse-trail/
- Timeline-based sequencing with `'<'` for simultaneous tweens. Dynamic easing (bounce intensity scales with drop height): `'back.in(' + (1.5 + (1 - y/H)) + ')'`.
- For CoboPhone: too playful for a refurb shop globally, but works as a small flourish on a 404 page or a single delight moment (e.g. tapping the device drops a "condition score" badge with physics).

**HTML-in-Canvas proposal** — https://tympanus.net/codrops/2026/05/13/exploring-the-html-in-canvas-proposal/
- Emerging spec for rendering live HTML inside `<canvas>`. Worth watching, not yet ready to ship.

---

## 2. Five patterns to ADOPT

1. **Single signature ambient motion.** Stripe has the wave. Nothing has the glyph. Apple has the device finish itself. CoboPhone needs *one* recurring visual signature — recommend a slow, subtle dot-matrix or grading-bar motif tied to the 31-point inspection.
2. **Scroll-tied 3D device transformation, not rotation-for-its-own-sake.** Apple's product viewer changes *what you see inside the phone* (vapor chamber, unibody, ceramic shield) — borrow that pattern but tie it to refurb states: arrived → diagnosed → graded → certified → shipped. Codrops' scroll-driven WebGPU FBO chain is the technical reference.
3. **Trust-signal strip immediately under the hero.** Back Market's four pillars (control points, trial period, warranty, expert grading) is the proven Spanish-market pattern. Non-negotiable.
4. **Type-first hierarchy with one device finish color carrying the emotion.** Apple's restraint with cosmic orange. No second accent.
5. **Live, authentic-feeling demos for trust.** Linear shows real state transitions. CoboPhone should show a real-looking diagnostic check running (battery health %, screen test, port test) as a mini-interactive, not as a static checklist.

## 3. Five patterns to AVOID

1. **Scroll-jacking and forced scroll speed.** Awwwards-tier sites used to do this; the current cohort doesn't. Apple, Linear, Stripe all respect the user's scroll velocity. Don't fight the wheel.
2. **Decorative WebGL that doesn't tie to product reality.** A generic floating geometry hero says "agency tried hard," not "trust this refurb shop with €700." Vercel's globe pulses because it *means* something — apply the same standard.
3. **Magnetic cursor everywhere.** It's an agency tic. Use it once, on the primary CTA, or not at all.
4. **Marquee text bands.** Reads as Webflow-template-2023. Skip unless we're doing a deliberately editorial section with real reason (e.g. a press-mentions strip — and even then, prefer a static logo wall).
5. **Dark mode by default for a refurb e-commerce surface.** Framer can pull it off because they sell to designers. Refurb buyers expect bright, trustworthy white. Offer dark mode, don't default to it.

## 4. CoboPhone home-hero 3D scene — recommendation

A single, photoreal iPhone (the actual current best-seller SKU in our catalog, swappable via CMS) floats centered on a near-white canvas with the slightest off-white floor reflection. The device is in our brand accent finish for the season (one color, e.g. titanium graphite or a refurbishment-themed muted green-grey). At rest, it rotates 6 degrees on a slow ambient loop — barely perceptible, just enough to make it feel alive. On hover/touch, it responds to cursor with a subtle parallax tilt (max 10 degrees, eased). Behind the device, a sparse dot-matrix grid (our signature motif, evoking the 31-point inspection) pulses one row at a time on a 4-second loop. No floating text labels, no orbital UI rings, no particle systems. Built in Spline, exported, embedded via `@splinetool/react-spline` with a static high-quality fallback image preloaded for LCP. The scene must hit LCP under 2.5s on a mid-range Android — if it doesn't, the static image ships and the 3D hydrates after.

## 5. Scroll choreography — recommendation

Five vertical acts, each with one clear job. Act 1 (hero): the device, the headline, the dual CTA, the four-pillar trust strip. Act 2 (the inspection): scroll triggers the device to "open up" — Codrops' FBO-chain pattern — revealing the 31 inspection points as a live, ticking diagnostic running on the device's screen (battery 94%, screen OK, ports OK, etc.). Act 3 (the grades): the device fades to a clean studio shot, and three condition tiers (Excelente / Muy Bueno / Bueno) slide in horizontally with real pricing deltas — no scroll-jack, just an IntersectionObserver-triggered reveal. Act 4 (proof): rating count, warranty months, customers served, all as large kinetic numbers that count up once on entry; below, a quiet row of press logos. Act 5 (action): a final wide CTA section, the device returning small and centered, with "Find your iPhone" leading to the catalog. Each act lives in its own viewport; transitions are tied to scroll position, not scroll speed; nothing locks the user. Total scroll length: roughly 4-5 viewports — short enough to consume in one session, long enough to earn trust.

## 6. Motion-restraint principle

Every motion on this site must answer one of three questions: does it clarify what's happening (state change, progress, navigation), does it reinforce the brand's single signature motion (the dot-matrix pulse), or does it sell the product (the device tilting in response to the cursor, the diagnostic running on its screen). If a motion doesn't do one of those three things, it doesn't ship. Awwwards-tier in 2026 is no longer about how much moves — Apple, Linear, Stripe, and the current Awwwards SOTM cohort all proved that. It's about how purposeful each frame of motion feels. The fastest way for cobophone.es to read as "agency tried hard, brand doesn't trust the product" is to add a magnetic cursor, a marquee, and a parallax scroll on top of the 3D hero. The fastest way to read as Apple-adjacent is to ship one breathtaking moment (the scroll-tied device transformation) and let everything else be still, typographic, and confident.
