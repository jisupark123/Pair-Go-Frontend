import type { ReactNode } from 'react';
import { isMobileOnly } from 'react-device-detect';

interface NavigationProps {
  left?: ReactNode;
  title?: string;
  right?: ReactNode;
  className?: string;
}

export function Navigation({ left, title, right, className = '' }: NavigationProps) {
  const containerClasses = [
    'fixed top-0 left-0 w-full z-50 grid grid-cols-[1fr_auto_1fr] items-center border-b border-slate-700/50 bg-slate-950/80 backdrop-blur-sm',
    isMobileOnly ? 'h-[80px] px-3 py-2' : 'h-[80px] px-6 py-3',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <nav className={containerClasses}>
      <div className='flex items-center justify-start'>{left}</div>
      <div className='flex items-center justify-center'>
        <h1 className={`text-center ${isMobileOnly ? 'text-sm' : 'text-lg'}`}>{title}</h1>
      </div>
      <div className='flex items-center justify-end'>{right}</div>
    </nav>
  );
}
