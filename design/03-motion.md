# 03 — Motion system

> One signature ambient motion + max three purposeful moments per page. That is the budget.

## Easing

```
--ease-out-expo:    cubic-bezier(0.16, 1, 0.3, 1)    // hero reveals, big moves
--ease-out-quart:   cubic-bezier(0.25, 1, 0.5, 1)    // section entries
--ease-in-out-soft: cubic-bezier(0.65, 0, 0.35, 1)   // bidirectional state changes
```

Default for everything: `--ease-out-expo`. The other two are exceptions, not defaults.

## Durations

```
--duration-micro:  150ms   // hover/focus states, micro-interactions
--duration-fast:   300ms   // small element entries
--duration-normal: 500ms   // section reveals, panel slides
--duration-slow:   800ms   // large composition shifts
--duration-hero:   1200ms  // home-hero choreography, page intros
```

## The 5 motion archetypes

1. **Entry** — element fades in + translates 8px upward over 500ms ease-out-expo. Stagger: 60ms between siblings in a list.
2. **Hover** — color/border tint change over 150ms; transform on lift (scale 1.0 → 1.02) only on cards, not buttons.
3. **Press** — scale 0.98 over 100ms ease-in-out-soft, return on release.
4. **Reveal** — used for the home hero phone-disassemble: scroll-tied with GSAP ScrollTrigger driving R3F state. Always pinned with scrub:true so motion ties 1:1 to scroll.
5. **Counter** — IntersectionObserver-triggered count-up over 1500ms ease-out-quart, ONCE per session. (Fixes the current site's broken counter.)

## Properties allowed

Only compositor-friendly:
- `transform` (translate, scale, rotate)
- `opacity`
- `clip-path` (sparingly — perf-test before shipping)
- `filter` (very sparingly — never on scroll)

**Banned:** `width`, `height`, `top`, `left`, `margin`, `padding`, `border`, `font-size`, `box-shadow` (use a layered pseudo-element if shadow must animate).

## Scroll behavior

- **Lenis** for smooth scroll. Default linear-ish easing. Disabled on touch devices (native momentum wins on mobile).
- **GSAP ScrollTrigger** for scroll-tied scenes only on the home page and the /sobre-nosotros timeline.
- **IntersectionObserver** for section entries everywhere else. Cheap, native, never blocks the main thread.
- **No parallax on text.** Ever. Parallax is acceptable only on decorative background imagery, max 10% movement range.

## The five sanctioned motion moments

Per the brief and reinforced by R6 research:

1. **Home hero — scroll-tied 3D phone disassemble/reassemble.** Tied 1:1 to scroll progress 0–50%. Fades out by 60%.
2. **Quote-tool brand select — 3D brand phone rotate-in.** ~1.5s entry, then idle hold for 1.5s, then dissolve to next step.
3. **Per-service hero — small 3D repair animation.** Plays once on mount; loops idle very slowly (1 rotation every 30s).
4. **Sobre-nosotros timeline — scroll-tied phone-history reveal.** Each era's phone hits a "snap" moment as it crosses the viewport center.
5. **Mayoristas hero — supply-chain visualization.** Boxes flow from Asia/Europe through Cobo Calleja node, distributing to Spain. ~10s loop.

Everywhere else: no R3F canvas, no scroll-tied animation, only the 5 archetypes above.

## Reduced motion

Tokens collapse all durations to 1ms. Effects:
- All `transition` and `animation` durations effectively become instant
- 3D scenes are replaced with the static first-frame PNG
- Scroll-tied animations are disabled — ScrollTrigger reads the reduced-motion flag and skips
- Counter animations show the final number immediately
- Page transitions become cross-fade-only (Framer Motion `AnimatePresence` with `transition={{ duration: 0 }}`)

## Page transitions

- Subtle. Cross-fade body content over 200ms. No translate, no scale.
- Navigation chrome (header, footer) does NOT re-mount on locale or page changes.
- Loading states use the `<Skeleton>` component, not spinners. Skeletons match the actual content's shape.

## Hover micro-interactions worth budget

- **Primary CTA:** background tint shift + 1px translate up + faint shadow lift
- **Card:** hairline border tint + 2px translate up + shadow elevation step (card → elevated)
- **Link:** underline animates from left to right over 250ms; arrow icon translates +4px on hover
- **Logo grid item:** logo gains 100% opacity (rest at 80%) + 1.02 scale
- **Repair-type icon row:** icon background fills with `paper` color

## Anti-patterns (banned)

- Marquee scrollers
- Magnetic cursor (acceptable on desktop only for hero CTAs, never elsewhere — and only if the cursor follow distance is <8px)
- Hover-triggered video previews
- Background-image parallax with translate range >10%
- "Sticky" sections that pin-and-trap the user
- Page transitions that delay LCP > 100ms
- Looping rotate animations on logos (Apple does not do this — neither do we)
- Cursor-trail particle effects
- Auto-playing videos with sound

## Performance constraints (hard)

- Sustained 60fps in every animation. If a section dips, simplify it.
- No animation may run more than 5 simultaneous property changes on the same element.
- No section may animate on page-load for >1.2s.
- GPU-acceleration via `will-change` only during the animation; remove on completion.
- Test every scroll-tied animation on a throttled Pixel 4a (or equivalent).
