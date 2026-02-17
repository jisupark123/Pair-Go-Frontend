import { Button } from '@/shared/ui/figma/button';
import { cn } from '@/shared/ui/figma/utils';

interface PlaceStoneButtonProps {
  isActive: boolean;
  onClick: () => void;
  size: 'sm' | 'lg';
}

export function PlaceStoneButton({ isActive, onClick, size }: PlaceStoneButtonProps) {
  return (
    <Button
      disabled={!isActive}
      className={cn(
        'flex touch-none items-center justify-center transition-all duration-0 select-none',
        'rounded-lg border font-bold',
        size === 'sm' ? 'h-8 px-4 text-xs' : 'h-12 px-8 text-lg',
        isActive
          ? cn(
              'text-hextech-gold-100 shadow-[0_0_15px_rgba(245,158,11,0.3)] transition-all',
              'border-hextech-gold-500/60 bg-hextech-gold-500/10',
              'active:border-hextech-gold-400 active:bg-hextech-gold-500/20 active:text-white',
            )
          : 'cursor-not-allowed border-hextech-silver-500/20 bg-hextech-silver-900/10 text-hextech-silver-500 opacity-50',
      )}
      onContextMenu={(e) => e.preventDefault()}
      onClick={() => {
        if (isActive) {
          onClick();
        }
      }}
    >
      착수
    </Button>
  );
}
