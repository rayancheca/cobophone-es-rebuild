import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const isProd = process.env.VERCEL_ENV === 'production' || process.env.NODE_ENV === 'production';
  return {
    rules: isProd
      ? [{ userAgent: '*', allow: '/', disallow: ['/api/', '/_next/'] }]
      : [{ userAgent: '*', disallow: '/' }],
    sitemap: 'https://cobophone.es/sitemap.xml',
    host: 'https://cobophone.es'
  };
}
