import '@/styles/index.css';
import { StrictMode } from 'react';
import { StoneSoundProvider } from '@dodagames/go';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router';
import { Toaster } from 'sonner';

import App from '@/App.tsx';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <StoneSoundProvider>
          <App />
          <Toaster position='top-center' theme='dark' richColors duration={2000} />
        </StoneSoundProvider>
      </QueryClientProvider>
    </BrowserRouter>
  </StrictMode>,
);
