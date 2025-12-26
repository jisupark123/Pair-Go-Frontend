import { io, Socket } from 'socket.io-client';

const sockets: Record<string, Socket> = {};

export const getSocket = (namespace: string): Socket => {
  if (!sockets[namespace]) {
    sockets[namespace] = io(`${import.meta.env.VITE_BACKEND_URL}/ws${namespace}`, {
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
