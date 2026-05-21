'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { ArrowRight, MessageCircle, RefreshCcw } from 'lucide-react';

/**
 * Root-level error boundary. Mirrors not-found.tsx in tone and CTAs so a
 * server error feels like a designed brand moment rather than a default
 * Next.js "Application error" page.
 */
export default function ErrorPage({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    // Production: report to Sentry / Vercel Observability here
    if (process.env.NODE_ENV !== 'production') {
      console.error('[root-error]', error);
    }
  }, [error]);

  return (
    <section className="min-h-[80vh] flex items-center justify-center py-section bg-paper">
      <div className="container-narrow text-center">
        <p className="font-mono text-sm uppercase tracking-widest text-ink-500">Error inesperado</p>
        <h1
          className="mt-6 text-balance"
          style={{ fontSize: 'clamp(2.5rem, 1.5rem + 5vw, 5.5rem)', lineHeight: 1.05, letterSpacing: '-0.04em' }}
        >
          Algo no ha salido bien.
        </h1>
        <p className="mt-6 text-lg text-ink-700 max-w-md mx-auto">
          Pasa de vez en cuando. Vuelve a intentarlo en un segundo o, si tienes prisa, escríbenos por WhatsApp.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row gap-3 justify-center">
          <button
            type="button"
            onClick={reset}
            className="inline-flex items-center justify-center gap-2 h-14 px-7 rounded-xl bg-brand-primary text-white font-medium hover:bg-brand-primary-hover transition-colors shadow-pop"
          >
            <RefreshCcw size={18} aria-hidden />
            Intentar de nuevo
          </button>
          <a
            href="https://wa.me/34911234567"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 h-14 px-7 rounded-xl bg-[#25D366] text-white font-medium hover:bg-[#1DA851] transition-colors"
          >
            <MessageCircle size={18} aria-hidden />
            WhatsApp
          </a>
        </div>

        <p className="mt-12 text-sm text-ink-500">
          ¿Necesitas algo más?{' '}
          <Link href="/" className="text-brand-primary hover:underline inline-flex items-center gap-1">
            Volver al inicio <ArrowRight size={12} />
          </Link>
        </p>

        {error.digest && (
          <p className="mt-8 text-[10px] text-ink-300 font-mono">Ref: {error.digest}</p>
        )}
      </div>
    </section>
  );
}
