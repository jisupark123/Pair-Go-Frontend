import type { Game } from '@dodagames/go';

import { useMe } from '@/features/auth/hooks/useMe';
import type { GameInstance, GameTeam } from '@/features/rooms/domain/game/game.type';
import type { Player } from '@/features/rooms/room.type';
import { CapturedStones } from '@/pages/rooms/roomId/game/components/common/CapturedStones';
import { GameTimer } from '@/pages/rooms/roomId/game/components/common/GameTimer';
import { PlayerCompact } from '@/pages/rooms/roomId/game/components/desktop/PlayerCompact';
import { cn } from '@/shared/ui/figma/utils';

interface TeamPlayersProps {
  gameTeam: GameTeam;
  gameSettings: GameInstance['settings'];
  isTeamTurn: boolean;
  gameData: Game;
  position: 'opponent' | 'me';
  currentTurnPlayer: Player;
  align?: 'left' | 'right' | undefined;
  children?: React.ReactNode;
  onCountdown: () => void;
  onCountdownReset: () => void;
}

export function TeamPlayers({
  gameTeam,
  gameData,
  gameSettings,
  isTeamTurn,
  position,
  currentTurnPlayer,
  align = 'left',
  children,
  onCountdown,
  onCountdownReset,
}: TeamPlayersProps) {
  const { data: me } = useMe();

  // Header Component
  const TimerHeader = (
    <div
      className={cn(
        'flex items-center justify-between px-2',
        position === 'opponent' ? 'mb-2 md:mb-6' : 'mb-2 md:mb-6',
        align === 'right' ? 'flex-row-reverse' : '',
      )}
    >
      <GameTimer
        gameSettings={gameSettings}
        timeControl={gameTeam.timeControl}
        isTurn={isTeamTurn}
        align={align}
        onCountdown={onCountdown}
        onCountdownReset={onCountdownReset}
      />
      <CapturedStones
        count={gameTeam.stoneColor === 'BLACK' ? gameData.capturedByBlack : gameData.capturedByWhite}
        color={gameTeam.stoneColor}
      />
    </div>
  );

  return (
    <div className={cn('relative w-full overflow-hidden rounded-xl py-3 transition-all duration-500')}>
      {/* Content */}
      <div className='relative z-10 flex flex-col px-2'>
        {/* On Desktop: Top is Timer */}
        {TimerHeader}

        {/* Players Container - Desktop Vertical */}
        <div className={cn('flex justify-between gap-4', 'flex-col justify-start gap-5')}>
          {/* Player 1 */}
          <PlayerCompact
            player={gameTeam.players[0].data}
            teamColor={gameTeam.teamColor}
            isTeamTurn={isTeamTurn}
            align={align}
            isMe={gameTeam.players[0].data.id === me?.id}
            isPlayerTurn={gameTeam.players[0].data.id === currentTurnPlayer.id}
          />

          {/* No Divider for Desktop Vertical */}

          {/* Player 2 */}
          <PlayerCompact
            player={gameTeam.players[1].data}
            teamColor={gameTeam.teamColor}
            isTeamTurn={isTeamTurn}
            align={align}
            isMe={gameTeam.players[1].data.id === me?.id}
            isPlayerTurn={gameTeam.players[1].data.id === currentTurnPlayer.id}
          />
        </div>

        {/* Children (Buttons) */}
        {children}
      </div>
    </div>
  );
}
