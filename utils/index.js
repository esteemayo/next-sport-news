import cookie from 'cookie';

export const tokenKey = 'accessToken';

export const parseCookie = (req) =>
  cookie.parse(req ? req.headers.cookie || '' : '');

export const getFromStorage = (key) => {
  if (typeof window !== 'undefined') {
    return JSON.parse(window.localStorage.getItem(key));
  }
};

export const setToStorage = (key, value) => {
  if (typeof window !== 'undefined') {
    return window.localStorage.setItem(key, JSON.stringify(value));
  }
};

export const removeFromStorage = () => {
  if (typeof window !== 'undefined') {
    return window.localStorage.clear();
  }
};

export const excerpts = (str, count) => {
  if (str.length > count) {
    str = str.substr(0, count) + ' ...';
  }
  return str;
};
