import { Timer } from 'lucide-react';

import { cn } from '@/components/figma/utils';
import type { GameInstance, TimeControl } from '@/types/game';

interface GameTimerProps {
  gameSettings: GameInstance['settings'];
  timeControl: TimeControl;
  isTurn: boolean;
  align?: 'left' | 'right';
}

export function GameTimer({ gameSettings, timeControl, isTurn, align = 'left' }: GameTimerProps) {
  const minutes = Math.floor(timeControl.remainingBasicTimeMs / 1000 / 60);
  const seconds = Math.floor((timeControl.remainingBasicTimeMs / 1000) % 60);

  return (
    <div
      className={cn(
        'flex items-center gap-2 font-mono transition-colors duration-300',
        isTurn ? 'text-hextech-gold-300 text-lg font-bold' : 'text-hextech-silver-500 text-base',
        align === 'right' ? 'flex-row-reverse' : '',
      )}
    >
      <Timer className='w-4 h-4' />
      <span>
        {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
      </span>
      <span
        className={cn(
          'text-xs opacity-70 border-white/20',
          align === 'right' ? 'border-r pr-2 mr-1' : 'border-l pl-2 ml-1',
        )}
      >
        {gameSettings.byoyomiTime}s
      </span>
    </div>
  );
}
