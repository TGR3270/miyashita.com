import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import tinytime from 'tinytime';

import styles from './NewsHeader.css';
import OptimizeImage from './OptimizeImage';
import AutoTextWrap from '../components/AutoTextWrap';

const dateTemplate = tinytime('{YYYY}/{Mo}/{DD}', { padMonth: true });

const NewsHeader = ({ news }) => {
  const date = new Date(news.date);
  return (
    <div className={styles.header}>
      <div className={styles.imageWrapper}>
        <OptimizeImage className={styles.image} src={news.thumbnail} alt={news.title} />
      </div>
      <h1>
        <AutoTextWrap text={news.title} />
      </h1>
      <p className={styles.date}>
        <time dateTime={date.toISOString()}>{dateTemplate.render(date)}</time>
      </p>
    </div>
  );
};

export default withStyles(styles)(NewsHeader);
