import cookie from 'cookie';

const handler = (req, res) => {
  const { method } = req;

  if (method === 'POST') {
    res.setHeader(
      'Set-Cookie',
      cookie.serialize('accessToken', 'deleted', {
        httpOnly: true,
        secure: process.env.NODE_ENV !== 'development',
        maxAge: 0,
        sameSite: 'strict',
        path: '/',
      })
    );
    res.status(200).json('Logged out');
  }
};

export default handler;
