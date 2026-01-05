import { useLocation, useNavigate } from 'react-router';

import { Button } from '@/components/figma/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogTitle } from '@/components/figma/dialog';
import { useMe } from '@/hooks/query/useMe';

export function AuthGuard({ children }: { children: React.ReactNode }) {
  const { isLoggedIn, isLoading } = useMe();
  const location = useLocation();
  const navigate = useNavigate();

  // Define public paths
  const publicPaths = ['/', '/login'];
  const isPublicPath = publicPaths.includes(location.pathname);

  const handleLoginRedirect = () => {
    navigate('/login', { state: { from: location.pathname } });
  };

  if (isLoading && !isPublicPath) {
    return null;
  }

  if (!isLoggedIn && !isPublicPath) {
    return (
      <Dialog
        open={true}
        onOpenChange={(open) => {
          if (!open) handleLoginRedirect();
        }}
      >
        <DialogContent className='bg-slate-900 border border-hextech-purple-500/30 shadow-2xl p-6 sm:max-w-sm'>
          <div className='flex flex-col items-center text-center gap-4'>
            {/* Simple Icon */}
            <div className='w-12 h-12 rounded-full bg-hextech-purple-500/10 flex items-center justify-center mb-2'>
              <svg
                className='w-6 h-6 text-hextech-purple-400'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
                strokeWidth={2}
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z'
                />
              </svg>
            </div>

            <div className='space-y-1'>
              <DialogTitle className='text-xl font-bold text-hextech-purple-100'>로그인 필요</DialogTitle>
              <DialogDescription className='text-hextech-purple-200/60 text-sm'>
                해당 페이지에 접근하려면
                <br />
                로그인이 필요합니다.
              </DialogDescription>
            </div>

            <DialogFooter className='w-full mt-2'>
              <Button
                onClick={handleLoginRedirect}
                className='w-full bg-hextech-purple-600 hover:bg-hextech-purple-500 text-white font-medium shadow-lg shadow-hextech-purple-900/20'
              >
                확인
              </Button>
            </DialogFooter>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return children;
}
