import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import url from 'url';

import styles from './AwesomeIframe.css';
import OptimizeImage from './OptimizeImage';

function optimizeSrc(origin) {
  if (/youtube\.com/.test(origin)) {
    const parsed = url.parse(origin, true);
    const videoId = parsed.pathname.split('/').pop();
    Object.assign(parsed.query, {
      rel: 0,
      showinfo: 1,
      autohide: 1,
      playsinline: 1,
      fs: 1,
    });
    return {
      src: url.format(parsed),
      thumbnail: `https://img.youtube.com/vi/${videoId}/0.jpg`,
    };
  }
  return { src: origin };
}

const AwesomeIframe = props => {
  const { width, height, ...rest } = props;
  const { src, thumbnail } = optimizeSrc(props.src);

  return (
    <div className={styles.base}>
      <div className={styles.wrapper}>
        {thumbnail && (
          <OptimizeImage className={styles.thumbnail} src={thumbnail} alt="video_thumbnail" />
        )}
        <iframe {...rest} src={src} className={styles.iframe} />
      </div>
    </div>
  );
};

export default withStyles(styles)(AwesomeIframe);
