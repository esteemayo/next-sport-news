import { FaTimes } from 'react-icons/fa';
import styles from '@/styles/Popup.module.css';

const Popup = ({ name, newsId, onClose, onDelete }) => {
  return (
    <div className={styles.popupOverlay}>
      <div className={styles.popupWrapper}>
        <div className={styles.popupHeader}>
          <span>Delete News?</span>
          <FaTimes
            className={styles.closeIcon}
            onClick={() => onClose(false)}
          />
        </div>
        <div className={styles.popupBody}>
          <p>
            Are you sure that you wanted to delete the &apos;{name}&apos; news?
          </p>
        </div>
        <div className={styles.popupFooter}>
          <button className={styles.cancelBtn} onClick={() => onClose(false)}>
            Cancel
          </button>
          <button
            className={styles.deleteBtn}
            onClick={() => {
              onDelete(newsId);
              onClose(false);
            }}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default Popup;
