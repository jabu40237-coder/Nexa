'use client';

import { cn } from '@/lib/utils';
import { type InputHTMLAttributes, forwardRef } from 'react';

const Input = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement>>(
  ({ className, ...props }, ref) => (
    <input
      ref={ref}
      className={cn(
        'w-full px-4 py-3 rounded-xl bg-[var(--bg-card)] border border-[var(--border-color)]',
        'text-[var(--text-primary)] placeholder:text-[var(--text-muted)]',
        'focus:outline-none focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20',
        'transition-all duration-200 text-sm',
        className
      )}
      {...props}
    />
  )
);

Input.displayName = 'Input';
export { Input };
