import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Truck, Globe2, Package, Shield, Users, BadgeCheck } from 'lucide-react';
import { ButtonLink } from '@/components/ui/Button';

export const metadata: Metadata = {
  title: 'Mayorista de repuestos móviles en Cobo Calleja',
  description:
    'Pantallas, baterías y piezas al por mayor desde Cobo Calleja. Envío 24h a toda España. Precios para profesionales. +818 SKUs solo en iPhone.'
};

export default function MayoristasPage() {
  return (
    <>
      {/* Hero */}
      <section
        data-surface="dark"
        className="relative pt-28 lg:pt-40 pb-section bg-shadow-blue-deep text-white overflow-hidden grain"
      >
        <div className="absolute inset-0 dot-grid opacity-30" aria-hidden />
        <div className="absolute -top-40 -right-40 w-[800px] h-[800px] rounded-full bg-brand-primary/20 blur-[160px] pointer-events-none" aria-hidden />

        <div className="container-fluid relative">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 text-xs text-brand-secondary uppercase tracking-widest mb-6">
              <span className="w-8 h-px bg-brand-secondary" aria-hidden />
              Mayoristas · Cobo Calleja · Desde 2005
            </div>
            <h1 className="text-white text-balance" style={{ fontSize: 'clamp(2.5rem, 1.8rem + 4vw, 5.5rem)', lineHeight: 1.02, letterSpacing: '-0.04em' }}>
              Eres una tienda de reparación. Necesitas piezas que lleguen mañana.
            </h1>
            <p className="mt-6 max-w-2xl text-lg lg:text-xl text-ink-300 leading-relaxed">
              Estamos en el polígono de Cobo Calleja, el centro logístico más grande de Asia en Europa.
              Pantallas, baterías, cámaras, conectores y placas al por mayor. Envío 24h a toda España.
              Precios que aguantan contra el origen.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-3">
              <ButtonLink href="#contacto" size="xl" variant="primary">
                Solicitar acceso
                <ArrowRight size={18} aria-hidden />
              </ButtonLink>
              <ButtonLink href="https://tienda.cobophone.es" target="_blank" rel="noopener" size="xl" variant="outline" className="!text-white !ring-white/30 hover:!bg-white/5">
                Ver catálogo de piezas
              </ButtonLink>
            </div>
          </div>

          {/* Pillars */}
          <div className="mt-16 lg:mt-24 grid md:grid-cols-3 gap-px bg-white/10 rounded-2xl overflow-hidden ring-1 ring-white/10">
            <Pillar icon={<Globe2 size={22} />} title="Ubicación" body="Polígono Cobo Calleja, Fuenlabrada. El hub de importación más grande del sur de Europa." />
            <Pillar icon={<Truck size={22} />} title="Envío 24h" body="Pedidos antes de 17:00 salen el mismo día. España peninsular sin sobrecoste." />
            <Pillar icon={<Package size={22} />} title="Catálogo profundo" body="+818 SKUs solo en iPhone. Cobertura total en Samsung, Xiaomi, Huawei, Oppo." />
          </div>
        </div>
      </section>

      {/* Why us */}
      <section className="py-section bg-paper">
        <div className="container-fluid">
          <div className="max-w-2xl mb-12">
            <div className="inline-flex items-center gap-2 text-xs text-ink-500 uppercase tracking-widest mb-4">
              <span className="w-8 h-px bg-brand-primary" aria-hidden />
              Por qué elegirnos
            </div>
            <h2 className="text-balance">Veinte años abasteciendo talleres como el tuyo.</h2>
            <p className="mt-6 text-lg text-ink-700 leading-relaxed">
              Empezamos como un taller pequeño. Sabemos cómo funciona vuestro negocio porque es el nuestro.
              No vendemos lo que no usaríamos.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            <ReasonCard
              icon={<Shield size={20} />}
              title="Piezas testadas"
              body="Pasamos cada lote por control de calidad antes de enviarlo. Reposición sin discusión si algo falla."
            />
            <ReasonCard
              icon={<Users size={20} />}
              title="Trato directo"
              body="Tu cuenta tiene un comercial fijo en español o en chino. WhatsApp y WeChat para urgencias."
            />
            <ReasonCard
              icon={<BadgeCheck size={20} />}
              title="Tres tiers de precio"
              body="Starter (hasta 500€/mes), Pro (500-5000€/mes), Volume (5000€+/mes). Cuanto más pides, mejor precio."
            />
            <ReasonCard
              icon={<Truck size={20} />}
              title="Recogida en tienda"
              body="Si tu taller está en Madrid sur, pasa a recoger. Sin coste, sin esperar al transportista."
            />
            <ReasonCard
              icon={<Globe2 size={20} />}
              title="Envío internacional"
              body="Portugal, Francia, Marruecos. Trámites aduaneros gestionados desde Cobo Calleja."
            />
            <ReasonCard
              icon={<Package size={20} />}
              title="Sin pedido mínimo"
              body="Pídenos una pantalla o cien. El precio se ajusta al volumen, no a un mínimo arbitrario."
            />
          </div>
        </div>
      </section>

      {/* Pricing tiers */}
      <section className="py-section bg-chrome">
        <div className="container-fluid">
          <div className="max-w-2xl mb-12">
            <div className="inline-flex items-center gap-2 text-xs text-ink-500 uppercase tracking-widest mb-4">
              <span className="w-8 h-px bg-brand-primary" aria-hidden />
              Tiers
            </div>
            <h2 className="text-balance">Precio según volumen. Sin trucos.</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            <TierCard
              name="Starter"
              range="Hasta €500/mes"
              bullets={['Precio mayorista base', 'Envío 24h España', 'Soporte por WhatsApp']}
            />
            <TierCard
              name="Pro"
              range="€500–€5.000/mes"
              recommended
              bullets={['Descuento 8% sobre Starter', 'Comercial dedicado', 'Línea de crédito a 15 días', 'Acceso a stock pre-pedido']}
            />
            <TierCard
              name="Volume"
              range="€5.000+/mes"
              bullets={['Descuento 15% sobre Starter', 'Línea de crédito a 30 días', 'Stock dedicado', 'Visita presencial en tienda', 'Atención bilingüe ES/ZH']}
            />
          </div>
        </div>
      </section>

      {/* Contact form */}
      <section id="contacto" className="py-section bg-paper">
        <div className="container-narrow">
          <div className="max-w-2xl mb-10">
            <h2 className="text-balance">Cuéntanos cómo trabajas.</h2>
            <p className="mt-4 text-lg text-ink-700">
              Tres preguntas. Te respondemos en menos de 24h con tarifa personalizada.
            </p>
          </div>

          <form className="bg-chrome rounded-2xl p-6 lg:p-10 shadow-card ring-1 ring-ink-100 space-y-5">
            <Field label="Empresa">
              <input type="text" required className="w-full px-4 py-3 rounded-lg bg-paper ring-1 ring-ink-300 focus:ring-2 focus:ring-brand-primary focus:outline-none" placeholder="Reparaciones López, S.L." />
            </Field>
            <Field label="CIF / NIF">
              <input type="text" required pattern="[A-Z][0-9]{8}|[0-9]{8}[A-Z]" className="w-full px-4 py-3 rounded-lg bg-paper ring-1 ring-ink-300 focus:ring-2 focus:ring-brand-primary focus:outline-none font-mono" placeholder="B12345678" />
            </Field>
            <div className="grid sm:grid-cols-2 gap-5">
              <Field label="Contacto">
                <input type="text" required className="w-full px-4 py-3 rounded-lg bg-paper ring-1 ring-ink-300 focus:ring-2 focus:ring-brand-primary focus:outline-none" />
              </Field>
              <Field label="Teléfono">
                <input type="tel" required className="w-full px-4 py-3 rounded-lg bg-paper ring-1 ring-ink-300 focus:ring-2 focus:ring-brand-primary focus:outline-none" />
              </Field>
            </div>
            <Field label="Email">
              <input type="email" required className="w-full px-4 py-3 rounded-lg bg-paper ring-1 ring-ink-300 focus:ring-2 focus:ring-brand-primary focus:outline-none" />
            </Field>
            <Field label="Volumen mensual estimado">
              <select required className="w-full px-4 py-3 rounded-lg bg-paper ring-1 ring-ink-300 focus:ring-2 focus:ring-brand-primary focus:outline-none appearance-none">
                <option value="">Selecciona…</option>
                <option value="lt500">Menos de €500</option>
                <option value="500-2000">€500 – €2.000</option>
                <option value="2000-5000">€2.000 – €5.000</option>
                <option value="5000+">Más de €5.000</option>
                <option value="explore">Estoy explorando</option>
              </select>
            </Field>
            <Field label="Qué piezas te interesan (selecciona varias)">
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {['Pantallas', 'Baterías', 'Conectores', 'Cámaras', 'Tapas', 'Placas', 'Otros'].map(p => (
                  <label key={p} className="flex items-center gap-2 px-3 py-2.5 rounded-lg bg-paper ring-1 ring-ink-300 hover:ring-brand-primary cursor-pointer text-sm">
                    <input type="checkbox" className="rounded text-brand-primary focus:ring-brand-primary" />
                    {p}
                  </label>
                ))}
              </div>
            </Field>
            <Field label="Mensaje (opcional)">
              <textarea rows={3} className="w-full px-4 py-3 rounded-lg bg-paper ring-1 ring-ink-300 focus:ring-2 focus:ring-brand-primary focus:outline-none" placeholder="Cuéntanos qué marcas trabajáis más, si tenéis preferencia de envío, etc." />
            </Field>
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button type="submit" className="inline-flex items-center justify-center gap-2 h-14 px-7 rounded-xl bg-brand-primary text-white font-medium hover:bg-brand-primary-hover transition-colors">
                Enviar solicitud
                <ArrowRight size={18} aria-hidden />
              </button>
              <a
                href="https://wa.me/34911234567?text=Hola, soy de un taller de reparación y quiero información de mayorista."
                target="_blank"
                rel="noopener"
                className="inline-flex items-center justify-center gap-2 h-14 px-7 rounded-xl bg-[#25D366] text-white font-medium hover:bg-[#1DA851] transition-colors"
              >
                Hablar por WhatsApp
              </a>
            </div>
          </form>
        </div>
      </section>
    </>
  );
}

function Pillar({ icon, title, body }: { icon: React.ReactNode; title: string; body: string }) {
  return (
    <div className="bg-shadow-blue-deep p-6 lg:p-8">
      <div className="w-11 h-11 rounded-lg bg-brand-secondary text-shadow-blue flex items-center justify-center mb-5">{icon}</div>
      <h3 className="text-white text-lg font-semibold">{title}</h3>
      <p className="mt-2 text-sm text-ink-300 leading-relaxed">{body}</p>
    </div>
  );
}

function ReasonCard({ icon, title, body }: { icon: React.ReactNode; title: string; body: string }) {
  return (
    <article className="bg-chrome rounded-2xl p-6 ring-1 ring-ink-100 shadow-card">
      <div className="w-11 h-11 rounded-lg bg-brand-primary/10 text-brand-primary flex items-center justify-center mb-4">{icon}</div>
      <h3 className="text-lg font-semibold text-ink-900">{title}</h3>
      <p className="mt-2 text-sm text-ink-700 leading-relaxed">{body}</p>
    </article>
  );
}

/* F23 — Pro tier wins the page: dark surface, slight scale, magenta badge.
 * Starter / Volume stay light with outline ring so Pro is the centerpiece. */
function TierCard({ name, range, bullets, recommended }: { name: string; range: string; bullets: string[]; recommended?: boolean }) {
  if (recommended) {
    return (
      <article
        data-surface="dark"
        className="relative bg-shadow-blue text-white rounded-2xl p-6 lg:p-8 ring-1 ring-brand-secondary/40 shadow-pop md:scale-[1.04] md:-my-1 z-10"
      >
        <span className="absolute -top-3 left-6 px-3 py-1 rounded-full bg-brand-secondary text-white text-xs font-bold uppercase tracking-widest shadow-lg">
          ★ Recomendado
        </span>
        <h3 className="text-2xl font-semibold text-white">{name}</h3>
        <p className="mt-1 text-sm font-mono text-ink-700">{range}</p>
        <ul className="mt-6 space-y-2.5">
          {bullets.map((b, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-ink-300">
              <span className="text-brand-secondary mt-0.5">›</span>
              <span>{b}</span>
            </li>
          ))}
        </ul>
      </article>
    );
  }
  return (
    <article className="relative bg-chrome rounded-2xl p-6 lg:p-8 ring-1 ring-ink-100 shadow-card">
      <h3 className="text-2xl font-semibold text-ink-900">{name}</h3>
      <p className="mt-1 text-sm font-mono text-ink-500">{range}</p>
      <ul className="mt-6 space-y-2.5">
        {bullets.map((b, i) => (
          <li key={i} className="flex items-start gap-2 text-sm text-ink-700">
            <span className="text-brand-primary mt-0.5">›</span>
            <span>{b}</span>
          </li>
        ))}
      </ul>
    </article>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="block text-sm font-medium text-ink-900 mb-2">{label}</span>
      {children}
    </label>
  );
}
