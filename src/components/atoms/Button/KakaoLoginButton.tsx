import type { ComponentProps } from 'react';

import { cn } from '@/components/figma/utils';

interface KakaoLoginButtonProps extends ComponentProps<'button'> {
  className?: string;
}

export function KakaoLoginButton({ className, ...props }: KakaoLoginButtonProps) {
  return (
    <button
      type='button'
      className={cn(
        'relative flex items-center justify-center w-full max-w-sm h-12 px-4 rounded-md',
        'bg-[#FEE500] hover:bg-[#FDD835] active:bg-[#FCC419]',
        'text-black/85 font-medium text-base transition-colors',
        className,
      )}
      {...props}
    >
      <div className='absolute left-4'>
        <svg width='24' height='24' viewBox='0 0 24 24' fill='currentColor' xmlns='http://www.w3.org/2000/svg'>
          <path
            fillRule='evenodd'
            clipRule='evenodd'
            d='M12 4C7.58172 4 4 6.98246 4 10.6613C4 12.9169 5.48008 14.8967 7.73031 16.0594L6.81232 19.4674C6.71186 19.8407 7.15178 20.1251 7.45289 19.8821L11.7588 16.398C11.8385 16.3995 11.9189 16.4003 12 16.4003C16.4183 16.4003 20 13.4178 20 9.73892C20 6.06001 16.4183 3.07751 12 3.07751V4Z'
            fill='currentColor'
          />
          <path
            d='M12 3C7.02944 3 3 6.35786 3 10.5C3 13.0456 4.39401 15.3059 6.52989 16.6853L5.49258 20.5358C5.22485 21.5312 6.39956 22.2893 7.20251 21.6415L11.8906 17.8596C11.927 17.8601 11.9634 17.8604 12 17.8604C16.9706 17.8604 21 14.5025 21 10.3604C21 6.21822 16.9706 3 12 3Z'
            fill='currentColor'
          />
        </svg>
      </div>
      카카오 로그인
    </button>
  );
}
