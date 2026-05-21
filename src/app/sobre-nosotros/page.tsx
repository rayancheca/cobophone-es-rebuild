import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Sobre nosotros · 20 años reparando móviles en Cobo Calleja',
  description: 'CoboPhone empezó en 2005 en el polígono de Cobo Calleja. Veinte años después seguimos en el mismo sitio. Esa es la historia.'
};

const MILESTONES = [
  { year: '2005', title: 'Abre la primera tienda', body: 'Pequeño local en el polígono Cobo Calleja. Reparaciones de Nokia, Motorola y los primeros Samsung.' },
  { year: '2010', title: 'iPhone cambia el juego', body: 'El iPhone 3GS / 4 trae las primeras reparaciones de pantalla complejas a Madrid. Aprendemos sobre la marcha.' },
  { year: '2014', title: 'Llegan los Xiaomi', body: 'Cobo Calleja se llena de importadores chinos. Empezamos a abastecer otras tiendas de reparación con piezas.' },
  { year: '2018', title: 'Abre el portal mayorista', body: 'tienda.cobophone.es bajo Cobotech International. +800 SKUs sólo en iPhone.' },
  { year: '2020', title: 'Reparación de patinetes y consolas', body: 'La pandemia trae a casa a más gente. Nos especializamos en patinetes Xiaomi y consolas PS4/Xbox.' },
  { year: '2026', title: 'Veinte años después, mismo sitio', body: 'Calle Bembibre 5. Mismas manos, mismas piezas certificadas, misma promesa de 40 minutos.' }
];

export default function SobreNosotrosPage() {
  return (
    <>
      <section className="pt-28 lg:pt-40 pb-section bg-paper">
        <div className="container-fluid">
          <div className="inline-flex items-center gap-2 text-xs text-ink-500 uppercase tracking-widest mb-4">
            <span className="w-8 h-px bg-brand-primary" aria-hidden />
            Sobre nosotros · Desde 2005
          </div>
          <h1 className="text-balance max-w-3xl">
            Veinte años. Mismo sitio. Mismas manos.
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-ink-700 leading-relaxed">
            CoboPhone empezó en 2005 como un local pequeño en el polígono Cobo Calleja. En vez
            de mudarnos o expandirnos a franquicia, decidimos quedarnos en el mismo sitio y
            profundizar — más marcas, más tipos de reparación, más conocimiento sobre las piezas.
          </p>
          <p className="mt-4 max-w-2xl text-lg text-ink-700 leading-relaxed">
            Hoy somos también el mayorista de referencia para muchas tiendas de reparación del
            sur de Madrid, abastecidos directamente desde el centro logístico chino-europeo más
            grande de España, que casualmente está enfrente.
          </p>
        </div>
      </section>

      <section className="py-section bg-chrome">
        <div className="container-narrow">
          <h2 className="mb-12 text-balance">La historia, año a año</h2>
          <ol className="space-y-6">
            {MILESTONES.map((m, i) => (
              <li key={m.year} className="grid grid-cols-[80px_1fr] sm:grid-cols-[120px_1fr] gap-6 items-start">
                <span className="font-mono text-2xl sm:text-3xl text-brand-primary font-bold tabular-nums sticky top-24">
                  {m.year}
                </span>
                <div className="pl-6 border-l-2 border-ink-100 pb-2">
                  <h3 className="text-lg font-semibold text-ink-900 mb-1.5">{m.title}</h3>
                  <p className="text-ink-700 leading-relaxed">{m.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="py-section bg-paper">
        <div className="container-narrow text-center">
          <h2 className="text-balance">Si tu móvil pasa por nuestras manos, lo tratamos como pasaría por las nuestras.</h2>
          <Link
            href="/presupuesto"
            className="mt-10 inline-flex items-center gap-2 px-7 py-4 rounded-xl bg-brand-primary text-white font-medium hover:bg-brand-primary-hover transition-colors shadow-pop"
          >
            Calcular precio de reparación
            <ArrowRight size={18} aria-hidden />
          </Link>
        </div>
      </section>
    </>
  );
}
