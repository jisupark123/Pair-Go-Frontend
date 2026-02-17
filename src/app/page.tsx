'use client';

import { useState } from 'react';
import { LogIn, Play, Plus, Users } from 'lucide-react';
import { useRouter, usePathname } from 'next/navigation';

import CreateRoomModal from '@/app/rooms/_components/CreateRoomModal';
import { useMe } from '@/features/auth/hooks/useMe';
import { ThemeBox } from '@/shared/ui/atoms/ThemeBox';
import { Logo } from '@/shared/ui/common/Logo';
import { MessageDialog } from '@/shared/ui/common/MessageDialog';
import { Navigation } from '@/shared/ui/organisms/Navigation/Navigation';
import { UserProfile } from '@/shared/ui/organisms/Navigation/UserProfile';

export default function Home() {
  const router = useRouter();
  const pathname = usePathname();

  const [showCreateRoomModal, setShowCreateRoomModal] = useState(false);
  const [showLoginDialog, setShowLoginDialog] = useState(false);

  const { data: user, isLoading: isUserLoading } = useMe();

  // Mock data for online users
  const onlineUsers = 42;

  const handleQuickStart = () => {
    if (!user) {
      setShowLoginDialog(true);
      return;
    }
    // Logic for quick start
    console.log('Quick Start');
  };

  const handleCreateRoom = () => {
    if (!user) {
      setShowLoginDialog(true);
      return;
    }
    setShowCreateRoomModal(true);
  };

  return (
    <div className='flex flex-1 flex-col pt-[80px]'>
      <Navigation
        left={<Logo className='ml-2' />}
        right={
          isUserLoading ? null : user ? (
            <>
              {/* <FriendsMenu /> */}
              <UserProfile user={user} />
            </>
          ) : (
            <button
              onClick={() => router.push('/login')}
              className='flex items-center gap-2 rounded-lg px-4 py-2 text-base font-medium text-hextech-green-300 transition-all duration-200 hover:bg-hextech-blue-500/10 hover:text-hextech-blue-100'
            >
              <LogIn className='h-6 w-6' />
              <span>Log In</span>
            </button>
          )
        }
      />
      <div className='flex h-full flex-1 flex-col items-center justify-center px-6 pt-5'>
        {/* Header Info */}
        <div className='mb-12 duration-1000 animate-in fade-in slide-in-from-top-4'>
          <ThemeBox color='silver' size='sm' filled className='border-hextech-silver-700/50 px-4 py-1.5'>
            <div className='flex items-center gap-2 whitespace-nowrap'>
              <Users className='h-4 w-4 text-hextech-blue-400' />
              <div className='flex items-center gap-1.5 text-sm'>
                <span className='font-medium text-hextech-silver-300'>현재 대기 중인 플레이어</span>
                <span className='text-hextech-silver-500'>:</span>
                <span className='font-bold text-hextech-blue-400'>{onlineUsers}명</span>
              </div>
            </div>
          </ThemeBox>
        </div>

        {/* Main Content */}
        <div className='flex w-full max-w-4xl flex-col gap-6 duration-700 animate-in fade-in zoom-in-95 md:flex-row'>
          {/* Quick Start Button */}
          <button onClick={handleQuickStart} className='group relative flex-1 focus:outline-hidden'>
            <div className='absolute -inset-1 rounded-2xl bg-linear-to-r from-hextech-red-500 to-hextech-red-400 opacity-25 blur-md transition duration-500 group-hover:opacity-60' />
            <ThemeBox
              color='red'
              filled
              className='relative flex h-72 w-full cursor-pointer flex-col items-center justify-center gap-6 border-hextech-red-400/50 transition-all duration-300 group-hover:-translate-y-1 group-hover:scale-105 group-active:scale-95'
            >
              <div className='inline-block rounded-full border border-hextech-red-500/20 bg-hextech-red-500/10 p-4 transition-colors group-hover:border-hextech-red-400/40'>
                <Play className='h-12 w-12 fill-hextech-red-300/20 text-hextech-red-300 transition-all group-hover:fill-hextech-red-300/40' />
              </div>
              <h2 className='text-3xl font-black tracking-tighter text-hextech-red-200'>빠른 시작</h2>
              <p className='px-6 text-center text-sm font-medium text-hextech-red-400/70'>
                검증된 상대와 바로 대국을 시작합니다
              </p>
            </ThemeBox>
          </button>

          {/* Create Room Button */}
          <button className='group relative flex-1 focus:outline-hidden' onClick={handleCreateRoom}>
            <div className='absolute -inset-1 rounded-2xl bg-linear-to-r from-hextech-blue-500 to-hextech-blue-400 opacity-20 blur-md transition duration-500 group-hover:opacity-50' />
            <ThemeBox
              color='blue'
              filled
              className='relative flex h-72 w-full cursor-pointer flex-col items-center justify-center gap-6 border-hextech-blue-400/50 transition-all duration-300 group-hover:-translate-y-1 group-hover:scale-105 group-active:scale-95'
            >
              <div className='rounded-full border border-hextech-blue-500/20 bg-hextech-blue-500/10 p-4 transition-colors group-hover:border-hextech-blue-400/40'>
                <Plus className='h-12 w-12 text-hextech-blue-300 transition-colors group-hover:text-hextech-blue-200' />
              </div>
              <h2 className='text-3xl font-black tracking-tighter text-hextech-blue-200'>방 만들기</h2>
              <p className='px-6 text-center text-sm font-medium text-hextech-blue-400/70'>
                새로운 방을 생성하고 플레이어를 모집합니다
              </p>
            </ThemeBox>
          </button>
        </div>

        {/* Footer Decoration */}
        <div className='pointer-events-none mt-16 pb-6 opacity-30 select-none'>
          <div className='h-px w-64 bg-linear-to-r from-transparent via-hextech-blue-500 to-transparent' />
          <p className='mt-4 text-center text-[10px] tracking-[0.5em] text-hextech-blue-300'>두다 (Doda)</p>
        </div>

        <CreateRoomModal open={showCreateRoomModal} onOpenChange={setShowCreateRoomModal} />
        <MessageDialog
          open={showLoginDialog}
          onOpenChange={setShowLoginDialog}
          onConfirm={() => {
            setShowLoginDialog(false);
            router.push(`/login?from=${encodeURIComponent(pathname || '')}`);
          }}
        />
      </div>
    </div>
  );
}
