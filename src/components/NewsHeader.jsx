import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import tinytime from 'tinytime';

import styles from './NewsHeader.css';
import OptimizeImage from './OptimizeImage';
import AutoTextWrap from '../components/AutoTextWrap';

const dateTemplate = tinytime('{YYYY}/{Mo}/{DD}', { padMonth: true });

const NewsHeader = ({ page }) => {
  const date = new Date(page.date);
  return (
    <div className={styles.header}>
      <div className={styles.imageWrapper}>
        <OptimizeImage className={styles.image} src={page.thumbnail} alt={page.title} />
      </div>
      <h1>
        <AutoTextWrap text={page.title} />
      </h1>
      <p className={styles.date}>
        <time dateTime={date.toISOString()}>{dateTemplate.render(date)}</time>
      </p>
    </div>
  );
};

export default withStyles(styles)(NewsHeader);
