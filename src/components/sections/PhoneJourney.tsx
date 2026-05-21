'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { Smartphone, Heart, Car, Wind, Wrench, Sparkles } from 'lucide-react';

/**
 * Phone Journey — a 5-act scroll-tied brand story.
 *
 * Acts (mapped to scroll progress 0 → 1):
 *   0.00 – 0.20  PANIC      Phone falls, screen cracks
 *   0.20 – 0.40  TEARS      The owner reacts (heart breaks)
 *   0.40 – 0.65  CHASE      Driving fast through traffic, dust kicks up
 *   0.65 – 0.85  ARRIVAL    Reaches the CoboPhone shop
 *   0.85 – 1.00  REPAIRED   Phone restored, sparkle
 *
 * Implementation notes:
 * - Section is `min-h-[500vh]` pinned. Inside, a sticky stage renders the active act.
 * - useScroll → useTransform for buttery 60fps progress. No setState per frame.
 * - prefers-reduced-motion → renders a static "before / after" comparison instead.
 * - All visuals are pure SVG/CSS — no GLB, no video, no 3rd-party assets.
 */
export function PhoneJourney() {
  const ref = useRef<HTMLElement | null>(null);
  const reduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end end']
  });

  // Act gates
  const panic    = useTransform(scrollYProgress, [0.00, 0.05, 0.20, 0.25], [0, 1, 1, 0]);
  const tears    = useTransform(scrollYProgress, [0.18, 0.25, 0.40, 0.45], [0, 1, 1, 0]);
  const chase    = useTransform(scrollYProgress, [0.38, 0.45, 0.65, 0.70], [0, 1, 1, 0]);
  const arrival  = useTransform(scrollYProgress, [0.63, 0.70, 0.85, 0.90], [0, 1, 1, 0]);
  const repaired = useTransform(scrollYProgress, [0.83, 0.90, 1.00],       [0, 1, 1]);

  // Phone-specific transforms
  const phoneY     = useTransform(scrollYProgress, [0,   0.18, 0.20], [-40, 220, 240]); // falls
  const phoneRotate= useTransform(scrollYProgress, [0,   0.18],       [0,   25]);
  const crackOpacity = useTransform(scrollYProgress, [0.16, 0.20],    [0, 1]);

  // Car drive — runs across screen
  const carX     = useTransform(scrollYProgress, [0.40, 0.65], ['-110%', '110%']);
  const dustOp   = useTransform(scrollYProgress, [0.42, 0.55, 0.65], [0, 1, 0]);

  // Tears trail
  const tearsY = useTransform(scrollYProgress, [0.20, 0.40], [0, 80]);

  // Final phone — appears from below
  const finalPhoneY = useTransform(scrollYProgress, [0.85, 1.00], [60, 0]);
  const sparkleOp   = useTransform(scrollYProgress, [0.90, 1.00], [0, 1]);

  // Progress bar
  const progressBar = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  if (reduced) {
    return <PhoneJourneyStatic />;
  }

  return (
    <section
      ref={ref}
      className="relative h-[500vh] bg-shadow-blue-deep text-white"
      aria-labelledby="journey-heading"
      data-surface="dark"
    >
      <h2 id="journey-heading" className="sr-only">El camino de tu móvil: de roto a reparado en 40 minutos.</h2>

      {/* Sticky stage */}
      <div className="sticky top-0 h-screen w-full overflow-hidden grain">
        <div className="absolute inset-0 dot-grid opacity-20" aria-hidden />
        <div className="absolute -top-40 -right-40 w-[800px] h-[800px] rounded-full bg-brand-primary/15 blur-[160px] pointer-events-none" aria-hidden />

        {/* Eyebrow + progress bar (always visible) */}
        <div className="absolute top-24 left-0 right-0 px-6 lg:px-12 z-20">
          <div className="container-fluid">
            <div className="inline-flex items-center gap-2 text-xs text-brand-secondary uppercase tracking-widest mb-3">
              <span className="w-8 h-px bg-brand-secondary" aria-hidden />
              Tu móvil, hora a hora
            </div>
            <h3 className="text-2xl lg:text-3xl font-bold text-white text-balance max-w-2xl">
              De roto a como nuevo. En menos de lo que tardas en comer.
            </h3>
            <div className="mt-6 h-1 w-32 bg-white/10 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-brand-secondary"
                style={{ width: progressBar }}
              />
            </div>
          </div>
        </div>

        {/* ACT 1 — PANIC: phone falls and cracks */}
        <motion.div className="absolute inset-0 flex items-center justify-center" style={{ opacity: panic }}>
          <ActChrome label="01 · Pánico" caption="Tu móvil se cae. La pantalla se raja." />
          <motion.div
            className="relative"
            style={{ y: phoneY, rotate: phoneRotate }}
          >
            <PhoneSvg cracked={false} />
            <motion.div className="absolute inset-0" style={{ opacity: crackOpacity }}>
              <CrackOverlay />
            </motion.div>
          </motion.div>
          {/* Floor shadow */}
          <div className="absolute bottom-[18%] left-1/2 -translate-x-1/2 w-48 h-3 bg-black/40 blur-xl rounded-full" aria-hidden />
        </motion.div>

        {/* ACT 2 — TEARS: the heartbreak */}
        <motion.div className="absolute inset-0 flex items-center justify-center" style={{ opacity: tears }}>
          <ActChrome label="02 · Lágrimas" caption="Tus fotos, tu trabajo, tu vida. Pánico real." />
          <div className="relative flex flex-col items-center">
            <div className="relative">
              <motion.div
                animate={{ scale: [1, 1.06, 1] }}
                transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
                className="w-40 h-40 rounded-full bg-brand-secondary/20 flex items-center justify-center"
              >
                <Heart size={72} className="text-brand-secondary" fill="currentColor" />
              </motion.div>
              {/* Crack across the heart */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <svg width="120" height="180" viewBox="0 0 120 180" className="text-shadow-blue-deep">
                  <path d="M60 20 L52 50 L66 70 L48 95 L62 120 L50 150 L60 170" stroke="currentColor" strokeWidth="4" fill="none" strokeLinecap="round" />
                </svg>
              </div>
            </div>
            {/* Tears trail */}
            <motion.div
              className="absolute left-1/2 -translate-x-1/2 top-32 flex flex-col items-center gap-2"
              style={{ y: tearsY }}
            >
              {[0, 1, 2].map(i => (
                <motion.div
                  key={i}
                  className="w-2 h-3 rounded-full bg-brand-primary"
                  animate={{ opacity: [0, 1, 0], y: [0, 40, 80] }}
                  transition={{ duration: 1.8, repeat: Infinity, delay: i * 0.4, ease: 'easeIn' }}
                />
              ))}
            </motion.div>
          </div>
        </motion.div>

        {/* ACT 3 — CHASE: driving through traffic */}
        <motion.div className="absolute inset-0 flex items-center justify-center" style={{ opacity: chase }}>
          <ActChrome label="03 · Carrera" caption="Por la M-506 a toda velocidad. Dirección Cobo Calleja." />

          {/* Road */}
          <div className="absolute left-0 right-0 bottom-[28%] h-1 bg-white/30">
            <motion.div
              className="absolute inset-y-0 left-0 right-0 flex"
              animate={{ x: ['0%', '-50%'] }}
              transition={{ duration: 0.6, repeat: Infinity, ease: 'linear' }}
            >
              {Array.from({ length: 20 }).map((_, i) => (
                <span key={i} className="block w-8 h-1 bg-brand-secondary mx-3 shrink-0" />
              ))}
            </motion.div>
          </div>

          {/* Background road blur */}
          <div className="absolute inset-x-0 bottom-[20%] h-[40%] bg-gradient-to-t from-black/40 to-transparent pointer-events-none" aria-hidden />

          {/* Other cars on the side (parallax) */}
          <motion.div
            className="absolute top-[35%] right-0 flex gap-12 items-center text-white/30"
            animate={{ x: ['0%', '-200%'] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
          >
            {Array.from({ length: 8 }).map((_, i) => (
              <Car key={i} size={28} />
            ))}
          </motion.div>

          {/* The car (motion across) */}
          <motion.div
            className="absolute bottom-[28%] left-0 translate-y-1/2"
            style={{ x: carX }}
          >
            <div className="relative">
              {/* Dust */}
              <motion.div
                className="absolute -left-32 bottom-0 flex gap-2"
                style={{ opacity: dustOp }}
              >
                {[0.4, 0.7, 1.0, 0.7, 0.4].map((opacity, i) => (
                  <motion.div
                    key={i}
                    className="w-8 h-8 rounded-full bg-white/40 blur-md"
                    style={{ opacity }}
                    animate={{ scale: [0.5, 1.5, 1], y: [0, -10, -20] }}
                    transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.1, ease: 'easeOut' }}
                  />
                ))}
              </motion.div>
              {/* Car icon scaled up */}
              <div className="relative">
                <Car size={96} className="text-brand-secondary" strokeWidth={1.8} fill="currentColor" />
              </div>
              {/* Speed lines */}
              <motion.div
                className="absolute -right-20 top-1/2 -translate-y-1/2 flex flex-col gap-1.5"
                animate={{ opacity: [0.4, 1, 0.4] }}
                transition={{ duration: 0.3, repeat: Infinity }}
              >
                <Wind size={20} className="text-white/50" />
                <Wind size={20} className="text-white/30 ml-2" />
                <Wind size={20} className="text-white/50" />
              </motion.div>
            </div>
          </motion.div>
        </motion.div>

        {/* ACT 4 — ARRIVAL */}
        <motion.div className="absolute inset-0 flex items-center justify-center" style={{ opacity: arrival }}>
          <ActChrome label="04 · Llegada" caption="Calle Bembibre 5. La puerta abierta. Marco te espera." />
          <div className="relative flex flex-col items-center">
            {/* Shop facade */}
            <div className="relative w-[320px] sm:w-[400px] bg-shadow-blue rounded-t-3xl ring-1 ring-white/10 shadow-2xl overflow-hidden">
              {/* Awning */}
              <div className="bg-gradient-to-b from-brand-primary to-brand-primary-active text-white text-center py-3 font-bold tracking-tight">
                CoboPhone
              </div>
              {/* Window */}
              <div className="p-6 bg-shadow-blue-deep">
                <div className="aspect-[4/3] rounded-xl bg-shadow-blue ring-1 ring-white/5 flex items-center justify-center">
                  <div className="text-center">
                    <Wrench size={48} className="text-brand-secondary mx-auto mb-3" />
                    <p className="font-mono text-xs text-ink-300 uppercase tracking-widest">Abierto · 40 min</p>
                  </div>
                </div>
              </div>
              {/* Door */}
              <div className="bg-shadow-blue-deep px-6 pb-6">
                <motion.div
                  initial={{ rotateY: 0 }}
                  animate={{ rotateY: [-15, 0, -15] }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                  style={{ transformOrigin: 'left' }}
                  className="h-16 rounded-md bg-brand-primary/20 ring-1 ring-brand-primary/40 flex items-center justify-center text-xs font-mono text-ink-300 uppercase tracking-widest"
                >
                  Entrar
                </motion.div>
              </div>
            </div>
            {/* Ground */}
            <div className="w-[400px] h-1 bg-white/20" />
            <div className="absolute -bottom-2 w-[300px] h-4 bg-black/40 blur-xl rounded-full" aria-hidden />
          </div>
        </motion.div>

        {/* ACT 5 — REPAIRED */}
        <motion.div className="absolute inset-0 flex items-center justify-center" style={{ opacity: repaired }}>
          <ActChrome label="05 · Reparado" caption="40 minutos después. Como nuevo. 3 meses de garantía." />
          <motion.div className="relative" style={{ y: finalPhoneY }}>
            <PhoneSvg cracked={false} pristine />
            <motion.div
              className="absolute inset-0 pointer-events-none"
              style={{ opacity: sparkleOp }}
            >
              {/* Sparkles around the phone */}
              {[
                { top: '-8%', left: '-12%' },
                { top: '20%', right: '-15%' },
                { bottom: '15%', left: '-8%' },
                { bottom: '-5%', right: '-10%' },
                { top: '40%', left: '50%' }
              ].map((pos, i) => (
                <motion.div
                  key={i}
                  className="absolute"
                  style={pos}
                  animate={{ scale: [0, 1, 0], rotate: [0, 180, 360] }}
                  transition={{ duration: 2, repeat: Infinity, delay: i * 0.3, ease: 'easeInOut' }}
                >
                  <Sparkles size={24} className="text-brand-secondary" />
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Bottom CTA — always present, pulses */}
        <div className="absolute bottom-10 left-0 right-0 z-10 px-6 lg:px-12">
          <div className="container-fluid text-center">
            <p className="text-xs text-ink-300 font-mono uppercase tracking-widest">
              Esto pasa cada 40 minutos en Cobo Calleja.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

// ───────────── Sub-components ─────────────

function ActChrome({ label, caption }: { label: string; caption: string }) {
  return (
    <div className="absolute bottom-[15%] left-0 right-0 px-6 z-10">
      <div className="container-fluid text-center">
        <p className="font-mono text-xs uppercase tracking-widest text-brand-secondary">{label}</p>
        <p className="mt-3 text-lg lg:text-xl text-white max-w-xl mx-auto text-balance">{caption}</p>
      </div>
    </div>
  );
}

function PhoneSvg({ cracked = false, pristine = false }: { cracked?: boolean; pristine?: boolean }) {
  return (
    <svg width="180" height="320" viewBox="0 0 180 320" className="drop-shadow-2xl">
      <defs>
        <linearGradient id="screen" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={pristine ? '#1a4cf0' : '#1a2740'} />
          <stop offset="100%" stopColor={pristine ? '#0a2860' : '#0a1430'} />
        </linearGradient>
        <linearGradient id="frame" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#3a4660" />
          <stop offset="100%" stopColor="#1a2438" />
        </linearGradient>
      </defs>
      {/* Body */}
      <rect x="2" y="2" width="176" height="316" rx="32" fill="url(#frame)" stroke="#fff2" />
      {/* Screen */}
      <rect x="12" y="12" width="156" height="296" rx="22" fill="url(#screen)" />
      {/* Notch */}
      <rect x="60" y="18" width="60" height="14" rx="7" fill="#000" />
      {/* Screen content when pristine */}
      {pristine && (
        <>
          <rect x="32" y="56" width="116" height="8" rx="4" fill="#ffffff30" />
          <rect x="32" y="76" width="80" height="6" rx="3" fill="#ffffff20" />
          <rect x="32" y="120" width="116" height="40" rx="10" fill="#FFB800" />
          <rect x="32" y="170" width="116" height="40" rx="10" fill="#ffffff15" />
        </>
      )}
      {/* Side buttons */}
      <rect x="0" y="80" width="3" height="40" rx="1.5" fill="#1a2438" />
      <rect x="0" y="130" width="3" height="20" rx="1.5" fill="#1a2438" />
      <rect x="177" y="100" width="3" height="60" rx="1.5" fill="#1a2438" />
    </svg>
  );
}

function CrackOverlay() {
  return (
    <svg
      width="180"
      height="320"
      viewBox="0 0 180 320"
      className="absolute inset-0 pointer-events-none"
    >
      {/* Web of cracks */}
      <g stroke="#fff" strokeWidth="1.5" fill="none" strokeLinecap="round" opacity="0.85">
        <path d="M90 60 L60 100 L30 90" />
        <path d="M90 60 L120 110 L165 140" />
        <path d="M90 60 L80 160 L40 250" />
        <path d="M80 160 L130 220 L150 290" />
        <path d="M80 160 L25 220" />
        <path d="M60 100 L40 150" />
        <path d="M120 110 L155 90" />
        <path d="M120 110 L130 220" />
        <path d="M130 220 L100 280" />
      </g>
      {/* Impact point */}
      <circle cx="90" cy="60" r="4" fill="#fff" />
      <circle cx="80" cy="160" r="2" fill="#fff" />
      <circle cx="120" cy="110" r="2" fill="#fff" />
    </svg>
  );
}

/** Reduced-motion fallback — static before/after comparison. */
function PhoneJourneyStatic() {
  return (
    <section
      data-surface="dark"
      className="bg-shadow-blue-deep text-white py-section"
      aria-labelledby="journey-heading"
    >
      <div className="container-fluid">
        <div className="max-w-2xl mb-12">
          <div className="inline-flex items-center gap-2 text-xs text-brand-secondary uppercase tracking-widest mb-3">
            <span className="w-8 h-px bg-brand-secondary" aria-hidden />
            Tu móvil, hora a hora
          </div>
          <h2 id="journey-heading" className="text-white text-balance">
            De roto a como nuevo. En menos de lo que tardas en comer.
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 gap-px bg-white/10 rounded-2xl overflow-hidden ring-1 ring-white/10">
          <div className="bg-shadow-blue p-10 flex flex-col items-center text-center">
            <div className="relative">
              <PhoneSvg />
              <div className="absolute inset-0"><CrackOverlay /></div>
            </div>
            <p className="mt-6 font-mono text-xs text-brand-secondary uppercase tracking-widest">Antes · 09:15</p>
            <p className="mt-2 text-lg text-balance">Pantalla rota. Tu día en pausa.</p>
          </div>
          <div className="bg-shadow-blue p-10 flex flex-col items-center text-center">
            <PhoneSvg pristine />
            <p className="mt-6 font-mono text-xs text-brand-secondary uppercase tracking-widest">Después · 09:55</p>
            <p className="mt-2 text-lg text-balance">Como nuevo. 3 meses de garantía.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
