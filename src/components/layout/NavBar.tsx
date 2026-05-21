'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { Menu, X, MessageCircle } from 'lucide-react';
import { ButtonLink } from '@/components/ui/Button';
import { LocaleSwitcher } from './LocaleSwitcher';
import { cn } from '@/lib/utils';

const navItems = [
  { key: 'repair',    href: '/reparacion' },
  { key: 'store',     href: '/tienda' },
  { key: 'wholesale', href: '/mayoristas' },
  { key: 'pickup',    href: '/recogida' },
  { key: 'location',  href: '/ubicacion' }
] as const;

export function NavBar() {
  const t = useTranslations('nav');
  const locale = useLocale();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const localePrefix = locale === 'es' ? '' : `/${locale}`;

  return (
    <header
      className={cn(
        'fixed top-0 inset-x-0 z-[100] transition-all duration-fast ease-out-expo',
        scrolled
          ? 'bg-paper/90 backdrop-blur-md shadow-hairline'
          : 'bg-transparent'
      )}
    >
      <div className="container-fluid h-16 lg:h-20 flex items-center justify-between">
        {/* Logo */}
        <Link
          href={`${localePrefix}/`}
          className="flex items-center gap-2 font-display font-semibold text-xl tracking-tighter text-ink-900"
        >
          <span className="inline-block w-8 h-8 rounded-md bg-brand-primary text-white text-sm font-bold flex items-center justify-center">C</span>
          <span>CoboPhone</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-1" aria-label="Main">
          {navItems.map(item => (
            <Link
              key={item.key}
              href={`${localePrefix}${item.href}`}
              className="px-3 py-2 text-sm font-medium text-ink-700 hover:text-ink-900 transition-colors duration-micro relative group"
            >
              {t(item.key)}
              <span className="absolute left-3 right-3 -bottom-1 h-[2px] bg-brand-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-fast ease-out-expo origin-left" />
            </Link>
          ))}
        </nav>

        {/* CTAs */}
        <div className="hidden lg:flex items-center gap-3">
          <LocaleSwitcher />
          <ButtonLink href={`${localePrefix}/presupuesto`} size="md" variant="primary">
            {t('quote')}
          </ButtonLink>
        </div>

        {/* Mobile toggle */}
        <button
          type="button"
          className="lg:hidden p-2 -mr-2 text-ink-900"
          onClick={() => setMobileOpen(o => !o)}
          aria-label={mobileOpen ? t('closeMenu') : t('openMenu')}
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="lg:hidden bg-chrome border-t border-ink-100 shadow-elevated">
          <nav className="container-fluid py-4 flex flex-col gap-1" aria-label="Mobile">
            {navItems.map(item => (
              <Link
                key={item.key}
                href={`${localePrefix}${item.href}`}
                className="px-3 py-3 text-base font-medium text-ink-900 hover:bg-ink-100 rounded-lg"
                onClick={() => setMobileOpen(false)}
              >
                {t(item.key)}
              </Link>
            ))}
            <div className="border-t border-ink-100 pt-3 mt-2 flex flex-col gap-2">
              <ButtonLink href={`${localePrefix}/presupuesto`} size="lg" variant="primary" onClick={() => setMobileOpen(false)}>
                {t('quote')}
              </ButtonLink>
              <ButtonLink href="https://wa.me/message/Y7WTOGB7WOXGP1" size="lg" variant="whatsapp" target="_blank" rel="noopener">
                <MessageCircle size={18} aria-hidden /> {t('whatsapp')}
              </ButtonLink>
              <LocaleSwitcher />
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
