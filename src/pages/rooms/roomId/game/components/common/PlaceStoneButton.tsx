import { Button } from '@/components/figma/button';
import { cn } from '@/components/figma/utils';

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
        'flex items-center justify-center transition-all duration-0 select-none touch-none',
        'rounded-lg border font-bold',
        size === 'sm' ? 'px-4 h-8 text-xs' : 'px-8 h-12 text-lg',
        isActive
          ? cn(
              'shadow-[0_0_15px_rgba(245,158,11,0.3)] text-hextech-gold-100 transition-all',
              'bg-hextech-gold-500/10 border-hextech-gold-500/60',
              'active:bg-hextech-gold-500/20 active:border-hextech-gold-400 active:text-white',
            )
          : 'bg-hextech-silver-900/10 border-hextech-silver-500/20 text-hextech-silver-500 cursor-not-allowed opacity-50',
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
