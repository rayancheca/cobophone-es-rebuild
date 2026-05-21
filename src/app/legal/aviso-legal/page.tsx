import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Aviso legal',
  robots: { index: false, follow: true }
};

export default function AvisoLegalPage() {
  return (
    <section className="pt-28 lg:pt-40 pb-section bg-paper">
      <div className="container-prose">
        <p className="text-xs font-mono uppercase tracking-widest text-ink-500 mb-3">Legal</p>
        <h1 className="text-balance mb-8">Aviso legal</h1>
        <div className="space-y-5 text-ink-700 leading-relaxed">
          <p>
            En cumplimiento de la Ley 34/2002 de Servicios de la Sociedad de la Información y
            Comercio Electrónico (LSSI-CE) se hace constar la siguiente información:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Titular:</strong> CoboPhone S.L.</li>
            <li><strong>CIF:</strong> [VERIFY]</li>
            <li><strong>Domicilio:</strong> Calle Bembibre 5, Local A, 28947 Fuenlabrada (Madrid)</li>
            <li><strong>Email de contacto:</strong> info@cobophone.es</li>
            <li><strong>Teléfono:</strong> +34 [VERIFY]</li>
            <li><strong>Registro mercantil:</strong> [VERIFY]</li>
          </ul>
          <p className="text-sm text-ink-500 mt-8">
            Texto en construcción. Pendiente de revisión por asesoría legal antes del lanzamiento.
          </p>
        </div>
      </div>
    </section>
  );
}
