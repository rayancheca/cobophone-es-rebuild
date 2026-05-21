/**
 * ModelImage — render a recognizable visual for a phone model.
 *
 * Strategy: rather than waiting for 30+ press-kit images to be sourced before
 * the site can ship, we render a stylized SVG phone in the brand's signature
 * color, with the model name as on-screen text. The visual is consistent,
 * scannable, and immediately recognizable as "the X model in Brand colors."
 *
 * Once real press-kit imagery is available per model (HANDOFF.md §1 covers
 * the production replacement path), the ModelImage can be swapped to a
 * Next/Image referencing the real photo — function signature stays the same.
 */

import { getBrand } from '@/data/brands';
import { cn } from '@/lib/utils';

interface ModelImageProps {
  modelName: string;
  brandSlug: string;
  /** Color theme variant — light or dark surface */
  variant?: 'auto' | 'light' | 'dark';
  className?: string;
}

const FALLBACK_COLOR = '#6B21A8'; // brand-primary violet

export function ModelImage({ modelName, brandSlug, variant = 'auto', className }: ModelImageProps) {
  const brand = getBrand(brandSlug);
  const brandColor = brand?.brandColor ?? FALLBACK_COLOR;

  // Short label for the screen (model name without redundant brand prefix)
  const shortLabel = modelName
    .replace(/^(iPhone|Galaxy|Pixel|Redmi|POCO|Mi|Find|Reno|Mate|Nova|Magic)\s*/i, m => m)
    .trim();

  return (
    <div className={cn('relative aspect-[3/4] w-full', className)}>
      <svg viewBox="0 0 180 240" xmlns="http://www.w3.org/2000/svg" className="w-full h-full" role="img" aria-label={modelName}>
        <defs>
          <linearGradient id={`grad-${brandSlug}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={brandColor} stopOpacity="0.95" />
            <stop offset="100%" stopColor={brandColor} stopOpacity="0.7" />
          </linearGradient>
          <linearGradient id={`frame-${brandSlug}`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#2A2F38" />
            <stop offset="100%" stopColor="#0A0E14" />
          </linearGradient>
        </defs>

        {/* Phone frame */}
        <rect x="14" y="6" width="152" height="228" rx="22" fill={`url(#frame-${brandSlug})`} stroke="rgba(0,0,0,0.15)" strokeWidth="0.5" />

        {/* Screen */}
        <rect x="20" y="12" width="140" height="216" rx="16" fill={`url(#grad-${brandSlug})`} />

        {/* Dynamic island / notch */}
        <rect x="74" y="18" width="32" height="8" rx="4" fill="rgba(0,0,0,0.6)" />

        {/* Status bar dots — gives the screen "content" */}
        <circle cx="42" cy="46" r="2" fill="rgba(255,255,255,0.4)" />
        <circle cx="50" cy="46" r="2" fill="rgba(255,255,255,0.3)" />
        <circle cx="58" cy="46" r="2" fill="rgba(255,255,255,0.2)" />

        {/* Model label centered on the screen */}
        <text
          x="90"
          y="120"
          textAnchor="middle"
          fontSize="11"
          fontWeight="600"
          fill="rgba(255,255,255,0.95)"
          fontFamily="system-ui, -apple-system, sans-serif"
          letterSpacing="0.2"
        >
          {shortLabel.length > 18 ? shortLabel.slice(0, 16) + '…' : shortLabel}
        </text>

        {/* App-grid hint at the bottom */}
        <g opacity="0.4" fill="rgba(255,255,255,0.7)">
          <rect x="32" y="180" width="20" height="20" rx="5" />
          <rect x="58" y="180" width="20" height="20" rx="5" />
          <rect x="84" y="180" width="20" height="20" rx="5" />
          <rect x="110" y="180" width="20" height="20" rx="5" />
          <rect x="136" y="180" width="20" height="20" rx="5" />
        </g>

        {/* Home indicator */}
        <rect x="65" y="218" width="50" height="3" rx="1.5" fill="rgba(255,255,255,0.6)" />

        {/* Side button */}
        <rect x="14" y="60" width="1.5" height="22" rx="0.75" fill="#1a2438" />
        <rect x="14" y="88" width="1.5" height="14" rx="0.75" fill="#1a2438" />
        <rect x="164.5" y="68" width="1.5" height="32" rx="0.75" fill="#1a2438" />
      </svg>
    </div>
  );
}
