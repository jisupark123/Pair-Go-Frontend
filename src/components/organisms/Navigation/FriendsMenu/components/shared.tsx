import { clsx } from 'clsx';
import { UserMinus } from 'lucide-react';

export function SectionHeader({ title, className }: { title: string; className?: string }) {
  return (
    <h3
      className={clsx('px-1 py-1 text-[10px] font-bold text-hextech-blue-500/70 uppercase tracking-wider', className)}
    >
      {title}
    </h3>
  );
}

export function EmptyState({ message }: { message: string }) {
  return (
    <div className='flex flex-col items-center justify-center py-12 text-hextech-blue-500/40'>
      <UserMinus className='w-8 h-8 mb-2 opacity-50' />
      <span className='text-xs'>{message}</span>
    </div>
  );
}
