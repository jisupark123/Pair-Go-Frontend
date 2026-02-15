import { basicBoardStyleConfig, CanvasBoard, Coordinate } from '@dodagames/go';
import { isDesktop } from 'react-device-detect';

import { useMe } from '@/hooks/query/useMe';
import { GameBackground } from '@/pages/rooms/roomId/game/components/common/GameBackground';
import { PlaceStoneButton } from '@/pages/rooms/roomId/game/components/common/PlaceStoneButton';
import { ActionButtons as DesktopActionButtons } from '@/pages/rooms/roomId/game/components/desktop/ActionButtons';
import { TeamPlayers as DesktopTeamDisplay } from '@/pages/rooms/roomId/game/components/desktop/TeamPlayers';
import type { GameInstance, GameTeam } from '@/types/game';
import type { Player } from '@/types/room';

interface DesktopGameLayoutProps {
  game: GameInstance;
  myTeam: GameTeam;
  opponentTeam: GameTeam;
  currentTurnPlayer: Player;
  handlePlayMove: (coord: Coordinate) => void;
  onCountdown: () => void;
  onCountdownReset: () => void;
}

export function DesktopGameLayout({
  game,
  myTeam,
  opponentTeam,
  currentTurnPlayer,
  handlePlayMove,
  onCountdown,
  onCountdownReset,
}: DesktopGameLayoutProps) {
  const { data: me } = useMe();
  return (
    <div className='relative flex h-dvh flex-1 flex-row overflow-hidden pt-6'>
      <GameBackground />

      {/* 1. Board Area (Left/Center) */}
      <div className='flex flex-1 flex-col items-center justify-center gap-4 overflow-hidden px-4'>
        {/* max-w-[min(700px,100%)] -> 화면 너비가 700px보다 작으면 100%, 700px보다 크면 700px */}
        <div className='relative flex aspect-square h-auto max-h-full w-full max-w-[min(700px,100%)] items-center justify-center overflow-hidden shadow-2xl'>
          <CanvasBoard
            board={game.gameData.currentBoard}
            {...(game.gameData.lastMove && { currentMove: game.gameData.lastMove })}
            boardStyleConfig={basicBoardStyleConfig}
            handleLeftClick={handlePlayMove}
            enableHoverPreview={isDesktop && currentTurnPlayer.id === me?.id}
          />
        </div>
        {!isDesktop && (
          <PlaceStoneButton
            isActive={currentTurnPlayer.id === me?.id}
            onClick={() => console.log('Place Stone')}
            size='lg'
          />
        )}
      </div>

      {/* 2. Right Sidebar (My Team + Opponent Team) */}
      <div className='relative z-10 flex h-full w-80 flex-none flex-col border-l border-hextech-gold-500/20 pb-safe backdrop-blur-md transition-all duration-300'>
        {/* My Team */}
        <div className='mx-auto flex w-full max-w-xl flex-1 flex-col justify-start gap-6 px-6 pt-4'>
          <DesktopTeamDisplay
            gameTeam={myTeam}
            gameData={game.gameData}
            gameSettings={game.settings}
            isTeamTurn={game.currentTurn.stoneColor === myTeam.stoneColor}
            currentTurnPlayer={currentTurnPlayer}
            position='me'
            align='left'
            onCountdown={onCountdown}
            onCountdownReset={onCountdownReset}
          />

          {/* Opponent Team */}
          <div className='opacity-80 transition-opacity hover:opacity-100'>
            <DesktopTeamDisplay
              gameTeam={opponentTeam}
              gameData={game.gameData}
              gameSettings={game.settings}
              isTeamTurn={game.currentTurn.stoneColor === opponentTeam.stoneColor}
              currentTurnPlayer={currentTurnPlayer}
              position='opponent'
              align='left'
              onCountdown={onCountdown}
              onCountdownReset={onCountdownReset}
            />
          </div>
        </div>
      </div>

      {/* 3. Action Buttons (Bottom Right Overlay) */}
      <div className='pointer-events-none absolute right-0 bottom-0 z-50 w-80 p-6'>
        <div className='pointer-events-auto'>
          <DesktopActionButtons />
        </div>
      </div>
    </div>
  );
}
