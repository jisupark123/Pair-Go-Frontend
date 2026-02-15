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
              className='flex items-center justify-between rounded-md border border-hextech-blue-500/10 bg-hextech-blue-900/10 p-2'
            >
              <span className='text-sm font-medium text-hextech-blue-100'>{req.nickname}</span>
              <div className='flex items-center gap-1'>
                <button className='rounded bg-hextech-blue-500/20 p-1.5 text-hextech-blue-300 hover:bg-hextech-blue-500/40'>
                  <Check className='h-3.5 w-3.5' />
                </button>
                <button className='rounded bg-hextech-red-500/10 p-1.5 text-hextech-red-400 hover:bg-hextech-red-500/20'>
                  <X className='h-3.5 w-3.5' />
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
              className='flex items-center justify-between rounded-md p-2 transition-colors hover:bg-slate-800/50'
            >
              <span className='text-sm text-slate-400'>{req.nickname}</span>
              <button
                className='flex items-center gap-1 rounded bg-slate-700/50 px-2 py-1 text-[10px] text-slate-300 transition-colors hover:bg-slate-700'
                title='요청 취소'
              >
                <UserMinus className='h-3 w-3' />
                취소
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
