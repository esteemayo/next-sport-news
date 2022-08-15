const { news } = require('./data.json');

const handler = (req, res) => {
  const { method } = req;

  if (method === 'GET') {
    res.status(200).json(news);
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).json({ message: `Method ${method} is not allowed` });
  }
};

export default handler;
