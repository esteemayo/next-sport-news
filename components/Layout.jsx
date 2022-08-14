import { useRouter } from 'next/router';
import { ToastContainer } from 'react-toastify';

import Hero from './Hero';
import Footer from './Footer';
import Header from './Header';

import 'react-toastify/dist/ReactToastify.css';
import styles from '@/styles/Layout.module.css';

const Layout = ({ children }) => {
  const { pathname } = useRouter();

  return (
    <div>
      <Header />
      <ToastContainer />
      {pathname === '/' && <Hero />}
      <div className={styles.container}>{children}</div>
      <Footer />
    </div>
  );
};

export default Layout;
