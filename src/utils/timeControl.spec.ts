import { describe, expect, it } from 'vitest';

import type { TimeControl } from '@/types/game';
import { calculateTimeDisplay } from '@/utils/timeControl';

describe('calculateTimeDisplay', () => {
  it('should calculate basic time correctly', () => {
    const timeControl: TimeControl = {
      remainingBasicTimeMs: 65000, // 1 min 5 sec
      remainingByoyomiTimeMs: 30000,
      remainingByoyomiPeriods: 3,
    };

    const result = calculateTimeDisplay(timeControl);

    expect(result.isBasicTime).toBe(true);
    expect(result.minutes).toBe(1);
    expect(result.seconds).toBe(5);
    expect(result.formattedBasicTime).toBe('01:05');
  });

  it('should handle zero basic time (byoyomi mode)', () => {
    const timeControl: TimeControl = {
      remainingBasicTimeMs: 0,
      remainingByoyomiTimeMs: 29500, // 30 sec (rounded up)
      remainingByoyomiPeriods: 2,
    };

    const result = calculateTimeDisplay(timeControl);

    expect(result.isBasicTime).toBe(false);
    expect(result.byoyomiSeconds).toBe(30);
    expect(result.byoyomiPeriods).toBe(2);
  });

  it('should handle undefined basic time as 0', () => {
    // In JS environments or bad data, basicTime might be missing/negative.
    // Our type definition says number, but logic has Math.max(0, ...)
    const timeControl: TimeControl = {
      remainingBasicTimeMs: -100,
      remainingByoyomiTimeMs: 10000,
      remainingByoyomiPeriods: 1,
    };

    const result = calculateTimeDisplay(timeControl);
    expect(result.isBasicTime).toBe(false); // <= 0 is false
    expect(result.minutes).toBe(0);
    expect(result.seconds).toBe(0);
  });
});
