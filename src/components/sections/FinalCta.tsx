import Link from 'next/link';
import { useTranslations, useLocale } from 'next-intl';
import { ArrowRight } from 'lucide-react';

export function FinalCta() {
  const t = useTranslations('home.final');
  const locale = useLocale();
  const prefix = locale === 'es' ? '' : `/${locale}`;

  return (
    <section className="py-section bg-chrome" aria-labelledby="final-heading">
      <div className="container-narrow text-center">
        <h2
          id="final-heading"
          className="text-balance"
          style={{ fontSize: 'clamp(2.5rem, 1.5rem + 5vw, 5.5rem)', lineHeight: 1.05, letterSpacing: '-0.04em' }}
        >
          {t('headline')}
        </h2>
        <p className="mt-6 text-lg text-ink-700">{t('sub')}</p>
        <Link
          href={`${prefix}/presupuesto`}
          className="mt-10 inline-flex items-center gap-3 px-8 py-5 rounded-xl bg-brand-primary text-white font-medium text-lg hover:bg-brand-primary-hover transition-colors duration-fast shadow-pop"
        >
          {t('cta')}
          <ArrowRight size={20} aria-hidden />
        </Link>
      </div>
    </section>
  );
}
