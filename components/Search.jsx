import { useState } from 'react';
import { useRouter } from 'next/router';

import styles from '@/styles/Search.module.css';

const Search = () => {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (searchTerm) {
      router.push(`/news/search?searchQuery=${searchTerm}`);
      setSearchTerm('');
    } else {
      router.push('/');
    }
  };

  return (
    <div className={styles.search}>
      <form onSubmit={handleSubmit}>
        <input
          type='search'
          value={searchTerm}
          placeholder='Search News'
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </form>
    </div>
  );
};

export default Search;
