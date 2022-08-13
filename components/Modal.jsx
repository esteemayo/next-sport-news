import styles from '@/styles/Modal.module.css';

const Modal = ({ title, onClose, children }) => {
  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <div className={styles.header}>
          <a href='#' onClick={() => onClose(false)}>
            <button className='btn'>Close</button>
          </a>
        </div>
        {title && <div>{title}</div>}
        <div className={styles.body}>{children}</div>
      </div>
    </div>
  );
};

export default Modal;
