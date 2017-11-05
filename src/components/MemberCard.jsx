import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { FaAngleRight } from 'react-icons/lib/fa';
import styles from './MemberCard.css';

import Link from './Link';

const MemberCard = props => {
  const { info } = props;
  const status = `${info.category.split('_')[1]}${info.school_year || ''}`;

  return (
    <Link className={styles.base} to={info.permalink}>
      <div className={styles.imageCard}>
        <div className={styles.imagePadding} />
        <div className={styles.image} style={{ backgroundImage: `url(${info.avatar})` }} />
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
