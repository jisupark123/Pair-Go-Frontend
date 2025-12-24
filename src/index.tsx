import '@/styles/index.css';
import { StrictMode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router';

import App from '@/App.tsx';
import GoAssetsPreloader from '@/preload/GoAssetsPreloader';

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <GoAssetsPreloader>
          <App />
        </GoAssetsPreloader>
      </QueryClientProvider>
    </BrowserRouter>
  </StrictMode>,
);
