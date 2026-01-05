import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { api } from '@/lib/axios';

import { MESSAGES } from '@/constants/messages';
import { ME_QUERY_KEY } from '@/hooks/query/useMe';

export function useLogout() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      await api.post('/auth/logout');
    },
    onSuccess: () => {
      queryClient.setQueryData(ME_QUERY_KEY, null);
      queryClient.invalidateQueries({ queryKey: ME_QUERY_KEY });
      toast.success(MESSAGES.LOGOUT.SUCCESS);
    },
    onError: (error) => {
      console.error('Logout failed:', error);
      // Even if server logout fails, clear local state
      queryClient.setQueryData(ME_QUERY_KEY, null);
      queryClient.invalidateQueries({ queryKey: ME_QUERY_KEY });
      toast.success(MESSAGES.LOGOUT.SUCCESS); // Show success message to user as they are locally logged out
    },
  });
}
