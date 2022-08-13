import Link from 'next/link';
import Head from 'next/head';

import NewsItem from '@/components/NewsItem';
import { getSports } from '@/services/sportService';

export default function Home({ news }) {
  console.log(news);
  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <meta name='description' content='Generated by create next app' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
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
}

export const getStaticProps = async () => {
  const { data } = await getSports();

  return {
    props: {
      news: data.sports.slice(0, 5),
    },
    revalidate: 1,
  };
};
