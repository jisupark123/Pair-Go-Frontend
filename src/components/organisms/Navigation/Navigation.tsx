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
        'fixed top-0 left-0 z-50 w-full h-[80px] px-8 grid grid-cols-[1fr_auto_1fr] items-center border-b border-slate-700/50 bg-slate-950/80 backdrop-blur-sm',
        className,
      )}
    >
      <div className='flex items-center justify-start'>{left}</div>
      <div className='flex items-center justify-center'>
        <h1 className={`text-center ${isMobileOnly ? 'text-sm' : 'text-lg'}`}>{title}</h1>
      </div>
      <div className='flex items-center justify-end gap-4 h-full'>{right}</div>
    </nav>
  );
}
