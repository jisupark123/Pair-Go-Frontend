import { Game, MoveProcessorFactory } from '@dodagames/go';
import { useQuery } from '@tanstack/react-query';

import { getGame } from '@/api/game';
import type { GameInstance, SerializedGameInstance } from '@/types/game';

export const useGame = (gameId: string | undefined) =>
  useQuery({
    queryKey: ['game', gameId],
    queryFn: () => getGame(gameId!),
    enabled: !!gameId,
    select: (data: SerializedGameInstance): GameInstance => ({
      ...data,
      startedAt: new Date(data.startedAt),
      gameData: Game.deserialize(data.gameData, MoveProcessorFactory.standardRule()),
    }),
  });
