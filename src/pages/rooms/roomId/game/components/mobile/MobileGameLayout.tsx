import { useState } from 'react';
import { basicBoardStyleConfig, CanvasBoard, Coordinate, Move } from '@dodagames/go';

import { cn } from '@/components/figma/utils';
import { useMe } from '@/hooks/query/useMe';
import { CapturedStones } from '@/pages/rooms/roomId/game/components/common/CapturedStones';
import { GameBackground } from '@/pages/rooms/roomId/game/components/common/GameBackground';
import { GameTimer } from '@/pages/rooms/roomId/game/components/common/GameTimer';
import { PlaceStoneButton } from '@/pages/rooms/roomId/game/components/common/PlaceStoneButton';
import { ActionButtons as MobileActionButtons } from '@/pages/rooms/roomId/game/components/mobile/ActionButtons';
import { TeamPlayers } from '@/pages/rooms/roomId/game/components/mobile/TeamPlayers';
import type { GameInstance, GameTeam } from '@/types/game';
import type { Player } from '@/types/room';

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
    <div className='flex-1 pt-6 pb-[56px] flex flex-col h-dvh overflow-hidden relative'>
      <GameBackground />

      {/* 1. Opponent Team Area (Top) */}
      <div className='flex-none relative z-10 backdrop-blur-md pb-2'>
        <div className='max-w-xl mx-auto w-full px-2 flex flex-col'>
          <TeamPlayers game={game} gameTeam={opponentTeam} currentTurnPlayer={currentTurnPlayer} position='opponent' />
          {/* Opponent Stone Count & Timer */}
          <div className='flex justify-between items-center px-2 mt-1'>
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
      <div className='shrink-0 flex items-center justify-center overflow-hidden z-0 min-h-0 relative'>
        {/* Board */}
        <div className='relative aspect-square shadow-2xl overflow-hidden flex flex-col items-center justify-center w-full h-auto max-h-full max-w-[400px]'>
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
      <div className='flex-none relative z-10 backdrop-blur-md pt-2'>
        <div className='max-w-xl mx-auto w-full px-2 flex flex-col'>
          {/* Timer & Button Header (Fixed to Board Side) */}
          <div className='relative flex items-center justify-between mb-2 px-2 min-h-[40px]'>
            {/* Left Area: Captured Stones */}
            <div className='flex justify-start items-center z-0'>
              <CapturedStones
                count={myTeam.stoneColor === 'BLACK' ? game.gameData.capturedByBlack : game.gameData.capturedByWhite}
                color={myTeam.stoneColor}
              />
            </div>

            {/* Center Area: Place Stone Button - Absolute Centered */}
            <div className='absolute left-1/2 transform -translate-x-1/2 flex justify-center items-center z-10'>
              <PlaceStoneButton
                isActive={currentTurnPlayer.id === me?.id && selectedMove !== null}
                onClick={handlePlaceStoneButtonClick}
                size='sm'
              />
            </div>

            {/* Right Area: Timer */}
            <div className='flex justify-end items-center z-0'>
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
          'fixed bottom-0 left-0 w-full h-[56px] z-50 pb-safe border-t',
          myTeam.teamColor === 'blue' ? 'border-hextech-blue-500/30' : 'border-hextech-red-500/30',
        )}
      >
        <MobileActionButtons />
      </div>
    </div>
  );
}
