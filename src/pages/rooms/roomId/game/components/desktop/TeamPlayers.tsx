import { cn } from '@/components/figma/utils';
import { useMe } from '@/hooks/query/useMe';
import { CapturedStones } from '@/pages/rooms/roomId/game/components/common/CapturedStones';
import { GameTimer } from '@/pages/rooms/roomId/game/components/common/GameTimer';
import { PlayerCompact } from '@/pages/rooms/roomId/game/components/desktop/PlayerCompact';
import type { GameInstance, GameTeam } from '@/types/game';
import type { Player } from '@/types/room';

interface TeamPlayersProps {
  gameTeam: GameTeam;
  gameSettings: GameInstance['settings'];
  isTeamTurn: boolean;
  position: 'opponent' | 'me';
  currentTurnPlayer: Player;
  align?: 'left' | 'right' | undefined;
  children?: React.ReactNode;
}

export function TeamPlayers({
  gameTeam,
  gameSettings,
  isTeamTurn,
  position,
  currentTurnPlayer,
  align = 'left',
  children,
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
      <GameTimer gameSettings={gameSettings} timeControl={gameTeam.timeControl} isTurn={isTeamTurn} align={align} />
      <CapturedStones count={gameTeam.capturedStoneCount} color={gameTeam.stoneColor} />
    </div>
  );

  return (
    <div className={cn('w-full py-3 transition-all duration-500 rounded-xl relative overflow-hidden')}>
      {/* Content */}
      <div className='flex flex-col relative z-10 px-2'>
        {/* On Desktop: Top is Timer */}
        {TimerHeader}

        {/* Players Container - Desktop Vertical */}
        <div className={cn('flex gap-4 justify-between', 'flex-col gap-5 justify-start')}>
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
