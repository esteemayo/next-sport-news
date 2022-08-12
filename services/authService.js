import http from './httpService';

const apiEndpoint = '/auth';
const tokenKey = 'accessToken';

export const login = (credentials) =>
  http.post(`${apiEndpoint}/login`, credentials);

export const getJwt = () => {
  if (typeof window !== 'undefined') {
    return JSON.parse(localStorage.getItem(tokenKey))?.token;
  }
};
