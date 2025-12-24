import { type HTMLAttributes, type ReactNode } from 'react';

import type { ThemeColor } from '@/types/theme';

interface ThemeBoxProps extends HTMLAttributes<HTMLDivElement> {
  color?: ThemeColor;
  children: ReactNode;
  size?: 'sm' | 'md';
  filled?: boolean;
}

const colorStyles: Record<
  ThemeColor,
  {
    border: string;
    gradient: string;
    text: string;
    shadow: string;
  }
> = {
  blue: {
    border: 'border-hextech-blue-400',
    gradient: 'from-hextech-blue-950/70 via-hextech-blue-950/70 to-hextech-blue-950/70',
    text: 'text-hextech-blue-300',
    shadow: 'shadow-hextech-blue-500/50',
  },
  gold: {
    border: 'border-hextech-gold-400',
    gradient: 'from-hextech-gold-950/70 via-hextech-gold-950/70 to-hextech-gold-950/70',
    text: 'text-hextech-gold-300',
    shadow: 'shadow-hextech-gold-500/50',
  },
  red: {
    border: 'border-hextech-red-400',
    gradient: 'from-hextech-red-950/70 via-hextech-red-950/70 to-hextech-red-950/70',
    text: 'text-hextech-red-300',
    shadow: 'shadow-hextech-red-500/50',
  },
  green: {
    border: 'border-hextech-green-400',
    gradient: 'from-hextech-green-950/70 via-hextech-green-950/70 to-hextech-green-950/70',
    text: 'text-hextech-green-300',
    shadow: 'shadow-hextech-green-500/50',
  },
  purple: {
    border: 'border-hextech-purple-400',
    gradient: 'from-hextech-purple-950/70 via-hextech-purple-950/70 to-hextech-purple-950/70',
    text: 'text-hextech-purple-300',
    shadow: 'shadow-hextech-purple-500/50',
  },
  silver: {
    border: 'border-hextech-silver-400',
    gradient: 'from-hextech-silver-950/70 via-hextech-silver-950/70 to-hextech-silver-950/70',
    text: 'text-hextech-silver-300',
    shadow: 'shadow-hextech-silver-500/50',
  },
};

export function ThemeBox({
  color = 'blue',
  children,
  size = 'md',
  filled = false,
  className = '',
  ...props
}: ThemeBoxProps) {
  const styles = colorStyles[color];

  const sizeBaseClasses = size === 'sm' ? 'p-2 rounded-lg' : 'p-3 rounded-xl';

  const textBaseClasses = size === 'sm' ? 'text-sm' : 'text-xl tracking-wider';

  return (
    <div
      className={`
        flex items-center justify-center border-2
        ${filled ? `bg-linear-to-br ${styles.gradient} backdrop-blur-sm` : ''}
        ${styles.border}
        shadow-lg ${styles.shadow}
        ${sizeBaseClasses}
        ${styles.text}
        ${className}
        ${textBaseClasses}
        `}
      {...props}
    >
      {children}
    </div>
  );
}
