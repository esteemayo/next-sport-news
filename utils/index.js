import cookie from 'cookie';

export const parseCookie = (req) =>
  cookie.parse(req ? req.headers.cookie || '' : '');
