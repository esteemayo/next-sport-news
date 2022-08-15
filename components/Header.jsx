import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Search from './Search';
import styles from '@/styles/Header.module.css';
import { logoutUser } from '@/features/auth/authSlice';

const Header = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => ({ ...state.auth }));

  const [currentUser, setCurrentUser] = useState(null);

  const handleLogout = () => {
    dispatch(logoutUser());
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
      <Search />
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
          {currentUser && (
            <button className='btn-secondary' onClick={handleLogout}>
              Logout
            </button>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
