import { Game, MoveProcessorFactory } from '@dodagames/go';
import { useQuery } from '@tanstack/react-query';

import { getGame } from '@/features/rooms/domain/game/game.api';
import type { GameInstance, SerializedGameInstance } from '@/features/rooms/domain/game/game.type';

export const useGame = (gameId: string | undefined) =>
  useQuery({
    queryKey: ['game', gameId],
    queryFn: () => getGame(gameId!),
    enabled: !!gameId,
    staleTime: Infinity, // Real-time updates via socket, so initial fetch doesn't need to be stale quickly
    select: (data: SerializedGameInstance): GameInstance => ({
      ...data,
      startedAt: new Date(data.startedAt),
      gameData: Game.deserialize(data.gameData, MoveProcessorFactory.standardRule()),
    }),
  });
