export type RoomSettings = {
  handicap: string; // (몇점)접바둑
  komi: string; // 덤 (흑 기준)
  stoneColor: 'auto' | 'black' | 'white'; // 자동돌가림, 흑, 백
  basicTime: string; // 기본 시간
  countdownTime: string; // 초읽기 시간
  countdownCount: string; // 초읽기 횟수
};
