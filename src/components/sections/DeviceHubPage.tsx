import Link from 'next/link';
import { ArrowRight, MessageCircle, Clock, ShieldCheck, Check } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { repairTypes } from '@/data/repair-types';
import type { DeviceCategory } from '@/data/types';
import { buildWhatsAppLink } from '@/lib/utils';

/**
 * Shared device-category hub for tablet, portátil, smartwatch, consola,
 * televisión, patinete-electrico. The mobile category gets its own bespoke
 * page because of the deeper brand+model catalog.
 *
 * Pulls applicable repair types from the data layer (`repair-types.ts`) so
 * adding a repair to the catalog automatically surfaces it on every relevant
 * device hub.
 */
export interface DeviceHubConfig {
  category: DeviceCategory;
  /** Human-readable label, e.g. "tablet" */
  label: string;
  /** H1 — e.g. "Reparación de tablet en Madrid." */
  h1: string;
  /** Short sub-line under the H1 */
  sub: string;
  /** Icon shown in the hero stat card (a lucide-react icon) */
  Icon: LucideIcon;
  /** Common brand names — populates the brand mention strip */
  commonBrands: string[];
  /** Estimated lower-bound starting price for the marquee number */
  fromPrice: number;
  /** Short example issues for the "Problemas frecuentes" block */
  commonIssues: Array<{ title: string; body: string }>;
  /** WhatsApp prefill */
  whatsappMessage: string;
}

export function DeviceHubPage({ config }: { config: DeviceHubConfig }) {
  const applicableRepairs = repairTypes.filter(
    r => r.applicableCategories.includes(config.category) && r.slug !== 'otros'
  );

  return (
    <>
      <section className="pt-28 lg:pt-40 pb-12 lg:pb-20 bg-paper">
        <div className="container-fluid">
          <nav aria-label="Breadcrumb" className="text-sm text-ink-500 mb-6">
            <Link href="/" className="hover:text-ink-900">Inicio</Link>
            <span className="mx-2">›</span>
            <Link href="/reparacion" className="hover:text-ink-900">Reparación</Link>
            <span className="mx-2">›</span>
            <span className="text-ink-900 capitalize">{config.label}</span>
          </nav>

          <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-end">
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 text-xs text-ink-500 uppercase tracking-widest mb-4">
                <span className="w-8 h-px bg-brand-primary" aria-hidden />
                Reparación · {config.label}
              </div>
              <h1 className="text-balance">{config.h1}</h1>
              <p className="mt-6 max-w-2xl text-lg text-ink-700 leading-relaxed">{config.sub}</p>

              <div className="mt-8 flex flex-wrap gap-3">
                <Badge>40 min para reparaciones estándar</Badge>
                <Badge>3 meses de garantía</Badge>
                <Badge>Diagnóstico gratuito</Badge>
              </div>

              <div className="mt-10 flex flex-col sm:flex-row gap-3">
                <Link
                  href={`/presupuesto?dispositivo=${config.category}`}
                  className="inline-flex items-center justify-center gap-2 h-14 px-7 rounded-xl bg-brand-primary text-white font-medium hover:bg-brand-primary-hover transition-colors shadow-pop"
                >
                  Calcular precio
                  <ArrowRight size={18} aria-hidden />
                </Link>
                <a
                  href={buildWhatsAppLink(config.whatsappMessage)}
                  target="_blank"
                  rel="noopener"
                  className="inline-flex items-center justify-center gap-2 h-14 px-7 rounded-xl bg-[#25D366] text-white font-medium hover:bg-[#1DA851] transition-colors"
                >
                  <MessageCircle size={18} aria-hidden />
                  Hablar por WhatsApp
                </a>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="bg-chrome rounded-3xl p-8 ring-1 ring-ink-100 shadow-card">
                <div className="w-14 h-14 rounded-2xl bg-brand-primary/10 text-brand-primary flex items-center justify-center mb-6">
                  <config.Icon size={28} aria-hidden />
                </div>
                <p className="text-xs uppercase tracking-widest text-ink-500 font-mono">Desde</p>
                <p className="mt-2 font-mono text-5xl font-bold tabular-nums text-ink-900">€{config.fromPrice}</p>
                <p className="mt-2 text-sm text-ink-700">para reparaciones estándar. El precio exacto depende del modelo y el daño.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Common brands strip */}
      {config.commonBrands.length > 0 && (
        <section className="py-12 bg-chrome">
          <div className="container-fluid">
            <p className="text-xs text-ink-500 uppercase tracking-widest font-mono mb-5 text-center">Reparamos las marcas que conoces</p>
            <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
              {config.commonBrands.map(brand => (
                <span key={brand} className="font-display font-semibold text-lg lg:text-xl text-ink-500 hover:text-ink-900 transition-colors">
                  {brand}
                </span>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Repair types */}
      <section className="py-section bg-paper" aria-labelledby="repairs-h">
        <div className="container-fluid">
          <div className="max-w-2xl mb-10">
            <h2 id="repairs-h">Reparaciones disponibles</h2>
            <p className="mt-3 text-ink-700">Cada reparación tiene un tiempo estimado y garantía propia. Lo confirmamos en 2 minutos por WhatsApp después del diagnóstico.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-3">
            {applicableRepairs.map(r => (
              <article key={r.slug} className="bg-chrome rounded-2xl p-6 ring-1 ring-ink-100 shadow-card">
                <div className="flex items-start justify-between gap-4 mb-3">
                  <h3 className="text-lg font-semibold text-ink-900">{r.name.es}</h3>
                  <div className="flex flex-col items-end gap-1 shrink-0">
                    <span className="text-xs font-mono text-ink-500 uppercase tracking-widest flex items-center gap-1.5">
                      <Clock size={12} /> {r.averageDurationMinutes} min
                    </span>
                    <span className="text-xs font-mono text-brand-accent uppercase tracking-widest flex items-center gap-1.5">
                      <ShieldCheck size={12} /> {r.warrantyMonths}m garantía
                    </span>
                  </div>
                </div>
                <p className="text-sm text-ink-700 leading-relaxed">{r.description.es}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Common issues */}
      {config.commonIssues.length > 0 && (
        <section className="py-section bg-chrome" aria-labelledby="issues-h">
          <div className="container-fluid">
            <h2 id="issues-h" className="mb-10">Problemas frecuentes</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {config.commonIssues.map((issue, i) => (
                <article key={i} className="bg-paper rounded-2xl p-6 ring-1 ring-ink-100">
                  <h3 className="text-base font-semibold text-ink-900 mb-2">{issue.title}</h3>
                  <p className="text-sm text-ink-700 leading-relaxed">{issue.body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="py-section bg-shadow-blue text-white" data-surface="dark">
        <div className="container-narrow text-center">
          <h2 className="text-white text-balance">Empieza el presupuesto en 30 segundos.</h2>
          <p className="mt-4 text-ink-700 max-w-lg mx-auto">Marca, modelo, fallo. Te damos un rango cerrado. Sin compromiso.</p>
          <Link
            href={`/presupuesto?dispositivo=${config.category}`}
            className="mt-8 inline-flex items-center gap-2 px-7 py-4 rounded-xl bg-brand-secondary text-white font-medium hover:bg-brand-secondary-hover transition-colors shadow-pop"
          >
            Calcular precio
            <ArrowRight size={18} aria-hidden />
          </Link>
        </div>
      </section>
    </>
  );
}

function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-chrome ring-1 ring-ink-100 text-sm text-ink-700">
      <Check size={14} className="text-brand-accent" aria-hidden /> {children}
    </span>
  );
}
