import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import styles from '@/styles/Header.module.css';
import { setLogout } from '@/features/auth/authSlice';

const Header = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => ({ ...state.auth }));

  const [currentUser, setCurrentUser] = useState(null);

  const handleLogout = () => {
    dispatch(setLogout());
    router.push('/');
  };

  useEffect(() => {
    setCurrentUser(user);
  }, [user]);

  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <Link href='/' passHref>
          Sport News
        </Link>
      </div>
      <nav>
        <ul>
          <li>
            <Link href='/news' passHref>
              News
            </Link>
          </li>
          {currentUser ? (
            <>
              <li>
                <Link href='/news/add' passHref>
                  Add News
                </Link>
              </li>
              <li>
                <Link href='/auth/dashboard' passHref>
                  Dashboard
                </Link>
              </li>
              <button className='btn-secondary' onClick={handleLogout}>
                Logout
              </button>
            </>
          ) : (
            <>
              <li>
                <Link href='/auth/login'>
                  <a className='btn-secondary'>Login</a>
                </Link>
              </li>
            </>
          )}
          <li>
            <Link href='/about' passHref>
              About
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
