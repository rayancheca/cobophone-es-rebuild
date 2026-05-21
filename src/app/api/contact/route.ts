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
  consent: z.literal(true, { errorMap: () => ({ message: 'consent required' }) })
});

export async function POST(request: Request) {
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

  // Log on the server — visible in `vercel logs` for the foundation pass.
  console.log('[contact-form]', {
    timestamp: new Date().toISOString(),
    name: data.name,
    email: data.email,
    phone: data.phone || null,
    messagePreview: data.message.slice(0, 120)
  });

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
