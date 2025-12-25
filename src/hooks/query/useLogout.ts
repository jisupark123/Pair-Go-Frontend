import { useMutation, useQueryClient } from '@tanstack/react-query';

import { api } from '@/lib/axios';

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
    },
    onError: (error) => {
      console.error('Logout failed:', error);
      // Even if server logout fails, clear local state
      queryClient.setQueryData(ME_QUERY_KEY, null);
      queryClient.invalidateQueries({ queryKey: ME_QUERY_KEY });
    },
  });
}
