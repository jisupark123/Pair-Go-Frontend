import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

import { createRoom } from '@/api/rooms';
import type { Room } from '@/features/rooms/room.type';

export const useCreateRoom = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: (settings: Room['settings']) => createRoom(settings),
    onSuccess: (newRoom) => {
      // 1. React Query 캐시 업데이트 (setQueryData)
      // 방 상세 페이지 진입 시 fetch 없이 데이터를 보여주기 위함
      queryClient.setQueryData(['room', newRoom.id], newRoom);

      router.push(`/rooms/${newRoom.id}`);
    },
  });
};
