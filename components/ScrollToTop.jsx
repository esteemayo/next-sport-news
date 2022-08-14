import { useEffect, useState } from 'react';
import { FaArrowCircleUp } from 'react-icons/fa';

import styles from '@/styles/Scroll.module.css';

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    if (window.pageYOffset > 250) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    document.addEventListener('scroll', toggleVisibility);

    return () => {
      document.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  return (
    <div className={styles.scroll}>
      {isVisible && (
        <div onClick={handleScrollToTop}>
          <FaArrowCircleUp />
        </div>
      )}
    </div>
  );
};

export default ScrollToTop;
