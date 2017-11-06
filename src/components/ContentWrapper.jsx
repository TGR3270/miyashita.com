import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import styles from './ContentWrapper.css';

const ContentWrapper = props => (
  <div style={{ padding: props.padding || '2rem' }} className={styles.base}>
    {props.children}
  </div>
);

export default withStyles(styles)(ContentWrapper);
