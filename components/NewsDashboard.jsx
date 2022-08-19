import Link from 'next/link';
import { useState } from 'react';
import PropTypes from 'prop-types';

import Popup from './Popup';
import styles from '@/styles/NewsDashboard.module.css';

const NewsDashboard = ({ _id: id, name, slug, onDelete }) => {
  const [showPopup, setShowPopup] = useState(false);

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
      <button className='btn-delete' onClick={() => setShowPopup(true)}>
        Delete News
      </button>
      {showPopup && (
        <Popup
          newsId={id}
          name={name}
          onClose={setShowPopup}
          onDelete={onDelete}
        />
      )}
    </div>
  );
};

NewsDashboard.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  slug: PropTypes.string.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default NewsDashboard;
