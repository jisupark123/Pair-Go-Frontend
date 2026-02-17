import { Calculator, Flag, RotateCcw, SkipForward } from 'lucide-react';

import { Button } from '@/shared/ui/figma/button';
import { cn } from '@/shared/ui/figma/utils';

export function ActionButtons() {
  return (
    <div className={cn('grid grid-cols-2 gap-3')}>
      <GameActionButton icon={RotateCcw} label='무르기' variant='normal' />
      <GameActionButton icon={SkipForward} label='한수쉼' variant='normal' />
      <GameActionButton icon={Calculator} label='계가신청' variant='normal' />
      <GameActionButton icon={Flag} label='기권' variant='danger' />
    </div>
  );
}

function GameActionButton({
  icon: Icon,
  label,
  variant,
}: {
  icon: React.ElementType;
  label: string;
  variant: 'normal' | 'danger';
}) {
  return (
    <Button
      className={cn(
        'h-auto flex-col gap-1 border bg-transparent px-1 py-3 text-[11px] font-medium transition-all hover:bg-hextech-silver-800/30',
        variant === 'danger'
          ? 'border-hextech-red-900/50 text-hextech-red-300 hover:border-hextech-red-500 hover:text-hextech-red-100'
          : 'border-hextech-gold-700/30 text-hextech-silver-400 hover:border-hextech-gold-500 hover:text-hextech-gold-300',
      )}
    >
      <Icon className='mb-0.5 h-5 w-5' />
      {label}
    </Button>
  );
}
