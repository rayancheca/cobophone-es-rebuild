import { useTranslations } from 'next-intl';

/**
 * How-it-works — three-step promise.
 *
 * Psychology principles applied (see /research/08-psychology.md):
 * - Commitment & consistency: each step is a small commitment
 * - Goal-gradient: progress visually accelerates toward step 3
 * - Loss aversion (subtle): step 3 frames "and back home" — the relief moment
 */
export function HowItWorks() {
  const t = useTranslations('home.promise');
  const steps = t.raw('steps') as Array<{ n: string; title: string; body: string }>;

  return (
    <section className="py-section bg-paper" aria-labelledby="how-heading">
      <div className="container-fluid">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 text-xs text-ink-500 uppercase tracking-widest mb-4">
            <span className="w-8 h-px bg-brand-primary" aria-hidden />
            {t('eyebrow')}
          </div>
          <h2 id="how-heading" className="text-balance">{t('headline')}</h2>
        </div>

        <ol className="mt-12 lg:mt-16 grid md:grid-cols-3 gap-px bg-ink-100 rounded-2xl overflow-hidden shadow-card ring-1 ring-ink-100">
          {steps.map((step, i) => (
            <li
              key={step.n}
              className="bg-chrome p-8 lg:p-10 relative group hover:bg-paper transition-colors duration-fast ease-out-expo"
            >
              <div className="flex items-center justify-between mb-6">
                <span className="font-mono text-2xl text-ink-300 tracking-wide">{step.n}</span>
                {i === steps.length - 1 && (
                  <span className="text-xs font-mono text-brand-primary uppercase tracking-widest bg-brand-primary/10 px-2 py-1 rounded">
                    40 min
                  </span>
                )}
              </div>
              <h3 className="text-xl font-semibold mb-3 text-ink-900">{step.title}</h3>
              <p className="text-ink-700 leading-relaxed">{step.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
