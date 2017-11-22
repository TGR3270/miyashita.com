import React from 'react';
import { getRouteProps } from 'react-static';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

import styles from './Article.css';
import HeaderImage from '../components/HeaderImage';
import ContentWrapper from '../components/ContentWrapper';
import MarkdownContent from '../components/MarkdownContent';
import SocialButtonList from '../components/SocialButtonList';
import withMetadata from '../util/withMetadata';

const Article = ({ page }) => (
  <div className={styles.base}>
    <HeaderImage fit="cover" src={page.thumbnail} title={page.title} />
    <ContentWrapper style={{ paddingTop: 0 }}>
      <SocialButtonList />
      <MarkdownContent ast={page.content} />
    </ContentWrapper>
  </div>
);

export default withMetadata(getRouteProps(withStyles(styles)(Article)));
