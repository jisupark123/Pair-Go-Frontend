import { api } from '@/lib/axios';

import type { Room } from '@/types/room';
import type { RoomSettings } from '@/types/roomSettings';

export const createRoom = async (settings: RoomSettings): Promise<Room> => {
  const { data } = await api.post<Room>('/rooms', settings);
  return data;
};

export const getRoom = async (roomId: string): Promise<Room> => {
  const { data } = await api.get<Room>(`/rooms/${roomId}`);
  return data;
};
