import { Calculator, Flag, RotateCcw, SkipForward } from 'lucide-react';

import { Button } from '@/components/figma/button';
import { cn } from '@/components/figma/utils';

// Mobile Action Buttons - Bottom Navigation Bar Style
export function ActionButtons() {
  return (
    <div className='grid h-full w-full grid-cols-4 bg-black'>
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
        'relative h-full flex-col gap-0.5 rounded-none border-none bg-transparent px-0 py-1 transition-colors hover:bg-hextech-silver-800/10 active:bg-hextech-silver-800/20',
        variant === 'danger' ? 'text-hextech-red-400' : 'text-hextech-silver-400',
      )}
    >
      <Icon className='mb-0.5 h-5 w-5' />
      <span className='text-[10px] font-medium opacity-80'>{label}</span>
    </Button>
  );
}
