import { Calculator, Flag, RotateCcw, SkipForward } from 'lucide-react';

import { Button } from '@/components/figma/button';
import { cn } from '@/components/figma/utils';

// Mobile Action Buttons - Bottom Navigation Bar Style
export function ActionButtons() {
  return (
    <div className='grid grid-cols-4 w-full h-full bg-black'>
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
        'h-full flex-col gap-0.5 py-1 px-0 rounded-none border-none bg-transparent active:bg-hextech-silver-800/20 hover:bg-hextech-silver-800/10 transition-colors relative',
        variant === 'danger' ? 'text-hextech-red-400' : 'text-hextech-silver-400',
      )}
    >
      <Icon className='w-5 h-5 mb-0.5' />
      <span className='text-[10px] font-medium opacity-80'>{label}</span>
    </Button>
  );
}
