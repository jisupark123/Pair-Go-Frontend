import type { ReactNode } from 'react';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { LogOut, Settings, User } from 'lucide-react';
import { Link } from 'react-router';

import { useLogout } from '@/hooks/query/useLogout';

interface UserMenuProps {
  children: ReactNode;
}

export default function UserMenu({ children }: UserMenuProps) {
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
          <DropdownMenu.Label className='px-3 py-2 text-xs font-semibold text-hextech-purple-400 uppercase tracking-wider'>
            My Account
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
