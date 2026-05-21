import type { MetadataRoute } from 'next';
import { brands } from '@/data/brands';
import { models } from '@/data/models';
import { serviceAreas } from '@/data/location';

const SITE = 'https://cobophone.es';

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const staticPages = [
    '',
    '/reparacion',
    '/reparacion/movil',
    '/reparacion/tablet',
    '/reparacion/portatil',
    '/reparacion/smartwatch',
    '/reparacion/consola',
    '/reparacion/television',
    '/reparacion/patinete-electrico',
    '/presupuesto',
    '/tienda',
    '/mayoristas',
    '/recogida',
    '/garantia',
    '/sobre-nosotros',
    '/ubicacion',
    '/zonas',
    '/blog',
    '/contacto',
    '/preguntas-frecuentes'
  ].map(path => ({
    url: `${SITE}${path}`,
    lastModified,
    changeFrequency: 'weekly' as const,
    priority: path === '' ? 1.0 : 0.8,
    alternates: {
      languages: {
        es: `${SITE}${path}`,
        en: `${SITE}/en${path}`,
        zh: `${SITE}/zh${path}`
      }
    }
  }));

  const brandPages = brands.map(b => ({
    url: `${SITE}/reparacion/movil/${b.slug}`,
    lastModified,
    changeFrequency: 'monthly' as const,
    priority: 0.7
  }));

  const modelPages = models.map(m => ({
    url: `${SITE}/reparacion/movil/${m.brandSlug}/${m.slug}`,
    lastModified,
    changeFrequency: 'monthly' as const,
    priority: 0.6
  }));

  const areaPages = serviceAreas.map(a => ({
    url: `${SITE}/zonas/${a.slug}`,
    lastModified,
    changeFrequency: 'monthly' as const,
    priority: 0.5
  }));

  return [...staticPages, ...brandPages, ...modelPages, ...areaPages];
}
