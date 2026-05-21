import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, MessageCircle, ShieldCheck, Truck, Wallet } from 'lucide-react';
import { buildWhatsAppLink } from '@/lib/utils';

export const metadata: Metadata = {
  title: 'Tienda de móviles reacondicionados · CoboPhone',
  description: 'Redmi, Realme y TCL revisados y con garantía. Recogida gratuita en tienda Madrid. Trabajamos con tus dispositivos antiguos como parte de pago.'
};

export default function TiendaPage() {
  return (
    <>
      <section className="pt-28 lg:pt-40 pb-section bg-paper">
        <div className="container-fluid">
          <div className="inline-flex items-center gap-2 text-xs text-ink-500 uppercase tracking-widest mb-4">
            <span className="w-8 h-px bg-brand-primary" aria-hidden />
            Tienda · Móviles reacondicionados
          </div>
          <h1 className="text-balance max-w-3xl">Móviles que ya pasaron por nuestro taller.</h1>
          <p className="mt-6 max-w-2xl text-lg text-ink-700 leading-relaxed">
            Trabajamos con marcas accesibles — Redmi, Realme, TCL — revisadas por nuestros
            técnicos, con batería sana y garantía de 3 meses. Lo que vendemos es lo mismo que
            recomendamos a familia.
          </p>

          <div className="mt-8 grid sm:grid-cols-3 gap-3 max-w-3xl">
            <Pill icon={<ShieldCheck size={18} />} title="3 meses de garantía" body="Sobre el dispositivo completo." />
            <Pill icon={<Truck size={18} />} title="Recogida en tienda" body="Madrid centro y sur sin coste." />
            <Pill icon={<Wallet size={18} />} title="Aceptamos tu viejo" body="Como parte de pago." />
          </div>

          <div className="mt-12 bg-chrome rounded-3xl p-10 ring-1 ring-ink-100 shadow-card max-w-3xl">
            <p className="text-sm uppercase tracking-widest text-ink-500 font-mono mb-3">Catálogo en preparación</p>
            <h2 className="text-2xl font-semibold mb-3">Mientras pulimos el catálogo online…</h2>
            <p className="text-ink-700 leading-relaxed mb-6">
              El stock cambia a diario. Pregúntanos por WhatsApp con el modelo que buscas o pásate
              por la tienda en Cobo Calleja a verlos en mano.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href={buildWhatsAppLink('Hola, me interesa comprar un móvil reacondicionado. ¿Qué tenéis disponible?')}
                target="_blank"
                rel="noopener"
                className="inline-flex items-center justify-center gap-2 h-12 px-6 rounded-xl bg-[#25D366] text-white font-medium hover:bg-[#1DA851] transition-colors"
              >
                <MessageCircle size={18} aria-hidden />
                Preguntar por stock
              </a>
              <Link
                href="/ubicacion"
                className="inline-flex items-center justify-center gap-2 h-12 px-6 rounded-xl bg-paper ring-1 ring-ink-300 text-ink-900 font-medium hover:bg-ink-100 transition-colors"
              >
                Cómo llegar a la tienda
                <ArrowRight size={16} aria-hidden />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function Pill({ icon, title, body }: { icon: React.ReactNode; title: string; body: string }) {
  return (
    <div className="flex items-start gap-3 p-4 bg-chrome rounded-xl ring-1 ring-ink-100">
      <span className="shrink-0 w-9 h-9 rounded-lg bg-brand-primary/10 text-brand-primary flex items-center justify-center">{icon}</span>
      <div>
        <p className="font-semibold text-ink-900 text-sm">{title}</p>
        <p className="text-xs text-ink-700 mt-0.5">{body}</p>
      </div>
    </div>
  );
}
