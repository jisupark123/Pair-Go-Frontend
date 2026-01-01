import { SequenceHistory } from '@dodagames/go';
import { useQuery } from '@tanstack/react-query';

import type { GameInstance } from '@/types/game';

// 더미 데이터
const DUMMY_GAME_INSTANCE: GameInstance = {
  id: '1234',
  players: [],
  settings: {
    handicap: '0',
    komi: '6.5',
    stoneColorMethod: 'auto',
    basicTime: '30',
    countdownTime: '30',
    countdownCount: '3',
  },
  teams: [
    {
      teamColor: 'blue',
      stoneColor: 'black',
      capturedStoneCount: 0,
      timeControl: {
        remainingBasicTimeMs: 1800000, // 30분
        remainingCountdownTimeMs: 30000, // 30초
        remainingCountdownCount: 3,
      },
      players: [
        {
          data: {
            id: 1,
            nickname: 'Faker',
            socketId: 'sock1',
            isReady: true,
            team: 'blue',
            deviceType: 'desktop',
          },
          index: 0,
        },
        {
          data: {
            id: 2,
            nickname: 'Zeus',
            socketId: 'sock2',
            isReady: true,
            team: 'blue',
            deviceType: 'mobile',
          },
          index: 1,
        },
      ],
    },
    {
      teamColor: 'red',
      stoneColor: 'white',
      capturedStoneCount: 0,
      timeControl: {
        remainingBasicTimeMs: 1800000, // 30분
        remainingCountdownTimeMs: 30000, // 30초
        remainingCountdownCount: 3,
      },

      players: [
        {
          data: {
            id: 3,
            nickname: 'Keria',
            socketId: 'sock3',
            isReady: true,
            team: 'red',
            deviceType: 'tablet',
          },
          index: 0,
        },
        {
          data: {
            id: 4,
            nickname: 'Gumayusi',
            socketId: 'sock4',
            isReady: true,
            team: 'red',
            deviceType: 'desktop',
          },
          index: 1,
        },
      ],
    },
  ],

  currentTurn: {
    stoneColor: 'white',
    playerIndex: 0,
  },
  startedAt: new Date(),
  sequenceHistory: {} as SequenceHistory,
};

export const useGame = (roomId: string | undefined) =>
  useQuery({
    queryKey: ['game', roomId],
    queryFn: async (): Promise<GameInstance> =>
      // API 연동 대신 더미 데이터 반환
      new Promise((resolve) => {
        setTimeout(() => {
          resolve(DUMMY_GAME_INSTANCE);
        }, 500); // 0.5초 딜레이 흉내
      }),
    enabled: !!roomId,
    initialData: DUMMY_GAME_INSTANCE, // 초기 데이터도 설정
    select: (data) => ({
      ...data,
      currentTurnPlayer: data.teams.find((team) => team.stoneColor === data.currentTurn.stoneColor)!.players[
        data.currentTurn.playerIndex
      ].data,
    }),
  });
