import type { HTMLAttributes } from 'react';

import { ThemeBox } from '@/components/atoms/ThemeBox';
import type { ThemeColor } from '@/types/theme';

export function Timer({
  color,
  time,
  size = 'md',
  ...props
}: { color: ThemeColor; time: number; size?: 'sm' | 'md' } & HTMLAttributes<HTMLDivElement>) {
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;

  const timeString = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

  return (
    <ThemeBox color={color} size={size} {...props}>
      {timeString}
    </ThemeBox>
  );
}
