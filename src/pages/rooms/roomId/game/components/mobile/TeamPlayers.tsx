import { useMe } from '@/features/auth/hooks/useMe';
import type { GameInstance, GameTeam } from '@/features/rooms/domain/game/game.type';
import type { Player } from '@/features/rooms/room.type';
import { PlayerCompact } from '@/pages/rooms/roomId/game/components/mobile/PlayerCompact';
import { cn } from '@/shared/ui/figma/utils';

interface TeamPlayersProps {
  game: GameInstance;
  gameTeam: GameTeam;
  currentTurnPlayer: Player;
  position: 'opponent' | 'me';
}

export function TeamPlayers({ game, gameTeam, currentTurnPlayer, position }: TeamPlayersProps) {
  const { data: me } = useMe();
  return (
    <div
      className={cn(
        'relative w-full overflow-hidden rounded-xl p-1 transition-all duration-500',
        position === 'me' ? 'pt-2' : 'pb-2',
      )}
    >
      {/* Content */}
      <div className={cn('relative z-10 flex flex-col gap-2')}>
        {/* Players Container - Mobile Horizontal */}
        <div className={cn('flex w-full items-center justify-between gap-2')}>
          {/* Player 1 */}
          <div className='min-w-0 flex-1'>
            <PlayerCompact
              teamColor={gameTeam.teamColor}
              player={gameTeam.players[0].data}
              isTeamTurn={game.currentTurn.stoneColor === gameTeam.stoneColor}
              align='left'
              isMe={gameTeam.players[0].data.id === me?.id}
              isPlayerTurn={gameTeam.players[0].data.id === currentTurnPlayer.id}
            />
          </div>

          {/* VS/Divider */}
          <div className='h-4 w-px flex-none bg-hextech-silver-700/30' />

          {/* Player 2 */}
          <div className='min-w-0 flex-1'>
            <PlayerCompact
              teamColor={gameTeam.teamColor}
              player={gameTeam.players[1].data}
              isTeamTurn={game.currentTurn.stoneColor === gameTeam.stoneColor}
              align='right'
              isMe={gameTeam.players[1].data.id === me?.id}
              isPlayerTurn={gameTeam.players[1].data.id === currentTurnPlayer.id}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
