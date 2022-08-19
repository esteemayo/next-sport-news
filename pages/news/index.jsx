import Link from 'next/link';
import { lazy, Suspense } from 'react';

import Spinner from '@/components/Spinner';
import Pagination from '@/components/Pagination';
import { getSports } from '@/services/sportService';

import styles from '@/styles/News.module.css';

const NewsItem = lazy(() => import('@/components/NewsItem'));

const News = ({ news, page, numberOfPages }) => {
  return (
    <>
      <Link href='/'>
        <a className={styles.back}>Go Back</a>
      </Link>
      <h1>News</h1>
      {news.length === 0 && <h3>No News</h3>}
      <Suspense fallback={<Spinner />}>
        {news.map((item) => {
          return <NewsItem key={item._id} {...item} />;
        })}
      </Suspense>
      {<Pagination page={page} numberOfPages={numberOfPages} />}
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
