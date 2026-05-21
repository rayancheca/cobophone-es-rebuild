import type { Metadata } from 'next';
import Link from 'next/link';
import { Check, X, ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Garantía de reparación · 3 meses sin letra pequeña',
  description: 'Garantía de 3 meses sobre la reparación y la pieza sustituida. Qué cubre, qué no, y cómo reclamar. Plain Spanish, sin sorpresas.'
};

// F16 — FAQPage JSON-LD for warranty rich-result eligibility
const warrantyFaq = [
  {
    q: '¿Cuánto dura la garantía de la reparación?',
    a: '3 meses sobre la pieza sustituida y el trabajo. Para reparaciones por daño por agua o microsoldadura, 1 mes — la naturaleza del fallo justifica el periodo más corto.'
  },
  {
    q: '¿Qué cubre la garantía?',
    a: 'Defecto de la pieza sustituida durante 3 meses, mal funcionamiento atribuible al trabajo de reparación (ensamblado, cable suelto, conector incorrecto), sustitución gratuita de la pieza o reembolso si la reparación no es posible, y revisión gratuita sin compromiso.'
  },
  {
    q: '¿Qué no cubre la garantía?',
    a: 'Daños posteriores (golpes, caídas, agua tras la reparación), manipulación del dispositivo por terceros, componentes no relacionados con la pieza sustituida, pérdida de datos, y reparaciones por daño por agua (1 mes en lugar de 3).'
  },
  {
    q: '¿Cómo reclamo la garantía?',
    a: 'Trae el dispositivo a la tienda (Calle Bembibre 5, Cobo Calleja) o usa nuestra recogida gratuita. Diagnóstico gratuito en 24h. Si entra en garantía: reparación sin coste. Si no podemos repararlo: te devolvemos el importe pagado.'
  }
];

const warrantyJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: warrantyFaq.map(f => ({
    '@type': 'Question',
    name: f.q,
    acceptedAnswer: { '@type': 'Answer', text: f.a }
  }))
};

export default function GarantiaPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(warrantyJsonLd) }} />
      <section className="pt-28 lg:pt-40 pb-section bg-paper">
        <div className="container-fluid">
          <div className="inline-flex items-center gap-2 text-xs text-ink-500 uppercase tracking-widest mb-4">
            <span className="w-8 h-px bg-brand-primary" aria-hidden />
            Garantía · Plain Spanish, sin sorpresas
          </div>
          <h1 className="text-balance max-w-3xl">
            Garantía de 3 meses sobre la reparación. Sin letra pequeña.
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-ink-700 leading-relaxed">
            Si la pieza que cambiamos falla en los 3 meses siguientes, la reparamos sin coste.
            Lo importante es lo siguiente: qué cubre y qué no.
          </p>
        </div>
      </section>

      <section className="pb-section">
        <div className="container-narrow">
          <div className="grid md:grid-cols-2 gap-px bg-ink-100 rounded-2xl overflow-hidden ring-1 ring-ink-100">
            <div className="bg-chrome p-7">
              <div className="flex items-center gap-3 mb-5">
                <span className="w-10 h-10 rounded-full bg-brand-accent/15 text-brand-accent flex items-center justify-center"><Check size={18} aria-hidden /></span>
                <h2 className="text-xl font-semibold">Qué cubre</h2>
              </div>
              <ul className="space-y-3 text-ink-900">
                <li className="flex gap-3"><span className="text-brand-accent mt-1">›</span><span>Defecto de la pieza sustituida durante 3 meses desde la reparación.</span></li>
                <li className="flex gap-3"><span className="text-brand-accent mt-1">›</span><span>Mal funcionamiento atribuible al trabajo de reparación (ensamblado, cable suelto, conector incorrecto).</span></li>
                <li className="flex gap-3"><span className="text-brand-accent mt-1">›</span><span>Sustitución gratuita de la pieza o reembolso si la reparación no es posible.</span></li>
                <li className="flex gap-3"><span className="text-brand-accent mt-1">›</span><span>Revisión gratuita sin compromiso para verificar la garantía.</span></li>
              </ul>
            </div>
            <div className="bg-chrome p-7">
              <div className="flex items-center gap-3 mb-5">
                <span className="w-10 h-10 rounded-full bg-danger/15 text-danger flex items-center justify-center"><X size={18} aria-hidden /></span>
                <h2 className="text-xl font-semibold">Qué no cubre</h2>
              </div>
              <ul className="space-y-3 text-ink-900">
                <li className="flex gap-3"><span className="text-danger mt-1">›</span><span>Daños posteriores: golpes, caídas, agua tras la reparación.</span></li>
                <li className="flex gap-3"><span className="text-danger mt-1">›</span><span>Manipulación del dispositivo por terceros tras nuestra reparación.</span></li>
                <li className="flex gap-3"><span className="text-danger mt-1">›</span><span>Componentes no relacionados con la pieza que sustituimos.</span></li>
                <li className="flex gap-3"><span className="text-danger mt-1">›</span><span>Pérdida de datos (te recomendamos backup antes de cualquier reparación).</span></li>
                <li className="flex gap-3"><span className="text-danger mt-1">›</span><span>Reparaciones por daño por agua: 1 mes de garantía en lugar de 3.</span></li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="py-section bg-chrome">
        <div className="container-narrow">
          <h2 className="text-balance mb-8">Cómo reclamar</h2>
          <ol className="space-y-4">
            {[
              { n: '01', title: 'Tráelo a la tienda o mándalo', body: 'Calle Bembibre 5, Cobo Calleja. O usa nuestra recogida gratuita en Madrid (envío prepagado en el resto de España).' },
              { n: '02', title: 'Diagnóstico gratuito en 24h', body: 'Verificamos que el fallo entra dentro de la garantía. Te informamos antes de tocar nada.' },
              { n: '03', title: 'Reparación o reembolso', body: 'Si entra en garantía: reparación sin coste. Si no podemos repararlo: te devolvemos el importe pagado.' }
            ].map(step => (
              <li key={step.n} className="bg-paper rounded-xl p-6 ring-1 ring-ink-100 flex gap-6">
                <span className="font-mono text-2xl text-ink-300 shrink-0">{step.n}</span>
                <div>
                  <h3 className="text-lg font-semibold text-ink-900">{step.title}</h3>
                  <p className="mt-1 text-ink-700">{step.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="py-section bg-paper">
        <div className="container-narrow text-center">
          <h2 className="text-balance">¿Tienes que reclamar una reparación?</h2>
          <p className="mt-4 text-ink-700">Escríbenos con el número de ticket. Te respondemos en menos de 24h.</p>
          <Link
            href="/contacto"
            className="mt-8 inline-flex items-center gap-2 px-7 py-4 rounded-xl bg-brand-primary text-white font-medium hover:bg-brand-primary-hover transition-colors"
          >
            Reclamar reparación
            <ArrowRight size={18} aria-hidden />
          </Link>
        </div>
      </section>
    </>
  );
}
