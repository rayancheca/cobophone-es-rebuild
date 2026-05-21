import type { Metadata } from 'next';
import { LocationBlock } from '@/components/sections/LocationBlock';
import { Clock, Car, Train, MapPin, Phone, Mail } from 'lucide-react';
import { cobophoneLocation } from '@/data/location';

export const metadata: Metadata = {
  title: 'Tienda CoboPhone en Cobo Calleja · Cómo llegar',
  description:
    'Calle Bembibre 5, Polígono Cobo Calleja, Fuenlabrada. Aparcamiento gratuito. Abierto domingo, cerrado sábado. L–V 10:00–19:00, Dom 10:00–19:00.'
};

export default function UbicacionPage() {
  return (
    <>
      <section className="pt-28 lg:pt-40 pb-12 bg-paper">
        <div className="container-fluid">
          <div className="inline-flex items-center gap-2 text-xs text-ink-500 uppercase tracking-widest mb-4">
            <span className="w-8 h-px bg-brand-primary" aria-hidden />
            Ubicación · Polígono Cobo Calleja
          </div>
          <h1 className="text-balance">
            Calle Bembibre 5, Local A.
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-ink-700 leading-relaxed">
            Sí, sabemos que cómo llegar a Cobo Calleja es un poco lío. Por eso lo explicamos bien.
            Aparcamiento gratuito a 30 metros del local. Cercanías y Metrosur cerca.
          </p>
        </div>
      </section>

      <LocationBlock />

      <section className="py-section bg-chrome">
        <div className="container-fluid">
          <div className="grid md:grid-cols-2 gap-10">
            <article>
              <h2 className="text-balance">Horario</h2>
              <p className="mt-3 text-ink-700">Abrimos los domingos porque Cobo Calleja vive de los domingos. Cerramos los sábados. Sí, al revés que casi toda España.</p>
              <table className="mt-6 w-full text-sm">
                <tbody>
                  {Object.entries(cobophoneLocation.hours).map(([day, windows]) => (
                    <tr key={day} className="border-b border-ink-100">
                      <td className="py-3 pr-4 font-medium text-ink-900 uppercase tracking-widest text-xs font-mono">{day}</td>
                      <td className="py-3 text-ink-700">
                        {windows.length === 0 ? (
                          <span className="text-ink-500">Cerrado</span>
                        ) : (
                          windows.map(w => `${w.from} – ${w.to}`).join(', ')
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </article>

            <article>
              <h2 className="text-balance">Cómo llegar</h2>
              <dl className="mt-6 space-y-5">
                <div className="flex gap-4">
                  <dt className="shrink-0 w-10 h-10 rounded-lg bg-brand-primary/10 text-brand-primary flex items-center justify-center"><Train size={18} aria-hidden /></dt>
                  <dd>
                    <p className="font-semibold text-ink-900">Cercanías + autobús</p>
                    <p className="text-sm text-ink-700 mt-1">Línea C-5 hasta Humanes. Desde la estación, autobús urbano hasta el polígono.</p>
                  </dd>
                </div>
                <div className="flex gap-4">
                  <dt className="shrink-0 w-10 h-10 rounded-lg bg-brand-primary/10 text-brand-primary flex items-center justify-center"><Train size={18} aria-hidden /></dt>
                  <dd>
                    <p className="font-semibold text-ink-900">Metrosur + autobús</p>
                    <p className="text-sm text-ink-700 mt-1">Línea L12 hasta Móstoles Central. Después autobús al polígono.</p>
                  </dd>
                </div>
                <div className="flex gap-4">
                  <dt className="shrink-0 w-10 h-10 rounded-lg bg-brand-primary/10 text-brand-primary flex items-center justify-center"><Car size={18} aria-hidden /></dt>
                  <dd>
                    <p className="font-semibold text-ink-900">En coche</p>
                    <p className="text-sm text-ink-700 mt-1">M-506 salida 21 dirección Polígono Cobo Calleja. Aparcamiento gratuito.</p>
                  </dd>
                </div>
              </dl>
            </article>
          </div>
        </div>
      </section>

      <section className="py-section bg-paper">
        <div className="container-narrow">
          <h2 className="text-balance">Contacto directo</h2>
          <div className="mt-8 grid sm:grid-cols-3 gap-4">
            <a href="tel:+34911234567" className="group bg-chrome rounded-xl p-5 ring-1 ring-ink-100 hover:ring-brand-primary transition-all">
              <Phone size={18} className="text-brand-primary mb-3" aria-hidden />
              <p className="text-xs uppercase tracking-widest text-ink-500 font-mono">Teléfono</p>
              <p className="mt-1 text-ink-900 font-medium">+34 911 23 45 67</p>
            </a>
            <a href="https://wa.me/34911234567" target="_blank" rel="noopener" className="group bg-chrome rounded-xl p-5 ring-1 ring-ink-100 hover:ring-brand-primary transition-all">
              <span className="block w-4 h-4 rounded-full bg-[#25D366] mb-3" aria-hidden />
              <p className="text-xs uppercase tracking-widest text-ink-500 font-mono">WhatsApp</p>
              <p className="mt-1 text-ink-900 font-medium">Responde en ~3 min</p>
            </a>
            <a href="mailto:info@cobophone.es" className="group bg-chrome rounded-xl p-5 ring-1 ring-ink-100 hover:ring-brand-primary transition-all">
              <Mail size={18} className="text-brand-primary mb-3" aria-hidden />
              <p className="text-xs uppercase tracking-widest text-ink-500 font-mono">Email</p>
              <p className="mt-1 text-ink-900 font-medium">info@cobophone.es</p>
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
