import clsx, { type ClassValue } from 'clsx';

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

export function formatPrice(min: number, max: number, locale: 'es' | 'en' | 'zh' = 'es') {
  const fmt = (n: number) =>
    new Intl.NumberFormat(locale === 'es' ? 'es-ES' : locale === 'en' ? 'en-GB' : 'zh-CN', {
      style: 'currency',
      currency: 'EUR',
      maximumFractionDigits: 0
    }).format(n);
  if (min === max) return fmt(min);
  return `${fmt(min)}–${fmt(max)}`;
}

export function formatNumber(n: number, locale: 'es' | 'en' | 'zh' = 'es') {
  return new Intl.NumberFormat(locale === 'es' ? 'es-ES' : locale === 'en' ? 'en-GB' : 'zh-CN').format(n);
}

const dayMap = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'] as const;

export function getOpenStatus(hours: Record<typeof dayMap[number], Array<{ from: string; to: string }>>) {
  const now = new Date();
  const todayKey = dayMap[now.getDay()];
  const todayWindows = hours[todayKey] ?? [];
  const minutesNow = now.getHours() * 60 + now.getMinutes();

  for (const w of todayWindows) {
    const [fh, fm] = w.from.split(':').map(Number);
    const [th, tm] = w.to.split(':').map(Number);
    const fromMin = fh * 60 + fm;
    const toMin = th * 60 + tm;
    if (minutesNow >= fromMin && minutesNow < toMin) {
      return { open: true, closesAt: w.to };
    }
  }
  // Find next opening
  for (let i = 0; i < 7; i++) {
    const day = dayMap[(now.getDay() + i) % 7];
    const windows = hours[day] ?? [];
    if (windows.length > 0) {
      if (i === 0) {
        // today, but after windows
        const next = windows.find(w => {
          const [fh, fm] = w.from.split(':').map(Number);
          return fh * 60 + fm > minutesNow;
        });
        if (next) return { open: false, opensAt: `hoy ${next.from}` };
      } else {
        return { open: false, opensAt: i === 1 ? `mañana ${windows[0].from}` : `en ${i} días` };
      }
    }
  }
  return { open: false };
}

/**
 * Build a WhatsApp deep link that opens a direct chat with our phone number
 * with `prefilled` as the pre-typed message.
 *
 * Uses the `wa.me/<phone>?text=` pattern — this opens the WhatsApp app
 * directly on a one-on-one chat with us (more reliable than the older
 * `wa.me/message/<code>` business-link format which sometimes silently
 * fails on iOS Safari).
 *
 * To swap the destination number for production: change WHATSAPP_NUMBER
 * here. Eventually move to NEXT_PUBLIC_WHATSAPP_NUMBER env var so it can
 * be split per audience (B2C / B2B) without code changes.
 */
const WHATSAPP_NUMBER = '34911234567'; // [VERIFY] replace with the real number before launch

export function buildWhatsAppLink(prefilled: string) {
  const base = `https://wa.me/${WHATSAPP_NUMBER}`;
  if (!prefilled) return base;
  return `${base}?text=${encodeURIComponent(prefilled)}`;
}

export function slugify(s: string) {
  return s
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}
