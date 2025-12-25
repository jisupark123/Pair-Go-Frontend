import { useQuery } from '@tanstack/react-query';

import { api } from '@/lib/axios';

export type User = {
  id: string;
  nickname: string;
  email?: string;
  socialId: string;
  authProvider: 'kakao' | 'google';
  friends: User[];
  createdAt: string;
  updatedAt: string;
};

const fetchMe = async (): Promise<User> => {
  const { data } = await api.get<User>('/users/me');
  return data;
};

export const ME_QUERY_KEY = ['users', 'me'] as const;

export function useMe() {
  return useQuery({
    queryKey: ME_QUERY_KEY,
    queryFn: fetchMe,
    retry: 0,
  });
}
