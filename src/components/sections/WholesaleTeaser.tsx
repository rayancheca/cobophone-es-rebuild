import Link from 'next/link';
import { useTranslations, useLocale } from 'next-intl';
import { ArrowRight, Truck, Package, Globe2 } from 'lucide-react';

/**
 * B2B teaser block — Cialdini Unity ("somos uno de vosotros").
 * Visual contrast vs the consumer sections — heavier, more industrial.
 */
export function WholesaleTeaser() {
  const t = useTranslations('home.wholesale');
  const locale = useLocale();
  const prefix = locale === 'es' ? '' : `/${locale}`;

  return (
    <section
      data-surface="dark"
      className="py-section bg-shadow-blue-deep text-white relative overflow-hidden"
      aria-labelledby="wholesale-heading"
    >
      <div className="absolute inset-0 dot-grid opacity-20" aria-hidden />
      <div className="absolute -top-32 -right-20 w-[500px] h-[500px] rounded-full bg-brand-primary/15 blur-[120px] pointer-events-none" aria-hidden />

      <div className="container-fluid relative">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-2 text-xs text-brand-secondary uppercase tracking-widest mb-4">
              <span className="w-8 h-px bg-brand-secondary" aria-hidden />
              {t('eyebrow')}
            </div>
            <h2 id="wholesale-heading" className="text-white text-balance">{t('headline')}</h2>
            <p className="mt-6 max-w-2xl text-lg text-ink-300 leading-relaxed">{t('body')}</p>
            <Link
              href={`${prefix}/mayoristas`}
              className="mt-8 inline-flex items-center gap-2 text-brand-secondary font-medium hover:gap-3 transition-all duration-fast ease-out-expo"
            >
              {t('cta')}
              <ArrowRight size={18} aria-hidden />
            </Link>
          </div>

          <div className="lg:col-span-5">
            <div className="grid grid-cols-1 gap-3">
              <StatLine
                icon={<Globe2 size={20} />}
                label="Cobo Calleja"
                value="Centro logístico Asia-Europa más grande de España"
              />
              <StatLine
                icon={<Truck size={20} />}
                label="Envío 24h"
                value="A toda España. Pedidos antes de 17:00 salen el mismo día."
              />
              <StatLine
                icon={<Package size={20} />}
                label="+818 SKUs"
                value="Solo en iPhone. Catálogo completo en tienda.cobophone.es"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function StatLine({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex gap-4 p-5 bg-white/5 rounded-xl ring-1 ring-white/10">
      <div className="w-10 h-10 shrink-0 rounded-lg bg-brand-secondary text-shadow-blue flex items-center justify-center">
        {icon}
      </div>
      <div>
        <p className="text-xs text-ink-500 uppercase tracking-widest font-mono">{label}</p>
        <p className="mt-1 text-sm text-white">{value}</p>
      </div>
    </div>
  );
}
