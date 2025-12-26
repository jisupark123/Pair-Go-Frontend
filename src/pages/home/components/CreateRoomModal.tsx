import { useMemo } from 'react';
import { useImmer } from 'use-immer';

import { Button } from '@/components/figma/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/figma/dialog';
import { useCreateRoom } from '@/hooks/query/useCreateRoom';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/pages/home/components/ThemeSelect';
import type { RoomSettings } from '@/types/roomSettings';

// Static Options
const HANDICAP_OPTIONS = Array.from({ length: 8 }, (_, i) => i + 2);
const KOMI_OPTIONS = [
  ...Array.from({ length: 20 }, (_, i) => i + 1), // 1~20: 1집 단위
  ...Array.from({ length: 6 }, (_, i) => (i + 5) * 5), // 25~50: 5집 단위
  ...Array.from({ length: 5 }, (_, i) => (i + 6) * 10), // 60~100: 10집 단위
];
const BASIC_TIME_OPTIONS = [1, 5, 10, 20, 30, 40, 50, 60];
const COUNTDOWN_TIME_OPTIONS = [5, 10, 15, 20, 30, 40, 50, 60];
const COUNTDOWN_COUNT_OPTIONS = [1, 2, 3, 4, 5];

export default function CreateRoomModal({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const [settings, updateSettings] = useImmer<RoomSettings>({
    handicap: '0',
    komi: '0',
    stoneColor: 'auto',
    basicTime: '10',
    countdownTime: '30',
    countdownCount: '3',
  });

  const { mutate: createRoom, isPending } = useCreateRoom();

  const handleCreateRoom = () => {
    createRoom(settings, {
      onSuccess: () => {
        onOpenChange(false);
      },
      onError: (error) => {
        console.error('Failed to create room:', error);
        // Toast is handled? or we can add here
      },
    });
  };

  const isEvenGame = settings.handicap === '0'; // 호선인 경우 백 덤이 없음

  // Memoized Options
  const handicapOptions = useMemo(
    () =>
      HANDICAP_OPTIONS.map((val) => (
        <SelectItem key={val} value={String(val)}>
          {val}점 접바둑
        </SelectItem>
      )),
    [],
  );

  const komiOptions = useMemo(() => {
    if (isEvenGame) {
      return <SelectItem value='6.5'>6.5집</SelectItem>;
    }
    return (
      <>
        <SelectItem value='0'>없음</SelectItem>
        {KOMI_OPTIONS.map((val) => (
          <SelectItem key={val} value={String(val)}>
            {val}집
          </SelectItem>
        ))}
      </>
    );
  }, [isEvenGame]);

  const basicTimeOptions = useMemo(
    () =>
      BASIC_TIME_OPTIONS.map((t) => (
        <SelectItem key={t} value={String(t)}>
          {t}분
        </SelectItem>
      )),
    [],
  );

  const countdownTimeOptions = useMemo(
    () =>
      COUNTDOWN_TIME_OPTIONS.map((t) => (
        <SelectItem key={t} value={String(t)}>
          {t}초
        </SelectItem>
      )),
    [],
  );

  const countdownCountOptions = useMemo(
    () =>
      COUNTDOWN_COUNT_OPTIONS.map((c) => (
        <SelectItem key={c} value={String(c)}>
          {c}회
        </SelectItem>
      )),
    [],
  );

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='sm:max-w-[600px] bg-hextech-silver-950 border-hextech-blue-800 text-hextech-silver-100 p-0 overflow-hidden gap-0'>
        <DialogHeader className='p-6 pb-2'>
          <DialogTitle className='text-2xl text-center font-bold tracking-tighter text-transparent bg-clip-text bg-linear-to-b from-hextech-blue-100 to-hextech-blue-500'>
            방 만들기
          </DialogTitle>
          <DialogDescription className='text-center text-hextech-blue-400/60'>
            대국 규칙과 시간 설정을 선택해주세요
          </DialogDescription>
        </DialogHeader>

        <div className='p-6 space-y-8'>
          {/* Game Settings */}
          <section className='space-y-4'>
            <div className='flex items-center gap-2'>
              <div className='h-px flex-1 bg-linear-to-r from-transparent via-hextech-blue-900 to-transparent' />
              <h3 className='text-sm font-medium text-hextech-blue-500 uppercase tracking-widest'>대국 설정</h3>
              <div className='h-px flex-1 bg-linear-to-r from-transparent via-hextech-blue-900 to-transparent' />
            </div>

            <div className='grid grid-cols-2 gap-4'>
              {/* Handicap */}
              <div className='space-y-2'>
                <label className='text-xs font-medium text-hextech-silver-400 ml-1'>치수</label>
                <Select
                  value={settings.handicap}
                  onValueChange={(value) =>
                    updateSettings((draft) => {
                      draft.handicap = value;
                    })
                  }
                >
                  <SelectTrigger className='bg-hextech-silver-900/50 border-hextech-blue-900/50 focus:ring-hextech-blue-500/50 text-hextech-silver-200'>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className='bg-hextech-silver-900 border-hextech-blue-900 text-hextech-silver-200 h-64'>
                    <SelectItem value='0'>호선</SelectItem>
                    <SelectItem value='1'>정선</SelectItem>
                    {handicapOptions}
                  </SelectContent>
                </Select>
              </div>

              {/* Komi */}
              <div className='space-y-2'>
                <label className='text-xs font-medium text-hextech-silver-400 ml-1'>
                  {isEvenGame ? '백 덤' : '흑 덤'}
                </label>
                <Select
                  value={isEvenGame ? '6.5' : settings.komi}
                  onValueChange={(value) =>
                    updateSettings((draft) => {
                      draft.komi = value;
                    })
                  }
                  disabled={isEvenGame}
                >
                  <SelectTrigger className='bg-hextech-silver-900/50 border-hextech-blue-900/50 focus:ring-hextech-blue-500/50 text-hextech-silver-200 disabled:opacity-50 disabled:cursor-not-allowed'>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className='bg-hextech-silver-900 border-hextech-blue-900 text-hextech-silver-200 h-64'>
                    {komiOptions}
                  </SelectContent>
                </Select>
              </div>

              {/* Color */}
              <div className='space-y-2 col-span-2'>
                <label className='text-xs font-medium text-hextech-silver-400 ml-1'>흑백 선택</label>
                <Select
                  value={settings.stoneColor}
                  onValueChange={(value) =>
                    updateSettings((draft) => {
                      draft.stoneColor = value as 'auto' | 'black' | 'white';
                    })
                  }
                >
                  <SelectTrigger className='bg-hextech-silver-900/50 border-hextech-blue-900/50 focus:ring-hextech-blue-500/50 text-hextech-silver-200'>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className='bg-hextech-silver-900 border-hextech-blue-900 text-hextech-silver-200'>
                    <SelectItem value='auto'>자동 돌가림</SelectItem>
                    <SelectItem value='black'>흑</SelectItem>
                    <SelectItem value='white'>백</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </section>

          {/* Time Settings */}
          <section className='space-y-4'>
            <div className='flex items-center gap-2'>
              <div className='h-px flex-1 bg-linear-to-r from-transparent via-hextech-gold-900 to-transparent' />
              <h3 className='text-sm font-medium text-hextech-gold-500 uppercase tracking-widest'>시간 설정</h3>
              <div className='h-px flex-1 bg-linear-to-r from-transparent via-hextech-gold-900 to-transparent' />
            </div>

            <div className='grid grid-cols-3 gap-4'>
              {/* Basic Time */}
              <div className='space-y-2'>
                <label className='text-xs font-medium text-hextech-silver-400 ml-1'>기본 시간</label>
                <Select
                  value={settings.basicTime}
                  onValueChange={(value) =>
                    updateSettings((draft) => {
                      draft.basicTime = value;
                    })
                  }
                  color='gold'
                >
                  <SelectTrigger className='bg-hextech-silver-900/50 border-hextech-gold-900/50 focus:ring-hextech-gold-500/50 text-hextech-silver-200'>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className='bg-hextech-silver-900 border-hextech-gold-900 text-hextech-silver-200 h-64'>
                    <SelectItem value='0'>없음</SelectItem>
                    {basicTimeOptions}
                  </SelectContent>
                </Select>
              </div>

              {/* Countdown Time */}
              <div className='space-y-2'>
                <label className='text-xs font-medium text-hextech-silver-400 ml-1'>초읽기</label>
                <Select
                  value={settings.countdownTime}
                  onValueChange={(value) =>
                    updateSettings((draft) => {
                      draft.countdownTime = value;
                    })
                  }
                  color='gold'
                >
                  <SelectTrigger className='bg-hextech-silver-900/50 border-hextech-gold-900/50 focus:ring-hextech-gold-500/50 text-hextech-silver-200'>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className='bg-hextech-silver-900 border-hextech-gold-900 text-hextech-silver-200 h-64'>
                    <SelectItem value='0'>없음</SelectItem>
                    {countdownTimeOptions}
                  </SelectContent>
                </Select>
              </div>

              {/* Countdown Count */}
              <div className='space-y-2'>
                <label className='text-xs font-medium text-hextech-silver-400 ml-1'>횟수</label>
                <Select
                  value={settings.countdownCount}
                  onValueChange={(value) =>
                    updateSettings((draft) => {
                      draft.countdownCount = value;
                    })
                  }
                  color='gold'
                >
                  <SelectTrigger className='bg-hextech-silver-900/50 border-hextech-gold-900/50 focus:ring-hextech-gold-500/50 text-hextech-silver-200'>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className='bg-hextech-silver-900 border-hextech-gold-900 text-hextech-silver-200'>
                    <SelectItem value='0'>없음</SelectItem>
                    {countdownCountOptions}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </section>
        </div>

        <div className='p-6 pt-2'>
          <Button
            className='group relative w-full h-14 text-lg font-bold tracking-widest
              bg-hextech-silver-900 border-2 border-hextech-blue-600 text-hextech-blue-100
              hover:bg-hextech-silver-800 hover:border-hextech-blue-400 hover:shadow-[0_0_20px_rgba(34,211,238,0.4)]
              active:scale-[0.98]
              transition-all duration-300 overflow-hidden'
            onClick={handleCreateRoom}
            disabled={isPending}
          >
            <div className='absolute inset-0 bg-linear-to-r from-hextech-blue-600/10 via-hextech-blue-500/10 to-hextech-blue-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300' />
            <div className='absolute inset-0 bg-linear-to-b from-transparent via-hextech-blue-400/5 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-500' />
            <span className='relative z-10 flex items-center justify-center gap-3'>
              <span className='w-1.5 h-1.5 bg-hextech-blue-500 rotate-45 group-hover:bg-hextech-blue-300 group-hover:shadow-[0_0_8px_rgba(34,211,238,0.8)] transition-all duration-300' />
              방 만들기
              <span className='w-1.5 h-1.5 bg-hextech-blue-500 rotate-45 group-hover:bg-hextech-blue-300 group-hover:shadow-[0_0_8px_rgba(34,211,238,0.8)] transition-all duration-300' />
            </span>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
