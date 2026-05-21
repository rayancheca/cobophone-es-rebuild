import type { Metadata } from 'next';
import { MessageCircle, Phone, Mail, MapPin, ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Contacto · WhatsApp en 3 minutos',
  description: 'Habla con un técnico de CoboPhone por WhatsApp, teléfono o email. Respuesta en menos de 3 minutos en horario comercial.'
};

export default function ContactoPage() {
  return (
    <>
      <section className="pt-28 lg:pt-40 pb-section bg-paper">
        <div className="container-fluid">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-16">
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 text-xs text-ink-500 uppercase tracking-widest mb-4">
                <span className="w-8 h-px bg-brand-primary" aria-hidden />
                Contacto
              </div>
              <h1 className="text-balance">Habla con un técnico.</h1>
              <p className="mt-6 max-w-xl text-lg text-ink-700 leading-relaxed">
                WhatsApp es lo más rápido — responde un técnico real en menos de 3 minutos en horario comercial.
              </p>

              {/* WhatsApp first, designed as a surface */}
              <a
                href="https://wa.me/message/Y7WTOGB7WOXGP1"
                target="_blank"
                rel="noopener"
                className="mt-10 group block bg-chrome rounded-2xl p-6 ring-1 ring-ink-100 hover:ring-[#25D366] hover:shadow-elevated transition-all duration-fast ease-out-expo"
              >
                <div className="flex items-center gap-5">
                  <div className="relative shrink-0">
                    <div className="w-16 h-16 rounded-full bg-[#25D366] text-white flex items-center justify-center">
                      <MessageCircle size={26} aria-hidden />
                    </div>
                    <span className="absolute -bottom-0.5 -right-0.5 w-4 h-4 rounded-full bg-brand-accent ring-2 ring-chrome" aria-hidden />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs uppercase tracking-widest text-ink-500 font-mono">WhatsApp</p>
                    <p className="mt-1 text-xl font-semibold text-ink-900">Responde un técnico</p>
                    <p className="text-sm text-ink-700 mt-0.5">En línea ahora · típicamente responde en ~3 min</p>
                  </div>
                  <ArrowRight size={20} className="text-ink-300 group-hover:text-ink-900 group-hover:translate-x-1 transition-transform" aria-hidden />
                </div>
              </a>

              <div className="mt-6 grid sm:grid-cols-2 gap-3">
                <a href="tel:+34911234567" className="flex items-center gap-4 p-5 bg-chrome rounded-xl ring-1 ring-ink-100 hover:ring-brand-primary transition-all">
                  <Phone size={18} className="text-brand-primary" aria-hidden />
                  <div>
                    <p className="text-xs uppercase tracking-widest text-ink-500 font-mono">Teléfono</p>
                    <p className="text-ink-900 font-medium">+34 911 23 45 67</p>
                  </div>
                </a>
                <a href="mailto:info@cobophone.es" className="flex items-center gap-4 p-5 bg-chrome rounded-xl ring-1 ring-ink-100 hover:ring-brand-primary transition-all">
                  <Mail size={18} className="text-brand-primary" aria-hidden />
                  <div>
                    <p className="text-xs uppercase tracking-widest text-ink-500 font-mono">Email</p>
                    <p className="text-ink-900 font-medium">info@cobophone.es</p>
                  </div>
                </a>
              </div>
            </div>

            <div className="lg:col-span-5">
              <form className="bg-chrome rounded-2xl p-6 lg:p-8 ring-1 ring-ink-100 shadow-card space-y-4">
                <h2 className="text-xl font-semibold">O escríbenos</h2>
                <div>
                  <label className="block text-sm font-medium text-ink-900 mb-2">Nombre</label>
                  <input type="text" required className="w-full px-4 py-3 rounded-lg bg-paper ring-1 ring-ink-300 focus:ring-2 focus:ring-brand-primary focus:outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-ink-900 mb-2">Teléfono</label>
                  <input type="tel" required className="w-full px-4 py-3 rounded-lg bg-paper ring-1 ring-ink-300 focus:ring-2 focus:ring-brand-primary focus:outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-ink-900 mb-2">Email</label>
                  <input type="email" required className="w-full px-4 py-3 rounded-lg bg-paper ring-1 ring-ink-300 focus:ring-2 focus:ring-brand-primary focus:outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-ink-900 mb-2">¿Qué necesitas?</label>
                  <textarea rows={4} required className="w-full px-4 py-3 rounded-lg bg-paper ring-1 ring-ink-300 focus:ring-2 focus:ring-brand-primary focus:outline-none" placeholder="Dispositivo, modelo y qué le pasa." />
                </div>
                <label className="flex items-start gap-2 text-sm text-ink-700">
                  <input type="checkbox" required className="mt-1 rounded text-brand-primary focus:ring-brand-primary" />
                  <span>Acepto la política de privacidad y el tratamiento de mis datos.</span>
                </label>
                <button type="submit" className="w-full inline-flex items-center justify-center gap-2 h-12 px-6 rounded-lg bg-brand-primary text-white font-medium hover:bg-brand-primary-hover transition-colors">
                  Enviar mensaje
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      <section className="py-section bg-chrome">
        <div className="container-fluid">
          <h2 className="text-balance mb-6">Visítanos</h2>
          <div className="bg-paper rounded-2xl p-7 ring-1 ring-ink-100">
            <div className="flex items-start gap-4">
              <MapPin size={20} className="text-brand-primary mt-1" aria-hidden />
              <div>
                <p className="text-lg font-semibold text-ink-900">Calle Bembibre 5, Local A</p>
                <p className="text-ink-700 mt-1">Polígono Industrial Cobo Calleja · 28947 Fuenlabrada · Madrid</p>
                <p className="text-sm text-ink-500 font-mono mt-3">L–V 10:00–19:00 · Sáb cerrado · Dom 10:00–19:00</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
