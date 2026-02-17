import { useState } from 'react';
import { clsx } from 'clsx';
import { Search, UserPlus } from 'lucide-react';

import { useMe } from '@/features/auth/hooks/useMe';
import { useSearchUserByNickname } from '@/features/friends/useSearchUserByNickname';
import { ThemeInput } from '@/shared/ui/atoms/ThemeInput';

export function UserSearch() {
  const [inputValue, setInputValue] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const { data: me } = useMe();
  const { data: user, isLoading: isSearching } = useSearchUserByNickname(searchQuery);

  const handleSearch = () => {
    if (inputValue.length >= 1) {
      setSearchQuery(inputValue);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className='flex flex-col gap-4'>
      <div className='relative'>
        <ThemeInput
          color='blue'
          value={inputValue}
          onChange={(e) => {
            const inputValue = e.target.value.trim();
            setInputValue(inputValue);
            if (inputValue === '') {
              setSearchQuery('');
            }
          }}
          onKeyDown={handleKeyDown}
          placeholder='닉네임 검색'
          className='h-10 pr-10 text-sm'
        />
        <button
          onClick={handleSearch}
          className='absolute top-1/2 right-3 -translate-y-1/2 text-hextech-blue-400 transition-colors hover:text-hextech-blue-200'
          title='검색'
        >
          <Search className='h-4 w-4' />
        </button>
      </div>

      {/* Search Results */}
      {searchQuery.length > 0 && (
        <div className='mt-2 flex flex-col gap-2'>
          {(isSearching || user) && (
            <p className='px-1 text-xs text-hextech-blue-300'>{isSearching ? '검색 중...' : '검색 결과'}</p>
          )}

          {!isSearching && user && (
            <div
              key={user.id}
              className='flex items-center justify-between rounded-md border border-hextech-blue-500/30 bg-hextech-blue-900/20 p-3 animate-in fade-in slide-in-from-top-2'
            >
              <div className='flex items-center gap-3'>
                <div className='relative'>
                  <div className='h-8 w-8 overflow-hidden rounded-full border-2 border-slate-700/50 bg-slate-800'>
                    {/* Avatar placeholder */}
                    <div className='h-full w-full bg-linear-to-br from-slate-700 to-slate-800' />
                  </div>
                  <div
                    className={clsx(
                      'absolute -right-0.5 -bottom-0.5 h-2.5 w-2.5 rounded-full border-2 border-slate-900',
                      user.isOnline ? 'bg-hextech-green-400 shadow-[0_0_4px_#0AC8B9]' : 'border-slate-900 bg-slate-500',
                    )}
                  />
                </div>
                <div className='flex flex-col'>
                  <span className='text-sm font-medium text-hextech-blue-100'>{user.nickname}</span>
                  <span className='text-[10px] text-slate-500'>{user.isOnline ? '온라인' : '오프라인'}</span>
                </div>
              </div>
              {me && user.id !== me.id && (
                <button
                  className='rounded-full bg-hextech-blue-500/20 p-1.5 text-hextech-blue-300 transition-colors hover:bg-hextech-blue-500/40'
                  title='친구 요청'
                >
                  <UserPlus className='h-4 w-4' />
                </button>
              )}
              {me && user.id === me.id && (
                <span className='rounded-sm bg-hextech-blue-900 px-1.5 py-0.5 text-[10px] font-bold tracking-wider text-hextech-blue-300'>
                  ME
                </span>
              )}
            </div>
          )}

          {!isSearching && !user && (
            <div className='flex h-48 flex-col items-center justify-center text-xs text-hextech-blue-300'>
              검색 결과가 없습니다
            </div>
          )}
        </div>
      )}

      {!searchQuery && (
        <div className='flex h-48 flex-col items-center justify-center gap-2 text-hextech-blue-300'>
          <Search className='h-8 w-8 opacity-50' />
          <span className='text-xs'>친구의 닉네임을 검색해보세요</span>
        </div>
      )}
    </div>
  );
}
