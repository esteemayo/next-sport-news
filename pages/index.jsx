import Link from 'next/link';

import NewsItem from '@/components/NewsItem';
import { getSports } from '@/services/sportService';

const Home = ({ news }) => {
  return (
    <div>
      <h1>Latest News</h1>
      {news.length === 0 && <h3>No News</h3>}
      {news.map((item) => {
        return <NewsItem key={item._id} {...item} />;
      })}
      {news.length > 0 && (
        <Link href='/news'>
          <a className='btn-secondary'>View All News</a>
        </Link>
      )}
    </div>
  );
};

export const getStaticProps = async () => {
  const { data } = await getSports();

  return {
    props: {
      news: data.sports,
    },
    revalidate: 1,
  };
};

export default Home;
