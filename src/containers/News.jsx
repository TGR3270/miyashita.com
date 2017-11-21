import React from 'react';
import { getRouteProps } from 'react-static';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import tinytime from 'tinytime';

import styles from './News.css';
import ContentWrapper from '../components/ContentWrapper';
import MarkdownContent from '../components/MarkdownContent';
import AutoTextWrap from '../components/AutoTextWrap';
import OptimizeImage from '../components/OptimizeImage';

const dateTemplate = tinytime('{YYYY}/{Mo}/{DD}', { padMonth: true });

const News = ({ news }) => {
  const date = new Date(news.date);

  return (
    <div className={styles.base}>
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
      <ContentWrapper
        style={{
          padding: '1rem',
          paddingBottom: '2rem',
        }}
      >
        <MarkdownContent ast={news.content} />
      </ContentWrapper>
    </div>
  );
};

export default getRouteProps(withStyles(styles)(News));
