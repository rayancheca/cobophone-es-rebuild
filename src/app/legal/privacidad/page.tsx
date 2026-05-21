import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Política de privacidad',
  robots: { index: false, follow: true }
};

export default function PrivacidadPage() {
  return (
    <section className="pt-28 lg:pt-40 pb-section bg-paper">
      <div className="container-prose">
        <p className="text-xs font-mono uppercase tracking-widest text-ink-500 mb-3">Legal</p>
        <h1 className="text-balance mb-8">Política de privacidad</h1>
        <div className="prose-content space-y-5 text-ink-700 leading-relaxed">
          <p>
            <strong>Última actualización:</strong> 2026-05-21. Esta política describe cómo CoboPhone
            (CoboPhone S.L., CIF [VERIFY]) trata tus datos personales cuando usas cobophone.es
            o nuestros servicios de reparación.
          </p>

          <h2 className="text-xl font-semibold mt-8 mb-3">Quién es el responsable</h2>
          <p>
            CoboPhone S.L. · Calle Bembibre 5, Local A · 28947 Fuenlabrada (Madrid) ·
            info@cobophone.es · +34 [VERIFY teléfono]
          </p>

          <h2 className="text-xl font-semibold mt-8 mb-3">Qué datos recogemos</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Datos de contacto:</strong> nombre, teléfono, email cuando rellenas un formulario o pides un presupuesto.</li>
            <li><strong>Datos del dispositivo:</strong> marca, modelo y tipo de reparación para calcular el presupuesto.</li>
            <li><strong>Datos de navegación:</strong> cookies funcionales y, si las aceptas, cookies analíticas anónimas.</li>
            <li><strong>Datos de servicio:</strong> historial de reparaciones que haces con nosotros, vinculado a tu tarjeta o email.</li>
          </ul>

          <h2 className="text-xl font-semibold mt-8 mb-3">Para qué los usamos</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>Calcular presupuestos y agendar reparaciones.</li>
            <li>Avisarte cuando tu reparación está lista.</li>
            <li>Aplicar la garantía de 3 meses.</li>
            <li>Cumplir obligaciones fiscales (facturación).</li>
            <li>Solo si lo aceptas: enviarte ofertas y consejos por email.</li>
          </ul>

          <h2 className="text-xl font-semibold mt-8 mb-3">Cuánto tiempo los guardamos</h2>
          <p>
            Los datos de cliente se guardan mientras dure la relación + 5 años por obligación
            fiscal. Los datos de navegación, hasta 12 meses. Puedes pedir la eliminación
            anticipada en cualquier momento.
          </p>

          <h2 className="text-xl font-semibold mt-8 mb-3">Tus derechos</h2>
          <p>
            Acceso, rectificación, supresión, limitación, oposición, portabilidad y retirada del
            consentimiento. Escríbenos a info@cobophone.es o por correo postal a la dirección de
            arriba. También puedes presentar una reclamación ante la Agencia Española de Protección
            de Datos (www.aepd.es).
          </p>

          <p className="text-sm text-ink-500 mt-12">
            Este texto es un borrador en construcción. La versión definitiva debe ser revisada por
            asesoría legal antes del lanzamiento de la web.
          </p>
        </div>
      </div>
    </section>
  );
}
