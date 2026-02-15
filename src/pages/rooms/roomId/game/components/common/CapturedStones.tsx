import { basicBoardStyleConfig, type StoneColor } from '@dodagames/go';

import { cn } from '@/components/figma/utils';

interface CapturedStonesProps {
  color: StoneColor;
  count: number;
  className?: string;
}

export function CapturedStones({ color, count, className }: CapturedStonesProps) {
  return (
    <div
      className={cn(
        'relative flex h-8 w-8 shrink-0 items-center justify-center rounded-full',
        color === 'BLACK' && 'bg-white/10 shadow-[0_0_10px_rgba(255,255,255,0.1)] ring-1 ring-white/40',
        className,
      )}
    >
      <img
        src={color === 'BLACK' ? basicBoardStyleConfig.blackStoneImageUrl : basicBoardStyleConfig.whiteStoneImageUrl}
        alt={color}
        className='absolute inset-0 h-full w-full object-contain drop-shadow-md'
      />
      <span className={cn('relative z-10 text-xs font-bold', color === 'BLACK' ? 'text-white' : 'text-black')}>
        {count}
      </span>
    </div>
  );
}
