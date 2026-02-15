import { useState } from 'react';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import * as Tabs from '@radix-ui/react-tabs';
import { clsx } from 'clsx';

import { FriendsButton } from '@/components/organisms/Navigation/FriendsButton';
import { MOCK_REQUESTS } from '@/components/organisms/Navigation/FriendsMenu/constants';
import { FriendList } from '@/components/organisms/Navigation/FriendsMenu/tabs/FriendList';
import { RequestList } from '@/components/organisms/Navigation/FriendsMenu/tabs/RequestList';
import { UserSearch } from '@/components/organisms/Navigation/FriendsMenu/tabs/UserSearch';

export function FriendsMenu() {
  const [activeTab, setActiveTab] = useState('list');

  // Count received requests for badge
  const receivedCount = MOCK_REQUESTS.filter((req) => req.type === 'received').length;

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild className='outline-none'>
        <div className='cursor-pointer'>
          <FriendsButton hasNew={receivedCount > 0} />
        </div>
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content
          className='z-50 w-[320px] rounded-lg border border-hextech-blue-500/50 bg-slate-900/95 shadow-2xl shadow-black/80 backdrop-blur-md duration-200 animate-in fade-in zoom-in-95'
          sideOffset={10}
          align='end'
          onCloseAutoFocus={(e) => e.preventDefault()}
        >
          <Tabs.Root value={activeTab} onValueChange={setActiveTab} className='flex w-full flex-col'>
            <Tabs.List className='flex w-full rounded-t-lg border-b border-hextech-blue-500/30 bg-slate-950/50'>
              <Trigger value='list' label='친구 목록' />
              <Trigger value='requests' label='친구 요청' count={receivedCount} />
              <Trigger value='search' label='친구 찾기' />
            </Tabs.List>

            <div className='scrollbar-hide max-h-[400px] min-h-[300px] overflow-y-auto p-4'>
              <Tabs.Content value='list' className='outline-none'>
                <FriendList />
              </Tabs.Content>

              <Tabs.Content value='requests' className='outline-none'>
                <RequestList />
              </Tabs.Content>

              <Tabs.Content value='search' className='outline-none'>
                <UserSearch />
              </Tabs.Content>
            </div>
          </Tabs.Root>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}

function Trigger({ value, label, count }: { value: string; label: string; count?: number }) {
  return (
    <Tabs.Trigger
      value={value}
      className={clsx(
        'relative flex-1 px-3 py-3 text-xs font-medium transition-all outline-none hover:text-hextech-blue-200',
        'data-[state=active]:bg-hextech-blue-500/10 data-[state=active]:text-hextech-blue-300 data-[state=active]:shadow-[inset_0_-2px_0_0_#0AC8B9]', // Hextech Blue color
        'data-[state=inactive]:text-hextech-blue-500/70',
      )}
    >
      {label}
      {count !== undefined && count > 0 && (
        <span className='ml-1.5 inline-flex h-4 min-w-[16px] items-center justify-center rounded-full bg-hextech-red-500 px-1 text-[9px] leading-none font-bold text-white'>
          {count}
        </span>
      )}
    </Tabs.Trigger>
  );
}
