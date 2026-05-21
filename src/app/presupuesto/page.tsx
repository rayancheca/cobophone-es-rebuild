import { Suspense } from 'react';
import type { Metadata } from 'next';
import { QuoteTool } from '@/components/quote/QuoteTool';

export const metadata: Metadata = {
  title: 'Presupuesto de reparación en 30 segundos',
  description:
    'Calcula el coste de reparar tu móvil, tablet o consola en 30 segundos. Precio cerrado, sin compromiso. Confirmamos por WhatsApp en 2 minutos.'
};

export default function PresupuestoPage() {
  return (
    <Suspense fallback={<div className="min-h-[80vh]" aria-hidden />}>
      <QuoteTool />
    </Suspense>
  );
}
