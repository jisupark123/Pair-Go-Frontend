'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';

import { loginWithKakao } from '@/features/auth/kakao';
import { KakaoLoginButton } from '@/shared/ui/atoms/Button/KakaoLoginButton';
import { ThemeBox } from '@/shared/ui/atoms/ThemeBox';
import { Navigation } from '@/shared/ui/organisms/Navigation/Navigation';
import { NavigationBack } from '@/shared/ui/organisms/Navigation/NavigationBack';

function LoginContent() {
  const searchParams = useSearchParams();
  const from = searchParams?.get('from');

  const handleKakaoLogin = () => {
    loginWithKakao(from || undefined);
  };

  return (
    <div className='relative flex min-h-screen flex-1 flex-col overflow-hidden bg-slate-950 pt-[80px]'>
      {/* Background Gradients for brightness */}
      <div className='pointer-events-none absolute top-0 left-1/2 h-[500px] w-full -translate-x-1/2 bg-hextech-purple-900/20 blur-[100px]' />

      <Navigation left={<NavigationBack />} title='로그인' />

      <div className='relative z-10 flex flex-1 flex-col items-center justify-center p-4 duration-700 animate-in fade-in slide-in-from-bottom-4'>
        <ThemeBox
          color='purple'
          filled={false}
          className='flex w-full max-w-md flex-col items-center gap-8 border-hextech-purple-500/30 bg-slate-900/70 p-8 shadow-2xl shadow-hextech-purple-900/20 backdrop-blur-md'
        >
          <div className='space-y-2 text-center'>
            <h1 className='text-3xl font-bold tracking-tight text-hextech-purple-100 drop-shadow-sm'>로그인</h1>
            <p className='text-sm font-medium text-hextech-purple-300'>서비스 이용을 위해 로그인해주세요.</p>
          </div>

          <div className='w-full space-y-4'>
            <KakaoLoginButton onClick={handleKakaoLogin} />
          </div>

          <div className='flex w-full items-center gap-4 opacity-80'>
            <div className='h-px flex-1 bg-linear-to-r from-transparent via-hextech-purple-700 to-transparent' />
            <span className='text-xs font-medium text-hextech-purple-400'>또는</span>
            <div className='h-px flex-1 bg-linear-to-r from-transparent via-hextech-purple-700 to-transparent' />
          </div>

          <div className='flex gap-4 text-xs text-hextech-purple-300/70'>
            <button
              type='button'
              className='underline-offset-4 transition-colors hover:text-hextech-purple-200 hover:underline'
            >
              이용약관
            </button>
            <span className='my-auto h-3 w-px bg-hextech-purple-700' />
            <button
              type='button'
              className='underline-offset-4 transition-colors hover:text-hextech-purple-200 hover:underline'
            >
              개인정보처리방침
            </button>
          </div>
        </ThemeBox>
      </div>
    </div>
  );
}

export default function Login() {
  return (
    <Suspense>
      <LoginContent />
    </Suspense>
  );
}
