'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { Heart, Car, Wind, Wrench, Sparkles, Phone, Calendar } from 'lucide-react';

/**
 * Phone Journey — a 5-act scroll-tied brand story.
 *
 * Sequence (acts map directly to scroll progress 0 → 1):
 *   00 – 20%  PANIC      Phone falls, screen cracks
 *   20 – 40%  TEARS      Heart breaks, tears trail
 *   40 – 60%  CHASE      Car drive with dust + speed lines
 *   60 – 80%  ARRIVAL    Reaches the workshop
 *   80 – 100% REPAIRED   Pristine phone, sparkles
 *
 * Implementation notes:
 * - Section height is 280vh (was 500vh) — tighter scroll budget, no dead-zone.
 * - Opacity transitions use **narrow** swap bands (3-4% wide) so two acts never
 *   linger together in low-opacity limbo. Crisp swaps, no dark gaps.
 * - Visual density bumped per act: more layered elements, more motion vectors.
 * - The "Esto pasa cada 40 min" footer line was removed — confused users into
 *   thinking the journey had ended.
 * - prefers-reduced-motion → static before/after fallback.
 */
export function PhoneJourney() {
  const ref = useRef<HTMLElement | null>(null);
  const reduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end end']
  });

  // Each act gets exactly 20% of scroll progress. Transitions are 3% wide.
  const panic    = useTransform(scrollYProgress, [0.00, 0.02, 0.17, 0.20], [0, 1, 1, 0]);
  const tears    = useTransform(scrollYProgress, [0.18, 0.22, 0.37, 0.40], [0, 1, 1, 0]);
  const chase    = useTransform(scrollYProgress, [0.38, 0.42, 0.57, 0.60], [0, 1, 1, 0]);
  const arrival  = useTransform(scrollYProgress, [0.58, 0.62, 0.77, 0.80], [0, 1, 1, 0]);
  const repaired = useTransform(scrollYProgress, [0.78, 0.82, 1.00],       [0, 1, 1]);

  // Phone falls + rotates in act 1
  const phoneY       = useTransform(scrollYProgress, [0,    0.16, 0.20], [-60, 240, 260]);
  const phoneRotate  = useTransform(scrollYProgress, [0,    0.16],       [-8, 28]);
  const crackOpacity = useTransform(scrollYProgress, [0.13, 0.18],       [0, 1]);

  // Car drive runs across the screen during act 3
  const carX   = useTransform(scrollYProgress, [0.42, 0.58], ['-110%', '120%']);
  const dustOp = useTransform(scrollYProgress, [0.44, 0.50, 0.58], [0, 1, 0]);

  // Tears trail in act 2
  const tearsY = useTransform(scrollYProgress, [0.22, 0.38], [0, 60]);

  // Final phone rises into frame in act 5
  const finalPhoneY = useTransform(scrollYProgress, [0.82, 1.00], [80, 0]);
  const sparkleOp   = useTransform(scrollYProgress, [0.88, 1.00], [0, 1]);

  // Progress indicator
  const progressBar = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);
  const actNumber   = useTransform(scrollYProgress, [0, 0.20, 0.40, 0.60, 0.80, 1.0], [1, 1, 2, 3, 4, 5]);

  if (reduced) {
    return <PhoneJourneyStatic />;
  }

  return (
    <section
      ref={ref}
      className="relative h-[280vh] bg-shadow-blue-deep text-white"
      aria-labelledby="journey-heading"
      data-surface="dark"
    >
      <h2 id="journey-heading" className="sr-only">El camino de tu móvil: de roto a reparado en 40 minutos.</h2>

      {/* Sticky stage */}
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* Background motifs */}
        <div className="absolute inset-0 dot-grid opacity-25" aria-hidden />
        <div className="absolute top-[-25%] right-[-15%] w-[700px] h-[700px] rounded-full bg-brand-primary/20 blur-[140px] pointer-events-none" aria-hidden />
        <div className="absolute bottom-[-25%] left-[-15%] w-[600px] h-[600px] rounded-full bg-brand-secondary/15 blur-[140px] pointer-events-none" aria-hidden />

        {/* Header + progress (always on) */}
        <div className="absolute top-24 left-0 right-0 z-30 px-6 lg:px-12">
          <div className="container-fluid">
            <div className="flex items-center justify-between mb-4">
              <div className="inline-flex items-center gap-2 text-xs text-brand-secondary uppercase tracking-widest">
                <span className="w-8 h-px bg-brand-secondary" aria-hidden />
                Tu móvil, hora a hora
              </div>
              <motion.span className="font-mono text-xs text-ink-300 uppercase tracking-widest">
                Acto <motion.span className="text-brand-secondary tabular-nums">{actNumber}</motion.span> / 5
              </motion.span>
            </div>
            <h3 className="text-2xl lg:text-4xl font-bold text-white text-balance max-w-3xl">
              De roto a como nuevo.<br className="hidden sm:inline" />En menos de lo que tardas en comer.
            </h3>
            <div className="mt-4 h-1 w-40 bg-white/10 rounded-full overflow-hidden">
              <motion.div className="h-full bg-brand-secondary" style={{ width: progressBar }} />
            </div>
          </div>
        </div>

        {/* ── ACT 1 — PANIC ───────────────────────────────────────────── */}
        <motion.div className="absolute inset-0 flex items-center justify-center" style={{ opacity: panic }}>
          <ActChrome label="01 · Pánico" caption="Tu móvil se cae al suelo. La pantalla se raja." accentColor="text-brand-secondary" />
          <motion.div className="relative" style={{ y: phoneY, rotate: phoneRotate }}>
            <PhoneSvg />
            <motion.div className="absolute inset-0" style={{ opacity: crackOpacity }}>
              <CrackOverlay />
            </motion.div>
          </motion.div>
          {/* Floor shadow */}
          <div className="absolute bottom-[18%] left-1/2 -translate-x-1/2 w-56 h-3 bg-black/50 blur-xl rounded-full" aria-hidden />
          {/* Impact ring */}
          <motion.div
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full border-2 border-brand-secondary/40"
            animate={{ scale: [1, 2.2, 2.4], opacity: [0.8, 0, 0] }}
            transition={{ duration: 1.4, repeat: Infinity, ease: 'easeOut' }}
            aria-hidden
          />
        </motion.div>

        {/* ── ACT 2 — TEARS ───────────────────────────────────────────── */}
        <motion.div className="absolute inset-0 flex items-center justify-center" style={{ opacity: tears }}>
          <ActChrome label="02 · Lágrimas" caption="Tus fotos, tu trabajo, tu vida. Pánico real." accentColor="text-brand-secondary" />
          <div className="relative flex flex-col items-center">
            <motion.div
              animate={{ scale: [1, 1.08, 1] }}
              transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
              className="relative w-44 h-44 rounded-full bg-brand-secondary/15 flex items-center justify-center ring-4 ring-brand-secondary/25"
            >
              <Heart size={88} className="text-brand-secondary drop-shadow-lg" fill="currentColor" />
              {/* Crack across heart */}
              <svg className="absolute inset-0 m-auto" width="120" height="180" viewBox="0 0 120 180" aria-hidden>
                <path d="M60 25 L52 55 L66 75 L48 100 L62 125 L50 155" stroke="#1A0E32" strokeWidth="5" fill="none" strokeLinecap="round" />
              </svg>
            </motion.div>
            {/* Tears trail */}
            <motion.div className="absolute top-44 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1" style={{ y: tearsY }}>
              {[0, 1, 2, 3].map(i => (
                <motion.div
                  key={i}
                  className="w-2.5 h-3.5 bg-brand-primary rounded-full"
                  style={{ clipPath: 'polygon(50% 0, 100% 100%, 0 100%)' }}
                  animate={{ opacity: [0, 1, 0], y: [0, 50, 100] }}
                  transition={{ duration: 1.6, repeat: Infinity, delay: i * 0.35, ease: 'easeIn' }}
                />
              ))}
            </motion.div>
          </div>
        </motion.div>

        {/* ── ACT 3 — CHASE ───────────────────────────────────────────── */}
        <motion.div className="absolute inset-0 flex items-center justify-center overflow-hidden" style={{ opacity: chase }}>
          <ActChrome label="03 · Carrera" caption="Por la M-506 a toda velocidad. Dirección Cobo Calleja." accentColor="text-brand-secondary" />

          {/* Road horizon */}
          <div className="absolute left-0 right-0 bottom-[32%] h-px bg-white/30">
            {/* Animated dashes */}
            <motion.div
              className="absolute inset-y-0 left-0 right-0 flex items-center"
              animate={{ x: ['0%', '-50%'] }}
              transition={{ duration: 0.5, repeat: Infinity, ease: 'linear' }}
            >
              {Array.from({ length: 24 }).map((_, i) => (
                <span key={i} className="block w-10 h-1 bg-brand-secondary mx-3 shrink-0 rounded-full" />
              ))}
            </motion.div>
          </div>

          {/* Buildings silhouette */}
          <div className="absolute inset-x-0 bottom-[32%] h-[35%] pointer-events-none" aria-hidden>
            <motion.div className="absolute inset-0 flex items-end" animate={{ x: ['0%', '-30%'] }} transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}>
              {Array.from({ length: 12 }).map((_, i) => (
                <div key={i} className="shrink-0 mr-8" style={{ height: `${40 + (i * 13) % 80}%`, width: `${50 + (i * 7) % 30}px`, background: 'rgba(255,255,255,0.05)' }} />
              ))}
            </motion.div>
          </div>

          {/* Passing cars on the side */}
          <motion.div
            className="absolute top-[40%] right-0 flex gap-16 items-center text-white/40"
            animate={{ x: ['10%', '-200%'] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: 'linear' }}
            aria-hidden
          >
            {Array.from({ length: 6 }).map((_, i) => (
              <Car key={i} size={32} fill="currentColor" />
            ))}
          </motion.div>

          {/* The hero car */}
          <motion.div className="absolute bottom-[32%] left-0 translate-y-1/2" style={{ x: carX }}>
            <div className="relative">
              {/* Dust trail */}
              <motion.div className="absolute -left-44 bottom-0 flex gap-2" style={{ opacity: dustOp }}>
                {[0.5, 0.8, 1.0, 0.8, 0.5, 0.3].map((opacity, i) => (
                  <motion.div
                    key={i}
                    className="w-12 h-12 rounded-full bg-white/50 blur-lg"
                    style={{ opacity }}
                    animate={{ scale: [0.4, 1.4, 1.1], y: [10, -15, -25] }}
                    transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.08, ease: 'easeOut' }}
                  />
                ))}
              </motion.div>
              <Car size={120} className="text-brand-secondary drop-shadow-2xl" strokeWidth={1.5} fill="currentColor" />
              {/* Speed lines */}
              <motion.div className="absolute -right-24 top-1/2 -translate-y-1/2 flex flex-col gap-2">
                {[0, 1, 2].map(i => (
                  <motion.span
                    key={i}
                    className="block h-0.5 bg-gradient-to-r from-transparent to-white/70 rounded-full"
                    style={{ width: 32 + i * 12 }}
                    animate={{ opacity: [0.2, 0.8, 0.2], x: [0, -8, 0] }}
                    transition={{ duration: 0.35, repeat: Infinity, delay: i * 0.08 }}
                  />
                ))}
              </motion.div>
            </div>
          </motion.div>
        </motion.div>

        {/* ── ACT 4 — ARRIVAL ─────────────────────────────────────────── */}
        <motion.div className="absolute inset-0 flex items-center justify-center" style={{ opacity: arrival }}>
          <ActChrome label="04 · Llegada" caption="Calle Bembibre 5. Marco te recibe en la puerta." accentColor="text-brand-secondary" />
          <div className="relative flex flex-col items-center">
            {/* Shop facade */}
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="relative w-[340px] sm:w-[420px] bg-shadow-blue rounded-t-3xl ring-1 ring-white/10 shadow-[0_30px_80px_rgba(0,0,0,0.5)] overflow-hidden"
            >
              {/* Awning */}
              <div className="bg-gradient-to-r from-brand-primary via-brand-primary-active to-brand-primary text-white text-center py-3 font-bold tracking-tight text-lg">
                CoboPhone
              </div>
              {/* Display window */}
              <div className="p-6 bg-shadow-blue-deep">
                <div className="aspect-[4/3] rounded-2xl bg-gradient-to-br from-brand-primary/15 to-shadow-blue ring-1 ring-white/10 flex flex-col items-center justify-center">
                  <Wrench size={56} className="text-brand-secondary mb-2" />
                  <p className="font-mono text-xs text-ink-700 uppercase tracking-widest">Abierto</p>
                  <p className="font-mono text-[10px] text-ink-500 uppercase tracking-widest mt-0.5">Reparación · 40 min</p>
                </div>
              </div>
              {/* Door */}
              <div className="bg-shadow-blue-deep px-6 pb-6">
                <motion.div
                  animate={{ rotateY: [-12, 6, -12] }}
                  transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
                  style={{ transformOrigin: 'left' }}
                  className="h-16 rounded-xl bg-brand-primary/20 ring-1 ring-brand-primary/40 flex items-center justify-center text-xs font-mono text-white uppercase tracking-widest"
                >
                  Pasa, te recibimos →
                </motion.div>
              </div>
            </motion.div>
            {/* Ground line */}
            <div className="w-[420px] h-px bg-white/20 -mt-px" />
            <div className="absolute -bottom-4 w-[300px] h-6 bg-black/40 blur-xl rounded-full" aria-hidden />
          </div>
        </motion.div>

        {/* ── ACT 5 — REPAIRED ────────────────────────────────────────── */}
        <motion.div className="absolute inset-0 flex items-center justify-center" style={{ opacity: repaired }}>
          <ActChrome label="05 · Reparado" caption="40 minutos después. Como nuevo. 3 meses de garantía." accentColor="text-brand-accent" />
          <motion.div className="relative" style={{ y: finalPhoneY }}>
            <PhoneSvg pristine />
            {/* Sparkles around the phone */}
            <motion.div className="absolute inset-0 pointer-events-none" style={{ opacity: sparkleOp }}>
              {[
                { top: '-10%', left: '-12%' },
                { top: '15%', right: '-14%' },
                { bottom: '20%', left: '-10%' },
                { bottom: '-2%', right: '-8%' },
                { top: '45%', left: '50%', transform: 'translate(-50%, 0)' }
              ].map((pos, i) => (
                <motion.div
                  key={i}
                  className="absolute"
                  style={pos}
                  animate={{ scale: [0, 1.3, 0], rotate: [0, 240, 360] }}
                  transition={{ duration: 2.2, repeat: Infinity, delay: i * 0.35, ease: 'easeInOut' }}
                >
                  <Sparkles size={28} className="text-brand-secondary drop-shadow-lg" />
                </motion.div>
              ))}
            </motion.div>
            {/* "Recogido" stamp */}
            <motion.div
              className="absolute -right-8 top-0 -rotate-12 bg-brand-accent text-shadow-blue-deep font-bold text-xs uppercase tracking-widest px-3 py-1.5 rounded-md ring-2 ring-brand-accent/40"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.3, type: 'spring', stiffness: 200 }}
            >
              Recogido ✓
            </motion.div>
          </motion.div>

          {/* Stats below phone */}
          <motion.div
            className="absolute bottom-[22%] left-1/2 -translate-x-1/2 flex flex-wrap items-center justify-center gap-3 lg:gap-4"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <Pill icon={<Calendar size={12} />} text="40 min" />
            <Pill icon={<Wrench size={12} />} text="3 meses garantía" />
            <Pill icon={<Phone size={12} />} text="Diagnóstico gratis" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

// ── Sub-components ─────────────────────────────────────────────────

function ActChrome({ label, caption, accentColor = 'text-brand-secondary' }: { label: string; caption: string; accentColor?: string }) {
  return (
    <div className="absolute bottom-[10%] left-0 right-0 px-6 z-20">
      <div className="container-fluid text-center">
        <p className={`font-mono text-xs uppercase tracking-[0.3em] ${accentColor}`}>{label}</p>
        <p className="mt-3 text-xl lg:text-2xl text-white max-w-2xl mx-auto text-balance font-medium">{caption}</p>
      </div>
    </div>
  );
}

function Pill({ icon, text }: { icon: React.ReactNode; text: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 ring-1 ring-white/20 backdrop-blur-sm text-sm text-white font-medium">
      <span className="text-brand-accent">{icon}</span>
      {text}
    </span>
  );
}

function PhoneSvg({ pristine = false }: { pristine?: boolean }) {
  return (
    <svg width="200" height="360" viewBox="0 0 200 360" className="drop-shadow-2xl">
      <defs>
        <linearGradient id="phone-screen" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={pristine ? '#3B1E80' : '#1A2740'} />
          <stop offset="100%" stopColor={pristine ? '#1A0B4D' : '#0A1430'} />
        </linearGradient>
        <linearGradient id="phone-frame" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#3A4660" />
          <stop offset="100%" stopColor="#1A2438" />
        </linearGradient>
      </defs>
      <rect x="2" y="2" width="196" height="356" rx="36" fill="url(#phone-frame)" stroke="rgba(255,255,255,0.15)" />
      <rect x="14" y="14" width="172" height="332" rx="26" fill="url(#phone-screen)" />
      <rect x="68" y="20" width="64" height="16" rx="8" fill="#000" />
      {pristine && (
        <>
          <rect x="32" y="60" width="136" height="10" rx="5" fill="rgba(255,255,255,0.4)" />
          <rect x="32" y="82" width="92" height="8" rx="4" fill="rgba(255,255,255,0.25)" />
          <rect x="32" y="130" width="136" height="48" rx="12" fill="#E11D8F" />
          <rect x="32" y="190" width="136" height="48" rx="12" fill="rgba(255,255,255,0.15)" />
          <rect x="32" y="252" width="136" height="48" rx="12" fill="rgba(255,255,255,0.10)" />
        </>
      )}
      <rect x="0" y="90" width="3" height="44" rx="1.5" fill="#1a2438" />
      <rect x="0" y="146" width="3" height="22" rx="1.5" fill="#1a2438" />
      <rect x="197" y="112" width="3" height="66" rx="1.5" fill="#1a2438" />
    </svg>
  );
}

function CrackOverlay() {
  return (
    <svg width="200" height="360" viewBox="0 0 200 360" className="absolute inset-0 pointer-events-none">
      <g stroke="white" strokeWidth="1.8" fill="none" strokeLinecap="round" opacity="0.95">
        <path d="M100 70 L65 115 L30 95" />
        <path d="M100 70 L138 130 L185 160" />
        <path d="M100 70 L90 180 L50 280" />
        <path d="M90 180 L145 245 L170 320" />
        <path d="M90 180 L28 250" />
        <path d="M65 115 L40 175" />
        <path d="M138 130 L175 100" />
        <path d="M138 130 L145 245" />
        <path d="M145 245 L110 310" />
      </g>
      <circle cx="100" cy="70" r="5" fill="white" />
      <circle cx="90" cy="180" r="3" fill="white" />
      <circle cx="138" cy="130" r="3" fill="white" />
    </svg>
  );
}

/** Reduced-motion fallback */
function PhoneJourneyStatic() {
  return (
    <section data-surface="dark" className="bg-shadow-blue-deep text-white py-section" aria-labelledby="journey-heading">
      <div className="container-fluid">
        <div className="max-w-2xl mb-12">
          <div className="inline-flex items-center gap-2 text-xs text-brand-secondary uppercase tracking-widest mb-3">
            <span className="w-8 h-px bg-brand-secondary" aria-hidden />Tu móvil, hora a hora
          </div>
          <h2 id="journey-heading" className="text-white text-balance">De roto a como nuevo. En menos de lo que tardas en comer.</h2>
        </div>
        <div className="grid sm:grid-cols-2 gap-px bg-white/10 rounded-2xl overflow-hidden ring-1 ring-white/10">
          <div className="bg-shadow-blue p-10 flex flex-col items-center text-center">
            <div className="relative"><PhoneSvg /><div className="absolute inset-0"><CrackOverlay /></div></div>
            <p className="mt-6 font-mono text-xs text-brand-secondary uppercase tracking-widest">Antes · 09:15</p>
            <p className="mt-2 text-lg text-balance">Pantalla rota. Tu día en pausa.</p>
          </div>
          <div className="bg-shadow-blue p-10 flex flex-col items-center text-center">
            <PhoneSvg pristine />
            <p className="mt-6 font-mono text-xs text-brand-accent uppercase tracking-widest">Después · 09:55</p>
            <p className="mt-2 text-lg text-balance">Como nuevo. 3 meses de garantía.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
