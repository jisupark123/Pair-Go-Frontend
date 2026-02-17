import '@/styles/index.css';
import type { Metadata } from 'next';

import { Providers } from '@/app/providers';
import { AuthGuard } from '@/features/auth/AuthGuard';

export const metadata: Metadata = {
  title: 'pair-go',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='ko'>
      <body className='min-h-screen antialiased'>
        <script
          src='https://t1.kakaocdn.net/kakao_js_sdk/2.7.7/kakao.min.js'
          integrity='sha384-tJkjbtDbvoxO+diRuDtwRO9JXR7pjWnfjfRn5ePUpl7e7RJCxKCwwnfqUAdXh53p'
          crossOrigin='anonymous'
        />
        <Providers>
          <AuthGuard>
            <main className='relative flex min-h-screen w-full flex-1 flex-col'>{children}</main>
          </AuthGuard>
        </Providers>
      </body>
    </html>
  );
}
