import React from 'react';
import { getRouteProps } from 'react-static';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

import styles from './News.css';
import NewsHeader from '../components/NewsHeader';
import ContentWrapper from '../components/ContentWrapper';
import MarkdownContent from '../components/MarkdownContent';

const News = ({ news }) => (
  <div className={styles.base}>
    <NewsHeader news={news} />
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

export default getRouteProps(withStyles(styles)(News));
