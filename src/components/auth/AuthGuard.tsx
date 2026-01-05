import { useLocation, useNavigate } from 'react-router';

import { MessageDialog } from '@/components/common/MessageDialog';
import { MESSAGES } from '@/constants/messages';
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

  return children;
}
