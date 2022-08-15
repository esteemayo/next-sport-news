import Link from 'next/link';

import NewsItem from '@/components/NewsItem';
import styles from '@/styles/News.module.css';
import { getSports } from '@/services/sportService';

const News = ({ news }) => {
  return (
    <div>
      <Link href='/'>
        <a className={styles.back}>Go Back</a>
      </Link>
      <h1>News</h1>
      {news.length === 0 && <h3>No News</h3>}
      {news.map((item) => {
        return <NewsItem key={item._id} {...item} />;
      })}
    </div>
  );
};

export const getServerSideProps = async () => {
  const { data } = await getSports();

  return {
    props: {
      news: data.sports,
    },
  };
};

export default News;
