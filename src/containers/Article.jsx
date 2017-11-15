import React from 'react';
import { getRouteProps } from 'react-static';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

import styles from './Article.css';
import HeaderImage from '../components/HeaderImage';
import ContentWrapper from '../components/ContentWrapper';
import MarkdownContent from '../components/MarkdownContent';

const Article = ({ article }) => (
  <div className={styles.base}>
    <HeaderImage fit="cover" src={article.thumbnail} title={article.title} />
    <ContentWrapper
      style={{
        paddingTop: '1rem',
      }}
    >
      <MarkdownContent ast={article.content} />
    </ContentWrapper>
  </div>
);

export default getRouteProps(withStyles(styles)(Article));
