import { clsx } from 'clsx';
import { Trash2 } from 'lucide-react';

import type { Friend } from '@/components/organisms/Navigation/FriendsMenu/constants';

export function FriendItem({ friend }: { friend: Friend }) {
  return (
    <div className='group flex items-center justify-between p-2 rounded-md hover:bg-hextech-blue-500/10 transition-colors'>
      <div className='flex items-center gap-3'>
        <div className='relative'>
          <div className='w-8 h-8 rounded-full bg-slate-800 border-2 border-slate-700/50 overflow-hidden'>
            {/* Avatar placeholder */}
            <div className='w-full h-full bg-linear-to-br from-slate-700 to-slate-800' />
          </div>
          <div
            className={clsx(
              'absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full border-2 border-slate-900',
              friend.isOnline ? 'bg-hextech-green-400 shadow-[0_0_4px_#0AC8B9]' : 'bg-slate-500',
            )}
          />
        </div>
        <div className='flex flex-col'>
          <span className={clsx('text-sm font-medium', friend.isOnline ? 'text-hextech-blue-100' : 'text-slate-500')}>
            {friend.nickname}
          </span>
          <span className='text-[10px] text-slate-500'>{friend.isOnline ? '온라인' : '오프라인'}</span>
        </div>
      </div>
      <button
        className='opacity-0 group-hover:opacity-100 p-1.5 rounded-md text-hextech-red-400 hover:bg-hextech-red-500/10 transition-all'
        title='친구 삭제'
      >
        <Trash2 className='w-3.5 h-3.5' />
      </button>
    </div>
  );
}
