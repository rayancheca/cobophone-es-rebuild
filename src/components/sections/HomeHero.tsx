'use client';

import Link from 'next/link';
import { useTranslations, useLocale } from 'next-intl';
import { ArrowRight, MessageCircle, Wrench, Clock, ShieldCheck } from 'lucide-react';
import { ButtonLink } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';

export function HomeHero() {
  const t = useTranslations('home.hero');
  const tCommon = useTranslations('common');
  const locale = useLocale();
  const prefix = locale === 'es' ? '' : `/${locale}`;

  // Trust strip raw via t.raw to grab the array
  const trustStrip = t.raw('trustStrip') as Array<{ number: string; unit: string; label: string }>;

  return (
    <section
      data-surface="dark"
      className="relative min-h-[100vh] lg:min-h-[92vh] bg-shadow-blue text-white overflow-hidden pt-20 lg:pt-28 grain"
      aria-labelledby="hero-heading"
    >
      {/* Background dot-grid + soft glow */}
      <div className="absolute inset-0 dot-grid opacity-30" aria-hidden />
      <div className="absolute -top-32 -right-32 w-[800px] h-[800px] rounded-full bg-brand-primary/20 blur-[160px] pointer-events-none" aria-hidden />
      <div className="absolute -bottom-40 -left-32 w-[600px] h-[600px] rounded-full bg-brand-secondary/15 blur-[140px] pointer-events-none" aria-hidden />

      <div className="container-fluid relative">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          <div className="lg:col-span-7 pt-8 lg:pt-12">
            <div className="inline-flex items-center gap-2 text-xs text-ink-300 uppercase tracking-widest mb-6">
              <span className="w-8 h-px bg-brand-secondary" aria-hidden />
              {t('eyebrow')}
            </div>

            <h1
              id="hero-heading"
              className="font-display font-semibold text-balance text-white"
              style={{ fontSize: 'clamp(2.75rem, 1.8rem + 5vw, 6rem)', lineHeight: 1.02, letterSpacing: '-0.04em' }}
            >
              {t('headline')}
            </h1>

            <p className="mt-6 max-w-xl text-lg lg:text-xl text-ink-700 leading-relaxed">
              {t('sub')}
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-3 sm:items-center">
              <ButtonLink href={`${prefix}/presupuesto`} size="xl" variant="primary">
                {t('ctaPrimary')}
                <ArrowRight size={18} aria-hidden />
              </ButtonLink>
              <ButtonLink
                href="https://wa.me/34911234567"
                target="_blank"
                rel="noopener"
                size="xl"
                variant="whatsapp"
              >
                <MessageCircle size={18} aria-hidden />
                {t('ctaSecondary')}
              </ButtonLink>
            </div>

            {/* Secondary tagline — adopted from the current site, was buried */}
            <p className="mt-12 text-sm text-ink-500 font-mono">
              <em className="not-italic">"Si no sabemos el fallo, es que no existe."</em>
              <span className="ml-2 text-ink-700">— Equipo CoboPhone</span>
            </p>
          </div>

          {/* Hero device — placeholder for the R3F scene; static visual treatment for the foundation pass */}
          <div className="lg:col-span-5 relative hidden lg:block">
            <DevicePlaceholder />
          </div>
        </div>

        {/* Trust strip */}
        <div className="mt-16 lg:mt-24 grid grid-cols-2 lg:grid-cols-4 gap-px bg-white/10 rounded-2xl overflow-hidden ring-1 ring-white/10">
          {trustStrip.map((s, i) => (
            <div key={i} className="bg-shadow-blue px-6 py-6 lg:py-8">
              <div className="flex items-baseline gap-1">
                <span className="font-mono text-3xl lg:text-4xl font-semibold tabular-nums text-white tracking-tight">
                  {s.number}
                </span>
                <span className="text-sm text-ink-500">{s.unit}</span>
              </div>
              <p className="mt-1 text-sm text-ink-300">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Inline trust badges */}
        <div className="mt-8 flex flex-wrap items-center gap-3 pb-12 lg:pb-16">
          <Badge variant="amber" className="!bg-brand-secondary/20 !text-brand-secondary !ring-brand-secondary/40">
            <Clock size={12} aria-hidden /> 40 min
          </Badge>
          <Badge variant="green" className="!bg-brand-accent/15 !text-brand-accent !ring-brand-accent/30">
            <ShieldCheck size={12} aria-hidden /> {tCommon('warranty')}
          </Badge>
          <Badge variant="blue" className="!bg-white/5 !text-ink-300 !ring-white/10">
            <Wrench size={12} aria-hidden /> {tCommon('diagnostic')}
          </Badge>
        </div>
      </div>
    </section>
  );
}

/**
 * Placeholder visual for the home-hero 3D scene.
 *
 * Per /design/3d-direction.md, this slot will host an R3F canvas with a
 * disassembling/reassembling phone tied to scroll progress. The CSS-only
 * approximation below sets the composition and feel for the foundation pass;
 * see HANDOFF.md for the R3F integration plan.
 *
 * Rationale: keeps initial JS bundle low while the foundation is stabilized.
 */
/**
 * Hero device placeholder — a stylized phone with simulated apps that float
 * subtly on stagger. Each app is recognizable to a Spanish user (banking,
 * food delivery, messaging, music, maps, etc.) without copying any brand's
 * exact mark — these are simplified, color-coded glyphs.
 *
 * The 4 floating labels and 12 app icons share a synchronized but staggered
 * floatY animation (different delays + durations so motion never feels uniform).
 *
 * Per /design/3d-direction.md, this slot will eventually host an R3F canvas;
 * the CSS approximation below sets the composition and feel.
 */
function DevicePlaceholder() {
  // 12 apps in a 3×4 grid — first row dock (bottom)
  const apps: Array<{ bg: string; emoji?: string; glyph?: string; label: string }> = [
    { bg: 'from-[#34B7F1] to-[#0084ff]',   glyph: 'M',  label: 'Mensajes' },
    { bg: 'from-[#25D366] to-[#1DA851]',   glyph: '💬', label: 'WhatsApp' },
    { bg: 'from-[#FF7A00] to-[#F4511E]',   glyph: 'B',  label: 'BBVA' },
    { bg: 'from-[#FFCC00] to-[#FFB300]',   glyph: 'G',  label: 'Glovo' },
    { bg: 'from-[#E1306C] to-[#C13584]',   glyph: 'i',  label: 'Instagram' },
    { bg: 'from-[#1DB954] to-[#179443]',   glyph: '♪',  label: 'Spotify' },
    { bg: 'from-[#5F6FFF] to-[#3B4BD8]',   glyph: '🗺', label: 'Maps' },
    { bg: 'from-[#FF3B30] to-[#D62828]',   glyph: '✉', label: 'Mail' },
    { bg: 'from-[#A855F7] to-[#7E22CE]',   glyph: '🛒', label: 'Amazon' },
    { bg: 'from-[#000000] to-[#1F1F1F]',   glyph: '𝕏',  label: 'X' },
    { bg: 'from-[#FF9500] to-[#E37400]',   glyph: '📷', label: 'Cámara' },
    { bg: 'from-[#0EA5E9] to-[#0369A1]',   glyph: '☎', label: 'Teléfono' }
  ];

  return (
    <div className="relative aspect-[3/4] w-full max-w-md mx-auto">
      {/* Outer glow ring */}
      <div className="absolute -inset-6 rounded-[2.5rem] bg-gradient-to-br from-brand-primary/20 via-transparent to-brand-secondary/15 blur-2xl pointer-events-none" aria-hidden />

      {/* Phone body */}
      <div
        className="absolute inset-2 rounded-[2.25rem] bg-gradient-to-br from-[#1A1330] to-shadow-blue-deep ring-1 ring-white/10 shadow-2xl overflow-hidden"
        style={{ transform: 'perspective(1400px) rotateY(-10deg) rotateX(5deg)' }}
      >
        {/* Hairline screen border */}
        <div className="absolute inset-3 rounded-[1.75rem] bg-gradient-to-br from-[#251846] via-[#1A0E32] to-[#0E0721] ring-1 ring-white/5 overflow-hidden">
          {/* Status bar */}
          <div className="absolute top-3 inset-x-0 flex items-center justify-between px-6">
            <span className="font-mono text-[10px] text-white/90 tabular-nums">9:41</span>
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-1.5 rounded-sm border border-white/40" aria-hidden>
                <span className="block w-full h-full rounded-sm bg-white/80" />
              </span>
            </div>
          </div>

          {/* Dynamic island */}
          <div className="absolute top-3 left-1/2 -translate-x-1/2 w-16 h-5 bg-black rounded-full ring-1 ring-white/10" aria-hidden />

          {/* App grid — 3 cols × 4 rows */}
          <div className="absolute inset-x-4 top-12 grid grid-cols-3 gap-3">
            {apps.map((app, i) => (
              <div
                key={app.label}
                className={`relative aspect-square rounded-[1rem] bg-gradient-to-br ${app.bg} flex items-center justify-center shadow-lg ring-1 ring-white/10`}
                style={{
                  animation: `appFloat ${3.6 + (i % 4) * 0.6}s ease-in-out ${(i * 0.18) % 2.4}s infinite`
                }}
              >
                <span className="text-white text-lg font-bold drop-shadow-sm">{app.glyph}</span>
                {/* Notification dot on a couple */}
                {(i === 1 || i === 4 || i === 7) && (
                  <span className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-brand-secondary text-white text-[8px] flex items-center justify-center font-bold ring-2 ring-shadow-blue-deep">
                    {i === 1 ? '3' : i === 4 ? '7' : '1'}
                  </span>
                )}
              </div>
            ))}
          </div>

          {/* Home indicator */}
          <div className="absolute bottom-2.5 left-1/2 -translate-x-1/2 w-24 h-1 rounded-full bg-white/40" aria-hidden />
        </div>
      </div>

      {/* Floating labels — these are component callouts, not screen content */}
      <FloatLabel className="top-6 -left-2" delay="0s">Pantalla OLED</FloatLabel>
      <FloatLabel className="top-1/3 -right-6" delay="0.6s">Batería 4500 mAh</FloatLabel>
      <FloatLabel className="bottom-20 -left-10" delay="1.2s">USB-C</FloatLabel>
      <FloatLabel className="bottom-6 right-0" delay="1.8s">Cámara 50 MP</FloatLabel>

      <style jsx>{`
        @keyframes appFloat {
          0%, 100% { transform: translateY(0px); }
          50%      { transform: translateY(-4px); }
        }
      `}</style>
    </div>
  );
}

function FloatLabel({ children, className, delay }: { children: React.ReactNode; className?: string; delay?: string }) {
  return (
    <div
      className={`absolute ${className} text-xs font-mono uppercase tracking-widest text-ink-700 bg-shadow-blue-deep/90 backdrop-blur-sm px-3 py-1.5 rounded-md ring-1 ring-white/15 shadow-lg z-10`}
      style={{ animation: `floatY 4.2s ease-in-out ${delay} infinite` }}
    >
      <span className="text-brand-secondary mr-1.5">›</span>
      {children}
      <style jsx>{`
        @keyframes floatY {
          0%, 100% { transform: translateY(0px); }
          50%      { transform: translateY(-8px); }
        }
      `}</style>
    </div>
  );
}
