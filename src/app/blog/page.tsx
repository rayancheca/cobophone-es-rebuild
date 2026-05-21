import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Clock } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Blog · Guías, consejos y noticias de reparación',
  description: 'Cómo cuidar tu batería, qué hacer si se moja tu móvil, reparación vs. comprar nuevo. Guías desde el taller de CoboPhone.'
};

const POSTS = [
  {
    slug: 'bateria-movil-cuidados',
    title: 'Cómo alargar la vida de la batería de tu móvil',
    excerpt: 'Cinco hábitos que extienden la batería un 30%. Y un par de mitos que conviene tirar a la basura.',
    category: 'Guía',
    readTime: '4 min',
    date: '2026-05-12'
  },
  {
    slug: 'movil-mojado-que-hacer',
    title: '¿Se te ha mojado el móvil? Qué hacer (y qué no) en los primeros 10 minutos',
    excerpt: 'No, no lo metas en arroz. Te contamos lo que sí funciona — y por qué cada minuto cuenta.',
    category: 'Guía',
    readTime: '5 min',
    date: '2026-04-28'
  },
  {
    slug: 'reparar-vs-comprar-nuevo',
    title: '¿Reparar o comprar nuevo? La cuenta que casi nadie hace bien',
    excerpt: 'Cómo decidir entre reparar tu móvil de 4 años o cambiarlo. La regla del 50%.',
    category: 'Análisis',
    readTime: '6 min',
    date: '2026-04-14'
  },
  {
    slug: 'iphone-12-face-id-humedad',
    title: 'iPhone 12 y Face ID después de humedad: un problema con solución',
    excerpt: 'Un fallo conocido tras lluvia o cocina. Por qué pasa y cómo lo arreglamos a nivel de placa.',
    category: 'Reparación',
    readTime: '3 min',
    date: '2026-03-30'
  },
  {
    slug: 'galaxy-s22-bateria-hinchada',
    title: 'Samsung Galaxy S22 con batería hinchada — qué hacer',
    excerpt: 'Si la tapa trasera se separa, es la batería. Por qué pasa en este lote y por qué hay que cambiarla ya.',
    category: 'Reparación',
    readTime: '3 min',
    date: '2026-03-18'
  },
  {
    slug: 'sabado-cerrado-domingo-abierto',
    title: 'Por qué cerramos los sábados y abrimos los domingos',
    excerpt: 'El rincón curioso de Cobo Calleja. Cómo el mayor polígono mayorista chino-europeo nos cambió el calendario.',
    category: 'Historia',
    readTime: '4 min',
    date: '2026-02-22'
  }
];

export default function BlogPage() {
  return (
    <section className="pt-28 lg:pt-40 pb-section bg-paper">
      <div className="container-fluid">
        <div className="inline-flex items-center gap-2 text-xs text-ink-500 uppercase tracking-widest mb-4">
          <span className="w-8 h-px bg-brand-primary" aria-hidden />
          Blog · Desde el taller
        </div>
        <h1 className="text-balance max-w-3xl">Guías, consejos y noticias de reparación.</h1>
        <p className="mt-6 max-w-2xl text-lg text-ink-700 leading-relaxed">
          Lo que aprendemos cada día en el taller. Sin marketing, sin paja — sólo lo que pasa
          de verdad cuando un móvil llega para reparar.
        </p>

        <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {POSTS.map(post => (
            <article key={post.slug} className="group bg-chrome rounded-2xl overflow-hidden ring-1 ring-ink-100 shadow-card hover:shadow-elevated hover:-translate-y-0.5 transition-all duration-fast">
              <Link href={`/blog/${post.slug}`} className="block p-6">
                <div className="flex items-center gap-2 text-xs text-ink-500 font-mono uppercase tracking-widest mb-3">
                  <span className="text-brand-primary">{post.category}</span>
                  <span>·</span>
                  <span className="inline-flex items-center gap-1"><Clock size={11} /> {post.readTime}</span>
                </div>
                <h2 className="text-lg font-semibold text-ink-900 leading-tight mb-2 group-hover:text-brand-primary transition-colors">
                  {post.title}
                </h2>
                <p className="text-sm text-ink-700 leading-relaxed mb-4">{post.excerpt}</p>
                <div className="flex items-center justify-between text-xs text-ink-500">
                  <time dateTime={post.date}>
                    {new Date(post.date).toLocaleDateString('es-ES', { year: 'numeric', month: 'short', day: 'numeric' })}
                  </time>
                  <ArrowRight size={14} className="text-brand-primary group-hover:translate-x-0.5 transition-transform" aria-hidden />
                </div>
              </Link>
            </article>
          ))}
        </div>

        <p className="mt-12 text-sm text-ink-500 max-w-2xl">
          <strong>Nota:</strong> Estamos poniendo el blog a punto. Los artículos completos
          aparecerán pronto. Mientras tanto, si tienes una duda específica, escríbenos por
          WhatsApp y la resolvemos.
        </p>
      </div>
    </section>
  );
}
