'use client';

import { useRef } from 'react';
import { useTranslations } from 'next-intl';
import { motion, useInView } from 'framer-motion';
import { MessageSquare, Truck, CheckCircle2 } from 'lucide-react';

/**
 * How-it-works — three-step promise with animated timeline.
 *
 * Animation: when the section enters the viewport, the cards stagger in from
 * below (0 → -8px). A horizontal timeline line draws between the cards in
 * sequence (01 → 02 → 03), reinforcing the direction of the flow. Each card
 * has a subtle 3-D tilt on hover.
 *
 * Psychology principles applied (see /research/08-psychology.md):
 * - Commitment & consistency: each step is a small commitment
 * - Goal-gradient: progress visually accelerates toward step 3
 * - Loss aversion (subtle): step 3 frames "and back home" — the relief moment
 */
export function HowItWorks() {
  const t = useTranslations('home.promise');
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const inView = useInView(sectionRef, { once: true, margin: '-15% 0px -15% 0px' });

  const rawSteps = t.raw('steps') as Array<{ n: string; title: string; body: string }>;
  const icons = [MessageSquare, Truck, CheckCircle2] as const;
  const steps = rawSteps.map((s, i) => ({ ...s, Icon: icons[i] }));

  return (
    <section ref={sectionRef} className="py-section bg-paper" aria-labelledby="how-heading">
      <div className="container-fluid">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-2xl mb-12 lg:mb-16"
        >
          <div className="inline-flex items-center gap-2 text-xs text-ink-500 uppercase tracking-widest mb-4">
            <span className="w-8 h-px bg-brand-primary" aria-hidden />
            {t('eyebrow')}
          </div>
          <h2 id="how-heading" className="text-balance">{t('headline')}</h2>
        </motion.div>

        {/* Cards + connecting timeline */}
        <div className="relative">
          {/* Horizontal connecting line — draws left to right on enter */}
          <motion.div
            className="hidden md:block absolute top-[88px] left-[8%] right-[8%] h-px bg-gradient-to-r from-brand-primary/30 via-brand-primary/60 to-brand-primary/30 origin-left"
            initial={{ scaleX: 0 }}
            animate={inView ? { scaleX: 1 } : {}}
            transition={{ duration: 1.4, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            aria-hidden
          />

          <ol className="grid md:grid-cols-3 gap-4 lg:gap-6 relative">
            {steps.map((step, i) => (
              <motion.li
                key={step.n}
                initial={{ opacity: 0, y: 32 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: 0.6,
                  delay: 0.4 + i * 0.18,
                  ease: [0.16, 1, 0.3, 1]
                }}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className="group relative bg-chrome rounded-2xl p-7 lg:p-8 ring-1 ring-ink-100 shadow-card hover:shadow-elevated transition-shadow duration-fast ease-out-expo"
              >
                {/* Step indicator dot (sits on the timeline line) */}
                <motion.div
                  className="hidden md:flex absolute -top-3 left-7 w-7 h-7 rounded-full bg-brand-primary text-white text-xs font-bold items-center justify-center font-mono ring-4 ring-paper z-10"
                  initial={{ scale: 0 }}
                  animate={inView ? { scale: 1 } : {}}
                  transition={{ duration: 0.4, delay: 0.6 + i * 0.18, type: 'spring', stiffness: 220 }}
                >
                  {i + 1}
                </motion.div>

                {/* Header row */}
                <div className="flex items-center justify-between mb-5 mt-1">
                  <span className="font-mono text-2xl text-ink-300 tracking-wide tabular-nums">{step.n}</span>
                  {i === steps.length - 1 && (
                    <motion.span
                      className="inline-flex items-center gap-1.5 text-xs font-mono text-white bg-brand-secondary px-2.5 py-1 rounded-full uppercase tracking-widest"
                      initial={{ scale: 0, opacity: 0 }}
                      animate={inView ? { scale: 1, opacity: 1 } : {}}
                      transition={{ delay: 1.2, type: 'spring' }}
                    >
                      ⏱ 40 min
                    </motion.span>
                  )}
                </div>

                {/* Icon */}
                <motion.div
                  className="w-12 h-12 rounded-xl bg-brand-primary/10 text-brand-primary flex items-center justify-center mb-5 group-hover:bg-brand-primary group-hover:text-white transition-colors duration-fast"
                  whileHover={{ rotate: [0, -8, 8, 0], transition: { duration: 0.4 } }}
                >
                  <step.Icon size={22} aria-hidden />
                </motion.div>

                <h3 className="text-xl font-semibold mb-2 text-ink-900">{step.title}</h3>
                <p className="text-ink-700 leading-relaxed text-[15px]">{step.body}</p>

                {/* Arrow to next card (not on the last) */}
                {i < steps.length - 1 && (
                  <motion.div
                    className="hidden md:block absolute top-[85px] -right-2 w-4 h-4 rounded-full bg-brand-primary text-white flex items-center justify-center text-[10px] z-10"
                    initial={{ scale: 0, x: -10 }}
                    animate={inView ? { scale: 1, x: 0 } : {}}
                    transition={{ delay: 0.9 + i * 0.18, type: 'spring' }}
                    aria-hidden
                  >
                    →
                  </motion.div>
                )}
              </motion.li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
