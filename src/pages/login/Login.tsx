import { useLocation } from 'react-router';

import { loginWithKakao } from '@/lib/kakao';

import { KakaoLoginButton } from '@/components/atoms/Button/KakaoLoginButton';
import { ThemeBox } from '@/components/atoms/ThemeBox';
import { Navigation } from '@/components/organisms/Navigation/Navigation';
import { NavigationBack } from '@/components/organisms/Navigation/NavigationBack';

export default function Login() {
  const location = useLocation();
  const from = location.state?.from;

  const handleKakaoLogin = () => {
    loginWithKakao(from);
  };

  return (
    <div className='flex-1 pt-[80px] flex flex-col min-h-screen bg-slate-950 relative overflow-hidden'>
      {/* Background Gradients for brightness */}
      <div className='absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-hextech-purple-900/20 blur-[100px] pointer-events-none' />

      <Navigation left={<NavigationBack />} title='로그인' />

      <div className='flex-1 flex flex-col items-center justify-center p-4 animate-in fade-in slide-in-from-bottom-4 duration-700 relative z-10'>
        <ThemeBox
          color='purple'
          filled={false}
          className='w-full max-w-md p-8 flex flex-col items-center gap-8 border-hextech-purple-500/30 bg-slate-900/70 backdrop-blur-md shadow-2xl shadow-hextech-purple-900/20'
        >
          <div className='text-center space-y-2'>
            <h1 className='text-3xl font-bold text-hextech-purple-100 tracking-tight drop-shadow-sm'>로그인</h1>
            <p className='text-hextech-purple-300 text-sm font-medium'>서비스 이용을 위해 로그인해주세요.</p>
          </div>

          <div className='w-full space-y-4'>
            <KakaoLoginButton onClick={handleKakaoLogin} />
          </div>

          <div className='w-full flex items-center gap-4 opacity-80'>
            <div className='h-px flex-1 bg-linear-to-r from-transparent via-hextech-purple-700 to-transparent' />
            <span className='text-xs text-hextech-purple-400 font-medium'>또는</span>
            <div className='h-px flex-1 bg-linear-to-r from-transparent via-hextech-purple-700 to-transparent' />
          </div>

          <div className='flex gap-4 text-xs text-hextech-purple-300/70'>
            <button
              type='button'
              className='hover:text-hextech-purple-200 transition-colors underline-offset-4 hover:underline'
            >
              이용약관
            </button>
            <span className='w-px h-3 bg-hextech-purple-700 my-auto' />
            <button
              type='button'
              className='hover:text-hextech-purple-200 transition-colors underline-offset-4 hover:underline'
            >
              개인정보처리방침
            </button>
          </div>
        </ThemeBox>
      </div>
    </div>
  );
}
