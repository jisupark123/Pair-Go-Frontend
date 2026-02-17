import type { Room } from '@/features/rooms/room.type';
import { api } from '@/shared/api/axios';

export const createRoom = async (settings: Room['settings']): Promise<Room> => {
  const { data } = await api.post<Room>('/rooms', settings);
  return data;
};

export const getRoom = async (roomId: string): Promise<Room> => {
  const { data } = await api.get<Room>(`/rooms/${roomId}`);
  return data;
};
