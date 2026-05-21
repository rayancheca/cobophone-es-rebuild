import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/**/*.{ts,tsx,mdx}',
    './messages/**/*.json'
  ],
  theme: {
    extend: {
      colors: {
        // Brand
        'brand-primary':         'var(--color-brand-primary)',
        'brand-primary-hover':   'var(--color-brand-primary-hover)',
        'brand-primary-active':  'var(--color-brand-primary-active)',
        'brand-secondary':       'var(--color-brand-secondary)',
        'brand-secondary-hover': 'var(--color-brand-secondary-hover)',
        'brand-accent':          'var(--color-brand-accent)',

        // Neutrals
        'ink-900': 'var(--color-ink-900)',
        'ink-700': 'var(--color-ink-700)',
        'ink-500': 'var(--color-ink-500)',
        'ink-300': 'var(--color-ink-300)',
        'ink-100': 'var(--color-ink-100)',
        'paper':   'var(--color-paper)',
        'chrome':  'var(--color-chrome)',

        // Dark surfaces
        'shadow-blue':      'var(--color-shadow-blue)',
        'shadow-blue-deep': 'var(--color-shadow-blue-deep)',

        // Semantic
        'success': 'var(--color-success)',
        'warning': 'var(--color-warning)',
        'danger':  'var(--color-danger)',
        'info':    'var(--color-info)'
      },
      fontFamily: {
        display: 'var(--font-display)',
        body:    'var(--font-body)',
        mono:    'var(--font-mono)',
        cjk:     'var(--font-cjk)'
      },
      fontSize: {
        'xs':   'var(--text-xs)',
        'sm':   'var(--text-sm)',
        'base': 'var(--text-base)',
        'lg':   'var(--text-lg)',
        'xl':   'var(--text-xl)',
        '2xl':  'var(--text-2xl)',
        '3xl':  'var(--text-3xl)',
        '4xl':  'var(--text-4xl)',
        '5xl':  'var(--text-5xl)',
        '6xl':  'var(--text-6xl)'
      },
      letterSpacing: {
        tighter: 'var(--tracking-tighter)',
        tight:   'var(--tracking-tight)',
        normal:  'var(--tracking-normal)',
        wide:    'var(--tracking-wide)',
        widest:  'var(--tracking-widest)'
      },
      borderRadius: {
        'xs':  'var(--radius-xs)',
        'sm':  'var(--radius-sm)',
        'md':  'var(--radius-md)',
        'lg':  'var(--radius-lg)',
        'xl':  'var(--radius-xl)',
        '2xl': 'var(--radius-2xl)'
      },
      boxShadow: {
        'hairline': 'var(--shadow-hairline)',
        'card':     'var(--shadow-card)',
        'elevated': 'var(--shadow-elevated)',
        'pop':      'var(--shadow-pop)'
      },
      transitionTimingFunction: {
        'out-expo':    'var(--ease-out-expo)',
        'out-quart':   'var(--ease-out-quart)',
        'in-out-soft': 'var(--ease-in-out-soft)'
      },
      transitionDuration: {
        'micro':  '150ms',
        'fast':   '300ms',
        'normal': '500ms',
        'slow':   '800ms',
        'hero':   '1200ms'
      },
      spacing: {
        'section': 'var(--space-section)'
      },
      maxWidth: {
        'container':        'var(--container-max)',
        'container-narrow': 'var(--container-narrow)',
        'container-prose':  'var(--container-prose)'
      }
    }
  },
  plugins: []
};

export default config;
