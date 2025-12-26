import type { RoomSettings } from '@/types/roomSettings';

export type DeviceType = 'mobile' | 'tablet' | 'desktop';

export type Team = 'red' | 'blue';

export type Player = {
  id: number;
  nickname: string;
  socketId: string;
  isReady: boolean;
  team: Team;
  deviceType: DeviceType;
};

export type Room = {
  id: string; // 초대 코드 (Room ID)
  hostId: number; // 방장 ID
  title: string;
  settings: RoomSettings;
  players: Player[];
  createdAt: Date;
};
