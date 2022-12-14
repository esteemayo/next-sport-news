import cookie from 'cookie';
import { login } from '@/services/authService';

const handler = async (req, res) => {
  const { method } = req;

  if (method === 'POST') {
    const { email, password } = req.body;
    try {
      const { data, status } = await login({ email, password });

      if (status === 200) {
        res.setHeader(
          'Set-Cookie',
          cookie.serialize('accessToken', data.token, {
            httpOnly: true,
            secure: process.env.NODE_ENV !== 'development',
            maxAge: 60 * 60,
            sameSite: 'strict',
            path: '/',
          })
        );

        return res.status(200).json({ ...data });
      }
    } catch (err) {
      return res.json(err);
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).json({ message: `Method ${method} not allowed` });
  }
};

export default handler;
