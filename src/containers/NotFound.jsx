import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import FontAwesome from 'react-fontawesome';

import styles from './NotFound.css';
import ContentWrapper from '../components/ContentWrapper';
import Link from '../components/Link';
import withMetadata from '../util/withMetadata';

const NotFound = () => (
  <div className={styles.base}>
    <ContentWrapper>
      <div className={styles.wrapper}>
        <div className={styles.inner}>
          <h1>404 | Not Found</h1>
          <p>この URL は存在していません．</p>
          <p>
            <Link className={styles.link} to="/">
              <FontAwesome name="angle-left" />
              ページトップに戻る
            </Link>
          </p>
        </div>
      </div>
    </ContentWrapper>
  </div>
);

export default withMetadata(withStyles(styles)(NotFound));
