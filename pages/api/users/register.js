import cookie from 'cookie';
import { register } from '@/services/userService';

const handler = async (req, res) => {
  const { method } = req;

  if (method === 'POST') {
    try {
      const { data, status } = await register({ ...req.body });

      if (status === 201) {
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

        return res.status(201).json({ ...data });
      }
    } catch (err) {
      res.json(err);
    }
  } else {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({ message: `Method ${method} not allowed` });
  }
};

export default handler;
