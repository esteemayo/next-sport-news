import Link from 'next/link';
import Image from 'next/image';
import Moment from 'react-moment';
import PropTypes from 'prop-types';
import { FaUser } from 'react-icons/fa';

import styles from '@/styles/NewsItem.module.css';

const NewsItem = ({ name, slug, date, time, user, image }) => {
  return (
    <div className={styles.news}>
      <div className={styles.img}>
        <Image
          src={image ? image : '/images/hero.jpg'}
          width={150}
          height={100}
          alt={name}
        />
      </div>
      <div className={styles.info}>
        <span>
          <Moment format='yyyy-MM-DD'>{date}</Moment> {time}
        </span>
        <h3>{name}</h3>
        <p>
          <FaUser /> Posted By: <strong>{user.username}</strong>
        </p>
      </div>
      <div className={styles.link}>
        <Link href={`/news/${slug}`}>
          <a className='btn'>Read More</a>
        </Link>
      </div>
    </div>
  );
};

NewsItem.propTypes = {
  name: PropTypes.string.isRequired,
  slug: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  time: PropTypes.string.isRequired,
  user: PropTypes.object.isRequired,
  image: PropTypes.string.isRequired,
};

export default NewsItem;
