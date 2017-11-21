import React from 'react';
import classnames from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import styles from './HeaderImage.css';

import AutoTextWrap from './AutoTextWrap';
import OptimizeImage from './OptimizeImage';

const HeaderImage = ({ src, fit = 'contain', alt, title = null, blur = true }) => {
  const image = (
    <div
      className={styles.base}
      style={{
        height: fit === 'cover' ? '100%' : 'auto',
      }}
    >
      <OptimizeImage
        className={styles.image}
        style={{ objectFit: fit || 'contain' }}
        src={src}
        alt={alt}
      />
    </div>
  );
  if (!title) {
    return image;
  }

  return (
    <div className={styles.header}>
      <div
        className={classnames({
          [styles.headerWrapper]: true,
          [styles.headerBlur]: blur,
        })}
      >
        {image}
      </div>
      <div className={styles.headerCover}>
        <div className={styles.titleWrapper}>
          <h1 className={styles.title}>
            <p className={styles.border}>
              <AutoTextWrap text={title} />
            </p>
          </h1>
        </div>
      </div>
    </div>
  );
};

export default withStyles(styles)(HeaderImage);
