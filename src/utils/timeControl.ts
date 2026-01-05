import type { TimeControl } from '@/types/game';

interface TimeDisplay {
  isBasicTime: boolean;
  minutes: number;
  seconds: number;
  byoyomiSeconds: number;
  byoyomiPeriods: number;
  formattedBasicTime: string;
}

export function calculateTimeDisplay(timeControl: TimeControl): TimeDisplay {
  const isBasicTime = timeControl.remainingBasicTimeMs > 0;
  // Ensure we don't display negative time
  const safeBasicTimeMs = Math.max(0, timeControl.remainingBasicTimeMs);

  const minutes = Math.floor(safeBasicTimeMs / 1000 / 60);
  const seconds = Math.floor((safeBasicTimeMs / 1000) % 60);
  const byoyomiSeconds = Math.ceil(timeControl.remainingByoyomiTimeMs / 1000);

  return {
    isBasicTime,
    minutes,
    seconds,
    byoyomiSeconds,
    byoyomiPeriods: timeControl.remainingByoyomiPeriods,
    formattedBasicTime: `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`,
  };
}
