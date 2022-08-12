import axios from 'axios';
import { toast } from 'react-toastify';

import logger from './logService';
import { getJwt } from './authService';

const devEnv = process.env.NODE_ENV !== 'production';

const NEXT_PUBLIC_DEV_API_URL = process.env.NEXT_PUBLIC_DEV_API_URL;
const NEXT_PUBLIC_PROD_API_URL = process.env.NEXT_PUBLIC_PROD_API_URL;

const API = axios.create({
  baseURL: `${devEnv ? NEXT_PUBLIC_DEV_API_URL : NEXT_PUBLIC_PROD_API_URL}`,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

API.interceptors.request.use(
  (request) => {
    request.headers.common['Authorization'] = `Bearer ${getJwt()}`;
    return request;
  },
  (error) => {
    return Promise.reject(error);
  }
);

API.interceptors.response.use(null, (error) => {
  const expectedError =
    error.response &&
    error.response.status >= 400 &&
    error.response &&
    error.response.status < 500;

  if (!expectedError) {
    logger.log(error);
    toast.error('An unexpected error occurred');
  }

  return Promise.reject(error);
});

const http = {
  get: API.get,
  post: API.post,
  patch: API.patch,
  delete: API.delete,
};

export default http;
