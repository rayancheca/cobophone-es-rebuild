import Link from 'next/link';
import { useTranslations, useLocale } from 'next-intl';
import { Smartphone, Tablet, Laptop, Watch, Gamepad2, Tv, Bike, ArrowUpRight } from 'lucide-react';

const ICONS: Record<string, typeof Smartphone> = {
  movil: Smartphone,
  tablet: Tablet,
  portatil: Laptop,
  smartwatch: Watch,
  consola: Gamepad2,
  television: Tv,
  'patinete-electrico': Bike
};

/**
 * Services grid — 7 categories per Hick's Law constraint.
 * See /research/08-psychology.md §Hick's Law.
 */
export function Services() {
  const t = useTranslations('home.services');
  const locale = useLocale();
  const prefix = locale === 'es' ? '' : `/${locale}`;
  const items = t.raw('items') as Array<{ slug: string; name: string; desc: string }>;

  return (
    <section className="py-section bg-chrome" aria-labelledby="services-heading">
      <div className="container-fluid">
        <div className="max-w-2xl mb-12">
          <div className="inline-flex items-center gap-2 text-xs text-ink-500 uppercase tracking-widest mb-4">
            <span className="w-8 h-px bg-brand-primary" aria-hidden />
            {t('eyebrow')}
          </div>
          <h2 id="services-heading" className="text-balance">{t('headline')}</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-ink-100 rounded-2xl overflow-hidden ring-1 ring-ink-100">
          {items.map(item => {
            const Icon = ICONS[item.slug] ?? Smartphone;
            return (
              <Link
                key={item.slug}
                href={`${prefix}/reparacion/${item.slug}`}
                className="group bg-chrome p-6 lg:p-8 hover:bg-paper transition-colors duration-fast ease-out-expo relative"
              >
                <div className="flex items-start justify-between">
                  <div className="w-12 h-12 rounded-xl bg-brand-primary/10 text-brand-primary flex items-center justify-center group-hover:bg-brand-primary group-hover:text-white transition-colors duration-fast ease-out-expo">
                    <Icon size={22} aria-hidden />
                  </div>
                  <ArrowUpRight
                    size={18}
                    className="text-ink-300 group-hover:text-ink-900 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-fast ease-out-expo"
                    aria-hidden
                  />
                </div>
                <h3 className="mt-6 text-lg font-semibold text-ink-900">{item.name}</h3>
                <p className="mt-1.5 text-sm text-ink-500 leading-relaxed">{item.desc}</p>
              </Link>
            );
          })}

          {/* Closing card — the question dispatcher */}
          <Link
            href="https://wa.me/message/Y7WTOGB7WOXGP1"
            target="_blank"
            rel="noopener"
            className="group bg-shadow-blue text-white p-6 lg:p-8 hover:bg-shadow-blue-deep transition-colors duration-fast ease-out-expo relative"
          >
            <div className="flex items-start justify-between">
              <div className="w-12 h-12 rounded-xl bg-brand-secondary text-shadow-blue flex items-center justify-center">
                <span className="text-2xl font-mono leading-none">?</span>
              </div>
              <ArrowUpRight
                size={18}
                className="text-ink-300 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-fast ease-out-expo"
                aria-hidden
              />
            </div>
            <h3 className="mt-6 text-lg font-semibold text-white">¿Otra cosa?</h3>
            <p className="mt-1.5 text-sm text-ink-300 leading-relaxed">Si tu dispositivo no está aquí, lo reparamos igual. Hablemos.</p>
          </Link>
        </div>
      </div>
    </section>
  );
}
