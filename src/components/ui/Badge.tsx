import type { HTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

type Variant = 'default' | 'amber' | 'green' | 'blue' | 'outline';

const variantClasses: Record<Variant, string> = {
  default: 'bg-ink-100 text-ink-700',
  amber:   'bg-brand-secondary/15 text-ink-900 ring-1 ring-inset ring-brand-secondary/30',
  green:   'bg-brand-accent/15 text-ink-900 ring-1 ring-inset ring-brand-accent/30',
  blue:    'bg-brand-primary/10 text-brand-primary ring-1 ring-inset ring-brand-primary/20',
  outline: 'bg-transparent text-ink-700 ring-1 ring-inset ring-ink-300'
};

export function Badge({
  variant = 'default',
  className,
  ...props
}: HTMLAttributes<HTMLSpanElement> & { variant?: Variant }) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium tracking-wide',
        variantClasses[variant],
        className
      )}
      {...props}
    />
  );
}
