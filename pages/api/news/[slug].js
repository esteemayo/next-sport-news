const { news } = require('./data.json');

const handler = (req, res) => {
  const {
    method,
    query: { slug },
  } = req;

  if (method === 'GET') {
    const newsArticle = news.find((item) => item.slug === slug);

    if (newsArticle.length > 0) {
      res.status(200).json(newsArticle);
    } else {
      res
        .status(404)
        .json({ message: `No news found with that SLUG →→→ ${slug}` });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).json({ message: `Method ${method} not allowed` });
  }
};

export default handler;
