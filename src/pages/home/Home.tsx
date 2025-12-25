import { useState } from 'react';
import { LogIn, Play, Plus, Users } from 'lucide-react';
import { useNavigate } from 'react-router';

import { ThemeBox } from '@/components/atoms/ThemeBox';
import { Navigation } from '@/components/organisms/Navigation/Navigation';
import CreateRoomModal from '@/pages/home/components/CreateRoomModal';

export default function Home() {
  const navigate = useNavigate();
  const [showCreateRoomModal, setShowCreateRoomModal] = useState(false);

  // Mock data for online users
  const onlineUsers = 42;

  const handleQuickStart = () => {
    // Logic for quick start
    console.log('Quick Start');
  };

  return (
    <div className='flex-1 pt-[80px] flex flex-col'>
      <Navigation
        right={
          <button
            onClick={() => navigate('/login')}
            className='flex items-center gap-2 px-4 py-2 text-base font-medium text-hextech-green-300 hover:text-hextech-blue-100 hover:bg-hextech-blue-500/10 rounded-lg transition-all duration-200'
          >
            <LogIn className='w-6 h-6' />
            <span>Log In</span>
          </button>
        }
      />
      <div className='flex-1 flex flex-col items-center justify-center h-full pt-5'>
        {/* Header Info */}
        <div className='mb-12 animate-in fade-in slide-in-from-top-4 duration-1000'>
          <ThemeBox color='silver' size='sm' filled className='border-hextech-silver-700/50 py-1.5 px-4'>
            <div className='flex items-center gap-2 whitespace-nowrap'>
              <Users className='w-4 h-4 text-hextech-blue-400' />
              <div className='flex items-center gap-1.5 text-sm'>
                <span className='text-hextech-silver-300 font-medium'>현재 대기 중인 플레이어</span>
                <span className='text-hextech-silver-500'>:</span>
                <span className='font-bold text-hextech-blue-400'>{onlineUsers}명</span>
              </div>
            </div>
          </ThemeBox>
        </div>

        {/* Main Content */}
        <div className='flex flex-col md:flex-row gap-6 w-full max-w-4xl animate-in fade-in zoom-in-95 duration-700'>
          {/* Quick Start Button */}
          <button onClick={handleQuickStart} className='group relative flex-1 focus:outline-hidden'>
            <div className='absolute -inset-1 bg-linear-to-r from-hextech-red-500 to-hextech-red-400 rounded-2xl blur-md opacity-25 group-hover:opacity-60 transition duration-500' />
            <ThemeBox
              color='red'
              filled
              className='relative flex flex-col items-center justify-center gap-6 h-72 w-full cursor-pointer transition-all duration-300 group-hover:scale-105 group-hover:-translate-y-1 group-active:scale-95 border-hextech-red-400/50'
            >
              <div className='inline-block p-4 rounded-full bg-hextech-red-500/10 border border-hextech-red-500/20 group-hover:border-hextech-red-400/40 transition-colors'>
                <Play className='w-12 h-12 text-hextech-red-300 fill-hextech-red-300/20 group-hover:fill-hextech-red-300/40 transition-all' />
              </div>
              <h2 className='text-3xl font-black text-hextech-red-200 tracking-tighter'>빠른 시작</h2>
              <p className='text-hextech-red-400/70 text-sm font-medium px-6 text-center'>
                검증된 상대와 바로 대국을 시작합니다
              </p>
            </ThemeBox>
          </button>

          {/* Create Room Button */}
          <button className='group relative flex-1 focus:outline-hidden' onClick={() => setShowCreateRoomModal(true)}>
            <div className='absolute -inset-1 bg-linear-to-r from-hextech-blue-500 to-hextech-blue-400 rounded-2xl blur-md opacity-20 group-hover:opacity-50 transition duration-500' />
            <ThemeBox
              color='blue'
              filled
              className='relative flex flex-col items-center justify-center gap-6 h-72 w-full cursor-pointer transition-all duration-300 group-hover:scale-105 group-hover:-translate-y-1 group-active:scale-95 border-hextech-blue-400/50'
            >
              <div className='p-4 rounded-full bg-hextech-blue-500/10 border border-hextech-blue-500/20 group-hover:border-hextech-blue-400/40 transition-colors'>
                <Plus className='w-12 h-12 text-hextech-blue-300 group-hover:text-hextech-blue-200 transition-colors' />
              </div>
              <h2 className='text-3xl font-black text-hextech-blue-200 tracking-tighter'>방 만들기</h2>
              <p className='text-hextech-blue-400/70 text-sm font-medium px-6 text-center'>
                새로운 방을 생성하고 플레이어를 모집합니다
              </p>
            </ThemeBox>
          </button>
        </div>

        {/* Footer Decoration */}
        <div className='mt-16 opacity-30 pointer-events-none select-none'>
          <div className='h-px w-64 bg-linear-to-r from-transparent via-hextech-blue-500 to-transparent' />
          <p className='mt-4 text-[10px] text-center tracking-[0.5em] text-hextech-blue-300'>두다 (Doda)</p>
        </div>

        <CreateRoomModal open={showCreateRoomModal} onOpenChange={setShowCreateRoomModal} />
      </div>
    </div>
  );
}
