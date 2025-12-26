import { Check, UserMinus, X } from 'lucide-react';

import { EmptyState, SectionHeader } from '@/components/organisms/Navigation/FriendsMenu/components/shared';
import { MOCK_REQUESTS } from '@/components/organisms/Navigation/FriendsMenu/constants';

export function RequestList() {
  const received = MOCK_REQUESTS.filter((req) => req.type === 'received');
  const sent = MOCK_REQUESTS.filter((req) => req.type === 'sent');

  if (received.length === 0 && sent.length === 0) {
    return <EmptyState message='친구 요청이 없습니다.' />;
  }

  return (
    <div className='flex flex-col gap-4'>
      {received.length > 0 && (
        <div className='flex flex-col gap-1'>
          <SectionHeader title={`받은 요청 (${received.length})`} />
          {received.map((req) => (
            <div
              key={req.id}
              className='flex items-center justify-between p-2 rounded-md bg-hextech-blue-900/10 border border-hextech-blue-500/10'
            >
              <span className='text-sm font-medium text-hextech-blue-100'>{req.nickname}</span>
              <div className='flex items-center gap-1'>
                <button className='p-1.5 rounded bg-hextech-blue-500/20 hover:bg-hextech-blue-500/40 text-hextech-blue-300'>
                  <Check className='w-3.5 h-3.5' />
                </button>
                <button className='p-1.5 rounded bg-hextech-red-500/10 hover:bg-hextech-red-500/20 text-hextech-red-400'>
                  <X className='w-3.5 h-3.5' />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {sent.length > 0 && (
        <div className='flex flex-col gap-1'>
          <SectionHeader title={`보낸 요청 (${sent.length})`} />
          {sent.map((req) => (
            <div
              key={req.id}
              className='flex items-center justify-between p-2 rounded-md hover:bg-slate-800/50 transition-colors'
            >
              <span className='text-sm text-slate-400'>{req.nickname}</span>
              <button
                className='flex items-center gap-1 px-2 py-1 rounded text-[10px] bg-slate-700/50 hover:bg-slate-700 text-slate-300 transition-colors'
                title='요청 취소'
              >
                <UserMinus className='w-3 h-3' />
                취소
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
