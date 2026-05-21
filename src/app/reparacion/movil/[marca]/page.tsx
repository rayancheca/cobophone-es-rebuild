import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowRight } from 'lucide-react';
import { getBrand, brands } from '@/data/brands';
import { models } from '@/data/models';
import { repairTypes } from '@/data/repair-types';
import { ModelImage } from '@/components/ui/ModelImage';
import { BrandLogo } from '@/components/ui/BrandLogo';

export async function generateStaticParams() {
  return brands.map(b => ({ marca: b.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ marca: string }> }): Promise<Metadata> {
  const { marca } = await params;
  const brand = getBrand(marca);
  if (!brand) return {};
  return {
    title: `Reparación de ${brand.name} en Madrid · ${brand.totalModelCount} modelos`,
    description: `Pantalla, batería, cámara y conector de carga para todos los modelos ${brand.name}. Precio cerrado. 40 minutos. Garantía 3 meses.`
  };
}

export default async function BrandPage({ params }: { params: Promise<{ marca: string }> }) {
  const { marca } = await params;
  const brand = getBrand(marca);
  if (!brand) notFound();

  const brandModels = models.filter(m => m.brandSlug === marca).sort((a, b) => b.popularityScore - a.popularityScore);
  const applicableRepairs = repairTypes.filter(r => r.applicableCategories.includes('movil')).slice(0, 6);

  return (
    <>
      <section className="pt-28 lg:pt-40 pb-12 bg-paper">
        <div className="container-fluid">
          <nav aria-label="Breadcrumb" className="text-sm text-ink-500 mb-6">
            <Link href="/" className="hover:text-ink-900">Inicio</Link>
            <span className="mx-2">›</span>
            <Link href="/reparacion/movil" className="hover:text-ink-900">Reparación de móvil</Link>
            <span className="mx-2">›</span>
            <span className="text-ink-900">{brand.name}</span>
          </nav>

          <div className="grid lg:grid-cols-12 gap-10 items-end">
            <div className="lg:col-span-8">
              <div className="inline-flex items-center gap-2 text-xs text-ink-500 uppercase tracking-widest mb-4">
                <span className="w-8 h-px bg-brand-primary" aria-hidden />
                Reparación · {brand.name}
              </div>
              <h1 className="text-balance">
                Reparación de {brand.name} en Madrid.
              </h1>
              <p className="mt-6 max-w-2xl text-lg text-ink-700 leading-relaxed">
                {brand.description.es}
              </p>
            </div>
            <div className="lg:col-span-4 flex justify-start lg:justify-end">
              <div className="bg-chrome rounded-2xl p-6 ring-1 ring-ink-100 shadow-card max-w-xs">
                <p className="text-xs uppercase tracking-widest text-ink-500 font-mono">Modelos cubiertos</p>
                <p className="mt-2 font-mono text-5xl font-bold tabular-nums text-ink-900">{brand.totalModelCount}</p>
                <p className="mt-2 text-sm text-ink-700">Desde flagships a serie económica.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Top models */}
      <section className="py-section bg-chrome">
        <div className="container-fluid">
          <div className="flex items-end justify-between mb-10">
            <h2>Modelos más reparados</h2>
            <Link href={`/presupuesto?dispositivo=movil&marca=${brand.slug}`} className="text-sm text-brand-primary hover:underline">
              Empezar presupuesto →
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {brandModels.slice(0, 8).map((m, i) => (
              <Link
                key={m.slug}
                href={`/reparacion/movil/${brand.slug}/${m.slug}`}
                className="group relative bg-paper rounded-2xl p-5 ring-1 ring-ink-100 hover:ring-brand-primary hover:-translate-y-0.5 transition-all duration-fast ease-out-expo shadow-card"
              >
                {i === 0 && (
                  <span className="absolute top-3 right-3 px-2 py-0.5 rounded-full bg-brand-secondary text-white text-[10px] font-bold uppercase tracking-widest z-10">
                    Top
                  </span>
                )}
                <ModelImage modelName={m.name} brandSlug={brand.slug} className="mb-4" />
                <p className="font-semibold text-ink-900">{m.name}</p>
                <p className="text-xs font-mono text-ink-500 mt-1">{m.year}</p>
                <p className="mt-3 text-xs text-brand-primary group-hover:underline">
                  Ver precios →
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Repair types */}
      <section className="py-section bg-paper">
        <div className="container-fluid">
          <h2 className="mb-10">Reparaciones disponibles</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {applicableRepairs.map(r => (
              <div key={r.slug} className="bg-chrome rounded-2xl p-6 ring-1 ring-ink-100 shadow-card">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-lg font-semibold text-ink-900">{r.name.es}</h3>
                  <span className="text-xs font-mono text-ink-500 uppercase tracking-widest shrink-0">≈ {r.averageDurationMinutes} min</span>
                </div>
                <p className="text-sm text-ink-700 leading-relaxed">{r.description.es}</p>
                <p className="mt-3 text-xs font-mono text-brand-primary">{r.warrantyMonths} meses de garantía</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-section bg-shadow-blue text-white" data-surface="dark">
        <div className="container-narrow text-center">
          <h2 className="text-white text-balance">¿Sabes el modelo? Te damos el precio.</h2>
          <Link href={`/presupuesto?dispositivo=movil&marca=${brand.slug}`} className="mt-8 inline-flex items-center gap-2 px-7 py-4 rounded-xl bg-brand-secondary text-shadow-blue font-medium hover:bg-brand-secondary-hover transition-colors">
            Calcular precio
            <ArrowRight size={18} aria-hidden />
          </Link>
        </div>
      </section>
    </>
  );
}
