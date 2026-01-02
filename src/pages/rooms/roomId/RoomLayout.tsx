import { useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { Outlet, useParams } from 'react-router';

import { getSocket } from '@/lib/socket';

import type { Room } from '@/types/room';

export default function RoomLayout() {
  const { roomId } = useParams();
  const queryClient = useQueryClient();

  useEffect(() => {
    if (!roomId) return;

    const socket = getSocket('');

    socket.emit('joinRoom', { roomId });

    socket.on('roomUpdate', (updatedRoom: Room) => {
      // Update React Query Cache instead of local state
      queryClient.setQueryData(['room', roomId], updatedRoom);
    });

    // Cleanup on unmount
    return () => {
      socket.emit('leaveRoom', { roomId });
      socket.off('roomUpdate');
    };
  }, [roomId, queryClient]);

  return <Outlet />;
}
