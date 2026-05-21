import type { Metadata } from 'next';
import Link from 'next/link';
import { Package, MapPin, Truck, CreditCard, ArrowRight, MessageCircle } from 'lucide-react';
import { buildWhatsAppLink } from '@/lib/utils';

export const metadata: Metadata = {
  title: 'Recogida y envío de reparación · Recogemos en Madrid · Envío a toda España',
  description: 'Recogida gratuita en Madrid y zonas cercanas. Envío prepagado a toda España. 4 pasos sencillos. Sin pagar hasta confirmar el diagnóstico.'
};

const STEPS = [
  { n: '01', Icon: Package, title: 'Dinos qué le pasa', body: 'Calcula el precio en 30 segundos o escríbenos por WhatsApp. Confirmamos rango de precio y tiempo estimado.' },
  { n: '02', Icon: MapPin,  title: 'Te recogemos donde estés', body: 'Si vives en Madrid sur (Fuenlabrada, Getafe, Leganés, Alcorcón, Móstoles, Parla, Humanes, Villaverde, Usera) vamos a buscarlo. Servicio gratuito.' },
  { n: '03', Icon: Truck,   title: 'O te mandamos etiqueta prepagada', body: 'Para el resto de España: te enviamos la etiqueta de Correos / SEUR por email. Lo dejas en cualquier punto.' },
  { n: '04', Icon: CreditCard, title: 'Pagas al confirmar', body: 'Al recibirlo, hacemos diagnóstico gratuito. Te confirmamos el precio final. Sólo pagas si decides reparar.' }
];

export default function RecogidaPage() {
  return (
    <>
      <section className="pt-28 lg:pt-40 pb-section bg-paper">
        <div className="container-fluid">
          <div className="inline-flex items-center gap-2 text-xs text-ink-500 uppercase tracking-widest mb-4">
            <span className="w-8 h-px bg-brand-primary" aria-hidden />
            Recogida · Madrid + toda España
          </div>
          <h1 className="text-balance max-w-3xl">
            Recogemos. Reparamos. Te lo devolvemos.
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-ink-700 leading-relaxed">
            No tienes que moverte si no quieres. Recogida gratuita en Madrid sur, etiqueta prepagada
            para el resto de España. No pagas nada hasta confirmar el diagnóstico.
          </p>

          <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-4 gap-3">
            {STEPS.map((s, i) => {
              const Icon = s.Icon;
              return (
                <article key={s.n} className="bg-chrome rounded-2xl p-6 ring-1 ring-ink-100 shadow-card">
                  <div className="flex items-center justify-between mb-5">
                    <span className="font-mono text-2xl text-ink-300 tracking-wide">{s.n}</span>
                    <span className="w-10 h-10 rounded-lg bg-brand-primary/10 text-brand-primary flex items-center justify-center">
                      <Icon size={20} aria-hidden />
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold mb-2 text-ink-900">{s.title}</h3>
                  <p className="text-sm text-ink-700 leading-relaxed">{s.body}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-section bg-shadow-blue text-white" data-surface="dark">
        <div className="container-narrow text-center">
          <h2 className="text-white text-balance">Empezamos por el modelo.</h2>
          <p className="mt-4 text-ink-700 max-w-lg mx-auto">Marca, modelo y fallo. Te confirmamos en 2 minutos por WhatsApp.</p>
          <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/presupuesto"
              className="inline-flex items-center justify-center gap-2 h-14 px-7 rounded-xl bg-brand-secondary text-white font-medium hover:bg-brand-secondary-hover transition-colors shadow-pop"
            >
              Calcular precio
              <ArrowRight size={18} aria-hidden />
            </Link>
            <a
              href={buildWhatsAppLink('Hola, quiero usar el servicio de recogida. ¿Cómo lo organizamos?')}
              target="_blank"
              rel="noopener"
              className="inline-flex items-center justify-center gap-2 h-14 px-7 rounded-xl bg-[#25D366] text-white font-medium hover:bg-[#1DA851] transition-colors"
            >
              <MessageCircle size={18} aria-hidden />
              Hablar con un técnico
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
