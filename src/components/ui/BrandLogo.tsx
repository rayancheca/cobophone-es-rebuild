/**
 * BrandLogo — inline SVG wordmark/logotype for the 8 brands we repair.
 *
 * These are rough re-creations of each brand's wordmark (not the literal
 * trademark glyphs) — clean, recognizable, scalable. Used in the brand grid
 * on the home page and the per-brand-hub headers.
 *
 * Each takes a `className` to control color (typically `text-ink-900` on
 * light surfaces and `text-white` on dark).
 */

interface BrandLogoProps {
  brand: string;
  className?: string;
  width?: number;
}

export function BrandLogo({ brand, className = 'text-ink-900', width = 110 }: BrandLogoProps) {
  const props = { className, width, viewBox: '0 0 200 50', xmlns: 'http://www.w3.org/2000/svg', fill: 'currentColor' };

  switch (brand) {
    case 'samsung':
      return (
        <svg {...props}>
          <text x="0" y="36" fontFamily="system-ui, -apple-system, sans-serif" fontSize="32" fontWeight="700" letterSpacing="-1">SAMSUNG</text>
        </svg>
      );
    case 'apple':
      return (
        <svg {...props} viewBox="0 0 50 60">
          {/* Apple glyph */}
          <path d="M37.2 31.8c-.05-5.4 4.4-8 4.6-8.13-2.5-3.66-6.4-4.16-7.8-4.22-3.3-.33-6.45 1.95-8.13 1.95-1.7 0-4.27-1.9-7.04-1.85-3.62.05-6.95 2.1-8.8 5.35-3.77 6.5-.96 16.13 2.7 21.4 1.78 2.6 3.9 5.5 6.66 5.4 2.7-.1 3.7-1.74 6.95-1.74 3.25 0 4.16 1.74 7.04 1.68 2.9-.05 4.74-2.63 6.5-5.24 2.06-3 2.9-5.93 2.95-6.08-.07-.03-5.66-2.18-5.7-8.6zM31.78 16.05c1.5-1.8 2.5-4.3 2.23-6.8-2.16.1-4.78 1.43-6.32 3.22-1.38 1.6-2.6 4.14-2.27 6.6 2.4.18 4.86-1.22 6.36-3z" />
        </svg>
      );
    case 'xiaomi':
      return (
        <svg {...props}>
          <text x="0" y="36" fontFamily="system-ui, -apple-system, sans-serif" fontSize="32" fontWeight="700" letterSpacing="-1">XIAOMI</text>
        </svg>
      );
    case 'oppo':
      return (
        <svg {...props}>
          <text x="0" y="36" fontFamily="system-ui, -apple-system, sans-serif" fontSize="32" fontWeight="600" letterSpacing="2">OPPO</text>
        </svg>
      );
    case 'realme':
      return (
        <svg {...props}>
          <text x="0" y="36" fontFamily="system-ui, -apple-system, sans-serif" fontSize="32" fontWeight="700" letterSpacing="-1.5" fontStyle="italic">realme</text>
        </svg>
      );
    case 'huawei':
      return (
        <svg {...props}>
          <text x="0" y="36" fontFamily="system-ui, -apple-system, sans-serif" fontSize="32" fontWeight="700" letterSpacing="-1">HUAWEI</text>
        </svg>
      );
    case 'google':
      return (
        <svg {...props}>
          <text x="0" y="36" fontFamily="'Google Sans', system-ui, sans-serif" fontSize="32" fontWeight="500" letterSpacing="-1">Google</text>
        </svg>
      );
    case 'honor':
      return (
        <svg {...props}>
          <text x="0" y="36" fontFamily="system-ui, -apple-system, sans-serif" fontSize="32" fontWeight="700" letterSpacing="-0.5">HONOR</text>
        </svg>
      );
    default:
      return (
        <svg {...props}>
          <text x="0" y="36" fontFamily="system-ui, -apple-system, sans-serif" fontSize="28" fontWeight="700">{brand}</text>
        </svg>
      );
  }
}
