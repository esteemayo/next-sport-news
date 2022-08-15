const { news } = require('./data.json');

const handler = (req, res) => {
  const {
    method,
    query: { slug },
  } = req;

  if (method === 'GET') {
    const newsArticle = news.find((item) => item.slug === slug);
    res.status(200).json(newsArticle);
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).json({ message: `Method ${method} not allowed` });
  }
};

export default handler;
