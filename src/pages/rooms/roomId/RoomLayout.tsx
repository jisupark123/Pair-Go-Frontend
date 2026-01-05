import { useEffect, useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { Outlet, useNavigate, useParams } from 'react-router';

import { getSocket } from '@/lib/socket';

import { MessageDialog } from '@/components/common/MessageDialog';
import { MESSAGES } from '@/constants/messages';
import { useRoom } from '@/hooks/query/useRoom';
import type { Room } from '@/types/room';

export default function RoomLayout() {
  const { roomId } = useParams();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { data: room, isError, isLoading, isSuccess } = useRoom(roomId);
  const [showErrorDialog, setShowErrorDialog] = useState(false);

  useEffect(() => {
    if (isError || (!isLoading && !room)) {
      setShowErrorDialog(true);
    }
  }, [isError, isLoading, room]);

  const handleRedirectHome = () => {
    setShowErrorDialog(false);
    navigate('/', { replace: true });
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
      <Outlet />
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
