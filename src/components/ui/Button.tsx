import { forwardRef, type ButtonHTMLAttributes, type AnchorHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

type Variant = 'primary' | 'secondary' | 'ghost' | 'outline' | 'whatsapp';
type Size = 'sm' | 'md' | 'lg' | 'xl';

const variantClasses: Record<Variant, string> = {
  primary:
    'bg-brand-primary text-white hover:bg-brand-primary-hover active:bg-brand-primary-active shadow-card hover:shadow-elevated',
  secondary:
    'bg-brand-secondary text-ink-900 hover:bg-brand-secondary-hover shadow-card',
  outline:
    'bg-transparent text-ink-900 ring-1 ring-inset ring-ink-300 hover:ring-ink-900 hover:bg-paper',
  ghost:
    'bg-transparent text-ink-900 hover:bg-ink-100',
  whatsapp:
    'bg-[#25D366] text-white hover:bg-[#1DA851] shadow-card'
};

const sizeClasses: Record<Size, string> = {
  sm: 'h-9 px-3 text-sm rounded-md gap-1.5',
  md: 'h-11 px-5 text-base rounded-lg gap-2',
  lg: 'h-14 px-7 text-lg rounded-lg gap-2.5',
  xl: 'h-16 px-8 text-lg rounded-xl gap-3'
};

const base =
  'inline-flex items-center justify-center font-medium tracking-tight transition-all duration-micro ease-out-expo will-change-transform active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none whitespace-nowrap';

type CommonProps = {
  variant?: Variant;
  size?: Size;
  className?: string;
};

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & CommonProps;
type LinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & CommonProps & { href: string };

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', className, ...props }, ref) => (
    <button
      ref={ref}
      className={cn(base, variantClasses[variant], sizeClasses[size], className)}
      {...props}
    />
  )
);
Button.displayName = 'Button';

export const ButtonLink = forwardRef<HTMLAnchorElement, LinkProps>(
  ({ variant = 'primary', size = 'md', className, ...props }, ref) => (
    <a
      ref={ref}
      className={cn(base, variantClasses[variant], sizeClasses[size], className)}
      {...props}
    />
  )
);
ButtonLink.displayName = 'ButtonLink';
