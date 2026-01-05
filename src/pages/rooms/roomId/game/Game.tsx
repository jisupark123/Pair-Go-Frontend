import { useEffect, useState } from 'react';
import {
  useSound,
  type Coordinate,
  Game as DodagamesGame,
  MoveProcessorFactory,
  SFX_KEYS,
  type GameResult,
} from '@dodagames/go';
import { useQueryClient } from '@tanstack/react-query';
import { useParams } from 'react-router';

import { getSocket } from '@/lib/socket';

import { useGame } from '@/hooks/query/useGame';
import { useMe } from '@/hooks/query/useMe';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { GameResultModal } from '@/pages/rooms/roomId/game/components/common/GameResultModal';
import { DesktopGameLayout } from '@/pages/rooms/roomId/game/components/desktop/DesktopGameLayout';
import { MobileGameLayout } from '@/pages/rooms/roomId/game/components/mobile/MobileGameLayout';
import type { SerializedGameInstance } from '@/types/game';

export const DESKTOP_WIDTH_BP = 900; // 900px 이상이면 desktop

/**
 * 게임 업데이트 시 소리를 재생합니다.
 * 이전 상태와 현재 상태를 비교하여 잡은 돌의 개수를 계산하고,
 * 이에 맞는 효과음(착수음 또는 사석 발생음)을 재생합니다.
 */
const playGameUpdateSound = (
  prevData: SerializedGameInstance | undefined,
  nextData: SerializedGameInstance,
  playStone: (count: number) => void,
) => {
  if (!prevData) return;

  const prevGame = DodagamesGame.deserialize(prevData.gameData, MoveProcessorFactory.standardRule());
  const nextGame = DodagamesGame.deserialize(nextData.gameData, MoveProcessorFactory.standardRule());

  // 이전 보드 상태와 현재 보드 상태가 같다면(즉, 착수가 발생하지 않고 시간만 흐른 경우 등) 소리를 재생하지 않습니다.
  if (prevGame.currentBoard.equals(nextGame.currentBoard)) return;

  // 백이 착수했다면 백이 따낸 사석만, 흑이 착수했다면 흑이 따낸 사석만 증가합니다.
  // 따라서 두 변화량을 더하면 이번 수에 발생한 총 사석 개수를 구할 수 있습니다.
  const capturedCount =
    (nextGame.capturedByBlack ?? 0) -
    (prevGame.capturedByBlack ?? 0) +
    ((nextGame.capturedByWhite ?? 0) - (prevGame.capturedByWhite ?? 0));

  playStone(capturedCount);
};

export default function Game() {
  const queryClient = useQueryClient();
  const { roomId: gameId } = useParams();
  const { data: me } = useMe();
  const { data: game, isLoading } = useGame(gameId);
  const { playStone, play, stop } = useSound();
  const [gameResult, setGameResult] = useState<GameResult | null>(null);

  const isDesktopScreenSize = useMediaQuery(`(min-width: ${DESKTOP_WIDTH_BP}px)`);

  useEffect(() => {
    const socket = getSocket('');
    socket.on('moveMade', (data: SerializedGameInstance) => {
      stop(SFX_KEYS.COUNTDOWN_10SEC);

      const prevData = queryClient.getQueryData<SerializedGameInstance>(['game', gameId]);

      playGameUpdateSound(prevData, data, playStone);

      queryClient.setQueryData(['game', gameId], data);
    });

    socket.on('timeUpdate', (data: SerializedGameInstance) => {
      queryClient.setQueryData(['game', gameId], data);
    });

    socket.on('byoyomiStart', () => {
      play(SFX_KEYS.START_COUNTDOWN);
    });

    socket.on('byoyomiPeriodUsed', (data: { remainingByoyomiPeriods: number }) => {
      if (data.remainingByoyomiPeriods === 2) {
        play(SFX_KEYS.BYOYOMI_LEFT_2);
      } else if (data.remainingByoyomiPeriods === 1) {
        play(SFX_KEYS.LAST_PERIOD);
      }
    });

    socket.on('gameEnded', (data: GameResult) => {
      setGameResult(data);
    });

    return () => {
      socket.off('moveMade');
      socket.off('timeUpdate');
      socket.off('byoyomiStart');
      socket.off('byoyomiPeriodUsed');
      socket.off('gameEnded');
    };
  }, [queryClient, gameId, playStone, play, stop]);

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
  const layout = isDesktopScreenSize ? (
    <DesktopGameLayout
      game={game}
      myTeam={myTeam}
      opponentTeam={opponentTeam}
      currentTurnPlayer={currentTurnPlayer!}
      handlePlayMove={handlePlayMove}
    />
  ) : (
    <MobileGameLayout
      game={game}
      myTeam={myTeam}
      opponentTeam={opponentTeam}
      currentTurnPlayer={currentTurnPlayer!}
      handlePlayMove={handlePlayMove}
    />
  );

  return (
    <>
      {layout}
      <GameResultModal
        open={!!gameResult}
        onOpenChange={(open) => !open && setGameResult(null)}
        result={gameResult}
        myColor={myTeam.stoneColor}
      />
    </>
  );
}
