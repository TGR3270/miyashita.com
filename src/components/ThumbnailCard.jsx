import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { FaAngleRight } from 'react-icons/lib/fa';
import format from 'date-fns/format';
import styles from './ThumbnailCard.css';

import Link from './Link';
import NoImagePath from '../assets/noimage.png';

const ThumbnailCard = props => {
  const { item } = props;
  const date = item.date && new Date(item.date);
  const isExternalURL = /^https?:\/\//.test(item.url);

  return (
    <div className={styles.itemWrapper}>
      <Link
        className={styles.item}
        to={isExternalURL ? null : item.url}
        href={isExternalURL ? item.url : null}
      >
        <div
          className={styles.thumbnailImage}
          style={{
            backgroundImage: `url(${item.thumbnail || NoImagePath})`,
          }}
        />
        {date && (
          <p className={styles.datetime}>
            <small>
              <time dateTime={format(date)}>{format(date, 'YYYY/MM/DD')}</time>
            </small>
          </p>
        )}
        <p className={styles.title}>
          <strong>{item.title}</strong>
        </p>
        <small className={styles.readmore}>
          <FaAngleRight />
          <span>続きを読む</span>
        </small>
      </Link>
    </div>
  );
};

export default withStyles(styles)(ThumbnailCard);
