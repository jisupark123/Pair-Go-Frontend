'use client';

import { usePathname, useRouter } from 'next/navigation';

import { useMe } from '@/features/auth/hooks/useMe';
import { MESSAGES } from '@/shared/constants/messages';
import { MessageDialog } from '@/shared/ui/common/MessageDialog';

export function AuthGuard({ children }: { children: React.ReactNode }) {
  const { isLoggedIn, isLoading } = useMe();
  const pathname = usePathname() || '';
  const router = useRouter();

  // Define public paths
  const publicPaths = ['/', '/login'];
  const isPublicPath = publicPaths.includes(pathname);

  const handleLoginRedirect = () => {
    // encodeURIComponent to safely pass the path
    router.push(`/login?from=${encodeURIComponent(pathname)}`);
  };

  if (isLoading && !isPublicPath) {
    return null;
  }

  if (!isLoggedIn && !isPublicPath) {
    return (
      <MessageDialog
        open={true}
        onOpenChange={(open) => {
          if (!open) handleLoginRedirect();
        }}
        description={MESSAGES.PAGE_ACCESS_DENIED.DESCRIPTION}
        onConfirm={handleLoginRedirect}
        blocking={true}
      />
    );
  }

  return <>{children}</>;
}
