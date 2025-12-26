import type { ReactNode } from 'react';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { LogOut, Settings, User } from 'lucide-react';
import { Link } from 'react-router';

import { useLogout } from '@/hooks/query/useLogout';

interface UserProfileProps {
  user: {
    nickname: string;
    profileImageUrl?: string;
  };
}

export function UserProfile({ user }: UserProfileProps) {
  return (
    <UserMenu nickname={user.nickname}>
      <button className='flex flex-col items-center group gap-1 translate-y-1'>
        <div className='flex items-center justify-center w-10 h-10 rounded-full bg-hextech-purple-900 border border-hextech-purple-500 group-hover:bg-hextech-purple-800 transition-all duration-200 transform group-hover:scale-105'>
          {/* Profile Image support can be added here in the future */}
          <User className='w-5 h-5 text-hextech-purple-300' />
        </div>
        <span className='text-[10px] font-bold text-hextech-purple-400 group-hover:text-hextech-purple-300 transition-colors tracking-wider'>
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
          className='z-50 min-w-[200px] bg-slate-900 border border-hextech-purple-500/50 rounded-lg shadow-xl shadow-black/50 p-1 animate-in fade-in zoom-in-95 duration-200'
          sideOffset={5}
          align='end'
        >
          <DropdownMenu.Label className='px-3 py-2 text-xs font-semibold text-hextech-purple-400 tracking-wider'>
            {nickname}님
          </DropdownMenu.Label>
          <DropdownMenu.Separator className='h-px bg-hextech-purple-500/30 my-1' />
          <DropdownMenu.Item asChild>
            <Link
              to='/settings/profile'
              className='group flex items-center gap-3 px-3 py-2.5 text-sm text-hextech-silver-100 outline-none cursor-pointer hover:bg-hextech-purple-500/20 hover:text-hextech-purple-300 rounded-md transition-colors'
            >
              <User className='w-4 h-4 text-hextech-purple-400 group-hover:text-hextech-purple-300' />
              <span>프로필 설정</span>
            </Link>
          </DropdownMenu.Item>
          <DropdownMenu.Item className='group flex items-center gap-3 px-3 py-2.5 text-sm text-hextech-silver-100 outline-none cursor-pointer hover:bg-hextech-purple-500/20 hover:text-hextech-purple-300 rounded-md transition-colors'>
            <Settings className='w-4 h-4 text-hextech-purple-400 group-hover:text-hextech-purple-300' />
            <span>설정</span>
          </DropdownMenu.Item>
          <DropdownMenu.Separator className='h-px bg-hextech-purple-500/30 my-1' />
          <DropdownMenu.Item
            className='group flex items-center gap-3 px-3 py-2.5 text-sm text-hextech-red-400 outline-none cursor-pointer hover:bg-hextech-red-500/10 hover:text-hextech-red-300 rounded-md transition-colors'
            onClick={() => logout()}
          >
            <LogOut className='w-4 h-4 text-hextech-red-400 group-hover:text-hextech-red-300' />
            <span>로그아웃</span>
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}
