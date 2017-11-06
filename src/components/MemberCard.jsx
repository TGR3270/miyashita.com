import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { FaAngleRight } from 'react-icons/lib/fa';
import styles from './MemberCard.css';

import Link from './Link';
import FaceImage from './FaceImage';

const MemberCard = props => {
  const { info } = props;
  const status = `${info.category.split('_')[1]}${info.school_year || ''}`;

  return (
    <Link className={styles.base} to={info.permalink}>
      <div className={styles.image}>
        <FaceImage src={info.avatar} size="100%" />
      </div>
      <div className={styles.description}>
        <p className={styles.descriptionLine}>
          <small className={styles.status}>{status}</small>
        </p>
        <p className={styles.descriptionLine}>
          <span className={styles.name}>
            <span>{info.title}</span>
            <FaAngleRight />
          </span>
        </p>
      </div>
    </Link>
  );
};

export default withStyles(styles)(MemberCard);
