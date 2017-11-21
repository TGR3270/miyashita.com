import React from 'react';
import { getRouteProps } from 'react-static';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

import styles from './Member.css';
import ContentWrapper from '../components/ContentWrapper';
import MarkdownContent from '../components/MarkdownContent';
import FaceImage from '../components/FaceImage';

const Member = ({ page }) => (
  <ContentWrapper style={{ padding: '1rem' }}>
    <div className={styles.base}>
      <div className={styles.image}>
        <FaceImage src={page.avatar} size={200} />
      </div>
      <div className={styles.content}>
        <h1>{page.title}</h1>
        <MarkdownContent ast={page.content} />
      </div>
    </div>
  </ContentWrapper>
);

export default getRouteProps(withStyles(styles)(Member));
