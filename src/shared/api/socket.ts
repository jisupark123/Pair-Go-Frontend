import { io, Socket } from 'socket.io-client';

const sockets: Record<string, Socket> = {};

export const getSocket = (namespace: string): Socket => {
  if (!sockets[namespace]) {
    // 배포 환경(production)에서는 Proxy(rewrites)를 사용하기 위해 상대 경로를 사용합니다.
    // 개발 환경에서는 NEXT_PUBLIC_BACKEND_URL이 설정되어 있다면 해당 URL을 사용하여 직접 연결할 수도 있습니다.
    const baseUrl = process.env.NODE_ENV === 'production' ? '' : process.env.NEXT_PUBLIC_BACKEND_URL || '';

    sockets[namespace] = io(`${baseUrl}/ws${namespace}`, {
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
