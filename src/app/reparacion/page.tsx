import type { Metadata } from 'next';
import Link from 'next/link';
import { Smartphone, Tablet, Laptop, Watch, Gamepad2, Tv, Bike, ArrowUpRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Reparación de electrónica en Madrid · 7 categorías',
  description: 'Reparamos móviles, tablets, portátiles, smartwatches, consolas, TVs y patinetes eléctricos en Madrid. 40 minutos. Garantía 3 meses.'
};

const categories = [
  { slug: 'movil', name: 'Móviles', icon: Smartphone, desc: 'iPhone, Samsung, Xiaomi, Oppo, Realme, Huawei, Google, Honor', count: '600+ modelos' },
  { slug: 'tablet', name: 'Tablets', icon: Tablet, desc: 'iPad y Android. Pantalla, batería, conector, placa.', count: 'Apple y Android' },
  { slug: 'portatil', name: 'Portátiles', icon: Laptop, desc: 'Pantalla, batería, disco, ventilador, instalación de SO.', count: 'Todas las marcas' },
  { slug: 'smartwatch', name: 'Smartwatches', icon: Watch, desc: 'Apple Watch, Galaxy Watch, Garmin, Huawei Watch.', count: 'Pantalla y batería' },
  { slug: 'consola', name: 'Consolas', icon: Gamepad2, desc: 'PlayStation, Xbox, Nintendo Switch. Lectores, HDMI, mandos.', count: 'PS / Xbox / Nintendo' },
  { slug: 'television', name: 'Televisores', icon: Tv, desc: 'Reemplazo de LEDs, fuente, placa principal.', count: 'LED / OLED / QLED' },
  { slug: 'patinete-electrico', name: 'Patinetes', icon: Bike, desc: 'Batería, neumáticos, freno, controlador, motor.', count: 'Xiaomi, Cecotec, Segway' }
];

export default function ReparacionHubPage() {
  return (
    <>
      <section className="pt-28 lg:pt-40 pb-section bg-paper">
        <div className="container-fluid">
          <div className="inline-flex items-center gap-2 text-xs text-ink-500 uppercase tracking-widest mb-4">
            <span className="w-8 h-px bg-brand-primary" aria-hidden />
            Reparación · Toda tu electrónica
          </div>
          <h1 className="text-balance max-w-3xl">
            Si funciona con un cable, lo reparamos.
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-ink-700 leading-relaxed">
            20 años abriendo dispositivos. Móviles, tablets, portátiles, smartwatches, consolas,
            televisores y patinetes. Diagnóstico gratuito. Garantía de 3 meses.
          </p>
        </div>
      </section>

      <section className="pb-section">
        <div className="container-fluid">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {categories.map(c => {
              const Icon = c.icon;
              return (
                <Link
                  key={c.slug}
                  href={`/reparacion/${c.slug}`}
                  className="group relative bg-chrome rounded-2xl p-7 ring-1 ring-ink-100 shadow-card hover:shadow-elevated hover:-translate-y-0.5 transition-all duration-fast ease-out-expo"
                >
                  <div className="flex items-start justify-between mb-6">
                    <div className="w-14 h-14 rounded-xl bg-brand-primary/10 text-brand-primary flex items-center justify-center group-hover:bg-brand-primary group-hover:text-white transition-colors duration-fast">
                      <Icon size={26} aria-hidden />
                    </div>
                    <ArrowUpRight size={20} className="text-ink-300 group-hover:text-ink-900 transition-colors" aria-hidden />
                  </div>
                  <h2 className="text-2xl font-semibold text-ink-900 mb-2">{c.name}</h2>
                  <p className="text-sm text-ink-700 leading-relaxed">{c.desc}</p>
                  <p className="mt-5 text-xs font-mono text-ink-500 uppercase tracking-widest">{c.count}</p>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
