import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import styles from './HeaderImage.css';

const HeaderImage = props => (
  <div className={styles.base}>
    <img className={styles.image} style={{ objectFit: props.fit || 'contain' }} src={props.src} alt={props.alt} />
  </div>
);

export default withStyles(styles)(HeaderImage);
