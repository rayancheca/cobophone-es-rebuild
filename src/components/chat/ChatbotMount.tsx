'use client';

import dynamic from 'next/dynamic';

/**
 * Client-only mount point for the Chatbot.
 *
 * Lives in a thin client wrapper because `next/dynamic({ ssr: false })` can
 * only be called from a Client Component, and the root layout is a Server
 * Component. Saves ~40 kB on every route's first-load JS — the chatbot only
 * loads when the user actually opens it (or shortly after window load).
 */
const Chatbot = dynamic(
  () => import('./Chatbot').then(m => m.Chatbot),
  { ssr: false, loading: () => null }
);

export function ChatbotMount() {
  return <Chatbot />;
}
