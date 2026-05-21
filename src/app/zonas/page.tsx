import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Truck, Check } from 'lucide-react';
import { serviceAreas } from '@/data/location';

export const metadata: Metadata = {
  title: 'Zonas de servicio · Recogida gratuita en Madrid',
  description: 'Reparamos en Fuenlabrada, Getafe, Leganés, Alcorcón, Móstoles, Parla, Humanes, Villaverde, Usera y Madrid centro. Recogida gratuita en la mayoría de zonas.'
};

export default function ZonasPage() {
  return (
    <section className="pt-28 lg:pt-40 pb-section bg-paper">
      <div className="container-fluid">
        <div className="inline-flex items-center gap-2 text-xs text-ink-500 uppercase tracking-widest mb-4">
          <span className="w-8 h-px bg-brand-primary" aria-hidden />
          Zonas · Madrid + España
        </div>
        <h1 className="text-balance max-w-3xl">Reparamos en toda la Comunidad de Madrid.</h1>
        <p className="mt-6 max-w-2xl text-lg text-ink-700 leading-relaxed">
          En las zonas marcadas con recogida gratuita pasamos a recoger tu dispositivo sin coste.
          Para el resto, te mandamos etiqueta prepagada para que lo dejes en Correos o SEUR.
        </p>

        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {serviceAreas.map(area => (
            <Link
              key={area.slug}
              href={`/zonas/${area.slug}`}
              className="group bg-chrome rounded-2xl p-6 ring-1 ring-ink-100 hover:ring-brand-primary shadow-card hover:-translate-y-0.5 transition-all duration-fast"
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-ink-900">{area.name}</h2>
                {area.freePickupAvailable ? (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-brand-accent/15 text-brand-accent text-xs font-medium ring-1 ring-brand-accent/30">
                    <Check size={12} /> Recogida gratis
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-ink-100 text-ink-500 text-xs">
                    <Truck size={12} /> Mensajería
                  </span>
                )}
              </div>
              <p className="text-sm text-ink-700 leading-relaxed">
                {area.description.es}
              </p>
              <p className="mt-3 text-xs font-mono text-ink-500">
                {area.neighborhoods.slice(0, 3).join(' · ')}{area.neighborhoods.length > 3 ? ' · …' : ''}
              </p>
            </Link>
          ))}
        </div>

        <div className="mt-12 p-6 bg-chrome rounded-2xl ring-1 ring-ink-100 max-w-3xl">
          <p className="font-semibold text-ink-900">¿No estás en Madrid?</p>
          <p className="mt-2 text-ink-700">
            Reparamos para toda España. Te enviamos etiqueta prepagada por email para que dejes tu
            dispositivo en cualquier punto Correos o SEUR. Devolución incluida.
          </p>
          <Link
            href="/recogida"
            className="mt-4 inline-flex items-center gap-2 text-sm text-brand-primary hover:underline"
          >
            Ver el proceso completo
            <ArrowRight size={14} aria-hidden />
          </Link>
        </div>
      </div>
    </section>
  );
}
