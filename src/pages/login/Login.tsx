import { loginWithKakao } from '@/lib/kakao';

import { KakaoLoginButton } from '@/components/atoms/Button/KakaoLoginButton';
import { ThemeBox } from '@/components/atoms/ThemeBox';
import { Navigation } from '@/components/organisms/Navigation/Navigation';
import { NavigationBack } from '@/components/organisms/Navigation/NavigationBack';

export default function Login() {
  const handleKakaoLogin = () => {
    loginWithKakao();
  };

  return (
    <div className='flex-1 pt-[80px] flex flex-col min-h-screen bg-slate-950'>
      <Navigation left={<NavigationBack />} title='로그인' />

      <div className='flex-1 flex flex-col items-center justify-center p-4 animate-in fade-in slide-in-from-bottom-4 duration-700'>
        <ThemeBox
          color='blue'
          filled={false}
          className='w-full max-w-md p-8 flex flex-col items-center gap-8 border-hextech-blue-900/50 bg-slate-900/50 backdrop-blur-sm'
        >
          <div className='text-center space-y-2'>
            <h1 className='text-2xl font-bold text-hextech-blue-200 tracking-tight'>로그인</h1>
            <p className='text-hextech-blue-400/60 text-sm'>서비스 이용을 위해 로그인해주세요.</p>
          </div>

          <div className='w-full space-y-4'>
            <KakaoLoginButton onClick={handleKakaoLogin} />
          </div>

          <div className='w-full flex items-center gap-4 opacity-50'>
            <div className='h-px flex-1 bg-hextech-blue-900' />
            <span className='text-xs text-hextech-blue-500 font-medium'>또는</span>
            <div className='h-px flex-1 bg-hextech-blue-900' />
          </div>

          <div className='flex gap-4 text-xs text-hextech-blue-400/60'>
            <button type='button' className='hover:text-hextech-blue-300 transition-colors'>
              이용약관
            </button>
            <span className='w-px h-3 bg-hextech-blue-900 my-auto' />
            <button type='button' className='hover:text-hextech-blue-300 transition-colors'>
              개인정보처리방침
            </button>
          </div>
        </ThemeBox>
      </div>
    </div>
  );
}
