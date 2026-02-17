import axios from 'axios';

export const api = axios.create({
  // VITE_BACKEND_URL이 없으면(배포 환경 등) Proxy를 사용하기 위해 상대 경로를 사용합니다.
  baseURL: (import.meta.env.VITE_BACKEND_URL || '') + '/api',
  withCredentials: true,
});
