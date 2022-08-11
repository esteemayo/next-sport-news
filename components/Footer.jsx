import styles from '@/styles/Footer.module.css';

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <p>Copyright &copy; Sport News {year}</p>
    </footer>
  );
};

export default Footer;
