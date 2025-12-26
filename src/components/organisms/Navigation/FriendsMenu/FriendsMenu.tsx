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
          className='z-50 w-[320px] bg-slate-900/95 backdrop-blur-md border border-hextech-blue-500/50 rounded-lg shadow-2xl shadow-black/80 animate-in fade-in zoom-in-95 duration-200'
          sideOffset={10}
          align='end'
          onCloseAutoFocus={(e) => e.preventDefault()}
        >
          <Tabs.Root value={activeTab} onValueChange={setActiveTab} className='flex flex-col w-full'>
            <Tabs.List className='flex w-full border-b border-hextech-blue-500/30 bg-slate-950/50 rounded-t-lg'>
              <Trigger value='list' label='친구 목록' />
              <Trigger value='requests' label='친구 요청' count={receivedCount} />
              <Trigger value='search' label='친구 찾기' />
            </Tabs.List>

            <div className='p-4 min-h-[300px] max-h-[400px] overflow-y-auto scrollbar-hide'>
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
        'flex-1 px-3 py-3 text-xs font-medium transition-all outline-none relative hover:text-hextech-blue-200',
        'data-[state=active]:text-hextech-blue-300 data-[state=active]:bg-hextech-blue-500/10 data-[state=active]:shadow-[inset_0_-2px_0_0_#0AC8B9]', // Hextech Blue color
        'data-[state=inactive]:text-hextech-blue-500/70',
      )}
    >
      {label}
      {count !== undefined && count > 0 && (
        <span className='ml-1.5 inline-flex items-center justify-center min-w-[16px] h-4 px-1 rounded-full bg-hextech-red-500 text-[9px] text-white font-bold leading-none'>
          {count}
        </span>
      )}
    </Tabs.Trigger>
  );
}
