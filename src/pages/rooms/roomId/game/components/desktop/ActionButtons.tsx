import { Calculator, Flag, RotateCcw, SkipForward } from 'lucide-react';

import { Button } from '@/components/figma/button';
import { cn } from '@/components/figma/utils';

export function ActionButtons() {
  return (
    <div className={cn('grid gap-3 grid-cols-2')}>
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
        'h-auto flex-col gap-1 py-3 px-1 text-[11px] font-medium border bg-transparent hover:bg-hextech-silver-800/30 transition-all',
        variant === 'danger'
          ? 'border-hextech-red-900/50 text-hextech-red-300 hover:text-hextech-red-100 hover:border-hextech-red-500'
          : 'border-hextech-gold-700/30 text-hextech-silver-400 hover:text-hextech-gold-300 hover:border-hextech-gold-500',
      )}
    >
      <Icon className='w-5 h-5 mb-0.5' />
      {label}
    </Button>
  );
}
