import { useEffect, useRef } from 'react';
import { toast } from 'sonner';

import { useMe } from '@/features/auth/hooks/useMe';
import { MESSAGES } from '@/shared/constants/messages';

export function useWelcomeMessage() {
  const { data: me } = useMe();
  const hasShownWelcome = useRef(false);

  useEffect(() => {
    // sessionStorage check to ensure the message is shown only after login process
    if (me && sessionStorage.getItem('login_process') === 'true' && !hasShownWelcome.current) {
      toast.success(MESSAGES.LOGIN.WELCOME(me.nickname));
      sessionStorage.removeItem('login_process');
      hasShownWelcome.current = true;
    }
  }, [me]);
}
