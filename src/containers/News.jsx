import React from 'react';
import { getRouteProps } from 'react-static';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

import styles from './News.css';
import NewsHeader from '../components/NewsHeader';
import ContentWrapper from '../components/ContentWrapper';
import MarkdownContent from '../components/MarkdownContent';
import SocialButtonList from '../components/SocialButtonList';

const News = ({ page }) => (
  <div className={styles.base}>
    <NewsHeader page={page} />
    <ContentWrapper style={{ paddingTop: 0 }}>
      <SocialButtonList />
      <MarkdownContent ast={page.content} />
    </ContentWrapper>
  </div>
);

export default getRouteProps(withStyles(styles)(News));
