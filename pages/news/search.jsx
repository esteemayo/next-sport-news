import Link from 'next/link';
import { useRouter } from 'next/router';

import NewsItem from '@/components/NewsItem';
import styles from '@/styles/News.module.css';
import { searchSport } from '@/services/sportService';

const SearchPage = ({ news }) => {
  const { query } = useRouter();

  return (
    <>
      <h1>Search Results for {query.searchQuery}</h1>
      {news.length === 0 && <h3>No search result for {query.searchQuery}</h3>}
      {news.map((item) => {
        return <NewsItem key={item._id} {...item} />;
      })}
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
