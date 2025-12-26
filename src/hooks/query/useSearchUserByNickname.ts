import { useQuery } from '@tanstack/react-query';

import { api } from '@/lib/axios';

interface User {
  id: number;
  nickname: string;
  isOnline?: boolean;
}

export function useSearchUserByNickname(nickname: string) {
  return useQuery({
    queryKey: ['users', 'search', nickname],
    queryFn: async () => {
      if (!nickname) return null;
      try {
        const { data } = await api.get<User>('/users', {
          params: { nickname },
        });
        // Since the API searches by exact nickname (implied) or partial,
        // we'll assume it returns a list. If it's a single user search that 404s,
        // we might need to handle it differently, but for now assuming list search or single match.
        // Based on user request "users?nickname=", it likely filters.
        // If 404 on not found, useQuery will handle error state.
        return data;
      } catch (error: any) {
        if (error.response?.status === 404) {
          return null; // Treat 404 as empty results for search
        }
        throw error;
      }
    },
    enabled: !!nickname && nickname.length >= 1, // Only search if 1+ chars
    retry: false,
  });
}
