import { forwardRef } from 'react';
import type { ComponentProps } from 'react';
import { twMerge } from 'tailwind-merge';

import type { ThemeColor } from '@/types/theme';

interface ThemeInputProps extends ComponentProps<'input'> {
  color: ThemeColor;
}

const colorStyles: Record<
  ThemeColor,
  {
    border: string;
    text: string;
    placeholder: string;
    focusBorder: string;
    focusRing: string;
  }
> = {
  blue: {
    border: 'border-hextech-blue-500/30',
    text: 'text-hextech-blue-100',
    placeholder: 'placeholder:text-hextech-blue-500/50',
    focusBorder: 'focus:border-hextech-blue-400',
    focusRing: 'focus:ring-hextech-blue-400/50',
  },
  gold: {
    border: 'border-hextech-gold-500/30',
    text: 'text-hextech-gold-100',
    placeholder: 'placeholder:text-hextech-gold-500/50',
    focusBorder: 'focus:border-hextech-gold-400',
    focusRing: 'focus:ring-hextech-gold-400/50',
  },
  red: {
    border: 'border-hextech-red-500/30',
    text: 'text-hextech-red-100',
    placeholder: 'placeholder:text-hextech-red-500/50',
    focusBorder: 'focus:border-hextech-red-400',
    focusRing: 'focus:ring-hextech-red-400/50',
  },
  green: {
    border: 'border-hextech-green-500/30',
    text: 'text-hextech-green-100',
    placeholder: 'placeholder:text-hextech-green-500/50',
    focusBorder: 'focus:border-hextech-green-400',
    focusRing: 'focus:ring-hextech-green-400/50',
  },
  purple: {
    border: 'border-hextech-purple-500/30',
    text: 'text-hextech-purple-100',
    placeholder: 'placeholder:text-hextech-purple-500/50',
    focusBorder: 'focus:border-hextech-purple-400',
    focusRing: 'focus:ring-hextech-purple-400/50',
  },
  silver: {
    border: 'border-hextech-silver-500/30',
    text: 'text-hextech-silver-100',
    placeholder: 'placeholder:text-hextech-silver-500/50',
    focusBorder: 'focus:border-hextech-silver-400',
    focusRing: 'focus:ring-hextech-silver-400/50',
  },
};

export const ThemeInput = forwardRef<HTMLInputElement, ThemeInputProps>(({ className, color, ...props }, ref) => {
  const styles = colorStyles[color];

  return (
    <input
      ref={ref}
      className={twMerge(
        'w-full bg-slate-900/80 border rounded-md px-4 py-3 focus:outline-none focus:ring-1 transition-all duration-200',
        styles.border,
        styles.text,
        styles.placeholder,
        styles.focusBorder,
        styles.focusRing,
        className,
      )}
      {...props}
    />
  );
});

ThemeInput.displayName = 'ThemeInput';
