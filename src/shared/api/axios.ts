import axios from 'axios';

const getBaseUrl = () => {
  if (process.env.NODE_ENV === 'production') {
    return '/api';
  }
  return process.env.NEXT_PUBLIC_BACKEND_URL + '/api';
};

export const api = axios.create({
  baseURL: getBaseUrl(),
  withCredentials: true,
});
