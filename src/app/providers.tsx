'use client';

import { Suspense, type ReactNode } from 'react';
import { SoundProvider } from '@dodagames/go';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'sonner';

import { GlobalListeners } from '@/app/GlobalListeners';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

export function Providers({ children }: { children: ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <SoundProvider>
        <Suspense>
          <GlobalListeners />
        </Suspense>
        {children}
        <Toaster position='top-center' theme='dark' richColors duration={2000} />
      </SoundProvider>
    </QueryClientProvider>
  );
}
