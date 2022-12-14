import Link from 'next/link';
import { FaExclamationTriangle } from 'react-icons/fa';

import Meta from '@/components/Meta';
import styles from '@/styles/404.module.css';

const NotFound = () => {
  return (
    <>
      <Meta title='Page Not Found' />
      <div className={styles.error}>
        <h1>
          <FaExclamationTriangle /> 404
        </h1>
        <h4>Sorry, Nothing is here</h4>
        <Link href='/'>Go Back Home</Link>
      </div>
    </>
  );
};

export default NotFound;
