import type { Metadata } from 'next';
import Link from 'next/link';
import { MessageCircle } from 'lucide-react';
import { buildWhatsAppLink } from '@/lib/utils';

export const metadata: Metadata = {
  // F8 — was "Preguntas frecuentes · CoboPhone · CoboPhone" (brand duplicated by template suffix)
  title: 'Preguntas frecuentes · Reparación, garantía, precios',
  description: 'Tiempos, garantía, precios, recogida, cómo llegar. Las respuestas a lo que la gente nos pregunta a diario.'
};

const FAQS = [
  {
    q: '¿De verdad reparáis en 40 minutos?',
    a: 'La mayoría de reparaciones estándar (cambio de pantalla y batería) salen en 40 minutos cuando tenemos la pieza en stock. Reparaciones más complejas (daño por agua, microsoldadura, conectores) tardan entre 1 y 4 horas y te avisamos al diagnosticar.'
  },
  {
    q: '¿Cuánto cuesta cambiar la pantalla de mi móvil?',
    a: 'Depende del modelo. El presupuesto online te da un rango exacto en 30 segundos. Para iPhone 13 son ~€149–€199, para Samsung Galaxy S23 ~€199–€259, para un Redmi Note 12 ~€69–€109. Usa la calculadora de precio para tu modelo exacto.'
  },
  {
    q: '¿Tenéis garantía? ¿Por cuánto tiempo?',
    a: 'Sí: 3 meses de garantía sobre la pieza y la reparación. Para daño por agua y microsoldadura es 1 mes (la naturaleza del fallo justifica el cambio). Sin letra pequeña — todo está en /garantia.'
  },
  {
    q: '¿Puedo dejar el móvil y volver al día siguiente?',
    a: 'Sí. Es lo más cómodo para reparaciones complejas. Para reparaciones estándar puedes esperar en el local (tenemos sofás y wifi).'
  },
  {
    q: '¿Recogéis el móvil en casa?',
    a: 'En Madrid sur (Fuenlabrada, Getafe, Leganés, Alcorcón, Móstoles, Parla, Humanes, Villaverde, Usera) sí, gratis. Para el resto de España te mandamos etiqueta prepagada de Correos o SEUR.'
  },
  {
    q: '¿Por qué cerráis los sábados y abrís los domingos?',
    a: 'Estamos en el polígono Cobo Calleja, el mayor centro mayorista chino-europeo. Los domingos hay más actividad que los sábados aquí, así que adaptamos el horario al ritmo del barrio. M-V 10-19h, sábado cerrado, domingo 10-19h.'
  },
  {
    q: '¿Aceptáis pagos con tarjeta? ¿Bizum?',
    a: 'Sí: tarjeta, Bizum, efectivo. Para reparaciones por encima de €200, también ofrecemos pago aplazado a 3 meses sin intereses.'
  },
  {
    q: '¿Trabajáis con seguros (Mapfre, Allianz, etc.)?',
    a: 'Hacemos el peritaje y te damos el informe técnico para tu seguro. Cuando el seguro autoriza, hacemos la reparación y te ahorras la franquicia. Pregúntanos antes de aceptar el peritaje del seguro — a veces nuestro precio es más bajo.'
  },
  {
    q: '¿Vendéis piezas al por mayor a otras tiendas?',
    a: 'Sí — es una parte importante de lo que hacemos. Visita /mayoristas para acceso al portal B2B con tarifas, tiers y formulario de alta.'
  },
  {
    q: '¿Y si mi modelo no aparece en la calculadora de precio?',
    a: 'Lo reparamos igual. La calculadora tiene los modelos más comunes en catálogo, pero trabajamos con 600+ modelos. Escríbenos por WhatsApp con marca y modelo y te damos rango en pocos minutos.'
  },
  {
    q: '¿Puedo recoger mis datos antes de la reparación?',
    a: 'Si la pantalla funciona, no toca tus datos. Si no funciona, podemos extraerlos en muchos casos. Para reparaciones de placa donde el riesgo es real, te avisamos antes y firmamos un consentimiento.'
  },
  {
    q: '¿Cómo llego a vuestra tienda?',
    a: 'Calle Bembibre 5, Local A, Polígono Cobo Calleja, Fuenlabrada. Cercanías C-5 hasta Humanes + autobús. Metrosur L12 hasta Móstoles Central + autobús. En coche: M-506 salida 21. Aparcamiento gratuito a 30 metros del local.'
  }
];

export default function FAQPage() {
  // FAQPage JSON-LD for rich-result eligibility
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQS.map(f => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a }
    }))
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <section className="pt-28 lg:pt-40 pb-section bg-paper">
        <div className="container-narrow">
          <div className="inline-flex items-center gap-2 text-xs text-ink-500 uppercase tracking-widest mb-4">
            <span className="w-8 h-px bg-brand-primary" aria-hidden />
            Preguntas frecuentes
          </div>
          <h1 className="text-balance">Lo que la gente nos pregunta a diario.</h1>
          <p className="mt-6 text-lg text-ink-700 leading-relaxed">
            Si tu duda no está aquí, escríbenos por WhatsApp. Respondemos en menos de 3 minutos en horario.
          </p>

          <div className="mt-12 space-y-3">
            {FAQS.map((faq, i) => (
              <details key={i} className="group bg-chrome rounded-xl ring-1 ring-ink-100 p-5 open:shadow-card transition-shadow">
                <summary className="flex items-start justify-between gap-4 cursor-pointer font-semibold text-ink-900 list-none">
                  <span>{faq.q}</span>
                  <span className="shrink-0 text-brand-primary text-xl leading-none group-open:rotate-45 transition-transform">+</span>
                </summary>
                <p className="mt-3 text-ink-700 leading-relaxed">{faq.a}</p>
              </details>
            ))}
          </div>

          <div className="mt-12 p-6 bg-chrome rounded-2xl ring-1 ring-ink-100 flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="shrink-0 w-12 h-12 rounded-full bg-[#25D366] text-white flex items-center justify-center">
              <MessageCircle size={20} />
            </div>
            <div className="flex-1">
              <p className="font-semibold text-ink-900">¿Otra pregunta?</p>
              <p className="text-sm text-ink-700 mt-0.5">Te respondemos por WhatsApp en menos de 3 minutos.</p>
            </div>
            <a
              href={buildWhatsAppLink('Hola, tengo una duda sobre una reparación.')}
              target="_blank"
              rel="noopener"
              className="inline-flex items-center gap-2 h-11 px-5 rounded-lg bg-[#25D366] text-white font-medium hover:bg-[#1DA851] transition-colors"
            >
              Escribir por WhatsApp
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
