import Link from 'next/link';
import { lazy, Suspense } from 'react';
import { useRouter } from 'next/router';

import Meta from '@/components/Meta';
import Spinner from '@/components/Spinner';
import { searchSport } from '@/services/sportService';

import styles from '@/styles/News.module.css';

const NewsItem = lazy(() => import('@/components/NewsItem'));

const SearchPage = ({ news }) => {
  const { query } = useRouter();

  return (
    <>
      <Meta title='Search Results' />
      <h1>Search Results for {query.searchQuery}</h1>
      {news.length === 0 && <h3>No search result for {query.searchQuery}</h3>}
      <Suspense fallback={<Spinner />}>
        {news.map((item) => {
          return <NewsItem key={item._id} {...item} />;
        })}
      </Suspense>
      <Link href='/' passHref>
        <a className={styles.back}>Go Back</a>
      </Link>
    </>
  );
};

export const getServerSideProps = async ({ query: { searchQuery } }) => {
  const { data } = await searchSport(searchQuery);

  return {
    props: {
      news: data.sports,
    },
  };
};

export default SearchPage;
