import Link from 'next/link';
import { ArrowRight, MessageCircle } from 'lucide-react';

export default function NotFound() {
  return (
    <section className="min-h-[80vh] flex items-center justify-center py-section bg-paper">
      <div className="container-narrow text-center">
        <p className="font-mono text-sm uppercase tracking-widest text-ink-500">Error 404</p>
        <h1 className="mt-6 text-balance" style={{ fontSize: 'clamp(2.5rem, 1.5rem + 5vw, 5.5rem)', lineHeight: 1.05, letterSpacing: '-0.04em' }}>
          Esta página no existe.
        </h1>
        <p className="mt-6 text-lg text-ink-700">
          Pero tu reparación sí. Calcula el precio en 30 segundos o escríbenos por WhatsApp.
        </p>
        <div className="mt-10 flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/presupuesto"
            className="inline-flex items-center justify-center gap-2 h-14 px-7 rounded-xl bg-brand-primary text-white font-medium hover:bg-brand-primary-hover transition-colors shadow-pop"
          >
            Calcular precio
            <ArrowRight size={18} aria-hidden />
          </Link>
          <a
            href="https://wa.me/34911234567"
            target="_blank"
            rel="noopener"
            className="inline-flex items-center justify-center gap-2 h-14 px-7 rounded-xl bg-[#25D366] text-white font-medium hover:bg-[#1DA851] transition-colors"
          >
            <MessageCircle size={18} aria-hidden />
            WhatsApp
          </a>
        </div>
        <p className="mt-12 text-sm text-ink-500">
          ¿Te perdiste? <Link href="/" className="text-brand-primary hover:underline">Volver al inicio</Link>
        </p>
      </div>
    </section>
  );
}
