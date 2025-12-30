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
        'fixed top-0 left-0 z-50 w-full h-[80px] px-8 grid grid-cols-[1fr_auto_1fr] items-center',
        'border-b border-hextech-blue-900/30 bg-hextech-silver-950/80 backdrop-blur-md',
        'shadow-[0_4px_20px_rgba(0,0,0,0.4)]',
        className,
      )}
    >
      <div className='flex items-center justify-start'>{left}</div>
      <div className='flex items-center justify-center relative group'>
        <div className='absolute -inset-4 bg-hextech-blue-500/10 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500' />
        <h1
          className={clsx(
            'text-center font-bold tracking-widest uppercase relative',
            'bg-linear-to-b from-hextech-gold-300 to-hextech-gold-600 bg-clip-text text-transparent',
            'drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]',
            isMobileOnly ? 'text-lg' : 'text-2xl',
          )}
        >
          {title}
        </h1>
      </div>
      <div className='flex items-center justify-end gap-4 h-full'>{right}</div>
    </nav>
  );
}
