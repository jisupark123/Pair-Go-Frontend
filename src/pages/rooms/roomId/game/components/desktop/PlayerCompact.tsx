import { Monitor, Smartphone, Tablet, User } from 'lucide-react';

import { cn } from '@/components/figma/utils';
import type { Player, Team } from '@/types/room';

interface PlayerCompactProps {
  player: Player;
  teamColor: Team;
  isTeamTurn: boolean;
  align: 'left' | 'right';
  isMe: boolean;
  isPlayerTurn: boolean;
}

export function PlayerCompact({ player, teamColor, align, isMe, isPlayerTurn }: PlayerCompactProps) {
  const isBlue = teamColor === 'blue';

  return (
    <div
      className={cn(
        'flex w-full items-center gap-3 p-2 transition-all duration-300',
        align === 'right' ? 'flex-row-reverse text-right' : 'flex-row text-left',
        isPlayerTurn && {
          'rounded-lg border shadow-[0_0_10px_rgba(245,158,11,0.2)]': true,
          'border-hextech-blue-500/50 bg-hextech-blue-500/10': teamColor === 'blue',
          'border-hextech-red-500/50 bg-hextech-red-500/10': teamColor === 'red',
        },
      )}
    >
      {/* Avatar */}
      <div className='relative flex-none'>
        <div
          className={cn(
            'flex h-10 w-10 items-center justify-center rounded-full border-2 bg-hextech-silver-950 shadow-lg md:h-12 md:w-12',
            isBlue ? 'border-hextech-blue-600' : 'border-hextech-red-600',
            isPlayerTurn && {
              'animate-pulse': true,
              'border-hextech-blue-400 shadow-[0_0_15px_hextech-blue-400]': teamColor === 'blue',
              'border-hextech-red-400 shadow-[0_0_15px_hextech-red-400]': teamColor === 'red',
            },
          )}
        >
          <User className={cn('h-5 w-5 md:h-6 md:w-6', isBlue ? 'text-hextech-blue-300' : 'text-hextech-red-300')} />
        </div>
      </div>

      {/* Name and Me Badge */}
      <div className={cn('flex min-w-0 flex-1 flex-col', align === 'right' ? 'items-end' : 'items-start')}>
        <div className='flex items-center gap-1.5'>
          <span
            className={cn(
              'max-w-[120px] truncate text-sm font-bold md:text-base',
              isBlue ? 'text-hextech-blue-100' : 'text-hextech-red-100',
            )}
          >
            {player.nickname}
          </span>
          {isMe && (
            <span
              className={cn(
                'rounded-sm px-1.5 py-0.5 text-[10px] font-bold tracking-wider',
                isBlue ? 'bg-hextech-blue-900 text-hextech-blue-300' : 'bg-hextech-red-900 text-hextech-red-300',
              )}
            >
              ME
            </span>
          )}
        </div>
        <div className='text-[10px] font-medium text-hextech-silver-500'>7단</div>
      </div>

      {/* Device Icon */}
      <div className={cn('rounded-full p-1.5', isBlue ? 'bg-hextech-blue-500/10' : 'bg-hextech-red-500/10')}>
        {player.deviceType === 'mobile' && (
          <Smartphone className={cn('h-4 w-4', isBlue ? 'text-hextech-blue-400' : 'text-hextech-red-400')} />
        )}
        {player.deviceType === 'tablet' && (
          <Tablet className={cn('h-4 w-4', isBlue ? 'text-hextech-blue-400' : 'text-hextech-red-400')} />
        )}
        {player.deviceType === 'desktop' && (
          <Monitor className={cn('h-4 w-4', isBlue ? 'text-hextech-blue-400' : 'text-hextech-red-400')} />
        )}
      </div>
    </div>
  );
}
