import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import classnames from 'classnames';

import styles from './ContentWrapper.css';

const ContentWrapper = props => (
  <div {...props} className={classnames(props.className, styles.base)}>
    {props.children}
  </div>
);

export default withStyles(styles)(ContentWrapper);
