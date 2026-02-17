import type { SerializedGameInstance } from '@/features/rooms/domain/game/game.type';
import { api } from '@/shared/api/axios';

export const getGame = async (gameId: string): Promise<SerializedGameInstance> => {
  const { data } = await api.get<SerializedGameInstance>(`/game/${gameId}`);
  return data;
};
