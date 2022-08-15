import axios from 'axios';
import http from './httpService';

const apiEndpoint = '/auth';
const tokenKey = 'accessToken';
const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export const login = (credentials) =>
  http.post(`${apiEndpoint}/login`, credentials);

export const nextLogin = (credentials) =>
  axios.post(`${apiUrl}/auth/login`, credentials);

export const nextLogout = () => axios.post(`${apiUrl}/auth/logout`);

export const getJwt = () => {
  if (typeof window !== 'undefined') {
    return JSON.parse(localStorage.getItem(tokenKey))?.token;
  }
};
