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
        'relative w-8 h-8 flex items-center justify-center rounded-full shrink-0',
        color === 'BLACK' && 'bg-white/10 ring-1 ring-white/40 shadow-[0_0_10px_rgba(255,255,255,0.1)]',
        className,
      )}
    >
      <img
        src={color === 'BLACK' ? basicBoardStyleConfig.blackStoneImageUrl : basicBoardStyleConfig.whiteStoneImageUrl}
        alt={color}
        className='absolute inset-0 w-full h-full object-contain drop-shadow-md'
      />
      <span className={cn('relative z-10 text-xs font-bold', color === 'BLACK' ? 'text-white' : 'text-black')}>
        {count}
      </span>
    </div>
  );
}
