import { Board, basicBoardStyleConfig, CanvasBoard } from '@dodagames/go';
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
}

export function DesktopGameLayout({ game, myTeam, opponentTeam, currentTurnPlayer }: DesktopGameLayoutProps) {
  const { data: me } = useMe();
  return (
    <div className='flex-1 pt-6 flex h-dvh overflow-hidden relative flex-row'>
      <GameBackground />

      {/* 1. Board Area (Left/Center) */}
      <div className='flex flex-col items-center justify-center gap-4 overflow-hidden flex-1 px-4'>
        {/* max-w-[min(700px,100%)] -> 화면 너비가 700px보다 작으면 100%, 700px보다 크면 700px */}
        <div className='relative aspect-square shadow-2xl overflow-hidden flex items-center justify-center h-auto w-full max-w-[min(700px,100%)] max-h-full'>
          <CanvasBoard
            board={new Board(19)}
            boardStyleConfig={basicBoardStyleConfig}
            handleLeftClick={() => {}}
            enableHoverPreview={isDesktop}
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
      <div className='flex-none pb-safe-bottom relative z-10 backdrop-blur-md transition-all duration-300 w-80 h-full flex flex-col border-l border-hextech-gold-500/20 pb-0'>
        {/* My Team */}
        <div className='flex-1 flex flex-col justify-start max-w-xl mx-auto w-full px-6 pt-4 gap-6'>
          <DesktopTeamDisplay
            gameTeam={myTeam}
            gameData={game.gameData}
            gameSettings={game.settings}
            isTeamTurn={game.currentTurn.stoneColor === myTeam.stoneColor}
            currentTurnPlayer={currentTurnPlayer}
            position='me'
            align='left'
          />

          {/* Opponent Team */}
          <div className='opacity-80 hover:opacity-100 transition-opacity'>
            <DesktopTeamDisplay
              gameTeam={opponentTeam}
              gameData={game.gameData}
              gameSettings={game.settings}
              isTeamTurn={game.currentTurn.stoneColor === opponentTeam.stoneColor}
              currentTurnPlayer={currentTurnPlayer}
              position='opponent'
              align='left'
            />
          </div>
        </div>
      </div>

      {/* 3. Action Buttons (Bottom Right Overlay) */}
      <div className='absolute bottom-0 right-0 w-80 z-50 p-6 pointer-events-none'>
        <div className='pointer-events-auto'>
          <DesktopActionButtons />
        </div>
      </div>
    </div>
  );
}
