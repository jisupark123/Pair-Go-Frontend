import { useState } from 'react';
import { basicBoardStyleConfig, CanvasBoard, Coordinate, Move } from '@dodagames/go';

import { CapturedStones } from '@/app/rooms/[roomId]/game/_components/common/CapturedStones';
import { GameBackground } from '@/app/rooms/[roomId]/game/_components/common/GameBackground';
import { GameTimer } from '@/app/rooms/[roomId]/game/_components/common/GameTimer';
import { PlaceStoneButton } from '@/app/rooms/[roomId]/game/_components/common/PlaceStoneButton';
import { ActionButtons as MobileActionButtons } from '@/app/rooms/[roomId]/game/_components/mobile/ActionButtons';
import { TeamPlayers } from '@/app/rooms/[roomId]/game/_components/mobile/TeamPlayers';
import { useMe } from '@/features/auth/hooks/useMe';
import type { GameInstance, GameTeam } from '@/features/rooms/domain/game/game.type';
import type { Player } from '@/features/rooms/room.type';
import { cn } from '@/shared/ui/figma/utils';

interface MobileGameLayoutProps {
  game: GameInstance;
  myTeam: GameTeam;
  opponentTeam: GameTeam;
  currentTurnPlayer: Player;
  handlePlayMove: (coord: Coordinate) => void;
  onCountdown: () => void;
  onCountdownReset: () => void;
}

export function MobileGameLayout({
  game,
  myTeam,
  opponentTeam,
  currentTurnPlayer,
  handlePlayMove,
  onCountdown,
  onCountdownReset,
}: MobileGameLayoutProps) {
  const { data: me } = useMe();
  const [selectedMove, setSelectedMove] = useState<Move | null>(null);
  const handleBoardClick = (coord: Coordinate) => {
    if (currentTurnPlayer.id !== me?.id) return;
    if (game.gameData.currentBoard.state[coord.y][coord.x] !== 'EMPTY') return;

    setSelectedMove(new Move(coord.y, coord.x, myTeam.stoneColor));
  };

  const handlePlaceStoneButtonClick = () => {
    if (!selectedMove) return;
    handlePlayMove(selectedMove);
    setSelectedMove(null);
  };
  return (
    <div className='relative flex h-dvh flex-1 flex-col overflow-hidden pt-6 pb-[56px]'>
      <GameBackground />

      {/* 1. Opponent Team Area (Top) */}
      <div className='relative z-10 flex-none pb-2 backdrop-blur-md'>
        <div className='mx-auto flex w-full max-w-xl flex-col px-2'>
          <TeamPlayers game={game} gameTeam={opponentTeam} currentTurnPlayer={currentTurnPlayer} position='opponent' />
          {/* Opponent Stone Count & Timer */}
          <div className='mt-1 flex items-center justify-between px-2'>
            {/* Captured Stones Indicator */}
            <CapturedStones
              count={
                opponentTeam.stoneColor === 'BLACK' ? game.gameData.capturedByBlack : game.gameData.capturedByWhite
              }
              color={opponentTeam.stoneColor}
            />

            <GameTimer
              gameSettings={game.settings}
              timeControl={opponentTeam.timeControl}
              isTurn={opponentTeam.stoneColor === game.currentTurn.stoneColor}
              align='right'
              onCountdown={onCountdown}
              onCountdownReset={onCountdownReset}
            />
          </div>
        </div>
      </div>

      {/* 2. Board Area (Middle) */}
      <div className='relative z-0 flex min-h-0 shrink-0 items-center justify-center overflow-hidden'>
        {/* Board */}
        <div className='relative flex aspect-square h-auto max-h-full w-full max-w-[400px] flex-col items-center justify-center overflow-hidden shadow-2xl'>
          <CanvasBoard
            board={game.gameData.currentBoard}
            {...(game.gameData.lastMove && { currentMove: game.gameData.lastMove })}
            previewMove={selectedMove}
            boardStyleConfig={basicBoardStyleConfig}
            handleLeftClick={handleBoardClick}
          />
        </div>
      </div>

      {/* 3. My Team Area (Bottom) */}
      <div className='relative z-10 flex-none pt-2 backdrop-blur-md'>
        <div className='mx-auto flex w-full max-w-xl flex-col px-2'>
          {/* Timer & Button Header (Fixed to Board Side) */}
          <div className='relative mb-2 flex min-h-[40px] items-center justify-between px-2'>
            {/* Left Area: Captured Stones */}
            <div className='z-0 flex items-center justify-start'>
              <CapturedStones
                count={myTeam.stoneColor === 'BLACK' ? game.gameData.capturedByBlack : game.gameData.capturedByWhite}
                color={myTeam.stoneColor}
              />
            </div>

            {/* Center Area: Place Stone Button - Absolute Centered */}
            <div className='absolute left-1/2 z-10 flex -translate-x-1/2 transform items-center justify-center'>
              <PlaceStoneButton
                isActive={currentTurnPlayer.id === me?.id && selectedMove !== null}
                onClick={handlePlaceStoneButtonClick}
                size='sm'
              />
            </div>

            {/* Right Area: Timer */}
            <div className='z-0 flex items-center justify-end'>
              <GameTimer
                gameSettings={game.settings}
                timeControl={myTeam.timeControl}
                isTurn={myTeam.stoneColor === game.currentTurn.stoneColor}
                align='right'
                onCountdown={onCountdown}
                onCountdownReset={onCountdownReset}
              />
            </div>
          </div>

          <TeamPlayers game={game} gameTeam={myTeam} currentTurnPlayer={currentTurnPlayer} position='me' />
        </div>
      </div>

      {/* 4. Action Buttons (Bottom Navigation Bar) */}
      <div
        className={cn(
          'fixed bottom-0 left-0 z-50 h-[56px] w-full border-t pb-safe',
          myTeam.teamColor === 'blue' ? 'border-hextech-blue-500/30' : 'border-hextech-red-500/30',
        )}
      >
        <MobileActionButtons />
      </div>
    </div>
  );
}
