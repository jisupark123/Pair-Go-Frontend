export interface Friend {
  id: string;
  nickname: string;
  isOnline: boolean;
}

export interface FriendRequest {
  id: string;
  nickname: string;
  type: 'received' | 'sent';
}

export const MOCK_FRIENDS: Friend[] = [
  { id: '1', nickname: 'Hide on bush', isOnline: true },
  { id: '2', nickname: 'Faker', isOnline: false },
  { id: '3', nickname: 'T1 Zeus', isOnline: true },
  { id: '4', nickname: 'Gumabayusi', isOnline: false },
  { id: '5', nickname: 'Keria', isOnline: true },
];

export const MOCK_REQUESTS: FriendRequest[] = [
  { id: '10', nickname: 'Chovy', type: 'received' },
  { id: '11', nickname: 'ShowMaker', type: 'received' },
  { id: '12', nickname: 'Canyon', type: 'sent' },
];
