'use client';

import Link from 'next/link';
import { useLocale } from 'next-intl';
import { MessageCircle, Calculator, MapPin } from 'lucide-react';

export function MobileStickyBar() {
  const locale = useLocale();
  const prefix = locale === 'es' ? '' : `/${locale}`;

  return (
    <div className="lg:hidden fixed bottom-0 inset-x-0 z-[90] bg-chrome/95 backdrop-blur-md border-t border-ink-100 safe-bottom shadow-elevated">
      <div className="grid grid-cols-3 divide-x divide-ink-100">
        <Link
          href={`${prefix}/presupuesto`}
          className="flex flex-col items-center justify-center gap-1 py-3 text-ink-900 active:bg-ink-100"
        >
          <Calculator size={20} className="text-brand-primary" />
          <span className="text-xs font-medium">Presupuesto</span>
        </Link>
        <a
          href="https://wa.me/message/Y7WTOGB7WOXGP1"
          target="_blank"
          rel="noopener"
          className="flex flex-col items-center justify-center gap-1 py-3 text-ink-900 active:bg-ink-100"
        >
          <MessageCircle size={20} className="text-[#25D366]" />
          <span className="text-xs font-medium">WhatsApp</span>
        </a>
        <Link
          href={`${prefix}/ubicacion`}
          className="flex flex-col items-center justify-center gap-1 py-3 text-ink-900 active:bg-ink-100"
        >
          <MapPin size={20} className="text-brand-primary" />
          <span className="text-xs font-medium">Cómo llegar</span>
        </Link>
      </div>
    </div>
  );
}
