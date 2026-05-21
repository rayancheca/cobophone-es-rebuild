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
              onBook={() => state.markSubmitted()}
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
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
        {categories.map(c => {
          const Icon = c.icon;
          return (
            <button
              key={c.slug}
              type="button"
              onClick={() => onSelect(c.slug)}
              className="group text-left p-5 rounded-xl bg-paper ring-1 ring-ink-100 hover:ring-brand-primary hover:bg-chrome hover:-translate-y-0.5 transition-all duration-fast ease-out-expo"
            >
              <div className="w-11 h-11 rounded-lg bg-brand-primary/10 text-brand-primary flex items-center justify-center group-hover:bg-brand-primary group-hover:text-white transition-colors">
                <Icon size={22} aria-hidden />
              </div>
              <p className="mt-4 font-semibold text-ink-900">{c.name}</p>
              <p className="mt-1 text-xs text-ink-500">{c.desc}</p>
            </button>
          );
        })}
      </div>
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

// ─── Step 5 — Price reveal ──────────────────────────────────────

function Step5({ modelSlug, repairSlug, onBack, onBook }: { modelSlug: string; repairSlug: string; onBack: () => void; onBook: () => void }) {
  const t = useTranslations('quote');
  const model = getModel(modelSlug);
  const repair = getRepairType(repairSlug);
  const price = getPrice(modelSlug, repairSlug);

  const whatsappMsg = `Hola, mi ${model?.name} necesita ${repair?.name.es.toLowerCase()}. Precio estimado: ${price ? formatPrice(price.priceMin, price.priceMax) : 'a consultar'}. ¿Cuándo podéis recibirme?`;

  return (
    <section aria-labelledby="step5-h">
      <StepHeader title={t('steps.price.title')} onBack={onBack} backLabel={t('back')} />

      <div className="text-center py-6 lg:py-10">
        <p className="text-sm text-ink-500 uppercase tracking-widest font-mono mb-2">
          {model?.name} · {repair?.name.es}
        </p>

        {price ? (
          <>
            <p className="font-mono font-bold tabular-nums text-ink-900 mt-3 tracking-tight"
               style={{ fontSize: 'clamp(3rem, 2rem + 6vw, 6rem)', lineHeight: 1 }}>
              {formatPrice(price.priceMin, price.priceMax)}
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
        <div className="bg-paper rounded-xl p-5 text-center mb-6 ring-1 ring-ink-100">
          <p className="text-sm text-ink-700">
            Comprar un <strong>{model.name}</strong> nuevo cuesta unos{' '}
            <span className="font-mono text-ink-900">{formatPrice(model.msrpAtRelease, model.msrpAtRelease)}</span>.{' '}
            Repararlo cuesta unos{' '}
            <span className="font-mono font-bold text-brand-primary">{formatPrice(price.priceMin, price.priceMax)}</span>.
          </p>
        </div>
      )}

      <div className="grid sm:grid-cols-2 gap-3">
        <button
          type="button"
          onClick={onBook}
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

      <p className="mt-4 text-xs text-center text-ink-500">{t('price.uploadPhoto')}</p>
    </section>
  );
}

// ─── Step 6 — Confirmation (peak-end moment) ────────────────────

function Step6Confirmation() {
  const t = useTranslations('quote');
  const state = useQuoteStore();
  const model = state.modelSlug ? getModel(state.modelSlug) : null;
  const repair = state.repairSlug ? getRepairType(state.repairSlug) : null;

  return (
    <section className="text-center py-8 lg:py-12" aria-labelledby="step6-h">
      <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-brand-accent text-white mb-6">
        <Check size={32} />
      </div>
      <h2 id="step6-h" className="text-3xl font-semibold">{t('confirm.received')}</h2>
      <p className="mt-3 text-lg text-ink-700">{t('confirm.next')}</p>

      <div className="mt-8 bg-paper rounded-xl p-6 text-left max-w-md mx-auto ring-1 ring-ink-100">
        <p className="text-xs uppercase tracking-widest text-ink-500 font-mono mb-3">Resumen</p>
        {model && <p className="text-ink-900"><strong>{model.name}</strong></p>}
        {repair && <p className="text-ink-700">{repair.name.es} · {repair.warrantyMonths} meses de garantía</p>}
      </div>

      <p className="mt-8 text-sm text-ink-500">
        ¿Tienes una duda?{' '}
        <a href={buildWhatsAppLink('Hola, acabo de reservar una reparación, tengo una duda.')} target="_blank" rel="noopener" className="text-brand-primary hover:underline">
          Escríbenos por WhatsApp.
        </a>
      </p>
    </section>
  );
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
