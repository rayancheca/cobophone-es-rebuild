import { useTranslations, useLocale } from 'next-intl';
import { Star } from 'lucide-react';
import { reviews } from '@/data/location';

/**
 * Reviews — verified Google reviews.
 * Cialdini: social proof + source attribution.
 * Currently placeholder data — see QUESTIONS.md for Google Places API plan.
 */
export function Reviews() {
  const t = useTranslations('home.reviews');
  const tCommon = useTranslations('common');
  const locale = useLocale() as 'es' | 'en' | 'zh';

  return (
    <section className="py-section bg-chrome" aria-labelledby="reviews-heading">
      <div className="container-fluid">
        <div className="max-w-2xl mb-12">
          <div className="inline-flex items-center gap-2 text-xs text-ink-500 uppercase tracking-widest mb-4">
            <span className="w-8 h-px bg-brand-primary" aria-hidden />
            {t('eyebrow')}
          </div>
          <h2 id="reviews-heading" className="text-balance">{t('headline')}</h2>
          <div className="mt-6 flex items-center gap-3 text-sm text-ink-500">
            <div className="flex gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} size={16} className="fill-brand-secondary text-brand-secondary" aria-hidden />
              ))}
            </div>
            <span className="font-mono tabular-nums">4.9 / 5</span>
            <span>·</span>
            <span>+2.300 reseñas en Google</span>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {reviews.slice(0, 6).map(r => {
            const body = r.body[locale] ?? r.body.es;
            return (
              <article
                key={r.id}
                className="bg-paper rounded-2xl p-6 shadow-card ring-1 ring-ink-100 flex flex-col"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex gap-0.5">
                    {Array.from({ length: r.rating }).map((_, i) => (
                      <Star key={i} size={14} className="fill-brand-secondary text-brand-secondary" aria-hidden />
                    ))}
                  </div>
                  {r.verified && (
                    <span className="inline-flex items-center gap-1 text-xs text-ink-500 font-mono">
                      <span className="w-2 h-2 rounded-full bg-brand-accent" aria-hidden />
                      Google
                    </span>
                  )}
                </div>
                <blockquote className="text-ink-900 leading-relaxed text-balance flex-1">
                  "{body}"
                </blockquote>
                <footer className="mt-5 pt-4 border-t border-ink-100 flex items-center justify-between">
                  <span className="text-sm font-medium text-ink-900">{r.author}</span>
                  <time className="text-xs text-ink-500 font-mono" dateTime={r.date}>
                    {new Date(r.date).toLocaleDateString(locale === 'es' ? 'es-ES' : locale === 'en' ? 'en-GB' : 'zh-CN', { year: 'numeric', month: 'short' })}
                  </time>
                </footer>
              </article>
            );
          })}
        </div>

        <p className="mt-8 text-sm text-ink-500 text-center">
          {tCommon('verifiedReview')} · <a href="#" className="text-brand-primary hover:underline">Ver todas en Google</a>
        </p>
      </div>
    </section>
  );
}
