import cookie from 'cookie';

const handler = (req, res) => {
  const { method } = req;

  if (method === 'POST') {
    res.setHeader(
      'Set-Cookie',
      cookie.serialize('accessToken', '', {
        httpOnly: true,
        secure: process.env.NODE_ENV !== 'development',
        expires: new Date(0),
        sameSite: 'strict',
        path: '/',
      })
    );
    res.status(200).json({ message: 'User logged out' });
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).json({ message: `Method ${method} not allowed` });
  }
};

export default handler;
