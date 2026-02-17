import { io, Socket } from 'socket.io-client';

const sockets: Record<string, Socket> = {};

export const getSocket = (namespace: string): Socket => {
  if (!sockets[namespace]) {
    // VITE_BACKEND_URL이 없으면(배포 환경 등) Proxy를 사용하기 위해 상대 경로를 사용합니다.
    sockets[namespace] = io(`${import.meta.env.VITE_BACKEND_URL || ''}/ws${namespace}`, {
      withCredentials: true,
      autoConnect: false,
    });
  }
  return sockets[namespace];
};

export const connectSocket = (namespace: string) => {
  const s = getSocket(namespace);
  if (!s.connected) {
    s.connect();
  }
  return s;
};

export const disconnectSocket = (namespace: string) => {
  if (sockets[namespace]) {
    sockets[namespace].disconnect();
    delete sockets[namespace];
  }
};
