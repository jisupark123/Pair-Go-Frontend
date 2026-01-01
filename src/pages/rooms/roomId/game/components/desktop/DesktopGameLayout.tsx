import { Board, basicBoardStyleConfig, CanvasBoard } from '@dodagames/go';

import { GameBackground } from '@/pages/rooms/roomId/game/components/common/GameBackground';
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
  return (
    <div className='flex-1 pt-6 flex h-dvh overflow-hidden relative flex-row'>
      <GameBackground />

      {/* 1. Board Area (Left/Center) */}
      <div className='flex items-center justify-center overflow-hidden z-0 flex-1'>
        <div className='relative aspect-square shadow-2xl overflow-hidden flex flex-col items-center justify-center h-full w-auto max-w-[700px] max-h-full pr-4'>
          <CanvasBoard board={new Board(19)} boardStyleConfig={basicBoardStyleConfig} handleLeftClick={() => {}} />
        </div>
      </div>

      {/* 2. Right Sidebar (My Team + Opponent Team) */}
      <div className='flex-none pb-safe-bottom relative z-10 backdrop-blur-md transition-all duration-300 w-80 h-full flex flex-col border-l border-hextech-gold-500/20 pb-0'>
        {/* My Team */}
        <div className='flex-1 flex flex-col justify-start max-w-xl mx-auto w-full px-6 pt-4 gap-6'>
          <DesktopTeamDisplay
            gameTeam={myTeam}
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
