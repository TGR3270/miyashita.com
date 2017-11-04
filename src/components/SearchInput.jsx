import React from 'react';
import { FaSearch } from 'react-icons/lib/fa';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import styles from './SearchInput.css';

const SearchInput = () => (
  <div className={styles.base}>
    <input type="text" placeholder="論文データベース検索" className={styles.input} />
    <FaSearch />
  </div>
);

export default withStyles(styles)(SearchInput);
