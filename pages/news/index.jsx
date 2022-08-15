import Link from 'next/link';

import NewsItem from '@/components/NewsItem';
import styles from '@/styles/News.module.css';
import Pagination from '@/components/Pagination';
import { getSports } from '@/services/sportService';

const News = ({ news, page, numberOfPages }) => {
  return (
    <>
      <Link href='/'>
        <a className={styles.back}>Go Back</a>
      </Link>
      <h1>News</h1>
      {news.length === 0 && <h3>No News</h3>}
      {news.map((item) => {
        return <NewsItem key={item._id} {...item} />;
      })}
      {news.length >= 5 && (
        <Pagination page={page} numberOfPages={numberOfPages} />
      )}
    </>
  );
};

export const getServerSideProps = async ({ query: { page } }) => {
  const { data } = await getSports(page);

  return {
    props: {
      news: data.sports,
      page: data.currentPage,
      numberOfPages: data.numberOfPages,
    },
  };
};

export default News;
