import { basicBoardStyleConfig } from '@dodagames/go';

import { cn } from '@/components/figma/utils';
import type { StoneColor } from '@/types/game';

interface CapturedStonesProps {
  color: StoneColor;
  count: number;
  className?: string;
}

export function CapturedStones({ color, count, className }: CapturedStonesProps) {
  return (
    <div
      className={cn(
        'relative w-8 h-8 flex items-center justify-center rounded-full shrink-0',
        color === 'black' && 'bg-white/10 ring-1 ring-white/40 shadow-[0_0_10px_rgba(255,255,255,0.1)]',
        className,
      )}
    >
      <img
        src={color === 'black' ? basicBoardStyleConfig.blackStoneImageUrl : basicBoardStyleConfig.whiteStoneImageUrl}
        alt={color}
        className='absolute inset-0 w-full h-full object-contain drop-shadow-md'
      />
      <span className={cn('relative z-10 text-xs font-bold', color === 'black' ? 'text-white' : 'text-black')}>
        {count}
      </span>
    </div>
  );
}
