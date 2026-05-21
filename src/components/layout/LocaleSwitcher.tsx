'use client';

import { useLocale } from 'next-intl';
import { useRouter } from 'next/navigation';
import { useTransition } from 'react';
import { cn } from '@/lib/utils';

const localeLabels: Record<string, string> = {
  es: 'ES',
  en: 'EN',
  zh: '中文'
};

const locales = ['es', 'en', 'zh'] as const;

export function LocaleSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const [, startTransition] = useTransition();

  /**
   * Foundation-pass switch: writes a NEXT_LOCALE cookie and refreshes.
   * The server's getRequestConfig (src/i18n/request.ts) reads the cookie.
   *
   * Production migration: use route-based locales — see middleware.ts notes.
   */
  const switchTo = (next: string) => {
    document.cookie = `NEXT_LOCALE=${next}; path=/; max-age=${60 * 60 * 24 * 365}`;
    startTransition(() => {
      router.refresh();
    });
  };

  return (
    <div className="inline-flex items-center gap-0.5 rounded-full bg-ink-100 p-1" role="group" aria-label="Language">
      {locales.map(l => (
        <button
          key={l}
          type="button"
          onClick={() => switchTo(l)}
          className={cn(
            'px-3 py-1 text-xs font-medium rounded-full transition-colors duration-micro',
            l === locale
              ? 'bg-chrome text-ink-900 shadow-hairline'
              : 'text-ink-500 hover:text-ink-900'
          )}
          aria-current={l === locale ? 'true' : undefined}
        >
          {localeLabels[l]}
        </button>
      ))}
    </div>
  );
}
