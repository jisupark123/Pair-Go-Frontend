import { useState } from 'react';
import { clsx } from 'clsx';
import { Search, UserPlus } from 'lucide-react';

import { ThemeInput } from '@/components/atoms/ThemeInput';
import { useMe } from '@/hooks/query/useMe';
import { useSearchUserByNickname } from '@/hooks/query/useSearchUserByNickname';

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
          className='pr-10 h-10 text-sm'
        />
        <button
          onClick={handleSearch}
          className='absolute right-3 top-1/2 -translate-y-1/2 text-hextech-blue-400 hover:text-hextech-blue-200 transition-colors'
          title='검색'
        >
          <Search className='w-4 h-4' />
        </button>
      </div>

      {/* Search Results */}
      {searchQuery.length > 0 && (
        <div className='flex flex-col gap-2 mt-2'>
          {(isSearching || user) && (
            <p className='text-xs text-hextech-blue-300 px-1'>{isSearching ? '검색 중...' : '검색 결과'}</p>
          )}

          {!isSearching && user && (
            <div
              key={user.id}
              className='flex items-center justify-between p-3 rounded-md bg-hextech-blue-900/20 border border-hextech-blue-500/30 animate-in fade-in slide-in-from-top-2'
            >
              <div className='flex items-center gap-3'>
                <div className='relative'>
                  <div className='w-8 h-8 rounded-full bg-slate-800 border-2 border-slate-700/50 overflow-hidden'>
                    {/* Avatar placeholder */}
                    <div className='w-full h-full bg-linear-to-br from-slate-700 to-slate-800' />
                  </div>
                  <div
                    className={clsx(
                      'absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full border-2 border-slate-900',
                      user.isOnline ? 'bg-hextech-green-400 shadow-[0_0_4px_#0AC8B9]' : 'bg-slate-500 border-slate-900',
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
                  className='p-1.5 rounded-full bg-hextech-blue-500/20 hover:bg-hextech-blue-500/40 text-hextech-blue-300 transition-colors'
                  title='친구 요청'
                >
                  <UserPlus className='w-4 h-4' />
                </button>
              )}
              {me && user.id === me.id && (
                <span className='text-[10px] px-1.5 py-0.5 rounded-sm font-bold tracking-wider bg-hextech-blue-900 text-hextech-blue-300'>
                  ME
                </span>
              )}
            </div>
          )}

          {!isSearching && !user && (
            <div className='flex flex-col items-center justify-center h-48 text-hextech-blue-300 text-xs'>
              검색 결과가 없습니다
            </div>
          )}
        </div>
      )}

      {!searchQuery && (
        <div className='flex flex-col items-center justify-center h-48 text-hextech-blue-300 gap-2'>
          <Search className='w-8 h-8 opacity-50' />
          <span className='text-xs'>친구의 닉네임을 검색해보세요</span>
        </div>
      )}
    </div>
  );
}
