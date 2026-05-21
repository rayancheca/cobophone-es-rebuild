'use client';

import { useEffect, useMemo, useState } from 'react';
import { useTranslations } from 'next-intl';
import { useRouter, useSearchParams } from 'next/navigation';
import { ArrowLeft, ArrowRight, MessageCircle, ShieldCheck, Clock, Wrench, Check } from 'lucide-react';
import { Smartphone, Tablet, Laptop, Watch, Gamepad2, Tv, Bike } from 'lucide-react';

import { useQuoteStore } from '@/lib/quote-store';
import { brands, getBrand } from '@/data/brands';
import { models, getModel } from '@/data/models';
import { repairTypes, getRepairType } from '@/data/repair-types';
import { getPrice } from '@/data/prices';
import { formatPrice, buildWhatsAppLink } from '@/lib/utils';
import { ButtonLink } from '@/components/ui/Button';
import { ModelImage } from '@/components/ui/ModelImage';
import { cn } from '@/lib/utils';

const categories = [
  { slug: 'movil', name: 'Móvil', icon: Smartphone, desc: 'Pantalla, batería, conector, cámara' },
  { slug: 'tablet', name: 'Tablet', icon: Tablet, desc: 'iPad y Android' },
  { slug: 'portatil', name: 'Portátil', icon: Laptop, desc: 'Pantalla, batería, disco' },
  { slug: 'smartwatch', name: 'Smartwatch', icon: Watch, desc: 'Pantalla, batería' },
  { slug: 'consola', name: 'Consola', icon: Gamepad2, desc: 'PS, Xbox, Nintendo' },
  { slug: 'television', name: 'Televisor', icon: Tv, desc: 'LED, placa' },
  { slug: 'patinete-electrico', name: 'Patinete', icon: Bike, desc: 'Batería, rueda, eléctrica' }
];

export function QuoteTool() {
  const t = useTranslations('quote');
  const router = useRouter();
  const searchParams = useSearchParams();
  const state = useQuoteStore();

  // Hydrate state from URL on mount
  useEffect(() => {
    const cat = searchParams.get('dispositivo');
    const brand = searchParams.get('marca');
    const model = searchParams.get('modelo');
    const repair = searchParams.get('reparacion');
    if (cat) state.setCategory(cat);
    if (brand) state.setBrand(brand);
    if (model) state.setModel(model);
    if (repair) state.setRepair(repair);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const updateUrl = (params: Record<string, string | undefined>) => {
    const sp = new URLSearchParams(searchParams.toString());
    for (const [k, v] of Object.entries(params)) {
      if (v) sp.set(k, v);
      else sp.delete(k);
    }
    router.replace(`?${sp.toString()}`, { scroll: false });
  };

  const progress = useMemo(() => {
    // Goal-gradient: accelerating progress
    const stepProgress: Record<number, number> = { 1: 0, 2: 0.30, 3: 0.60, 4: 0.85, 5: 1, 6: 1 };
    return stepProgress[state.step] ?? 0;
  }, [state.step]);

  return (
    <div className="min-h-[80vh] py-12 lg:py-20 bg-paper">
      <div className="container-narrow">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-balance" style={{ fontSize: 'clamp(2rem, 1.5rem + 2.5vw, 3.5rem)' }}>
            {t('title')}
          </h1>
          <p className="mt-4 text-lg text-ink-700">{t('sub')}</p>
        </div>

        {/* Progress bar */}
        <div className="mb-12">
          <div className="flex justify-between text-xs font-mono uppercase tracking-widest text-ink-500 mb-3">
            <span>{t('steps.category.label')}</span>
            <span>{t('steps.brand.label')}</span>
            <span>{t('steps.model.label')}</span>
            <span>{t('steps.repair.label')}</span>
            <span>{t('steps.price.label')}</span>
          </div>
          <div className="h-1 bg-ink-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-brand-primary rounded-full transition-all duration-slow ease-out-expo"
              style={{ width: `${progress * 100}%` }}
              aria-hidden
            />
          </div>
        </div>

        {/* Steps */}
        <div className="bg-chrome rounded-2xl shadow-card ring-1 ring-ink-100 p-6 lg:p-10">
          {state.step === 1 && (
            <Step1
              onSelect={(slug) => {
                state.setCategory(slug);
                updateUrl({ dispositivo: slug });
              }}
            />
          )}
          {state.step === 2 && state.category && (
            <Step2
              onBack={() => { state.setStep(1); updateUrl({ marca: undefined, modelo: undefined, reparacion: undefined }); }}
              onSelect={(slug) => { state.setBrand(slug); updateUrl({ marca: slug }); }}
            />
          )}
          {state.step === 3 && state.brandSlug && (
            <Step3
              brandSlug={state.brandSlug}
              onBack={() => { state.setStep(2); updateUrl({ modelo: undefined, reparacion: undefined }); }}
              onSelect={(slug) => { state.setModel(slug); updateUrl({ modelo: slug }); }}
            />
          )}
          {state.step === 4 && state.modelSlug && (
            <Step4
              modelSlug={state.modelSlug}
              onBack={() => { state.setStep(3); updateUrl({ reparacion: undefined }); }}
              onSelect={(slug) => { state.setRepair(slug); updateUrl({ reparacion: slug }); }}
            />
          )}
          {state.step === 5 && state.modelSlug && state.repairSlug && (
            <Step5
              modelSlug={state.modelSlug}
              repairSlug={state.repairSlug}
              onBack={() => state.setStep(4)}
              onBook={() => { /* handled inside Step5 with real API */ }}
            />
          )}
          {state.step === 6 && (
            <Step6Confirmation />
          )}
        </div>

        {/* WhatsApp escape hatch */}
        {state.step < 6 && (
          <div className="mt-6 text-center">
            <a
              href={buildWhatsAppLink('Hola, quería hablar con un técnico sobre una reparación.')}
              target="_blank"
              rel="noopener"
              className="inline-flex items-center gap-2 text-sm text-ink-500 hover:text-ink-900 transition-colors"
            >
              <MessageCircle size={16} className="text-[#25D366]" />
              {t('whatsappEscape')}
            </a>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Step 1 — Category ──────────────────────────────────────────

function Step1({ onSelect }: { onSelect: (slug: string) => void }) {
  const t = useTranslations('quote');
  return (
    <section aria-labelledby="step1-h">
      <h2 id="step1-h" className="text-2xl font-semibold mb-6">{t('steps.category.title')}</h2>
      {/* F22 — Móvil promoted to hero tile (it's ~85% of real traffic);
          the other 6 categories fall into a 6-col secondary grid below */}
      {(() => {
        const movil = categories.find(c => c.slug === 'movil')!;
        const rest = categories.filter(c => c.slug !== 'movil');
        const MovilIcon = movil.icon;
        return (
          <div className="space-y-3">
            <button
              type="button"
              onClick={() => onSelect(movil.slug)}
              className="group relative w-full text-left p-6 lg:p-8 rounded-2xl bg-gradient-to-br from-brand-primary to-brand-primary-active text-white ring-1 ring-brand-primary/30 hover:shadow-pop hover:-translate-y-0.5 transition-all duration-fast ease-out-expo overflow-hidden"
            >
              <span className="absolute top-4 right-4 inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-brand-secondary text-white text-[10px] font-bold uppercase tracking-widest">
                ★ Lo más común
              </span>
              <div className="flex items-start gap-5">
                <div className="w-14 h-14 rounded-xl bg-white/15 text-white flex items-center justify-center shrink-0">
                  <MovilIcon size={28} aria-hidden />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-display font-bold text-2xl lg:text-3xl">{movil.name}</p>
                  <p className="mt-1 text-sm text-white/80">{movil.desc}</p>
                  <p className="mt-3 text-xs font-mono text-white/70 uppercase tracking-widest">
                    Desde €39 · 40 min · Garantía 3 meses
                  </p>
                </div>
              </div>
            </button>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
              {rest.map(c => {
                const Icon = c.icon;
                return (
                  <button
                    key={c.slug}
                    type="button"
                    onClick={() => onSelect(c.slug)}
                    className="group text-center p-4 rounded-xl bg-paper ring-1 ring-ink-100 hover:ring-brand-primary hover:bg-chrome hover:-translate-y-0.5 transition-all duration-fast ease-out-expo"
                  >
                    <div className="w-10 h-10 mx-auto rounded-lg bg-brand-primary/10 text-brand-primary flex items-center justify-center group-hover:bg-brand-primary group-hover:text-white transition-colors">
                      <Icon size={20} aria-hidden />
                    </div>
                    <p className="mt-3 font-semibold text-sm text-ink-900">{c.name}</p>
                  </button>
                );
              })}
            </div>
          </div>
        );
      })()}
    </section>
  );
}

// ─── Step 2 — Brand ─────────────────────────────────────────────

function Step2({ onBack, onSelect }: { onBack: () => void; onSelect: (slug: string) => void }) {
  const t = useTranslations('quote');
  const [showAll, setShowAll] = useState(false);
  const visible = showAll ? brands : brands.slice(0, 7);
  return (
    <section aria-labelledby="step2-h">
      <StepHeader title={t('steps.brand.title')} onBack={onBack} backLabel={t('back')} />
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
        {visible.map(b => (
          <button
            key={b.slug}
            type="button"
            onClick={() => onSelect(b.slug)}
            className="group text-left p-5 rounded-xl bg-paper ring-1 ring-ink-100 hover:ring-brand-primary hover:bg-chrome hover:-translate-y-0.5 transition-all duration-fast ease-out-expo"
          >
            <div className="flex items-center justify-between">
              <span className="font-display font-semibold text-lg text-ink-900">{b.name}</span>
              <span className="font-mono text-xs text-ink-500 tabular-nums">{b.totalModelCount}</span>
            </div>
            <p className="mt-1 text-xs text-ink-500">{b.totalModelCount} modelos en catálogo</p>
          </button>
        ))}
      </div>
      {!showAll && brands.length > 7 && (
        <button
          type="button"
          onClick={() => setShowAll(true)}
          className="mt-4 text-sm text-brand-primary hover:underline"
        >
          {t('showAll')} ({brands.length - 7}+)
        </button>
      )}
    </section>
  );
}

// ─── Step 3 — Model ─────────────────────────────────────────────

function Step3({ brandSlug, onBack, onSelect }: { brandSlug: string; onBack: () => void; onSelect: (slug: string) => void }) {
  const t = useTranslations('quote');
  const brand = getBrand(brandSlug);
  const [search, setSearch] = useState('');
  const [showAll, setShowAll] = useState(false);
  const brandModels = useMemo(() => models.filter(m => m.brandSlug === brandSlug), [brandSlug]);
  const filtered = useMemo(() => {
    const sorted = brandModels.sort((a, b) => b.popularityScore - a.popularityScore);
    if (search) {
      const q = search.toLowerCase();
      return sorted.filter(m => m.name.toLowerCase().includes(q) || m.slug.includes(q));
    }
    return showAll ? sorted : sorted.slice(0, 8);
  }, [brandModels, search, showAll]);

  return (
    <section aria-labelledby="step3-h">
      <StepHeader title={`${t('steps.model.title')} — ${brand?.name}`} onBack={onBack} backLabel={t('back')} />
      <input
        type="search"
        placeholder={t('steps.model.search')}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full mb-4 px-4 py-3 rounded-lg bg-paper ring-1 ring-ink-300 focus:ring-2 focus:ring-brand-primary focus:outline-none"
      />
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {filtered.map((m, i) => (
          <button
            key={m.slug}
            type="button"
            onClick={() => onSelect(m.slug)}
            className="group relative text-left p-4 rounded-xl bg-paper ring-1 ring-ink-100 hover:ring-brand-primary hover:bg-chrome hover:-translate-y-0.5 transition-all duration-fast ease-out-expo"
          >
            {i === 0 && (
              <span className="absolute top-2 right-2 px-2 py-0.5 rounded-full bg-brand-secondary text-white text-[10px] font-bold uppercase tracking-widest z-10">
                {t('popular')}
              </span>
            )}
            <ModelImage modelName={m.name} brandSlug={brandSlug} className="mb-3" />
            <p className="font-semibold text-sm text-ink-900">{m.name}</p>
            <p className="mt-0.5 text-xs text-ink-500 font-mono">{m.year}</p>
          </button>
        ))}
      </div>
      {!showAll && !search && brandModels.length > 8 && (
        <button
          type="button"
          onClick={() => setShowAll(true)}
          className="mt-4 text-sm text-brand-primary hover:underline"
        >
          {t('showAll')} ({brandModels.length - 8}+)
        </button>
      )}
      {filtered.length === 0 && (
        <div className="text-center py-8">
          <p className="text-ink-500">{t('noMatch')}</p>
          <a
            href={buildWhatsAppLink(`Hola, busco reparación para un ${brand?.name} pero no veo mi modelo.`)}
            target="_blank"
            rel="noopener"
            className="mt-3 inline-flex items-center gap-2 text-brand-primary hover:underline"
          >
            <MessageCircle size={16} />
            {t('whatsappEscape')}
          </a>
        </div>
      )}
    </section>
  );
}

// ─── Step 4 — Repair type ───────────────────────────────────────

function Step4({ modelSlug, onBack, onSelect }: { modelSlug: string; onBack: () => void; onSelect: (slug: string) => void }) {
  const t = useTranslations('quote');
  const model = getModel(modelSlug);
  if (!model) return null;
  const applicable = repairTypes.filter(r => model.repairTypes.includes(r.slug));
  return (
    <section aria-labelledby="step4-h">
      <StepHeader title={`${t('steps.repair.title')} — ${model.name}`} onBack={onBack} backLabel={t('back')} />
      <ul className="grid gap-2">
        {applicable.map((r, i) => (
          <li key={r.slug}>
            <button
              type="button"
              onClick={() => onSelect(r.slug)}
              className="group w-full text-left p-4 rounded-xl bg-paper ring-1 ring-ink-100 hover:ring-brand-primary hover:bg-chrome transition-all duration-fast ease-out-expo flex items-center gap-4"
            >
              <div className="w-12 h-12 shrink-0 rounded-lg bg-brand-primary/10 text-brand-primary flex items-center justify-center group-hover:bg-brand-primary group-hover:text-white transition-colors">
                <Wrench size={20} aria-hidden />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <p className="font-semibold text-ink-900">{r.name.es}</p>
                  {i === 0 && (
                    <span className="px-2 py-0.5 rounded-full bg-brand-secondary/15 text-brand-secondary text-[10px] font-bold uppercase tracking-widest ring-1 ring-brand-secondary/30">
                      {t('popular')}
                    </span>
                  )}
                </div>
                <p className="text-sm text-ink-500 mt-0.5">{r.description.es}</p>
              </div>
              <div className="text-right shrink-0">
                <p className="text-xs text-ink-500 font-mono uppercase tracking-widest">≈ {r.averageDurationMinutes} min</p>
                <p className="text-xs text-brand-primary font-mono mt-1">{r.warrantyMonths}m garantía</p>
              </div>
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}

// ─── Step 5 — Price reveal + inline booking form ────────────────

function Step5({ modelSlug, repairSlug, onBack }: { modelSlug: string; repairSlug: string; onBack: () => void; onBook: () => void }) {
  const t = useTranslations('quote');
  const model = getModel(modelSlug);
  const repair = getRepairType(repairSlug);
  const price = getPrice(modelSlug, repairSlug);
  const markSubmitted = useQuoteStore(s => s.markSubmitted);

  // Booking form local state
  const [bookingOpen, setBookingOpen] = useState(false);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [flow, setFlow] = useState<'walkin' | 'mailin'>('walkin');
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  // Count-up animation for price
  const [displayMin, setDisplayMin] = useState(0);
  const [displayMax, setDisplayMax] = useState(0);

  useEffect(() => {
    if (!price) return;
    if (typeof window === 'undefined') return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setDisplayMin(price.priceMin);
      setDisplayMax(price.priceMax);
      return;
    }
    const duration = 700;
    const start = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      // easeOutExpo
      const eased = t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
      setDisplayMin(Math.round(price.priceMin * eased));
      setDisplayMax(Math.round(price.priceMax * eased));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [price]);

  const whatsappMsg = `Hola, mi ${model?.name} necesita ${repair?.name.es.toLowerCase()}. Precio estimado: ${price ? formatPrice(price.priceMin, price.priceMax) : 'a consultar'}. ¿Cuándo podéis recibirme?`;

  async function submitBooking(e: React.FormEvent) {
    e.preventDefault();
    if (!model || !repair || !price) return;
    setSubmitting(true);
    setSubmitError(null);
    try {
      const res = await fetch('/api/booking', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          modelSlug: model.slug,
          modelName: model.name,
          repairSlug: repair.slug,
          repairName: repair.name.es,
          priceMin: price.priceMin,
          priceMax: price.priceMax,
          customer: { name, phone, email },
          flow
        })
      });
      if (!res.ok) throw new Error(`Status ${res.status}`);
      const result = await res.json();
      if (!result.ok) throw new Error('booking_failed');
      markSubmitted({
        reference: result.reference,
        callback: result.callback,
        booking: result.booking
      });
    } catch (err) {
      setSubmitError('No se pudo enviar la reserva. Inténtalo de nuevo o escríbenos por WhatsApp.');
      setSubmitting(false);
    }
  }

  return (
    <section aria-labelledby="step5-h">
      <StepHeader title={t('steps.price.title')} onBack={onBack} backLabel={t('back')} />

      <div className="text-center py-6 lg:py-10">
        <p className="text-sm text-ink-500 uppercase tracking-widest font-mono mb-2">
          {model?.name} · {repair?.name.es}
        </p>

        {price ? (
          <>
            <p
              className="font-mono font-bold tabular-nums mt-3 tracking-tight"
              style={{
                fontSize: 'clamp(3rem, 2rem + 6vw, 6rem)',
                lineHeight: 1,
                background: 'linear-gradient(135deg, var(--color-brand-primary) 0%, var(--color-brand-secondary) 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}
              aria-label={`Precio estimado entre ${price.priceMin} y ${price.priceMax} euros`}
            >
              {formatPrice(displayMin, displayMax)}
            </p>
            <p className="mt-3 text-xs text-ink-500 uppercase tracking-widest">{t('price.rangeLabel')}</p>
          </>
        ) : (
          <p className="mt-6 text-lg text-ink-700">Consulta el precio por WhatsApp</p>
        )}

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-paper ring-1 ring-ink-100 text-sm text-ink-700">
            <Clock size={14} className="text-brand-primary" aria-hidden /> 40 min
          </span>
          <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-paper ring-1 ring-ink-100 text-sm text-ink-700">
            <ShieldCheck size={14} className="text-brand-accent" aria-hidden /> {repair?.warrantyMonths}m garantía
          </span>
          <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-paper ring-1 ring-ink-100 text-sm text-ink-700">
            <Check size={14} className="text-brand-accent" aria-hidden /> Diagnóstico gratuito
          </span>
        </div>

        <p className="mt-6 text-sm text-ink-500">{t('price.confidence')}</p>
      </div>

      {/* Anchoring */}
      {model?.msrpAtRelease && price && (
        <div className="bg-paper rounded-xl p-5 text-center mb-4 ring-1 ring-ink-100">
          <p className="text-sm text-ink-700">
            Comprar un <strong>{model.name}</strong> nuevo cuesta unos{' '}
            <span className="font-mono text-ink-900">{formatPrice(model.msrpAtRelease, model.msrpAtRelease)}</span>.{' '}
            Repararlo cuesta unos{' '}
            <span className="font-mono font-bold text-brand-primary">{formatPrice(price.priceMin, price.priceMax)}</span>.
          </p>
        </div>
      )}

      {/* F19 — social proof at the peak moment: a real Google review on this
          repair category, plus an aggregate-action signal */}
      <div className="bg-gradient-to-br from-brand-primary/8 to-brand-secondary/8 rounded-xl p-5 mb-6 ring-1 ring-brand-primary/20">
        <div className="flex items-start gap-3">
          <div className="flex gap-0.5 shrink-0">
            {[0, 0, 0, 0, 0].map((_, i) => (
              <span key={i} className="text-brand-secondary text-sm leading-none">★</span>
            ))}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm text-ink-900 leading-relaxed italic">
              &ldquo;Cambié la pantalla de mi iPhone X, en 15 minutos estaba lista y el precio realmente bueno. Los chicos muy agradables.&rdquo;
            </p>
            <p className="mt-2 text-xs text-ink-500">
              <span className="font-mono">Cliente verificado</span> · <a href="https://www.google.com/maps/place/COBOPHONE/" target="_blank" rel="noopener noreferrer" className="text-brand-primary hover:underline">reseña en Google</a>
            </p>
          </div>
        </div>
      </div>

      {!bookingOpen ? (
        <div className="grid sm:grid-cols-2 gap-3">
          <button
            type="button"
            onClick={() => setBookingOpen(true)}
            className="inline-flex items-center justify-center gap-2 h-14 px-6 rounded-xl bg-brand-primary text-white font-medium hover:bg-brand-primary-hover transition-colors shadow-pop"
          >
            {t('price.bookCta')}
            <ArrowRight size={18} aria-hidden />
          </button>
          <ButtonLink
            href={buildWhatsAppLink(whatsappMsg)}
            target="_blank"
            rel="noopener"
            variant="whatsapp"
            size="lg"
          >
            <MessageCircle size={18} aria-hidden />
            {t('price.whatsappCta')}
          </ButtonLink>
        </div>
      ) : (
        <form onSubmit={submitBooking} className="bg-paper rounded-xl p-5 lg:p-6 ring-1 ring-ink-100 space-y-4">
          <div className="flex items-center justify-between">
            <p className="text-sm font-semibold text-ink-900">Reservar reparación</p>
            <button type="button" onClick={() => setBookingOpen(false)} className="text-xs text-ink-500 hover:text-ink-900">
              Cancelar
            </button>
          </div>

          <div className="grid sm:grid-cols-2 gap-3">
            <label className="block">
              <span className="block text-xs font-medium text-ink-900 mb-1.5">Nombre *</span>
              <input
                type="text"
                required
                autoComplete="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3 py-2.5 rounded-lg bg-chrome ring-1 ring-ink-300 focus:ring-2 focus:ring-brand-primary focus:outline-none text-sm"
              />
            </label>
            <label className="block">
              <span className="block text-xs font-medium text-ink-900 mb-1.5">Teléfono *</span>
              <input
                type="tel"
                required
                autoComplete="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+34 ..."
                className="w-full px-3 py-2.5 rounded-lg bg-chrome ring-1 ring-ink-300 focus:ring-2 focus:ring-brand-primary focus:outline-none text-sm"
              />
            </label>
          </div>

          <label className="block">
            <span className="block text-xs font-medium text-ink-900 mb-1.5">Email <span className="text-ink-500">(opcional, para el resguardo)</span></span>
            <input
              type="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2.5 rounded-lg bg-chrome ring-1 ring-ink-300 focus:ring-2 focus:ring-brand-primary focus:outline-none text-sm"
            />
          </label>

          <fieldset>
            <legend className="block text-xs font-medium text-ink-900 mb-2">¿Cómo prefieres?</legend>
            <div className="grid grid-cols-2 gap-2">
              <label className={cn(
                'flex items-center gap-2 px-3 py-2.5 rounded-lg ring-1 cursor-pointer text-sm',
                flow === 'walkin' ? 'ring-brand-primary bg-brand-primary/5' : 'ring-ink-300 bg-chrome hover:ring-ink-900'
              )}>
                <input type="radio" name="flow" value="walkin" checked={flow === 'walkin'} onChange={() => setFlow('walkin')} className="text-brand-primary focus:ring-brand-primary" />
                <span>Pasar por la tienda</span>
              </label>
              <label className={cn(
                'flex items-center gap-2 px-3 py-2.5 rounded-lg ring-1 cursor-pointer text-sm',
                flow === 'mailin' ? 'ring-brand-primary bg-brand-primary/5' : 'ring-ink-300 bg-chrome hover:ring-ink-900'
              )}>
                <input type="radio" name="flow" value="mailin" checked={flow === 'mailin'} onChange={() => setFlow('mailin')} className="text-brand-primary focus:ring-brand-primary" />
                <span>Recogida / envío</span>
              </label>
            </div>
          </fieldset>

          {submitError && (
            <div className="flex items-start gap-2 p-3 bg-danger/10 ring-1 ring-danger/30 rounded-lg text-xs text-ink-900">
              <span className="text-danger">⚠</span> {submitError}
            </div>
          )}

          <button
            type="submit"
            disabled={submitting}
            className="w-full inline-flex items-center justify-center gap-2 h-12 px-6 rounded-xl bg-brand-primary text-white font-medium hover:bg-brand-primary-hover transition-colors disabled:opacity-60 disabled:cursor-not-allowed shadow-pop"
          >
            {submitting ? 'Enviando…' : 'Confirmar reserva'}
            {!submitting && <ArrowRight size={18} aria-hidden />}
          </button>

          <p className="text-[11px] text-ink-500 text-center">
            Al enviar, aceptas que un técnico de CoboPhone te contacte sobre esta reparación.{' '}
            <a href="/legal/privacidad" className="underline">Política de privacidad</a>.
          </p>
        </form>
      )}

      <p className="mt-4 text-xs text-center text-ink-500">{t('price.uploadPhoto')}</p>
    </section>
  );
}

// ─── Step 6 — Confirmation (peak-end moment) ────────────────────

function Step6Confirmation() {
  const state = useQuoteStore();
  const result = state.bookingResult;
  const model = state.modelSlug ? getModel(state.modelSlug) : null;
  const repair = state.repairSlug ? getRepairType(state.repairSlug) : null;

  // If no booking result (deep link or refresh), gracefully fall back.
  if (!result || !model || !repair) {
    return (
      <section className="text-center py-8" aria-labelledby="step6-h">
        <h2 id="step6-h" className="text-2xl font-semibold">Reserva no disponible</h2>
        <p className="mt-3 text-ink-700">Vuelve a empezar el presupuesto o escríbenos por WhatsApp.</p>
        <a
          href={buildWhatsAppLink('Hola, quería volver a reservar una reparación.')}
          target="_blank"
          rel="noopener"
          className="mt-6 inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-[#25D366] text-white font-medium hover:bg-[#1DA851]"
        >
          <MessageCircle size={16} /> WhatsApp
        </a>
      </section>
    );
  }

  // Build a .ics calendar event for the callback
  const calendarUrl = buildIcsDataUrl({
    title: `CoboPhone te llama — ${result.booking.modelName}`,
    description: `Llamada de confirmación para reparación: ${result.booking.repairName}. Referencia ${result.reference}.`,
    start: new Date(result.callback.iso),
    durationMin: 15
  });

  return (
    <section className="py-8 lg:py-12" aria-labelledby="step6-h">
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-brand-accent text-white mb-6">
          <Check size={32} />
        </div>
        <h2 id="step6-h" className="text-3xl font-semibold">Reserva confirmada.</h2>
        <p className="mt-3 text-lg text-ink-700">
          Te llamamos {result.callback.label} para confirmar el horario y la pieza.
        </p>
      </div>

      {/* Reference + booking summary */}
      <div className="mt-8 max-w-md mx-auto bg-paper rounded-xl ring-1 ring-ink-100 overflow-hidden">
        <div className="px-6 py-4 bg-brand-primary/5 border-b border-ink-100 flex items-center justify-between">
          <span className="text-xs uppercase tracking-widest text-ink-500 font-mono">Referencia</span>
          <span className="text-sm font-mono font-bold text-brand-primary tabular-nums">{result.reference}</span>
        </div>
        <div className="px-6 py-5 space-y-2">
          <p className="text-ink-900"><strong>{result.booking.modelName}</strong></p>
          <p className="text-sm text-ink-700">{result.booking.repairName}</p>
          <p className="text-sm text-ink-700">
            <span className="font-mono tabular-nums">{formatPrice(result.booking.priceMin, result.booking.priceMax)}</span>
            {' · '}{repair.warrantyMonths} meses garantía · {result.booking.flow === 'walkin' ? 'En tienda' : 'Recogida / envío'}
          </p>
        </div>
      </div>

      {/* Qué traer / Next steps */}
      <div className="mt-6 max-w-md mx-auto bg-chrome rounded-xl ring-1 ring-ink-100 p-6">
        <p className="text-xs uppercase tracking-widest text-ink-500 font-mono mb-3">Qué tener listo</p>
        <ul className="space-y-2 text-sm text-ink-900">
          <li className="flex items-start gap-2">
            <Check size={14} className="text-brand-accent mt-0.5 shrink-0" aria-hidden />
            <span>Tu {result.booking.modelName}, encendido si es posible.</span>
          </li>
          <li className="flex items-start gap-2">
            <Check size={14} className="text-brand-accent mt-0.5 shrink-0" aria-hidden />
            <span>Patrón / PIN si lo tiene puesto (lo necesitamos para probarlo después).</span>
          </li>
          <li className="flex items-start gap-2">
            <Check size={14} className="text-brand-accent mt-0.5 shrink-0" aria-hidden />
            <span>{result.booking.flow === 'walkin' ? 'Pasa por Calle Bembibre 5, Cobo Calleja, en horario.' : 'Te mandamos etiqueta prepagada por email/WhatsApp.'}</span>
          </li>
        </ul>
      </div>

      {/* Actions */}
      <div className="mt-6 max-w-md mx-auto flex flex-col sm:flex-row gap-3">
        <a
          href={calendarUrl}
          download="cobophone.ics"
          className="flex-1 inline-flex items-center justify-center gap-2 h-12 px-5 rounded-lg bg-chrome ring-1 ring-ink-300 text-ink-900 font-medium hover:ring-brand-primary transition-colors text-sm"
        >
          <Clock size={16} aria-hidden /> Añadir al calendario
        </a>
        <a
          href={buildWhatsAppLink(`Hola, acabo de reservar (ref. ${result.reference}). Tengo una duda.`)}
          target="_blank"
          rel="noopener"
          className="flex-1 inline-flex items-center justify-center gap-2 h-12 px-5 rounded-lg bg-[#25D366] text-white font-medium hover:bg-[#1DA851] transition-colors text-sm"
        >
          <MessageCircle size={16} aria-hidden /> WhatsApp
        </a>
      </div>

      <p className="mt-8 text-xs text-center text-ink-500 max-w-sm mx-auto">
        Si no recibes nuestra llamada en el tiempo indicado, escríbenos por WhatsApp con la referencia.
      </p>
    </section>
  );
}

/** Build a data: URL for a downloadable .ics calendar event. */
function buildIcsDataUrl({ title, description, start, durationMin }: { title: string; description: string; start: Date; durationMin: number }) {
  const fmt = (d: Date) =>
    `${d.getUTCFullYear()}${String(d.getUTCMonth() + 1).padStart(2, '0')}${String(d.getUTCDate()).padStart(2, '0')}T${String(d.getUTCHours()).padStart(2, '0')}${String(d.getUTCMinutes()).padStart(2, '0')}00Z`;
  const end = new Date(start.getTime() + durationMin * 60 * 1000);
  const ics = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//CoboPhone//Reservation//ES',
    'BEGIN:VEVENT',
    `UID:${Math.random().toString(36).slice(2)}@cobophone.es`,
    `DTSTAMP:${fmt(new Date())}`,
    `DTSTART:${fmt(start)}`,
    `DTEND:${fmt(end)}`,
    `SUMMARY:${title}`,
    `DESCRIPTION:${description}`,
    'LOCATION:Calle Bembibre 5, Cobo Calleja, Fuenlabrada, Madrid',
    'END:VEVENT',
    'END:VCALENDAR'
  ].join('\r\n');
  return `data:text/calendar;charset=utf-8,${encodeURIComponent(ics)}`;
}

// ─── Helpers ────────────────────────────────────────────────────

function StepHeader({ title, onBack, backLabel }: { title: string; onBack: () => void; backLabel: string }) {
  return (
    <div className="flex items-center gap-3 mb-6">
      <button
        type="button"
        onClick={onBack}
        className="inline-flex items-center gap-1.5 text-sm text-ink-500 hover:text-ink-900 transition-colors"
      >
        <ArrowLeft size={16} />
        {backLabel}
      </button>
      <span className="text-ink-300">·</span>
      <h2 className="text-2xl font-semibold flex-1">{title}</h2>
    </div>
  );
}
