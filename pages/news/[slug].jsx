import Link from 'next/link';
import Image from 'next/image';
import Moment from 'react-moment';
import { FaUser } from 'react-icons/fa';

import styles from '@/styles/News.module.css';
import * as sportAPI from '@/services/sportService';
import DisqusThread from '@/components/DisqusThread';

const SingleNews = ({ news }) => {
  const showDisqusComment = () => {
    return (
      <>
        <DisqusThread id={news._id} title={news.name} path={news.slug} />
      </>
    );
  };

  return (
    <>
      <div className={styles.news}>
        <Link href='/news'>
          <a className={styles.back}>Go Back</a>
        </Link>
        <br />
        <span>
          <Moment format='yyyy-MM-DD'>{news.date}</Moment> {news.time}
        </span>
        <p>
          <FaUser /> Posted By: <strong>{news.user.username}</strong>
        </p>
        <h1>{news.name}</h1>
        <div className={styles.image}>
          <Image
            src={news.image ? news.image : '/images/hero.jpg'}
            width={900}
            height={600}
            alt={news.name}
          />
        </div>
        <p>{news.detail}</p>
      </div>
      {showDisqusComment()}
    </>
  );
};

export const getStaticPaths = async () => {
  const { data } = await sportAPI.getSports();

  const paths = data.sports.map((item) => ({
    params: { slug: item.slug },
  }));

  return {
    paths,
    fallback: true,
  };
};

export const getStaticProps = async ({ params: { slug } }) => {
  const { data } = await sportAPI.getSportBySlug(slug);

  return {
    props: {
      news: data.sport,
    },
    revalidate: 1,
  };
};

export default SingleNews;
