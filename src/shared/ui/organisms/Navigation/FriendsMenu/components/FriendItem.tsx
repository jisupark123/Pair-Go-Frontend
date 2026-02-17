import { clsx } from 'clsx';
import { Trash2 } from 'lucide-react';

import type { Friend } from '@/shared/ui/organisms/Navigation/FriendsMenu/constants';

export function FriendItem({ friend }: { friend: Friend }) {
  return (
    <div className='group flex items-center justify-between rounded-md p-2 transition-colors hover:bg-hextech-blue-500/10'>
      <div className='flex items-center gap-3'>
        <div className='relative'>
          <div className='h-8 w-8 overflow-hidden rounded-full border-2 border-slate-700/50 bg-slate-800'>
            {/* Avatar placeholder */}
            <div className='h-full w-full bg-linear-to-br from-slate-700 to-slate-800' />
          </div>
          <div
            className={clsx(
              'absolute -right-0.5 -bottom-0.5 h-2.5 w-2.5 rounded-full border-2 border-slate-900',
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
        className='rounded-md p-1.5 text-hextech-red-400 opacity-0 transition-all group-hover:opacity-100 hover:bg-hextech-red-500/10'
        title='친구 삭제'
      >
        <Trash2 className='h-3.5 w-3.5' />
      </button>
    </div>
  );
}
