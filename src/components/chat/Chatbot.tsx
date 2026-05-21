'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Sparkles, Wrench, Clock, MapPin } from 'lucide-react';
import {
  searchModels,
  searchRepairs,
  lookupPrice,
  getRepairsForModel,
  getBrandOptions,
  getTopModels,
  type PriceLookupResult
} from '@/lib/price-db';
import { buildWhatsAppLink, cn } from '@/lib/utils';

/**
 * Chatbot — bottom-left automated price assistant.
 *
 * Behavior:
 * - Pulsing icon at bottom-left. On open, expands into a chat panel.
 * - First message: greeting + 4 quick replies.
 * - "Cuánto cuesta" path: guides through device → brand → model → repair → price.
 * - Free-text input also accepted: searches the price-db for model + repair
 *   names in the same message.
 * - Always offers a WhatsApp escape hatch.
 *
 * Database: in-memory at /src/lib/price-db.ts (sources from /src/data/*.ts).
 *
 * Accessibility:
 * - `role="dialog"` with `aria-labelledby` on the panel.
 * - Focus trap not implemented in this pass; keyboard close via X button or Esc.
 * - The trigger button has an accessible label.
 *
 * Mobile: sits above MobileStickyBar (which is bottom-fixed). Compact pill on
 * mobile, full panel on tap.
 */

type Sender = 'bot' | 'user';
type QuickReply = { label: string; action: () => void };

interface Message {
  id: string;
  sender: Sender;
  body: React.ReactNode;
  quickReplies?: QuickReply[];
}

type Flow =
  | { step: 'idle' }
  | { step: 'pickBrand' }
  | { step: 'pickModel'; brandSlug: string; brandName: string }
  | { step: 'pickRepair'; modelSlug: string; modelName: string; brandSlug: string; brandName: string }
  | { step: 'shown'; result: PriceLookupResult };

let messageCounter = 0;
const nextId = () => `m-${++messageCounter}`;

export function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [flow, setFlow] = useState<Flow>({ step: 'idle' });
  const [hasGreeted, setHasGreeted] = useState(false);
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  // First-open greeting
  useEffect(() => {
    if (open && !hasGreeted) {
      setHasGreeted(true);
      setTimeout(() => {
        pushBot(
          <>
            <p className="font-medium">¡Hola! 👋 Soy el asistente de CoboPhone.</p>
            <p className="mt-1.5 text-ink-700">Te puedo dar el precio de una reparación en segundos, o pasarte directo con un técnico.</p>
          </>,
          [
            { label: '💰 Cuánto cuesta…', action: startPricingFlow },
            { label: '⏱ Cuánto tarda', action: tellDuration },
            { label: '📍 Dónde estáis', action: tellLocation },
            { label: '💬 Hablar con un humano', action: escapeToWhatsApp }
          ]
        );
      }, 300);
    }
  }, [open]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (open && inputRef.current) inputRef.current.focus();
  }, [open, messages]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages, open]);

  // Esc-to-close
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  function pushBot(body: React.ReactNode, quickReplies?: QuickReply[]) {
    setMessages(m => [...m, { id: nextId(), sender: 'bot', body, quickReplies }]);
  }
  function pushUser(text: string) {
    setMessages(m => [...m, { id: nextId(), sender: 'user', body: text }]);
  }

  // ── Quick-reply handlers ────────────────────────────────────────

  function startPricingFlow() {
    pushUser('Cuánto cuesta una reparación');
    setFlow({ step: 'pickBrand' });
    const opts = getBrandOptions();
    pushBot(
      <p>Vale. ¿Qué marca es tu dispositivo?</p>,
      opts.slice(0, 8).map(b => ({
        label: b.name,
        action: () => pickBrand(b.slug, b.name)
      }))
    );
  }

  function pickBrand(slug: string, name: string) {
    pushUser(name);
    setFlow({ step: 'pickModel', brandSlug: slug, brandName: name });
    pushBot(
      <p>¿Qué modelo de {name}? Escríbelo (ej. <span className="font-mono">galaxy s23</span>, <span className="font-mono">iphone 13</span>), o elige uno:</p>,
      getTopModels(slug, 6).map(m => ({
        label: m.name,
        action: () => pickModel(m.slug, m.name, slug, name)
      }))
    );
  }

  function pickModel(modelSlug: string, modelName: string, brandSlug: string, brandName: string) {
    pushUser(modelName);
    setFlow({ step: 'pickRepair', modelSlug, modelName, brandSlug, brandName });
    const repairs = getRepairsForModel(modelSlug);
    pushBot(
      <p>Perfecto, {modelName}. ¿Qué le pasa?</p>,
      repairs.map(r => ({
        label: `${r.name} · ${r.priceFormatted}`,
        action: () => showPrice(modelSlug, r.slug)
      }))
    );
  }

  function showPrice(modelSlug: string, repairSlug: string) {
    const result = lookupPrice(modelSlug, repairSlug);
    if (!result) {
      pushBot(<p>No tengo precio cerrado para esa combinación. Mándame un mensaje por WhatsApp y un técnico te lo confirma.</p>, [
        { label: '💬 Abrir WhatsApp', action: escapeToWhatsApp }
      ]);
      return;
    }
    pushUser(result.repairName);
    setFlow({ step: 'shown', result });
    pushBot(
      <PriceCard r={result} />,
      [
        {
          label: '📲 Reservar por WhatsApp',
          action: () => {
            const msg = `Hola, mi ${result.modelName} necesita ${result.repairName.toLowerCase()}. Precio estimado: ${result.priceFormatted}. ¿Cuándo podéis recibirme?`;
            window.open(buildWhatsAppLink(msg), '_blank', 'noopener');
          }
        },
        { label: '🔁 Otra consulta', action: startPricingFlow }
      ]
    );
  }

  function tellDuration() {
    pushUser('¿Cuánto tarda?');
    pushBot(
      <>
        <p>La mayoría de las reparaciones estándar salen en <strong>40 minutos</strong>.</p>
        <ul className="mt-2 text-sm text-ink-700 space-y-1">
          <li>· Pantalla y batería: 40 min</li>
          <li>· Conector de carga y cámara: 50–60 min</li>
          <li>· Daño por agua o placa: 1–4h (se confirma tras diagnóstico)</li>
        </ul>
      </>,
      [
        { label: '💰 Ver precios', action: startPricingFlow },
        { label: '💬 WhatsApp', action: escapeToWhatsApp }
      ]
    );
  }

  function tellLocation() {
    pushUser('¿Dónde estáis?');
    pushBot(
      <>
        <p><strong>Calle Bembibre 5</strong>, Polígono Cobo Calleja, Fuenlabrada (Madrid).</p>
        <p className="mt-2 text-sm text-ink-700">Abierto L–V 10:00–19:00 y domingos 10:00–19:00. Sábado cerrado.</p>
        <p className="mt-2 text-sm text-ink-500 font-mono">Aparcamiento gratuito · Cercanías C-5 + autobús</p>
      </>,
      [
        { label: '🗺 Ver mapa', action: () => { window.location.href = '/ubicacion'; } },
        { label: '💬 WhatsApp', action: escapeToWhatsApp }
      ]
    );
  }

  function escapeToWhatsApp() {
    pushUser('Quiero hablar con un humano');
    pushBot(
      <p>Te paso por WhatsApp con un técnico. Responde un humano en menos de 3 minutos en horario comercial.</p>,
      [
        {
          label: '📲 Abrir WhatsApp',
          action: () => {
            window.open(buildWhatsAppLink('Hola, vengo del chatbot de la web y quería hablar con un técnico.'), '_blank', 'noopener');
          }
        }
      ]
    );
  }

  // ── Free-text input ─────────────────────────────────────────────

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const text = input.trim();
    if (!text) return;
    setInput('');
    pushUser(text);

    // If we're in pickModel step, the user is searching for a model
    if (flow.step === 'pickModel') {
      const matches = searchModels(text, 5).filter(m => m.brandSlug === flow.brandSlug);
      if (matches.length > 0) {
        pushBot(
          matches.length === 1
            ? <p>¿Te refieres a <strong>{matches[0].name}</strong>?</p>
            : <p>He encontrado estos modelos. ¿Cuál es el tuyo?</p>,
          matches.map(m => ({
            label: m.name,
            action: () => pickModel(m.slug, m.name, flow.brandSlug, flow.brandName)
          }))
        );
        return;
      }
      pushBot(<p>No encuentro ese modelo en la lista de {flow.brandName}. Vuelve a intentarlo o escríbenos por WhatsApp.</p>, [
        { label: '💬 WhatsApp', action: escapeToWhatsApp }
      ]);
      return;
    }

    // Otherwise, do a global free-text search
    handleFreeTextQuery(text);
  }

  function handleFreeTextQuery(text: string) {
    // Try to match a model + repair in the message
    const modelMatches = searchModels(text, 5);
    const repairMatches = searchRepairs(text);

    if (modelMatches.length > 0 && repairMatches.length > 0) {
      // Direct hit: show the price right away
      const top = modelMatches[0];
      const repair = repairMatches[0];
      const result = lookupPrice(top.slug, repair.slug);
      if (result) {
        pushBot(<PriceCard r={result} />, [
          {
            label: '📲 Reservar por WhatsApp',
            action: () => {
              const msg = `Hola, mi ${result.modelName} necesita ${result.repairName.toLowerCase()}. Precio estimado: ${result.priceFormatted}. ¿Cuándo podéis recibirme?`;
              window.open(buildWhatsAppLink(msg), '_blank', 'noopener');
            }
          },
          { label: '🔁 Otra consulta', action: startPricingFlow }
        ]);
        return;
      }
    }

    if (modelMatches.length > 0) {
      const m = modelMatches[0];
      const brand = getBrandOptions().find(b => b.slug === m.brandSlug);
      if (brand) {
        pickModel(m.slug, m.name, brand.slug, brand.name);
        return;
      }
    }

    if (repairMatches.length > 0) {
      pushBot(<p>Veo que es algo de <strong>{repairMatches[0].name.toLowerCase()}</strong>. ¿De qué marca es tu dispositivo?</p>, getBrandOptions().slice(0, 8).map(b => ({
        label: b.name,
        action: () => pickBrand(b.slug, b.name)
      })));
      return;
    }

    pushBot(
      <p>No estoy seguro de a qué te refieres. ¿Quieres ver precios de reparación o hablar con un técnico?</p>,
      [
        { label: '💰 Ver precios', action: startPricingFlow },
        { label: '💬 WhatsApp', action: escapeToWhatsApp }
      ]
    );
  }

  return (
    <>
      {/* Trigger */}
      <button
        type="button"
        onClick={() => setOpen(o => !o)}
        aria-label={open ? 'Cerrar chat' : 'Abrir chat con un técnico'}
        aria-expanded={open}
        className={cn(
          'fixed z-[120] bottom-24 lg:bottom-6 left-4 lg:left-6 group',
          'w-14 h-14 lg:w-16 lg:h-16 rounded-full',
          'bg-brand-primary text-white shadow-pop',
          'flex items-center justify-center',
          'transition-all duration-fast ease-out-expo',
          'hover:scale-105 active:scale-95',
          open && 'rotate-90'
        )}
      >
        {/* Pulse halo */}
        {!open && (
          <span className="absolute inset-0 rounded-full bg-brand-primary/40 animate-ping" style={{ animationDuration: '2.4s' }} aria-hidden />
        )}
        {/* Notification dot */}
        {!open && messages.length === 0 && (
          <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-brand-secondary text-shadow-blue text-[10px] font-bold flex items-center justify-center ring-2 ring-paper" aria-hidden>1</span>
        )}
        {open ? <X size={24} /> : <MessageCircle size={24} className="relative" />}
      </button>

      {/* Panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            role="dialog"
            aria-labelledby="chatbot-title"
            initial={{ opacity: 0, y: 20, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.96 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className={cn(
              'fixed z-[119]',
              'bottom-44 lg:bottom-24 left-4 lg:left-6',
              'w-[calc(100vw-2rem)] sm:w-[380px] max-w-[380px]',
              'h-[min(520px,calc(100vh-200px))]',
              'bg-chrome rounded-2xl shadow-elevated ring-1 ring-ink-100',
              'flex flex-col overflow-hidden'
            )}
          >
            {/* Header */}
            <header className="bg-shadow-blue text-white p-4 flex items-center gap-3" data-surface="dark">
              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-brand-secondary text-shadow-blue flex items-center justify-center">
                  <Sparkles size={18} />
                </div>
                <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-brand-accent ring-2 ring-shadow-blue" aria-hidden />
              </div>
              <div>
                <p id="chatbot-title" className="text-sm font-semibold">Asistente CoboPhone</p>
                <p className="text-xs text-ink-300 font-mono">Respondo al instante · escala a humano</p>
              </div>
            </header>

            {/* Conversation */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-3 bg-paper">
              {messages.map(m => (
                <ChatBubble key={m.id} message={m} />
              ))}
            </div>

            {/* Input */}
            <form onSubmit={handleSubmit} className="border-t border-ink-100 bg-chrome p-3 flex gap-2">
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                type="text"
                placeholder="Escribe tu duda…"
                className="flex-1 px-3 py-2 text-sm bg-paper rounded-lg ring-1 ring-ink-300 focus:ring-2 focus:ring-brand-primary focus:outline-none"
                aria-label="Mensaje"
              />
              <button
                type="submit"
                disabled={!input.trim()}
                aria-label="Enviar"
                className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-brand-primary text-white hover:bg-brand-primary-hover disabled:opacity-40 transition-colors"
              >
                <Send size={16} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

// ── Helpers ─────────────────────────────────────────────────────────

function ChatBubble({ message }: { message: Message }) {
  const isBot = message.sender === 'bot';
  return (
    <div className={cn('flex flex-col', isBot ? 'items-start' : 'items-end')}>
      <div
        className={cn(
          'rounded-2xl px-4 py-2.5 text-sm max-w-[85%] leading-relaxed',
          isBot
            ? 'bg-chrome ring-1 ring-ink-100 text-ink-900'
            : 'bg-brand-primary text-white'
        )}
      >
        {message.body}
      </div>
      {message.quickReplies && (
        <div className="mt-2 flex flex-wrap gap-1.5 max-w-[95%]">
          {message.quickReplies.map((qr, i) => (
            <button
              key={i}
              type="button"
              onClick={qr.action}
              className="text-xs px-3 py-1.5 rounded-full bg-chrome ring-1 ring-ink-300 hover:ring-brand-primary hover:bg-brand-primary hover:text-white transition-colors duration-micro text-ink-900"
            >
              {qr.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function PriceCard({ r }: { r: PriceLookupResult }) {
  return (
    <div>
      <p className="text-xs font-mono uppercase tracking-widest text-ink-500">{r.brandName} · {r.modelName}</p>
      <p className="mt-0.5 text-ink-900 font-medium">{r.repairName}</p>
      <p className="mt-3 font-mono tabular-nums text-3xl font-bold text-brand-primary">{r.priceFormatted}</p>
      <ul className="mt-3 space-y-1 text-xs text-ink-700">
        <li className="flex items-center gap-1.5"><Clock size={12} className="text-brand-secondary" /> ≈ {r.durationMin} min</li>
        <li className="flex items-center gap-1.5"><Wrench size={12} className="text-brand-accent" /> {r.warrantyMonths} meses de garantía</li>
        <li className="flex items-center gap-1.5"><MapPin size={12} className="text-ink-500" /> Cobo Calleja · diagnóstico gratuito</li>
      </ul>
      <p className="mt-3 text-xs text-ink-500">Precio estimado. Lo confirmamos en 2 min por WhatsApp.</p>
    </div>
  );
}

