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

            <p className="mt-6 max-w-xl text-lg lg:text-xl text-ink-300 leading-relaxed">
              {t('sub')}
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-3 sm:items-center">
              <ButtonLink href={`${prefix}/presupuesto`} size="xl" variant="primary">
                {t('ctaPrimary')}
                <ArrowRight size={18} aria-hidden />
              </ButtonLink>
              <ButtonLink
                href="https://wa.me/message/Y7WTOGB7WOXGP1"
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
function DevicePlaceholder() {
  return (
    <div className="relative aspect-[3/4] w-full max-w-md mx-auto">
      <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-white/10 via-white/5 to-transparent ring-1 ring-white/10 backdrop-blur-sm" />
      <div
        className="absolute inset-4 rounded-2xl bg-gradient-to-br from-brand-primary/30 to-shadow-blue-deep ring-1 ring-white/10 shadow-2xl flex items-center justify-center overflow-hidden"
        style={{ transform: 'perspective(1200px) rotateY(-8deg) rotateX(6deg)' }}
      >
        <div className="absolute inset-6 rounded-xl bg-shadow-blue-deep ring-1 ring-white/5">
          <div className="absolute inset-4 grid grid-cols-3 gap-3 opacity-60">
            {Array.from({ length: 9 }).map((_, i) => (
              <div
                key={i}
                className="aspect-square rounded-md bg-white/5"
                style={{
                  animation: `pulse 3s ease-in-out ${i * 0.2}s infinite`
                }}
              />
            ))}
          </div>
        </div>
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-20 h-6 bg-shadow-blue-deep rounded-full ring-1 ring-white/10" aria-hidden />
      </div>

      {/* Floating labels */}
      <FloatLabel className="top-10 -left-4" delay="0s">Pantalla OLED</FloatLabel>
      <FloatLabel className="top-1/3 -right-6" delay="0.4s">Batería 4500 mAh</FloatLabel>
      <FloatLabel className="bottom-16 -left-8" delay="0.8s">USB-C</FloatLabel>
      <FloatLabel className="bottom-4 right-2" delay="1.2s">Cámara 50 MP</FloatLabel>

      <style jsx>{`
        @keyframes pulse {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.7; }
        }
      `}</style>
    </div>
  );
}

function FloatLabel({ children, className, delay }: { children: React.ReactNode; className?: string; delay?: string }) {
  return (
    <div
      className={`absolute ${className} text-xs font-mono uppercase tracking-widest text-ink-300 bg-shadow-blue/80 backdrop-blur-sm px-2.5 py-1.5 rounded-md ring-1 ring-white/10`}
      style={{ animation: `floatY 4s ease-in-out ${delay} infinite` }}
    >
      <span className="text-brand-secondary mr-1">›</span>
      {children}
      <style jsx>{`
        @keyframes floatY {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-6px); }
        }
      `}</style>
    </div>
  );
}
