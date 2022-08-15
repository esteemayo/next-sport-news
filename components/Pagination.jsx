import Link from 'next/link';
import styles from '@/styles/Pagination.module.css';

const Pagination = ({ page, numberOfPages }) => {
  const renderPagination = () => {
    if (page === numberOfPages && page === 1) return null;
    if (page === 1) {
      return (
        <>
          <Link href={`/news?page=${page + 1}`}>
            <a className='btn btn-secondary'>Next</a>
          </Link>
          <small>
            Page {page} of {numberOfPages}
          </small>
        </>
      );
    } else if (page !== numberOfPages) {
      return (
        <>
          <Link href={`/news?page=${page - 1}`}>
            <a className='btn btn-secondary'>Prev</a>
          </Link>
          <small>
            Page {page} of {numberOfPages}
          </small>
          <Link href={`/news?page=${page + 1}`}>
            <a className='btn btn-secondary'>Next</a>
          </Link>
        </>
      );
    } else {
      return (
        <>
          <Link href={`/news?page=${page - 1}`}>
            <a className='btn btn-secondary'>Prev</a>
          </Link>
          <small>
            Page {page} of {numberOfPages}
          </small>
        </>
      );
    }
  };
  return <div className={styles.container}>{renderPagination()}</div>;
};

export default Pagination;
