import Link from 'next/link';
import styles from '@/styles/Header.module.css';

const Header = () => {
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
          <li>
            <Link href='/auth/login'>
              <a className='btn-secondary'>Login</a>
            </Link>
          </li>
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
