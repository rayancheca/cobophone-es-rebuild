import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Política de cookies',
  robots: { index: false, follow: true }
};

export default function CookiesPage() {
  return (
    <section className="pt-28 lg:pt-40 pb-section bg-paper">
      <div className="container-prose">
        <p className="text-xs font-mono uppercase tracking-widest text-ink-500 mb-3">Legal</p>
        <h1 className="text-balance mb-8">Política de cookies</h1>
        <div className="space-y-5 text-ink-700 leading-relaxed">
          <p>
            Esta web usa cookies para funcionar correctamente. Te explicamos cuáles y para qué.
          </p>

          <h2 className="text-xl font-semibold mt-8 mb-3">Cookies funcionales (siempre activas)</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>NEXT_LOCALE:</strong> guarda el idioma que has elegido (es / en / zh).</li>
            <li><strong>Cookies de sesión del servidor:</strong> mantienen tu estado durante la navegación.</li>
          </ul>

          <h2 className="text-xl font-semibold mt-8 mb-3">Cookies analíticas (solo si las aceptas)</h2>
          <p>
            Usamos Vercel Analytics y Plausible (cuando estén activos) para entender qué páginas
            se visitan más. Son cookies anónimas — no identifican a usuarios individuales.
          </p>

          <h2 className="text-xl font-semibold mt-8 mb-3">Cómo gestionar las cookies</h2>
          <p>
            Puedes desactivar las cookies analíticas desde la configuración de tu navegador o desde
            el banner de cookies que aparece en tu primera visita. Las cookies funcionales son
            necesarias para que la web funcione.
          </p>

          <p className="text-sm text-ink-500 mt-8">
            Política en construcción. Pendiente de revisión legal antes del lanzamiento.
          </p>
        </div>
      </div>
    </section>
  );
}
