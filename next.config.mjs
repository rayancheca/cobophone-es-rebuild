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
    // Content Security Policy — permissive enough for Next.js inline styles
    // and the Google Maps embed iframe; tighten with nonces in a follow-up
    // once we've verified all third-party origins.
    const csp = [
      "default-src 'self'",
      "img-src 'self' data: blob: https:",
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      "font-src 'self' data: https://fonts.gstatic.com",
      "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://va.vercel-scripts.com",
      "connect-src 'self' https: vercel-vitals.axiom.co",
      "frame-src https://www.google.com https://maps.google.com https://wa.me",
      "frame-ancestors 'none'",
      "base-uri 'self'",
      "form-action 'self'",
      "object-src 'none'",
      'upgrade-insecure-requests'
    ].join('; ');

    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=(self)' },
          { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
          { key: 'Content-Security-Policy', value: csp }
        ]
      }
    ];
  }
};

export default withNextIntl(nextConfig);
