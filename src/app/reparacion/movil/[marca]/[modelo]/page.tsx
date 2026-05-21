import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowRight, Clock, ShieldCheck, MessageCircle, Check } from 'lucide-react';
import { getBrand } from '@/data/brands';
import { getModel, models } from '@/data/models';
import { ModelImage } from '@/components/ui/ModelImage';
import { repairTypes } from '@/data/repair-types';
import { getPricesForModel } from '@/data/prices';
import { formatPrice } from '@/lib/utils';
import { modelOfferJsonLd, breadcrumbJsonLd } from '@/lib/seo';

export async function generateStaticParams() {
  return models.map(m => ({ marca: m.brandSlug, modelo: m.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ marca: string; modelo: string }> }): Promise<Metadata> {
  const { marca, modelo } = await params;
  const m = getModel(modelo);
  if (!m) return {};
  const ps = getPricesForModel(modelo);
  const screen = ps.find(p => p.repairSlug === 'pantalla');
  return {
    title: `Reparar ${m.name} en Madrid · Precio y garantía`,
    description: `${m.name}: cambio de pantalla ${screen ? `desde €${screen.priceMin}` : ''}, batería, conector de carga y más. 40 min. Garantía 3 meses.`,
    alternates: {
      canonical: `/reparacion/movil/${marca}/${modelo}`
    }
  };
}

export default async function ModelPage({ params }: { params: Promise<{ marca: string; modelo: string }> }) {
  const { marca, modelo } = await params;
  const brand = getBrand(marca);
  const model = getModel(modelo);
  if (!brand || !model) notFound();

  const prices = getPricesForModel(modelo);
  const sortedPrices = prices.sort((a, b) => a.priceMin - b.priceMin);
  const lowestPrice = sortedPrices[0]?.priceMin ?? 0;
  const highestPrice = Math.max(...sortedPrices.map(p => p.priceMax));

  const offerLd = modelOfferJsonLd({
    modelName: model.name,
    modelSlug: model.slug,
    priceMin: lowestPrice,
    priceMax: highestPrice,
    offerCount: prices.length
  });

  const breadcrumbLd = breadcrumbJsonLd([
    { name: 'Inicio', url: '/' },
    { name: 'Reparación móvil', url: '/reparacion/movil' },
    { name: brand.name, url: `/reparacion/movil/${brand.slug}` },
    { name: model.name, url: `/reparacion/movil/${brand.slug}/${model.slug}` }
  ]);

  // Related models — 2 neighbors by popularity
  const neighbors = models
    .filter(m => m.brandSlug === brand.slug && m.slug !== model.slug)
    .sort((a, b) => Math.abs(a.popularityScore - model.popularityScore) - Math.abs(b.popularityScore - model.popularityScore))
    .slice(0, 3);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(offerLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />

      <section className="pt-28 lg:pt-40 pb-12 bg-paper">
        <div className="container-fluid">
          <nav aria-label="Breadcrumb" className="text-sm text-ink-500 mb-6">
            <Link href="/" className="hover:text-ink-900">Inicio</Link>
            <span className="mx-2">›</span>
            <Link href="/reparacion/movil" className="hover:text-ink-900">Reparación móvil</Link>
            <span className="mx-2">›</span>
            <Link href={`/reparacion/movil/${brand.slug}`} className="hover:text-ink-900">{brand.name}</Link>
            <span className="mx-2">›</span>
            <span className="text-ink-900">{model.name}</span>
          </nav>

          <div className="grid lg:grid-cols-12 gap-10 lg:gap-16">
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 text-xs text-ink-500 uppercase tracking-widest mb-4">
                <span className="w-8 h-px bg-brand-primary" aria-hidden />
                {brand.name} · {model.year}
              </div>
              <h1 className="text-balance">Reparar {model.name} en Madrid.</h1>
              <p className="mt-6 max-w-xl text-lg text-ink-700 leading-relaxed">
                Pantalla, batería, conector de carga y más. Precio cerrado por reparación.
                40 minutos para las reparaciones estándar. Garantía de 3 meses sin letra pequeña.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-chrome ring-1 ring-ink-100 text-sm">
                  <Clock size={14} className="text-brand-primary" aria-hidden /> 40 min
                </span>
                <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-chrome ring-1 ring-ink-100 text-sm">
                  <ShieldCheck size={14} className="text-brand-accent" aria-hidden /> 3 meses garantía
                </span>
                <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-chrome ring-1 ring-ink-100 text-sm">
                  <Check size={14} className="text-brand-accent" aria-hidden /> Diagnóstico gratuito
                </span>
              </div>

              <div className="mt-10 flex flex-col sm:flex-row gap-3">
                <Link
                  href={`/presupuesto?dispositivo=movil&marca=${brand.slug}&modelo=${model.slug}`}
                  className="inline-flex items-center justify-center gap-2 h-14 px-7 rounded-xl bg-brand-primary text-white font-medium hover:bg-brand-primary-hover transition-colors shadow-pop"
                >
                  Reservar reparación
                  <ArrowRight size={18} aria-hidden />
                </Link>
                <a
                  href={`https://wa.me/34911234567?text=${encodeURIComponent(`Hola, mi ${model.name} necesita reparación. ¿Cuándo podéis recibirme?`)}`}
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
              <div className="bg-chrome rounded-3xl p-8 ring-1 ring-ink-100 shadow-elevated">
                <ModelImage modelName={model.name} brandSlug={brand.slug} className="max-w-xs mx-auto" />
                {model.msrpAtRelease && (
                  <p className="mt-4 text-xs text-ink-500 font-mono uppercase tracking-widest text-center">
                    Precio nuevo en lanzamiento: {formatPrice(model.msrpAtRelease, model.msrpAtRelease)}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Price table */}
      <section className="py-section bg-chrome">
        <div className="container-fluid">
          <div className="max-w-2xl mb-10">
            <h2>Precios por reparación</h2>
            <p className="mt-3 text-ink-700">Rango cerrado. Lo confirmamos en 2 minutos por WhatsApp después del diagnóstico.</p>
          </div>

          <div className="bg-paper rounded-2xl ring-1 ring-ink-100 overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="bg-paper border-b border-ink-100">
                  <th className="text-left py-4 px-6 text-xs uppercase tracking-widest text-ink-500 font-mono font-medium">Reparación</th>
                  <th className="text-left py-4 px-6 text-xs uppercase tracking-widest text-ink-500 font-mono font-medium hidden md:table-cell">Duración</th>
                  <th className="text-left py-4 px-6 text-xs uppercase tracking-widest text-ink-500 font-mono font-medium hidden md:table-cell">Garantía</th>
                  <th className="text-right py-4 px-6 text-xs uppercase tracking-widest text-ink-500 font-mono font-medium">Precio</th>
                </tr>
              </thead>
              <tbody>
                {prices.map(p => {
                  const rt = repairTypes.find(r => r.slug === p.repairSlug);
                  if (!rt) return null;
                  return (
                    <tr key={p.repairSlug} className="border-b border-ink-100 last:border-0 hover:bg-paper/50 transition-colors">
                      <td className="py-4 px-6">
                        <p className="font-medium text-ink-900">{rt.name.es}</p>
                        <p className="text-xs text-ink-500 mt-0.5 md:hidden">≈ {rt.averageDurationMinutes} min · {rt.warrantyMonths}m garantía</p>
                      </td>
                      <td className="py-4 px-6 text-sm text-ink-700 font-mono tabular-nums hidden md:table-cell">≈ {rt.averageDurationMinutes} min</td>
                      <td className="py-4 px-6 text-sm text-ink-700 font-mono tabular-nums hidden md:table-cell">{rt.warrantyMonths} meses</td>
                      <td className="py-4 px-6 text-right">
                        <span className="font-mono font-semibold tabular-nums text-ink-900">{formatPrice(p.priceMin, p.priceMax)}</span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {model.msrpAtRelease && (
            <div className="mt-6 bg-paper rounded-xl p-5 text-center ring-1 ring-ink-100">
              <p className="text-sm text-ink-700">
                Comprar un <strong>{model.name}</strong> nuevo cuesta unos{' '}
                <span className="font-mono text-ink-900">{formatPrice(model.msrpAtRelease, model.msrpAtRelease)}</span>.{' '}
                Repararlo cuesta desde{' '}
                <span className="font-mono font-bold text-brand-primary">{formatPrice(lowestPrice, lowestPrice)}</span>.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Known issues */}
      {model.knownIssues && model.knownIssues.length > 0 && (
        <section className="py-section bg-paper">
          <div className="container-fluid">
            <div className="max-w-2xl mb-8">
              <h2>Problemas conocidos del {model.name}</h2>
              <p className="mt-3 text-ink-700">Lo que hemos visto entrar repetidamente al taller. No es un fallo tuyo — es del lote.</p>
            </div>
            <ul className="grid md:grid-cols-2 gap-4">
              {model.knownIssues.map((issue, i) => (
                <li key={i} className="bg-chrome rounded-xl p-5 ring-1 ring-ink-100 shadow-card">
                  <p className="text-ink-900">{issue.es}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* Related models */}
      {neighbors.length > 0 && (
        <section className="py-section bg-chrome">
          <div className="container-fluid">
            <h2 className="mb-10">Modelos {brand.name} relacionados</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {neighbors.map(n => (
                <Link
                  key={n.slug}
                  href={`/reparacion/movil/${brand.slug}/${n.slug}`}
                  className="group bg-paper rounded-2xl p-5 ring-1 ring-ink-100 hover:ring-brand-primary hover:-translate-y-0.5 transition-all duration-fast"
                >
                  <ModelImage modelName={n.name} brandSlug={brand.slug} className="mb-3" />
                  <p className="font-semibold text-ink-900">{n.name}</p>
                  <p className="text-xs font-mono text-ink-500 mt-1">{n.year}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
