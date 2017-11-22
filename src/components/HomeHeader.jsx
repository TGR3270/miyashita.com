import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import FontAwesome from 'react-fontawesome';

import styles from './HomeHeader.css';
import Link from '../components/Link';

const HomeHeader = ({ title, to }) => (
  <h2 className={styles.headerWrapper}>
    <span className={styles.header}>{title}</span>
    <Link to={to} className={styles.more}>
      <span>すべて見る</span>
      <FontAwesome name="angle-right" />
    </Link>
  </h2>
);

export default withStyles(styles)(HomeHeader);
