'use client';

import { useEffect, useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { useParams, useRouter } from 'next/navigation';

import { useRoom } from '@/features/rooms/hooks/useRoom';
import type { Room } from '@/features/rooms/room.type';
import { getSocket } from '@/shared/api/socket';
import { MESSAGES } from '@/shared/constants/messages';
import { MessageDialog } from '@/shared/ui/common/MessageDialog';

export default function RoomLayout({ children }: { children: React.ReactNode }) {
  const params = useParams();
  const roomId = params?.roomId as string;
  const queryClient = useQueryClient();
  const router = useRouter();

  const { data: room, isError, isLoading, isSuccess } = useRoom(roomId);
  const [showErrorDialog, setShowErrorDialog] = useState(false);

  useEffect(() => {
    if (isError || (!isLoading && !room)) {
      setShowErrorDialog(true);
    }
  }, [isError, isLoading, room]);

  const handleRedirectHome = () => {
    setShowErrorDialog(false);
    router.replace('/');
  };

  useEffect(() => {
    if (!roomId || !isSuccess) return;

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
  }, [roomId, queryClient, isSuccess]);

  return (
    <>
      {children}
      <MessageDialog
        open={showErrorDialog}
        onOpenChange={setShowErrorDialog}
        title={MESSAGES.ROOM_NOT_FOUND.TITLE}
        description={MESSAGES.ROOM_NOT_FOUND.DESCRIPTION}
        onConfirm={handleRedirectHome}
        blocking={true}
      />
    </>
  );
}
