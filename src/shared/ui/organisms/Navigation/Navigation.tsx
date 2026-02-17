import type { ReactNode } from 'react';
import { clsx } from 'clsx';
import { isMobileOnly } from 'react-device-detect';

interface NavigationProps {
  left?: ReactNode;
  title?: string;
  right?: ReactNode;
  className?: string;
}

export function Navigation({ left, title, right, className = '' }: NavigationProps) {
  return (
    <nav
      className={clsx(
        'fixed top-0 left-0 z-50 grid h-[80px] w-full grid-cols-[1fr_auto_1fr] items-center px-8',
        'border-b border-hextech-blue-900/30 bg-hextech-silver-950/80 backdrop-blur-md',
        'shadow-[0_4px_20px_rgba(0,0,0,0.4)]',
        className,
      )}
    >
      <div className='flex items-center justify-start'>{left}</div>
      <div className='group relative flex items-center justify-center'>
        <div className='absolute -inset-4 rounded-full bg-hextech-blue-500/10 opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-100' />
        <h1
          className={clsx(
            'relative text-center font-bold tracking-widest uppercase',
            'bg-linear-to-b from-hextech-gold-300 to-hextech-gold-600 bg-clip-text text-transparent',
            'drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]',
            isMobileOnly ? 'text-lg' : 'text-2xl',
          )}
        >
          {title}
        </h1>
      </div>
      <div className='flex h-full items-center justify-end gap-4'>{right}</div>
    </nav>
  );
}
