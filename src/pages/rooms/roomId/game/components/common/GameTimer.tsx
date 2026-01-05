import { useEffect, useState, useRef } from 'react';
import { useSound, SFX_KEYS } from '@dodagames/go';
import { Timer } from 'lucide-react';

import { cn } from '@/components/figma/utils';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { DESKTOP_WIDTH_BP } from '@/pages/rooms/roomId/game/Game';
import type { GameInstance, TimeControl } from '@/types/game';
import { calculateTimeDisplay } from '@/utils/timeControl';

interface GameTimerProps {
  gameSettings: GameInstance['settings'];
  timeControl: TimeControl;
  isTurn: boolean;
  align?: 'left' | 'right';
}

export function GameTimer({ gameSettings, timeControl, isTurn, align = 'left' }: GameTimerProps) {
  const isDesktopScreenSize = useMediaQuery(`(min-width: ${DESKTOP_WIDTH_BP}px)`);
  const [currentTimeControl, setCurrentTimeControl] = useState(timeControl);
  const { play, stop } = useSound();

  // 서버로부터 새로운 시간 정보(timeControl prop)가 오면 로컬 상태와 동기화합니다.
  // 이를 통해 서버 시간과의 오차를 주기적으로 보정합니다.
  useEffect(() => {
    setCurrentTimeControl(timeControl);
  }, [timeControl]);

  // 현재 턴인 경우, 100ms마다 로컬 시간을 감소시켜 사용자에게 시간이 흐르는 것을 시각적으로 보여줍니다.
  // 실제 시간 검증은 서버에서 이루어지며, 이 로직은 오직 UI 표시용입니다.
  // * 1000ms가 아닌 100ms 사용 이유: 초 단위(Math.ceil) 변경 시점을 더 정확하고 즉각적으로 반영하여 사용자 경험을 끊김 없이 제공하기 위함입니다.
  useEffect(() => {
    if (!isTurn) return;

    const intervalId = setInterval(() => {
      setCurrentTimeControl((prev) => {
        const next = { ...prev };
        if (next.remainingBasicTimeMs > 0) {
          next.remainingBasicTimeMs = Math.max(0, next.remainingBasicTimeMs - 100);
        } else if (next.remainingByoyomiTimeMs > 0) {
          // 초읽기 구간: 100ms 감소
          next.remainingByoyomiTimeMs = Math.max(0, next.remainingByoyomiTimeMs - 100);
        }
        return next;
      });
    }, 100);

    return () => clearInterval(intervalId);
  }, [isTurn]);

  // 턴이 시작될 때(isTurn true 전환 시), 초읽기 상태라면 시간을 복구합니다.
  useEffect(() => {
    if (isTurn && timeControl.remainingBasicTimeMs <= 0) {
      setCurrentTimeControl((prev) => ({
        ...prev,
        remainingByoyomiTimeMs: parseInt(gameSettings.byoyomiTime, 10) * 1000,
      }));
    }
  }, [isTurn, gameSettings.byoyomiTime, timeControl.remainingBasicTimeMs]);

  // 사운드 재생 로직
  // useRef를 사용하여 이전 시간 상태를 추적하고, 특정 시점에 사운드를 재생합니다.
  const prevTimeControl = useRef(timeControl);
  // 카운트다운 사운드가 이미 재생되었는지 여부를 추적합니다.
  // 초읽기 설정이 10초인 경우, 시작하자마자 10초 이하가 되므로 '이전 시간 > 10초' 조건을 사용할 수 없습니다.
  // 따라서 플래그를 사용하여 해당 구간 진입 시 한 번만 소리를 재생하도록 제어합니다.
  const hasPlayedCountdown = useRef(false);

  useEffect(() => {
    if (!isTurn) {
      // 턴이 아니면 상태만 업데이트하고 소리는 재생하지 않음
      prevTimeControl.current = currentTimeControl;
      hasPlayedCountdown.current = false;
      return;
    }

    const prev = prevTimeControl.current;
    const curr = currentTimeControl;
    const isByoyomi = curr.remainingBasicTimeMs <= 0;

    // [상태 초기화 로직]
    // 다음 상황에서는 '재생 완료' 상태를 초기화하여 다시 소리가 날 수 있도록 합니다.
    // 1. 초읽기 횟수가 변경됨 (새로운 초읽기 시작)
    // 2. 시간이 10초를 초과함 (시간 복구/동기화)
    // 3. 기본 시간이 남아있음 (초읽기 아님)
    const shouldReset =
      prev.remainingByoyomiPeriods !== curr.remainingByoyomiPeriods ||
      curr.remainingByoyomiTimeMs > 10000 ||
      !isByoyomi;

    if (shouldReset) {
      hasPlayedCountdown.current = false;
    }

    // [사운드 재생 로직]
    // 10초 카운트다운: 초읽기 상태이고 10초(10000ms) 이하이며, 아직 재생하지 않은 경우
    if (isByoyomi && curr.remainingByoyomiTimeMs <= 10000 && !shouldReset && !hasPlayedCountdown.current) {
      play(SFX_KEYS.COUNTDOWN_10SEC);
      hasPlayedCountdown.current = true;
    }

    prevTimeControl.current = curr;
  }, [currentTimeControl, isTurn, play]);

  const { isBasicTime, formattedBasicTime, byoyomiSeconds, byoyomiPeriods } = calculateTimeDisplay(currentTimeControl);

  return (
    <div
      className={cn(
        'flex items-center font-mono transition-colors duration-300',
        isDesktopScreenSize ? 'gap-2' : 'gap-1',
        align === 'right' && isDesktopScreenSize ? 'flex-row-reverse' : '',
      )}
    >
      {isBasicTime ? (
        <>
          <Timer
            className={cn(
              isDesktopScreenSize ? 'w-6 h-6' : 'w-4 h-4',
              isTurn ? 'text-hextech-gold-300' : 'text-hextech-silver-500',
            )}
          />
          <span
            className={cn(
              isTurn
                ? cn('text-hextech-gold-300 font-bold', isDesktopScreenSize ? 'text-2xl' : 'text-base')
                : cn('text-hextech-silver-500', isDesktopScreenSize ? 'text-xl' : 'text-base'),
            )}
          >
            {formattedBasicTime}
          </span>
        </>
      ) : (
        <>
          <Timer
            className={cn(
              isDesktopScreenSize ? 'w-6 h-6' : 'w-4 h-4',
              isTurn ? 'text-hextech-gold-300 animate-pulse' : 'text-hextech-silver-500',
            )}
          />
          <span
            className={cn(
              isTurn
                ? cn('text-hextech-gold-300 font-bold animate-pulse', isDesktopScreenSize ? 'text-2xl' : 'text-base')
                : cn('text-hextech-silver-500', isDesktopScreenSize ? 'text-xl' : 'text-base'),
            )}
          >
            {byoyomiSeconds}
          </span>
        </>
      )}

      <span
        className={cn(
          isTurn ? 'text-hextech-gold-300' : 'text-hextech-silver-500',
          'opacity-70 border-white/20',
          isDesktopScreenSize ? 'text-sm' : 'text-xs',
          align === 'right' && isDesktopScreenSize ? 'border-r pr-2 mr-1' : 'border-l pl-2 ml-1',
        )}
      >
        {gameSettings.byoyomiTime}초 {byoyomiPeriods}회
      </span>
    </div>
  );
}
