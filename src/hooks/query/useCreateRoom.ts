import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router';

import { createRoom } from '@/api/rooms';
import type { Room } from '@/types/room';

export const useCreateRoom = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (settings: Room['settings']) => createRoom(settings),
    onSuccess: (newRoom) => {
      // 1. React Query 캐시 업데이트 (setQueryData)
      // 방 상세 페이지 진입 시 fetch 없이 데이터를 보여주기 위함
      queryClient.setQueryData(['room', newRoom.id], newRoom);

      navigate(`/rooms/${newRoom.id}`);
    },
  });
};
