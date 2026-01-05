import { Timer } from 'lucide-react';

import { cn } from '@/components/figma/utils';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { DESKTOP_WIDTH_BP } from '@/pages/rooms/roomId/game/Game';
import type { GameInstance, TimeControl } from '@/types/game';
import { calculateTimeDisplay } from '@/utils/timeControl';

interface GameTimerProps {
  gameSettings: GameInstance['settings'];
  timeControl: TimeControl;
  isTurn: boolean;
  align?: 'left' | 'right';
}

export function GameTimer({ gameSettings, timeControl, isTurn, align = 'left' }: GameTimerProps) {
  const isDesktopScreenSize = useMediaQuery(`(min-width: ${DESKTOP_WIDTH_BP}px)`);

  const { isBasicTime, formattedBasicTime, byoyomiSeconds, byoyomiPeriods } = calculateTimeDisplay(timeControl);

  return (
    <div
      className={cn(
        'flex items-center font-mono transition-colors duration-300',
        isDesktopScreenSize ? 'gap-2' : 'gap-1',
        align === 'right' && isDesktopScreenSize ? 'flex-row-reverse' : '',
      )}
    >
      {isBasicTime ? (
        <>
          <Timer
            className={cn(
              isDesktopScreenSize ? 'w-6 h-6' : 'w-4 h-4',
              isTurn ? 'text-hextech-gold-300' : 'text-hextech-silver-500',
            )}
          />
          <span
            className={cn(
              isTurn
                ? cn('text-hextech-gold-300 font-bold', isDesktopScreenSize ? 'text-2xl' : 'text-base')
                : cn('text-hextech-silver-500', isDesktopScreenSize ? 'text-xl' : 'text-base'),
            )}
          >
            {formattedBasicTime}
          </span>
        </>
      ) : (
        <>
          <Timer
            className={cn(
              isDesktopScreenSize ? 'w-6 h-6' : 'w-4 h-4',
              isTurn ? 'text-hextech-gold-300 animate-pulse' : 'text-hextech-silver-500',
            )}
          />
          <span
            className={cn(
              isTurn
                ? cn('text-hextech-gold-300 font-bold animate-pulse', isDesktopScreenSize ? 'text-2xl' : 'text-base')
                : cn('text-hextech-silver-500', isDesktopScreenSize ? 'text-xl' : 'text-base'),
            )}
          >
            {byoyomiSeconds}
          </span>
        </>
      )}

      <span
        className={cn(
          isTurn ? 'text-hextech-gold-300' : 'text-hextech-silver-500',
          'opacity-70 border-white/20',
          isDesktopScreenSize ? 'text-sm' : 'text-xs',
          align === 'right' && isDesktopScreenSize ? 'border-r pr-2 mr-1' : 'border-l pl-2 ml-1',
        )}
      >
        {gameSettings.byoyomiTime}초 {byoyomiPeriods}회
      </span>
    </div>
  );
}
