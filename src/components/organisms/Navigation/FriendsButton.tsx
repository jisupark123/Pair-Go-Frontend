import type { ComponentProps } from 'react';
import { Users } from 'lucide-react';

interface FriendsButtonProps extends ComponentProps<'button'> {
  hasNew?: boolean; // New friend requests notification
}

export function FriendsButton({ hasNew, ...props }: FriendsButtonProps) {
  return (
    <button className='flex flex-col items-center group gap-1 translate-y-1' {...props}>
      <div className='relative flex items-center justify-center w-10 h-10 rounded-full bg-hextech-blue-900 border border-hextech-blue-500 group-hover:bg-hextech-blue-800 transition-all duration-200 transform group-hover:scale-105'>
        <Users className='w-5 h-5 text-hextech-blue-300' />
        {hasNew && (
          <span className='absolute top-0 right-0 w-3 h-3 bg-hextech-red-500 border-2 border-hextech-blue-900 rounded-full' />
        )}
      </div>
      <span className='text-[10px] font-bold text-hextech-blue-400 group-hover:text-hextech-blue-300 transition-colors tracking-wider'>
        친구
      </span>
    </button>
  );
}
