'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Send, MessageCircle, MapPin, Mail, Check, AlertTriangle, Loader2 } from 'lucide-react';
import { buildWhatsAppLink, cn } from '@/lib/utils';

/**
 * ContactForm — bottom-of-home contact section with a dual surface:
 * left side has the WhatsApp + phone + email CTAs (the fastest paths), right
 * side has the form for users who'd rather email. Form submits to /api/contact
 * which validates with Zod and (in production) sends via Resend.
 */

const Schema = z.object({
  name: z.string().min(1, 'Necesitamos tu nombre').max(120),
  email: z.string().email('Necesitamos un email válido').max(180),
  phone: z.string().max(40).optional().or(z.literal('')),
  message: z.string().min(8, 'Cuéntanos un poco más').max(2000),
  consent: z.literal(true, { errorMap: () => ({ message: 'Tienes que aceptar la política de privacidad' }) })
});

type FormValues = z.infer<typeof Schema>;
type Status = 'idle' | 'submitting' | 'success' | 'error';

export function ContactForm() {
  const [status, setStatus] = useState<Status>('idle');
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<FormValues>({
    resolver: zodResolver(Schema),
    defaultValues: { name: '', email: '', phone: '', message: '', consent: false as never }
  });

  async function onSubmit(values: FormValues) {
    setStatus('submitting');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values)
      });
      if (!res.ok) throw new Error(`status ${res.status}`);
      setStatus('success');
      reset();
    } catch {
      setStatus('error');
    }
  }

  return (
    <section className="py-section bg-paper" aria-labelledby="contact-heading">
      <div className="container-fluid">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16">
          {/* Left — copy + fastest channels */}
          <div className="lg:col-span-5">
            <div className="inline-flex items-center gap-2 text-xs text-ink-500 uppercase tracking-widest mb-4">
              <span className="w-8 h-px bg-brand-primary" aria-hidden />
              Contacto
            </div>
            <h2 id="contact-heading" className="text-balance">¿Hablamos?</h2>
            <p className="mt-4 text-lg text-ink-700 leading-relaxed max-w-md">
              Si prefieres hablar antes de pasarte por la tienda, escríbenos. WhatsApp
              es lo más rápido — un técnico responde en menos de 3 minutos.
            </p>

            <div className="mt-8 space-y-3">
              <a
                href={buildWhatsAppLink('Hola, tengo una duda sobre una reparación.')}
                target="_blank"
                rel="noopener"
                className="group flex items-center gap-4 p-5 bg-chrome rounded-2xl ring-1 ring-ink-100 hover:ring-[#25D366] hover:shadow-elevated transition-all duration-fast"
              >
                <div className="relative shrink-0">
                  <div className="w-12 h-12 rounded-full bg-[#25D366] text-white flex items-center justify-center">
                    <MessageCircle size={22} aria-hidden />
                  </div>
                  <span className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-brand-accent ring-2 ring-chrome" aria-hidden />
                </div>
                <div className="flex-1">
                  <p className="text-xs uppercase tracking-widest text-ink-500 font-mono">WhatsApp</p>
                  <p className="font-semibold text-ink-900">Responde un técnico</p>
                </div>
                <span className="text-xs text-ink-500 font-mono">~3 min</span>
              </a>

              <a
                href="tel:+34911234567"
                className="group flex items-center gap-4 p-5 bg-chrome rounded-2xl ring-1 ring-ink-100 hover:ring-brand-primary transition-all"
              >
                <div className="shrink-0 w-12 h-12 rounded-full bg-brand-primary/10 text-brand-primary flex items-center justify-center">
                  <Mail size={22} aria-hidden />
                </div>
                <div className="flex-1">
                  <p className="text-xs uppercase tracking-widest text-ink-500 font-mono">Email</p>
                  <p className="font-semibold text-ink-900">info@cobophone.es</p>
                </div>
              </a>

              <a
                href="https://www.google.com/maps/dir/?api=1&destination=Calle+Bembibre+5%2C+28947+Fuenlabrada%2C+Madrid"
                target="_blank"
                rel="noopener"
                className="group flex items-center gap-4 p-5 bg-chrome rounded-2xl ring-1 ring-ink-100 hover:ring-brand-primary transition-all"
              >
                <div className="shrink-0 w-12 h-12 rounded-full bg-brand-primary/10 text-brand-primary flex items-center justify-center">
                  <MapPin size={22} aria-hidden />
                </div>
                <div className="flex-1">
                  <p className="text-xs uppercase tracking-widest text-ink-500 font-mono">Visítanos</p>
                  <p className="font-semibold text-ink-900">Calle Bembibre 5, Cobo Calleja</p>
                </div>
              </a>
            </div>
          </div>

          {/* Right — form */}
          <div className="lg:col-span-7">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="bg-chrome rounded-2xl p-6 lg:p-8 ring-1 ring-ink-100 shadow-card"
              noValidate
            >
              <h3 className="text-xl font-semibold mb-1">O mándanos un email</h3>
              <p className="text-sm text-ink-500 mb-6">Te respondemos en menos de 24h en horario laboral.</p>

              <div className="grid sm:grid-cols-2 gap-4">
                <Field label="Nombre" error={errors.name?.message} required>
                  <input
                    type="text"
                    autoComplete="name"
                    {...register('name')}
                    className={inputClass(!!errors.name)}
                  />
                </Field>
                <Field label="Teléfono" error={errors.phone?.message} hint="Opcional">
                  <input
                    type="tel"
                    autoComplete="tel"
                    {...register('phone')}
                    className={inputClass(!!errors.phone)}
                    placeholder="+34 ..."
                  />
                </Field>
              </div>

              <Field label="Email" error={errors.email?.message} required>
                <input
                  type="email"
                  autoComplete="email"
                  {...register('email')}
                  className={inputClass(!!errors.email)}
                  placeholder="tu@email.com"
                />
              </Field>

              <Field label="¿Qué necesitas?" error={errors.message?.message} required>
                <textarea
                  rows={5}
                  {...register('message')}
                  className={cn(inputClass(!!errors.message), 'resize-y')}
                  placeholder="Dispositivo, modelo y qué le pasa. Cuanta más info, mejor podemos ayudarte."
                />
              </Field>

              <label className="flex items-start gap-2.5 mt-4 text-sm text-ink-700 cursor-pointer">
                <input
                  type="checkbox"
                  {...register('consent')}
                  className="mt-1 w-4 h-4 rounded text-brand-primary focus:ring-brand-primary"
                />
                <span>
                  Acepto la <a href="/legal/privacidad" className="text-brand-primary hover:underline">política de privacidad</a> y el
                  tratamiento de mis datos.
                </span>
              </label>
              {errors.consent && <p className="mt-1.5 text-xs text-danger">{errors.consent.message}</p>}

              <button
                type="submit"
                disabled={status === 'submitting'}
                className="mt-6 w-full sm:w-auto inline-flex items-center justify-center gap-2 h-12 px-7 rounded-xl bg-brand-primary text-white font-medium hover:bg-brand-primary-hover transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {status === 'submitting' ? (
                  <>
                    <Loader2 size={18} className="animate-spin" aria-hidden />
                    Enviando…
                  </>
                ) : (
                  <>
                    Enviar mensaje
                    <Send size={16} aria-hidden />
                  </>
                )}
              </button>

              {status === 'success' && (
                <div className="mt-5 flex items-start gap-3 p-4 bg-brand-accent/10 ring-1 ring-brand-accent/30 rounded-lg text-sm text-ink-900">
                  <Check size={18} className="text-brand-accent mt-0.5 shrink-0" aria-hidden />
                  <div>
                    <p className="font-semibold">¡Recibido!</p>
                    <p className="text-ink-700 mt-0.5">Te respondemos en menos de 24h. Si es urgente, escríbenos por WhatsApp.</p>
                  </div>
                </div>
              )}
              {status === 'error' && (
                <div className="mt-5 flex items-start gap-3 p-4 bg-danger/10 ring-1 ring-danger/30 rounded-lg text-sm text-ink-900">
                  <AlertTriangle size={18} className="text-danger mt-0.5 shrink-0" aria-hidden />
                  <div>
                    <p className="font-semibold">Algo no ha salido bien.</p>
                    <p className="text-ink-700 mt-0.5">Inténtalo en un minuto o escríbenos por WhatsApp.</p>
                  </div>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

function Field({
  label,
  children,
  error,
  required,
  hint
}: {
  label: string;
  children: React.ReactNode;
  error?: string;
  required?: boolean;
  hint?: string;
}) {
  return (
    <label className="block mt-4 first:mt-0">
      <span className="flex items-baseline justify-between mb-1.5">
        <span className="text-sm font-medium text-ink-900">
          {label}
          {required && <span className="text-brand-secondary ml-0.5" aria-hidden>*</span>}
        </span>
        {hint && <span className="text-xs text-ink-500">{hint}</span>}
      </span>
      {children}
      {error && <p className="mt-1.5 text-xs text-danger">{error}</p>}
    </label>
  );
}

function inputClass(hasError: boolean) {
  return cn(
    'w-full px-4 py-3 rounded-lg bg-paper ring-1 transition-all',
    'focus:ring-2 focus:ring-brand-primary focus:outline-none',
    hasError ? 'ring-danger' : 'ring-ink-300'
  );
}
