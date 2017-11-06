import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import styles from './FaceImage.css';

const FaceImage = props => {
  const { src, size } = props;

  return (
    <div style={{ width: size, height: size }} className={styles.base}>
      <div className={styles.imagePadding} />
      <div className={styles.image} style={{ backgroundImage: `url(${src})` }} />
    </div>
  );
};

export default withStyles(styles)(FaceImage);
