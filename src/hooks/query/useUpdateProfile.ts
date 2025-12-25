import { useMutation, useQueryClient } from '@tanstack/react-query';

import { api } from '@/lib/axios';

import type { User } from '@/hooks/query/useMe';
import { ME_QUERY_KEY } from '@/hooks/query/useMe';

export function useUpdateProfile() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ nickname }: { nickname: string }) => {
      const { data } = await api.patch<User>('/users/me/nickname', { nickname });
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ME_QUERY_KEY });
    },
    onError: () => {
      alert('닉네임 변경에 실패했습니다.');
    },
  });
}
