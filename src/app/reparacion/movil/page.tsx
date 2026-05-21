import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, MessageCircle, Smartphone, Clock, ShieldCheck, Check } from 'lucide-react';
import { brands } from '@/data/brands';
import { repairTypes } from '@/data/repair-types';
import { buildWhatsAppLink } from '@/lib/utils';

export const metadata: Metadata = {
  // F7 — title trimmed to fit Google SERP (was 74 chars after brand suffix).
  title: 'Reparación de móviles en Madrid · 600+ modelos',
  description:
    'Reparamos pantalla, batería, cámara, conector de carga y placa de todos los modelos. Samsung, iPhone, Xiaomi, Oppo, Huawei, Google y más. 40 min · 3 meses de garantía · diagnóstico gratuito.'
};

const mobileRepairs = repairTypes.filter(r => r.applicableCategories.includes('movil') && r.slug !== 'otros');

export default function ReparacionMovilPage() {
  return (
    <>
      <section className="pt-28 lg:pt-40 pb-12 lg:pb-20 bg-paper">
        <div className="container-fluid">
          <nav aria-label="Breadcrumb" className="text-sm text-ink-500 mb-6">
            <Link href="/" className="hover:text-ink-900">Inicio</Link>
            <span className="mx-2">›</span>
            <Link href="/reparacion" className="hover:text-ink-900">Reparación</Link>
            <span className="mx-2">›</span>
            <span className="text-ink-900">Móviles</span>
          </nav>

          <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-end">
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 text-xs text-ink-500 uppercase tracking-widest mb-4">
                <span className="w-8 h-px bg-brand-primary" aria-hidden />
                Reparación · Móviles
              </div>
              <h1 className="text-balance">Reparación de móviles en Madrid.</h1>
              <p className="mt-6 max-w-2xl text-lg text-ink-700 leading-relaxed">
                8 marcas principales. Más de 600 modelos en catálogo. Pantalla, batería, cámara,
                conector de carga, placa base y daño por agua. Si tu marca no aparece, te la
                reparamos igual — sólo tenemos que mirar la pieza.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <Badge>40 min reparación estándar</Badge>
                <Badge>3 meses de garantía</Badge>
                <Badge>Diagnóstico gratuito</Badge>
              </div>

              <div className="mt-10 flex flex-col sm:flex-row gap-3">
                <Link
                  href="/presupuesto?dispositivo=movil"
                  className="inline-flex items-center justify-center gap-2 h-14 px-7 rounded-xl bg-brand-primary text-white font-medium hover:bg-brand-primary-hover transition-colors shadow-pop"
                >
                  Calcular precio
                  <ArrowRight size={18} aria-hidden />
                </Link>
                <a
                  href={buildWhatsAppLink('Hola, mi móvil necesita reparación. ¿Cuándo podéis recibirme?')}
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
                <p className="text-xs uppercase tracking-widest text-ink-500 font-mono">Catálogo</p>
                <p className="mt-2 font-mono text-5xl font-bold tabular-nums text-ink-900">600+</p>
                <p className="mt-2 text-ink-700">Modelos cubiertos entre Samsung, iPhone, Xiaomi, Oppo, Realme, Huawei, Google, Honor y más.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Brand grid */}
      <section className="py-section bg-chrome" aria-labelledby="brands-h">
        <div className="container-fluid">
          <div className="flex items-end justify-between mb-10 flex-wrap gap-4">
            <h2 id="brands-h">Elige tu marca</h2>
            <p className="text-sm text-ink-500 font-mono">8 marcas · {brands.reduce((sum, b) => sum + b.totalModelCount, 0)}+ modelos</p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {brands.map(b => (
              <Link
                key={b.slug}
                href={`/reparacion/movil/${b.slug}`}
                className="group relative bg-paper rounded-2xl p-6 ring-1 ring-ink-100 hover:ring-brand-primary hover:-translate-y-0.5 transition-all duration-fast shadow-card"
              >
                <div className="flex items-center justify-between mb-6">
                  <span className="font-display font-bold text-xl text-ink-900 tracking-tight">{b.name}</span>
                  <span className="font-mono text-xs text-ink-500 tabular-nums">{b.totalModelCount}</span>
                </div>
                <p className="text-sm text-ink-500 group-hover:text-brand-primary transition-colors">
                  Ver reparaciones →
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Repair types grid */}
      <section className="py-section bg-paper" aria-labelledby="repairs-h">
        <div className="container-fluid">
          <div className="max-w-2xl mb-10">
            <h2 id="repairs-h">Reparaciones disponibles</h2>
            <p className="mt-3 text-ink-700">Cada reparación tiene un tiempo estimado y garantía propia. Lo confirmamos en 2 minutos por WhatsApp después del diagnóstico.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-3">
            {mobileRepairs.map(r => (
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

      {/* CTA */}
      <section className="py-section bg-shadow-blue text-white" data-surface="dark">
        <div className="container-narrow text-center">
          <h2 className="text-white text-balance">¿Sabes el modelo? Te damos el precio cerrado.</h2>
          <p className="mt-4 text-ink-700 max-w-lg mx-auto">30 segundos. Sin compromiso. Lo confirmamos en 2 min por WhatsApp.</p>
          <Link
            href="/presupuesto?dispositivo=movil"
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
