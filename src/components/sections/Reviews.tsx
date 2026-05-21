import { useTranslations, useLocale } from 'next-intl';
import { Star, ExternalLink } from 'lucide-react';
import { reviews, GOOGLE_MAPS_LISTING_URL } from '@/data/location';

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
            <a
              href={GOOGLE_MAPS_LISTING_URL}
              target="_blank"
              rel="noopener"
              className="font-mono tabular-nums hover:text-brand-primary inline-flex items-center gap-1"
            >
              Ver puntuación en Google <ExternalLink size={12} />
            </a>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {reviews.slice(0, 6).map(r => {
            const body = r.body[locale] ?? r.body.es;
            return (
              <article
                key={r.id}
                className="group bg-paper rounded-2xl p-6 shadow-card ring-1 ring-ink-100 flex flex-col"
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
                  &ldquo;{body}&rdquo;
                </blockquote>
                <footer className="mt-5 pt-4 border-t border-ink-100 flex items-center justify-between">
                  <span className="text-sm font-medium text-ink-900">{r.author}</span>
                  {r.sourceUrl ? (
                    <a
                      href={r.sourceUrl}
                      target="_blank"
                      rel="noopener"
                      className="text-xs text-ink-500 font-mono hover:text-brand-primary inline-flex items-center gap-1"
                      aria-label={`Ver reseña de ${r.author} en Google`}
                    >
                      <time dateTime={r.date}>
                        {new Date(r.date).toLocaleDateString(locale === 'es' ? 'es-ES' : locale === 'en' ? 'en-GB' : 'zh-CN', { year: 'numeric', month: 'short' })}
                      </time>
                      <ExternalLink size={11} />
                    </a>
                  ) : (
                    <time className="text-xs text-ink-500 font-mono" dateTime={r.date}>
                      {new Date(r.date).toLocaleDateString(locale === 'es' ? 'es-ES' : locale === 'en' ? 'en-GB' : 'zh-CN', { year: 'numeric', month: 'short' })}
                    </time>
                  )}
                </footer>
              </article>
            );
          })}
        </div>

        <p className="mt-8 text-sm text-ink-500 text-center">
          {tCommon('verifiedReview')} ·{' '}
          <a
            href={GOOGLE_MAPS_LISTING_URL}
            target="_blank"
            rel="noopener"
            className="text-brand-primary hover:underline inline-flex items-center gap-1"
          >
            Ver todas en Google <ExternalLink size={12} />
          </a>
        </p>
      </div>
    </section>
  );
}
