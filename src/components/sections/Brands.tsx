import Link from 'next/link';
import { useTranslations, useLocale } from 'next-intl';

/**
 * Brand grid — 8 logos with model counts.
 * Counts pulled from the real catalog audit (R1) per /research/01-current-site-audit.md §6.
 */
export function Brands() {
  const t = useTranslations('home.brands');
  const locale = useLocale();
  const prefix = locale === 'es' ? '' : `/${locale}`;
  const list = t.raw('list') as Array<{ slug: string; name: string; count: number }>;

  return (
    <section className="py-section bg-paper" aria-labelledby="brands-heading">
      <div className="container-fluid">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-16 mb-12 lg:mb-16">
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-2 text-xs text-ink-500 uppercase tracking-widest mb-4">
              <span className="w-8 h-px bg-brand-primary" aria-hidden />
              {t('eyebrow')}
            </div>
            <h2 className="text-balance">{t('headline')}</h2>
          </div>
          <div className="lg:col-span-5 flex items-end">
            <p className="text-lg text-ink-700 leading-relaxed">{t('subline')}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {list.map(b => (
            <Link
              key={b.slug}
              href={`${prefix}/reparacion/movil/${b.slug}`}
              className="group relative bg-chrome rounded-2xl p-6 shadow-card hover:shadow-elevated transition-all duration-fast ease-out-expo hover:-translate-y-0.5 ring-1 ring-ink-100"
            >
              <div className="flex items-center justify-between mb-6">
                <span className="font-display font-semibold text-2xl text-ink-900 tracking-tight">
                  {b.name}
                </span>
                <span className="font-mono text-xs text-ink-500 tabular-nums">
                  {b.count} modelos
                </span>
              </div>
              <div className="text-sm text-ink-500 group-hover:text-brand-primary transition-colors duration-fast">
                Ver reparaciones →
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
