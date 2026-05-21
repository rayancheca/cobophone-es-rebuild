import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'www.apple.com' },
      { protocol: 'https', hostname: 'images.samsung.com' },
      { protocol: 'https', hostname: 'i02.appmifile.com' }
    ]
  },
  async redirects() {
    // Legacy WordPress URLs → new clean structure
    return [
      { source: '/reparacion-moviles', destination: '/reparacion/movil', permanent: true },
      { source: '/contactanos-reparacion-moviles', destination: '/contacto', permanent: true },
      { source: '/blog-reparacion-moviles', destination: '/blog', permanent: true },
      { source: '/blog-reparacion-moviles/:slug', destination: '/blog/:slug', permanent: true },
      // Legacy typo from current site: "tellefonos" → "telefonos" (handled via clean URLs)
      { source: '/categoria-producto/samsung/reparacion-tellefonos-samsung', destination: '/reparacion/movil/samsung', permanent: true },
      { source: '/categoria-producto/samsung/reparacion-telefonos-samsung', destination: '/reparacion/movil/samsung', permanent: true },
      { source: '/categoria-producto/:brand/reparacion-telefonos-:brand', destination: '/reparacion/movil/:brand', permanent: true },
      { source: '/categoria-producto/:brand', destination: '/reparacion/movil/:brand', permanent: true }
    ];
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=(self)' }
        ]
      }
    ];
  }
};

export default withNextIntl(nextConfig);
