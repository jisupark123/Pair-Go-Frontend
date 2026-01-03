import { api } from '@/lib/axios';

import type { SerializedGameInstance } from '@/types/game';

export const getGame = async (gameId: string): Promise<SerializedGameInstance> => {
  const { data } = await api.get<SerializedGameInstance>(`/game/${gameId}`);
  return data;
};
