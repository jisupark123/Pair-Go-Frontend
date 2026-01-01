import { cn } from '@/components/figma/utils';
import { useMe } from '@/hooks/query/useMe';
import { PlayerCompact } from '@/pages/rooms/roomId/game/components/mobile/PlayerCompact';
import type { GameInstance, GameTeam } from '@/types/game';
import type { Player } from '@/types/room';

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
        'w-full transition-all duration-500 rounded-xl relative overflow-hidden p-1',
        position === 'me' ? 'pt-2' : 'pb-2',
      )}
    >
      {/* Content */}
      <div className={cn('flex flex-col relative z-10 gap-2')}>
        {/* Players Container - Mobile Horizontal */}
        <div className={cn('flex items-center gap-2 justify-between w-full')}>
          {/* Player 1 */}
          <div className='flex-1 min-w-0'>
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
          <div className='flex-none h-4 w-px bg-hextech-silver-700/30' />

          {/* Player 2 */}
          <div className='flex-1 min-w-0'>
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
