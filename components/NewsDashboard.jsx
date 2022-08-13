import Link from 'next/link';
import styles from '@/styles/NewsDashboard.module.css';

const NewsDashboard = ({ _id: id, name, slug, onDelete }) => {
  return (
    <div className={styles.news}>
      <h4>
        <Link href={`/news/${slug}`} passHref>
          {name}
        </Link>
      </h4>
      <Link href={`/news/edit/${id}`} passHref>
        <button className='btn-edit'>Edit News</button>
      </Link>
      <button className='btn-delete' onClick={() => onDelete(id)}>
        Delete News
      </button>
    </div>
  );
};

export default NewsDashboard;
