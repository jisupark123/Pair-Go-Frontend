import { useEffect } from 'react';
import type { Coordinate } from '@dodagames/go';
import { useQueryClient } from '@tanstack/react-query';
import { useParams } from 'react-router';

import { getSocket } from '@/lib/socket';

import { useGame } from '@/hooks/query/useGame';
import { useMe } from '@/hooks/query/useMe';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { DesktopGameLayout } from '@/pages/rooms/roomId/game/components/desktop/DesktopGameLayout';
import { MobileGameLayout } from '@/pages/rooms/roomId/game/components/mobile/MobileGameLayout';
import type { SerializedGameInstance } from '@/types/game';

const DESKTOP_WIDTH_BP = 900; // 950px 이상이면 desktop

export default function Game() {
  const queryClient = useQueryClient();
  const { roomId: gameId } = useParams();
  const { data: me } = useMe();
  const { data: game, isLoading } = useGame(gameId);

  const isDesktopScreenSize = useMediaQuery(`(min-width: ${DESKTOP_WIDTH_BP}px)`);

  useEffect(() => {
    const socket = getSocket('');
    socket.on('gameUpdate', (data: SerializedGameInstance) => {
      queryClient.setQueryData(['game', gameId], data);
    });

    return () => {
      socket.off('gameUpdate');
    };
  }, [queryClient, gameId]);

  if (isLoading || !game) {
    return (
      <div className='flex items-center justify-center min-h-screen text-hextech-blue-300'>
        게임 정보를 불러오는 중입니다...
      </div>
    );
  }

  const myTeamIndex = game.teams[0].players.find((p) => p.data.id === me?.id) ? 0 : 1;
  const myTeam = game.teams[myTeamIndex];
  const opponentTeam = game.teams[myTeamIndex === 0 ? 1 : 0];

  const currentTurnPlayer = game.teams.find((team) => team.stoneColor === game.currentTurn.stoneColor)?.players[
    game.currentTurn.playerIndex
  ]?.data;

  const handlePlayMove = (coord: Coordinate) => {
    const socket = getSocket('');
    socket.emit('playMove', { gameId, x: coord.x, y: coord.y });
  };

  // --- Layout Selection ---
  if (isDesktopScreenSize) {
    return (
      <DesktopGameLayout
        game={game}
        myTeam={myTeam}
        opponentTeam={opponentTeam}
        currentTurnPlayer={currentTurnPlayer!}
        handlePlayMove={handlePlayMove}
      />
    );
  }

  return (
    <MobileGameLayout
      game={game}
      myTeam={myTeam}
      opponentTeam={opponentTeam}
      currentTurnPlayer={currentTurnPlayer!}
      handlePlayMove={handlePlayMove}
    />
  );
}
