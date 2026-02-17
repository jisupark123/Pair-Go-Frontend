import { useQuery } from '@tanstack/react-query';

import { getRoom } from '@/api/rooms';

export const useRoom = (roomId?: string) =>
  useQuery({
    queryKey: ['room', roomId],
    queryFn: () => getRoom(roomId!),
    enabled: !!roomId,
    staleTime: Infinity, // Real-time updates via socket, so initial fetch doesn't need to be stale quickly
    select: (room) => ({
      ...room,
      players: room.players.map((p) => ({
        ...p,
        isHost: p.id === room.hostId,
      })),
    }),
  });
