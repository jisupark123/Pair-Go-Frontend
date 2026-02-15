import type { ComponentProps } from 'react';
import { Users } from 'lucide-react';

interface FriendsButtonProps extends ComponentProps<'button'> {
  hasNew?: boolean; // New friend requests notification
}

export function FriendsButton({ hasNew, ...props }: FriendsButtonProps) {
  return (
    <button className='group flex translate-y-1 flex-col items-center gap-1' {...props}>
      <div className='relative flex h-10 w-10 transform items-center justify-center rounded-full border border-hextech-blue-500 bg-hextech-blue-900 transition-all duration-200 group-hover:scale-105 group-hover:bg-hextech-blue-800'>
        <Users className='h-5 w-5 text-hextech-blue-300' />
        {hasNew && (
          <span className='absolute top-0 right-0 h-3 w-3 rounded-full border-2 border-hextech-blue-900 bg-hextech-red-500' />
        )}
      </div>
      <span className='text-[10px] font-bold tracking-wider text-hextech-blue-400 transition-colors group-hover:text-hextech-blue-300'>
        친구
      </span>
    </button>
  );
}
