import { useEffect } from 'react';
import { toast } from 'sonner';

import { connectSocket, disconnectSocket } from '@/shared/api/socket';

export function useGlobalSocket() {
  useEffect(() => {
    // Socket connection logic
    const socket = connectSocket('');

    // Global Exception Handler
    const handleException = (error: Error) => {
      toast.error(error.message || '오류가 발생했습니다.');
    };

    socket.on('exception', handleException);

    return () => {
      socket.off('exception', handleException);
      disconnectSocket('');
    };
  }, []);
}
