import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';

import { ThemeBox } from '@/components/atoms/ThemeBox';
import { ThemeInput } from '@/components/atoms/ThemeInput';
import { Navigation } from '@/components/organisms/Navigation/Navigation';
import { NavigationBack } from '@/components/organisms/Navigation/NavigationBack';
import { useMe } from '@/hooks/query/useMe';
import { useUpdateProfile } from '@/hooks/query/useUpdateProfile';

export default function ProfileSettings() {
  const navigate = useNavigate();
  const { data: me } = useMe();
  const { mutate: updateProfile, isPending } = useUpdateProfile();

  const [nickname, setNickname] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (me) {
      setNickname(me.nickname);
    }
  }, [me]);

  /* Removed useEffect for validation */

  const validateNickname = (value: string) => {
    const trimmedValue = value.trim();
    if (!trimmedValue) {
      return '닉네임을 입력해주세요.';
    }
    if (trimmedValue.length < 2) {
      return '닉네임은 최소 2자 이상이어야 합니다.';
    }
    if (trimmedValue.length > 6) {
      return '닉네임은 최대 6자 이하이어야 합니다.';
    }
    if (!/^[가-힣a-zA-Z0-9]+$/.test(trimmedValue)) {
      return '닉네임은 한글, 영문, 숫자만 사용 가능합니다.';
    }
    return '';
  };

  const handleNicknameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setNickname(value.trim());
    setError(validateNickname(value));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (error || !nickname.trim()) return;

    updateProfile(
      { nickname },
      {
        onSuccess: () => {
          alert('닉네임이 변경되었습니다.');
          navigate(-1);
        },
        onError: () => {
          alert('닉네임 변경에 실패했습니다.');
        },
      },
    );
  };

  if (!me) return null;

  return (
    <div className='flex-1 pt-[80px] flex flex-col items-center'>
      <Navigation left={<NavigationBack label='뒤로가기' onClick={() => navigate(-1)} />} title='프로필 설정' />

      <div className='flex-1 flex flex-col items-center justify-center w-full px-4 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20'>
        <div className='w-full max-w-lg'>
          <form onSubmit={handleSubmit}>
            <ThemeBox
              color='purple'
              filled={false}
              className='flex flex-col gap-6 p-8 border-hextech-purple-500/50 shadow-2xl'
            >
              <div className='flex flex-col gap-3 w-full'>
                <label className='text-sm font-bold text-hextech-purple-300 ml-1 uppercase tracking-wider'>
                  Nickname
                </label>
                <ThemeInput
                  color={error ? 'red' : 'purple'}
                  value={nickname}
                  onChange={handleNicknameChange}
                  placeholder='닉네임을 입력하세요'
                  className={`text-lg py-4 bg-slate-900/90 focus:border-hextech-${error ? 'red' : 'purple'}-400 ${
                    error ? 'border-hextech-red-500/50' : 'border-hextech-purple-500/50'
                  }`}
                />
                <p className='text-xs text-hextech-red-400 ml-1 min-h-5'>
                  {error && <span className='animate-in fade-in slide-in-from-top-1'>* {error}</span>}
                </p>
              </div>

              <div className='w-full pt-2'>
                <button
                  type='submit'
                  disabled={isPending || !!error || nickname === me.nickname}
                  className='w-full py-4 text-base bg-linear-to-r from-hextech-purple-600 to-hextech-purple-500 hover:from-hextech-purple-500 hover:to-hextech-purple-400 disabled:from-slate-700 disabled:to-slate-700 disabled:text-slate-500 text-white font-bold rounded-lg transition-all duration-300 shadow-lg shadow-hextech-purple-900/50 cursor-pointer disabled:cursor-not-allowed transform hover:-translate-y-0.5 active:translate-y-0'
                >
                  {isPending ? '저장 중...' : '변경사항 저장'}
                </button>
                <p className='mt-4 text-center text-xs text-hextech-purple-400/40'>
                  부적절한 닉네임은 제재의 대상이 될 수 있습니다.
                </p>
              </div>
            </ThemeBox>
          </form>
        </div>
      </div>
    </div>
  );
}
