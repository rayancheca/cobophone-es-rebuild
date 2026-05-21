import { NextResponse } from 'next/server';
import { z } from 'zod';

/**
 * /api/booking — receives an instant-quote booking submission.
 *
 * Foundation pass: validates with Zod, generates a reference number, logs,
 * returns the booking confirmation. No real CRM/email integration yet.
 *
 * The reference number format `CB-{YYYYMMDD}-{6 chars}` makes it visually
 * recognizable as a CoboPhone reference. Production should swap for sequential
 * IDs from the database.
 */

const BookingSchema = z.object({
  modelSlug: z.string().min(1),
  modelName: z.string().min(1),
  repairSlug: z.string().min(1),
  repairName: z.string().min(1),
  priceMin: z.number().int().nonnegative(),
  priceMax: z.number().int().nonnegative(),
  customer: z.object({
    name: z.string().trim().min(1).max(120),
    phone: z.string().trim().min(6).max(40),
    email: z.string().trim().email().optional().or(z.literal('')),
    notes: z.string().trim().max(2000).optional().or(z.literal(''))
  }),
  flow: z.enum(['walkin', 'mailin']).default('walkin'),
  preferredSlot: z.string().optional().or(z.literal(''))
});

function buildReference(): string {
  const d = new Date();
  const ymd = `${d.getFullYear()}${String(d.getMonth() + 1).padStart(2, '0')}${String(d.getDate()).padStart(2, '0')}`;
  const tail = Math.random().toString(36).slice(2, 8).toUpperCase();
  return `CB-${ymd}-${tail}`;
}

/** Estimate the next callback time — within 5 minutes during business hours,
 *  next opening if closed. Returns ISO + human label. */
function nextCallback(): { iso: string; label: string } {
  const now = new Date();
  const day = now.getDay(); // 0 = Sun
  const minutes = now.getHours() * 60 + now.getMinutes();
  const open = 10 * 60;
  const close = 19 * 60;
  const isSaturday = day === 6;
  const inHours = !isSaturday && minutes >= open && minutes < close;

  if (inHours) {
    const callbackAt = new Date(now.getTime() + 5 * 60 * 1000);
    return {
      iso: callbackAt.toISOString(),
      label: `en 5 minutos (~${String(callbackAt.getHours()).padStart(2, '0')}:${String(callbackAt.getMinutes()).padStart(2, '0')})`
    };
  }

  // Find next opening
  let next = new Date(now);
  next.setHours(10, 5, 0, 0);
  if (minutes >= close && !isSaturday) next.setDate(next.getDate() + 1);
  if (isSaturday) next.setDate(next.getDate() + 1);
  // skip Saturday
  if (next.getDay() === 6) next.setDate(next.getDate() + 1);
  return { iso: next.toISOString(), label: `mañana a las 10:05` };
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: 'invalid_json' }, { status: 400 });
  }

  const parsed = BookingSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: 'validation', issues: parsed.error.issues },
      { status: 400 }
    );
  }

  const data = parsed.data;
  const reference = buildReference();
  const callback = nextCallback();

  if (process.env.NODE_ENV !== 'production') {
    console.log('[booking]', { reference, modelName: data.modelName, repairName: data.repairName, customer: data.customer.name, phone: data.customer.phone });
  }

  /*
   * PRODUCTION: after wiring RESEND_API_KEY, send confirmation email to
   * customer + lead to info@cobophone.es. See HANDOFF.md §5.
   */

  return NextResponse.json({
    ok: true,
    reference,
    callback,
    booking: {
      modelName: data.modelName,
      repairName: data.repairName,
      priceMin: data.priceMin,
      priceMax: data.priceMax,
      flow: data.flow
    }
  });
}

export const dynamic = 'force-dynamic';
