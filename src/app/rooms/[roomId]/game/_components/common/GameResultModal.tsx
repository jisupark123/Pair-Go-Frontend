import { Stone, type GameResult, type StoneColor } from '@dodagames/go';

import { Button } from '@/shared/ui/figma/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogTitle } from '@/shared/ui/figma/dialog';
import { cn } from '@/shared/ui/figma/utils';

interface GameResultModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  result: GameResult | null;
  myColor?: StoneColor;
}

export function GameResultModal({ open, onOpenChange, result, myColor }: GameResultModalProps) {
  if (!result || result.type === 'Ongoing') return null;

  let winner: StoneColor | 'draw' | null = null;
  let reasonText = '';

  if (result.type === 'Draw') {
    winner = 'draw';
    reasonText = '무승부';
  } else {
    // For Resignation, TimeWin, PointsWin
    const winnerStone = result.winner;
    if (winnerStone === Stone.BLACK) winner = 'BLACK';
    else if (winnerStone === Stone.WHITE) winner = 'WHITE';

    const winnerName = winner === 'BLACK' ? '흑' : '백';

    if (result.type === 'Resignation') {
      reasonText = `${winnerName} 불계승`;
    } else if (result.type === 'TimeWin') {
      reasonText = `${winnerName} 시간승`;
    } else if (result.type === 'PointsWin') {
      const gap = result.points;
      const integerPart = Math.floor(gap);
      const decimalPart = gap - integerPart;
      const scoreStr = decimalPart === 0.5 ? `${integerPart}집반` : `${gap}집`;
      reasonText = `${winnerName} ${scoreStr} 승`;
    }
  }

  const isVictory = myColor && winner === myColor;
  const isDraw = winner === 'draw';
  const isDefeat = myColor && winner !== myColor && !isDraw;

  let title = 'GAME OVER';
  if (isVictory) title = '승리';
  else if (isDefeat) title = '패배';
  else if (isDraw) title = '무승부';

  // Styles based on result
  const borderColor = isVictory
    ? 'border-hextech-gold-500'
    : isDefeat
      ? 'border-hextech-red-500'
      : 'border-hextech-blue-500';

  const titleColor = isVictory ? 'text-hextech-gold-400' : isDefeat ? 'text-hextech-red-400' : 'text-hextech-blue-400';

  const glowClass = isVictory
    ? 'shadow-[0_0_40px_-5px_var(--color-hextech-gold-500)]'
    : isDefeat
      ? 'shadow-[0_0_40px_-5px_var(--color-hextech-red-500)]'
      : 'shadow-[0_0_40px_-5px_var(--color-hextech-blue-500)]';

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className={cn('border-2 bg-slate-900 p-8 sm:max-w-sm', borderColor, glowClass)}
        onInteractOutside={(e) => e.preventDefault()}
      >
        <div className='flex flex-col items-center gap-6 text-center'>
          <DialogTitle className={cn('text-4xl font-bold tracking-wider drop-shadow-md', titleColor)}>
            {title}
          </DialogTitle>

          <DialogDescription className='text-xl font-medium break-keep text-hextech-silver-300'>
            {reasonText}
          </DialogDescription>

          <DialogFooter className='mt-4 w-full'>
            <Button
              onClick={() => onOpenChange(false)}
              className={cn(
                'w-full py-6 text-lg font-bold shadow-lg transition-all duration-300',
                isVictory
                  ? 'bg-hextech-gold-600 text-hextech-gold-950 shadow-hextech-gold-900/40 hover:bg-hextech-gold-500'
                  : isDefeat
                    ? 'bg-hextech-red-700 text-white shadow-hextech-red-900/40 hover:bg-hextech-red-600'
                    : 'bg-hextech-blue-700 text-white shadow-hextech-blue-900/40 hover:bg-hextech-blue-600',
              )}
            >
              확인
            </Button>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
}
