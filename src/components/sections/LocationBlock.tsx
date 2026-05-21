'use client';

import Link from 'next/link';
import { useTranslations, useLocale } from 'next-intl';
import { useEffect, useState } from 'react';
import { MapPin, Clock, ArrowRight, Car, Train } from 'lucide-react';
import { cobophoneLocation } from '@/data/location';
import { getOpenStatus } from '@/lib/utils';

export function LocationBlock() {
  const t = useTranslations('home.location');
  const tCommon = useTranslations('common');
  const locale = useLocale() as 'es' | 'en' | 'zh';
  const prefix = locale === 'es' ? '' : `/${locale}`;

  const [status, setStatus] = useState<{ open: boolean; closesAt?: string; opensAt?: string } | null>(null);
  useEffect(() => {
    setStatus(getOpenStatus(cobophoneLocation.hours));
  }, []);

  return (
    <section className="py-section bg-paper" aria-labelledby="location-heading">
      <div className="container-fluid">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          <div className="lg:col-span-6">
            <div className="inline-flex items-center gap-2 text-xs text-ink-500 uppercase tracking-widest mb-4">
              <span className="w-8 h-px bg-brand-primary" aria-hidden />
              {t('eyebrow')}
            </div>
            <h2 id="location-heading" className="text-balance">{t('headline')}</h2>
            <p className="mt-6 text-lg text-ink-700 leading-relaxed">{t('body')}</p>

            {/* Status pill */}
            <div className="mt-6 inline-flex items-center gap-3 px-4 py-2 rounded-full bg-chrome shadow-card ring-1 ring-ink-100">
              <span
                className={`w-2.5 h-2.5 rounded-full ${status?.open ? 'bg-brand-accent' : 'bg-ink-300'}`}
                aria-hidden
              />
              <span className="text-sm font-medium text-ink-900">
                {status?.open ? tCommon('openNow') : status?.opensAt ? `${tCommon('closed')} · ${tCommon('opensIn', { time: status.opensAt })}` : tCommon('closed')}
              </span>
              {status?.open && status.closesAt && (
                <span className="text-xs text-ink-500 font-mono">hasta {status.closesAt}</span>
              )}
            </div>

            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <Link
                href={`${prefix}/ubicacion`}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-ink-900 text-white font-medium hover:bg-ink-700 transition-colors duration-fast"
              >
                {t('cta')}
                <ArrowRight size={16} aria-hidden />
              </Link>
              <a
                href="tel:+34911234567"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-paper ring-1 ring-ink-300 text-ink-900 font-medium hover:bg-ink-100 transition-colors duration-fast"
              >
                {tCommon('callNow')}
              </a>
            </div>

            <dl className="mt-8 space-y-3 text-sm">
              <div className="flex gap-3">
                <dt className="shrink-0 w-6"><MapPin size={16} className="text-ink-500" aria-hidden /></dt>
                <dd className="text-ink-700">{cobophoneLocation.address.street}, {cobophoneLocation.address.postalCode} {cobophoneLocation.address.city}, {cobophoneLocation.address.region}</dd>
              </div>
              <div className="flex gap-3">
                <dt className="shrink-0 w-6"><Clock size={16} className="text-ink-500" aria-hidden /></dt>
                <dd className="text-ink-700">L–V 10:00–19:00 · Sáb cerrado · Dom 10:00–19:00</dd>
              </div>
              <div className="flex gap-3">
                <dt className="shrink-0 w-6"><Train size={16} className="text-ink-500" aria-hidden /></dt>
                <dd className="text-ink-700">{cobophoneLocation.transit?.[locale] ?? cobophoneLocation.transit?.es}</dd>
              </div>
              <div className="flex gap-3">
                <dt className="shrink-0 w-6"><Car size={16} className="text-ink-500" aria-hidden /></dt>
                <dd className="text-ink-700">{cobophoneLocation.parking?.[locale] ?? cobophoneLocation.parking?.es}</dd>
              </div>
            </dl>
          </div>

          <div className="lg:col-span-6">
            <MapPlaceholder />
          </div>
        </div>
      </div>
    </section>
  );
}

/** Map placeholder — production swap with Mapbox GL JS (see HANDOFF.md) */
function MapPlaceholder() {
  return (
    <div className="relative aspect-[4/3] rounded-2xl bg-shadow-blue dot-grid overflow-hidden shadow-elevated ring-1 ring-ink-100">
      <div className="absolute inset-0 bg-gradient-to-br from-shadow-blue via-shadow-blue to-shadow-blue-deep opacity-90" />

      {/* Mock road lines */}
      <svg className="absolute inset-0 w-full h-full opacity-30" viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg" aria-hidden>
        <path d="M0 150 L400 150" stroke="white" strokeWidth="0.5" />
        <path d="M0 100 L400 130" stroke="white" strokeWidth="0.3" />
        <path d="M200 0 L200 300" stroke="white" strokeWidth="0.5" />
        <path d="M150 0 L180 300" stroke="white" strokeWidth="0.3" />
        <path d="M0 220 L400 230" stroke="white" strokeWidth="0.4" />
      </svg>

      {/* Pin */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="relative">
          <div className="absolute inset-0 w-16 h-16 -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-primary/30 animate-ping" style={{ animationDuration: '3s' }} />
          <div className="relative w-10 h-10 rounded-full bg-brand-primary text-white flex items-center justify-center shadow-pop ring-4 ring-white">
            <MapPin size={18} aria-hidden />
          </div>
        </div>
      </div>

      {/* Label */}
      <div className="absolute bottom-4 left-4 right-4 bg-chrome/95 backdrop-blur-sm rounded-xl p-4 shadow-card">
        <p className="text-xs uppercase tracking-widest text-ink-500 font-mono">Tienda principal</p>
        <p className="mt-1 text-sm font-medium text-ink-900">Calle Bembibre 5, Cobo Calleja</p>
        <p className="text-xs text-ink-500">Fuenlabrada, Madrid · 28947</p>
      </div>
    </div>
  );
}
