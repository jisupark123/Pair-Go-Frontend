import { useMemo } from 'react';

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/molecules/ThemeSelect';
import type { Room } from '@/types/room';

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

interface RoomSettingsFormProps {
  settings: Room['settings'];
  updateSettings: (fn: (draft: Room['settings']) => void) => void;
  disabled?: boolean;
}

export function RoomSettingsForm({ settings, updateSettings, disabled }: RoomSettingsFormProps) {
  const isEvenGame = settings.handicap === '0';

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
                  if (value === '0') {
                    draft.komi = '6.5';
                  }
                })
              }
              disabled={!!disabled}
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
            <label className='text-xs font-medium text-hextech-silver-400 ml-1'>{isEvenGame ? '백 덤' : '흑 덤'}</label>
            <Select
              value={isEvenGame ? '6.5' : settings.komi}
              onValueChange={(value) =>
                updateSettings((draft) => {
                  draft.komi = value;
                })
              }
              disabled={disabled || isEvenGame}
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
              value={settings.stoneColorMethod}
              onValueChange={(value) =>
                updateSettings((draft) => {
                  draft.stoneColorMethod = value as 'auto' | 'manual';
                })
              }
              disabled={!!disabled}
            >
              <SelectTrigger className='bg-hextech-silver-900/50 border-hextech-blue-900/50 focus:ring-hextech-blue-500/50 text-hextech-silver-200'>
                <SelectValue />
              </SelectTrigger>
              <SelectContent className='bg-hextech-silver-900 border-hextech-blue-900 text-hextech-silver-200'>
                <SelectItem value='auto'>자동 돌가림</SelectItem>
                <SelectItem value='manual'>방에서 선택</SelectItem>
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
              disabled={!!disabled}
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
              disabled={!!disabled}
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
              disabled={!!disabled}
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
  );
}
