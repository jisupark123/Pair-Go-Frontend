import type { ReactNode } from 'react';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { LogOut, Settings, User } from 'lucide-react';
import Link from 'next/link';

import { useLogout } from '@/features/auth/hooks/useLogout';

interface UserProfileProps {
  user: {
    nickname: string;
    profileImageUrl?: string;
  };
}

export function UserProfile({ user }: UserProfileProps) {
  return (
    <UserMenu nickname={user.nickname}>
      <button className='group flex translate-y-1 flex-col items-center gap-1'>
        <div className='flex h-10 w-10 transform items-center justify-center rounded-full border border-hextech-purple-500 bg-hextech-purple-900 transition-all duration-200 group-hover:scale-105 group-hover:bg-hextech-purple-800'>
          {/* Profile Image support can be added here in the future */}
          <User className='h-5 w-5 text-hextech-purple-300' />
        </div>
        <span className='text-[10px] font-bold tracking-wider text-hextech-purple-400 transition-colors group-hover:text-hextech-purple-300'>
          MY
        </span>
      </button>
    </UserMenu>
  );
}

interface UserMenuProps {
  nickname: string;
  children: ReactNode;
}

export default function UserMenu({ nickname, children }: UserMenuProps) {
  const { mutate: logout } = useLogout();

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild className='outline-none'>
        {children}
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content
          className='z-50 min-w-[200px] rounded-lg border border-hextech-purple-500/50 bg-slate-900 p-1 shadow-xl shadow-black/50 duration-200 animate-in fade-in zoom-in-95'
          sideOffset={5}
          align='end'
        >
          <DropdownMenu.Label className='px-3 py-2 text-xs font-semibold tracking-wider text-hextech-purple-400'>
            {nickname}님
          </DropdownMenu.Label>
          <DropdownMenu.Separator className='my-1 h-px bg-hextech-purple-500/30' />
          <DropdownMenu.Item asChild>
            <Link
              href='/settings/profile'
              className='group flex cursor-pointer items-center gap-3 rounded-md px-3 py-2.5 text-sm text-hextech-silver-100 transition-colors outline-none hover:bg-hextech-purple-500/20 hover:text-hextech-purple-300'
            >
              <User className='h-4 w-4 text-hextech-purple-400 group-hover:text-hextech-purple-300' />
              <span>프로필 설정</span>
            </Link>
          </DropdownMenu.Item>
          <DropdownMenu.Item className='group flex cursor-pointer items-center gap-3 rounded-md px-3 py-2.5 text-sm text-hextech-silver-100 transition-colors outline-none hover:bg-hextech-purple-500/20 hover:text-hextech-purple-300'>
            <Settings className='h-4 w-4 text-hextech-purple-400 group-hover:text-hextech-purple-300' />
            <span>설정</span>
          </DropdownMenu.Item>
          <DropdownMenu.Separator className='my-1 h-px bg-hextech-purple-500/30' />
          <DropdownMenu.Item
            className='group flex cursor-pointer items-center gap-3 rounded-md px-3 py-2.5 text-sm text-hextech-red-400 transition-colors outline-none hover:bg-hextech-red-500/10 hover:text-hextech-red-300'
            onClick={() => logout()}
          >
            <LogOut className='h-4 w-4 text-hextech-red-400 group-hover:text-hextech-red-300' />
            <span>로그아웃</span>
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}
