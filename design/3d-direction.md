# 3D direction (Phase 4)

> 3D is a feature, not decoration. It earns its place by communicating something the page otherwise cannot.

## Where 3D appears (and where it does NOT)

3D appears in **exactly five places.** Anywhere else: 2D, fast, no R3F canvas.

### Sanctioned moments

1. **Home hero — floating phone disassemble/reassemble**
   - A hyper-detailed phone model floats slowly in the canvas
   - As the user scrolls 0% → 30% page progress, the phone disassembles into its components (screen, battery, frame, camera module, charging port). Each part has a subtle floating label callout.
   - From 30% → 50% it reassembles
   - At 60% it fades out and the next section takes over
   - **Visual metaphor:** "We see your phone the way no one else does. We put it back together."

2. **Quote-tool brand select — brand phone rotate-in**
   - When the user selects a brand (Samsung, Apple, etc.), a minimal 3D phone in that brand's signature color rotates into the canvas
   - ~1.5s entry, holds 1.5s, dissolves to step 3
   - **Visual metaphor:** "Yes — we know your exact device."

3. **Per-service hero — small repair-animation diagram**
   - Service-specific 3D mini-scenes:
     - "Cambio de pantalla" → screen lifted off frame
     - "Cambio de batería" → battery swap with adhesive strip pull-out
     - "Conector de carga" → board-level component swap
   - Plays once on mount; idles with very slow loop (1 rotation every 30s)
   - Small canvas size (~480×360 desktop, hidden on mobile <768px — static PNG fallback)

4. **/sobre-nosotros — 20-years scroll timeline**
   - Scroll-tied 3D timeline with iconic phones from each era: Nokia 3310 → Razr → iPhone 4 → Galaxy S → iPhone X → current
   - Each era's phone "snaps" into focus as it crosses the viewport center
   - **Visual metaphor:** the brand's longevity told through devices we've actually repaired

5. **Mayoristas hero — supply-chain visualization**
   - Boxes flow in from Asia/Europe through a Cobo Calleja node, then distribute to repair shops across Spain
   - ~10s loop, restrained motion
   - **Visual metaphor:** scale of the wholesale operation, real geography, real moat

### Where 3D does NOT appear

- Navigation, footers
- Product listings / faceted-search results
- Checkout, forms
- Blog post bodies
- FAQ, legal pages
- **All mobile screens below 768px** — static high-quality renders only
- Reduced-motion users — static first-frame PNG
- Slow-network users (Save-Data header or 2g/slow-2g connection) — static fallback

## Tech stack

- **React Three Fiber (R3F)** — declarative Three.js, the default
- **@react-three/drei** — OrbitControls, Environment, useGLTF, Float, Html, Center, Lazy, etc.
- **@react-three/postprocessing** — bloom + tonemap sparingly. Bloom on a repair-shop site is a smell unless it makes the chrome of a phone look more like chrome. Test, then prune.
- **GSAP + ScrollTrigger** — for scroll-tied scene state driving R3F via Zustand
- **Lenis** — smooth scroll on desktop only
- **Theatre.js** — NOT used by default; only if a director-controlled cinematic moment is needed
- **Spline** — optional alternative for the home hero if R3F authoring time becomes prohibitive. Export `.spline`, embed via `<spline-viewer>` web component. R3F is preferred (more control, less weight).

## Performance budget (hard)

- **Max 1MB total asset weight per scene** (Draco-compressed `.glb`)
- **Max 100k triangles on-screen at once**
- **Lazy-load the canvas** — render an `<img>` placeholder until the user scrolls within 100vh
- **`dpr={[1, 2]}`** not `[1, 3]` — phones max out at 2x for our quality target
- **`gl={{ antialias: false }}`** for the quote-tool mini-scenes (small, fast)
- **`gl={{ antialias: true }}`** for the home hero only
- **`frameloop="demand"`** where the scene is mostly static
- **Suspense fallbacks** with skeleton-textured placeholder meshes
- **Test on a real mid-range Android** (Pixel 4a equivalent). If FPS dips below 50, simplify the scene.
- **Static fallback PNG** for `prefers-reduced-motion` users — render a high-quality render of the scene's hero frame

## Asset sourcing

- **Phone GLB:** Sketchfab CC-BY iPhone or Galaxy model OR primitives-only generated minimal mesh
- **Source attribution:** every asset's source URL + license logged in `/public/3d/SOURCES.md`
- **Manufacturer assets:** use only renders from manufacturer press kits, never lifted from competitor sites
- **Custom models:** if commissioned, keep `.blend` source in `/public/3d/source/` (gitignored — too large) with a NOTE on where the source lives

## Scroll choreography (home hero specifically)

Implementation pattern:

```tsx
// Pseudocode
<Canvas frameloop="demand" dpr={[1, 2]} gl={{ antialias: true }}>
  <Suspense fallback={<PlaceholderPhone />}>
    <PhoneRig />
  </Suspense>
</Canvas>

// PhoneRig reads scroll progress from Zustand (driven by GSAP ScrollTrigger pinned)
// 0.0-0.3 → disassemble
// 0.3-0.5 → reassemble
// 0.5-0.6 → fade out
```

GSAP ScrollTrigger configuration:
```ts
gsap.timeline({
  scrollTrigger: {
    trigger: '#home-hero',
    start: 'top top',
    end: '+=200%',                      // pin for 2x viewport height
    pin: true,
    scrub: true,                        // 1:1 tie to scroll, no smoothing lag
    anticipatePin: 1,
    fastScrollEnd: true,
    onUpdate: (self) => useHeroScene.setState({ progress: self.progress })
  }
})
```

Crucially: `scrub: true` and `frameloop="demand"`. The canvas re-renders only when the scene state changes, not every frame. On a static hold it costs nothing.

## Motion restraint inside each scene

Per R6's "one signature ambient motion + three purposeful moments" rule:

- The phone has ONE continuous idle motion (slow float up/down ~5px over 4s) — this is the signature ambient
- Disassemble is one purposeful moment
- Reassemble is two
- Fade-out is three

That's the budget. No additional micro-animations layered on top.

## Lighting & materials

- **HDRI environment:** drei `<Environment preset="city" />` or a custom workshop HDRI baked from a real photo
- **No procedural sky.** No floating volumetric fog. Workshop-grade studio lighting only.
- **Materials:**
  - Phone glass: `<MeshPhysicalMaterial transmission={0.9} thickness={0.5} ior={1.5} roughness={0.05} />`
  - Chassis: `<MeshStandardMaterial metalness={0.85} roughness={0.18} />`
  - Internals: matte plastics, brushed metal at low metalness, no glossy plastic

## Cursor interaction (desktop only)

- Subtle: 3px parallax of the camera following cursor with damping
- Disabled on touch and on `prefers-reduced-motion`
- No "magnetic" hover effects on the phone

## Fallback strategy

```
WebGL available + dpr ≥ 1 + viewport ≥ 768px + no reduced-motion + no save-data
   → full R3F scene
WebGL available + dpr ≥ 1 + viewport ≥ 768px + reduced-motion
   → static PNG of the hero frame
viewport < 768px OR no WebGL OR save-data
   → static PNG (higher quality, e.g. 2x retina) with light Framer Motion fade-in
```

The static PNG is generated by a build-time Playwright capture against the live scene. Source script lives in `/scripts/capture-3d-fallbacks.ts` (not built in this iteration — flag in HANDOFF.md).

## Anti-patterns

- Auto-rotating phone with no scroll tie ("decorative spinner")
- Cursor-following light with no purpose
- "Magnify on hover" tooltips during 3D
- Post-processing chromatic aberration anywhere
- Vignette so heavy the phone is hard to see
- A 3D scene that pushes the LCP element past 2.5s
