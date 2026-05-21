import { NextResponse } from 'next/server';
import { z } from 'zod';

/**
 * /api/contact — receives contact form submissions from the home page.
 *
 * Foundation pass: validates with Zod, logs the submission, returns success.
 * No real email send wired up yet (Resend integration documented in HANDOFF §5).
 *
 * Production path:
 *   1. Add RESEND_API_KEY + RESEND_FROM_EMAIL to env
 *   2. Install `resend` (already in package.json or add it)
 *   3. Uncomment the Resend.send() block below
 *
 * Rate limit, captcha, and spam filtering should also be added — see HANDOFF.
 */

const ContactSchema = z.object({
  name: z.string().trim().min(1, 'name required').max(120),
  email: z.string().trim().email('valid email required').max(180),
  phone: z.string().trim().max(40).optional().or(z.literal('')),
  message: z.string().trim().min(1, 'message required').max(2000),
  consent: z.literal(true, { errorMap: () => ({ message: 'consent required' }) }),
  // F25 honeypot — silently dropped if filled. Real users never see this field.
  website: z.string().max(0).optional().or(z.literal(''))
});

// F25 — minimal in-memory rate limit (per IP, per minute). Survives a single
// serverless instance's lifetime; production swap to @upstash/ratelimit for
// shared state across instances. Good enough to deter script-kiddies.
const HITS = new Map<string, number[]>();
const WINDOW_MS = 60_000;
const MAX_PER_WINDOW = 5;

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (HITS.get(ip) ?? []).filter(t => now - t < WINDOW_MS);
  recent.push(now);
  HITS.set(ip, recent);
  if (HITS.size > 1000) {
    for (const [k, v] of HITS) if (v.every(t => now - t > WINDOW_MS)) HITS.delete(k);
  }
  return recent.length > MAX_PER_WINDOW;
}

function clientIp(request: Request): string {
  return (
    request.headers.get('x-forwarded-for')?.split(',')[0].trim() ??
    request.headers.get('x-real-ip') ??
    'unknown'
  );
}

export async function POST(request: Request) {
  // F25 — Rate limit + honeypot. Both fail silently with 200 so attackers
  // can't distinguish rejection from success.
  const ip = clientIp(request);
  if (rateLimited(ip)) {
    return NextResponse.json({ ok: true });
  }
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: 'invalid_json' }, { status: 400 });
  }

  const parsed = ContactSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: 'validation', issues: parsed.error.issues },
      { status: 400 }
    );
  }

  const data = parsed.data;

  // F25 honeypot — if a bot filled the hidden `website` field, drop silently.
  if (data.website) {
    return NextResponse.json({ ok: true });
  }

  // F-bonus — guard the log behind a non-prod check so we don't leak PII to
  // vercel logs in production. Real production wires Resend instead.
  if (process.env.NODE_ENV !== 'production') {
    console.log('[contact-form]', {
      timestamp: new Date().toISOString(),
      name: data.name,
      email: data.email,
      phone: data.phone || null,
      messagePreview: data.message.slice(0, 120)
    });
  }

  /*
   * PRODUCTION: uncomment after wiring RESEND_API_KEY
   *
   * import { Resend } from 'resend';
   * const resend = new Resend(process.env.RESEND_API_KEY!);
   * await resend.emails.send({
   *   from: process.env.RESEND_FROM_EMAIL ?? 'CoboPhone <hola@cobophone.es>',
   *   to: 'info@cobophone.es',
   *   subject: `Contacto web — ${data.name}`,
   *   replyTo: data.email,
   *   text: [
   *     `Nombre: ${data.name}`,
   *     `Email: ${data.email}`,
   *     data.phone ? `Teléfono: ${data.phone}` : '',
   *     '',
   *     'Mensaje:',
   *     data.message
   *   ].filter(Boolean).join('\n')
   * });
   */

  return NextResponse.json({ ok: true });
}

// Disable caching — every submission goes through fresh
export const dynamic = 'force-dynamic';
