import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import styles from './FaceImage.css';

import OptimizeImage from './OptimizeImage';

const FaceImage = props => {
  const { src, size } = props;

  return (
    <div style={{ width: size, height: size }} className={styles.base}>
      <div className={styles.imagePadding} />
      <OptimizeImage className={styles.image} src={src} width={size} height={size} />
    </div>
  );
};

export default withStyles(styles)(FaceImage);
