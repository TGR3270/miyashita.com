import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import FontAwesome from 'react-fontawesome';
import styles from './MemberCard.css';

import Link from './Link';
import FaceImage from './FaceImage';

const MemberCard = props => {
  const { info } = props;
  const status =
    info.category === '99_OB'
      ? `${info.year_of_graduation}年度卒業`
      : `${info.category.split('_')[1]}${info.school_year || ''}`;

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
            <FontAwesome name="angle-right" />
          </span>
        </p>
      </div>
    </Link>
  );
};

export default withStyles(styles)(MemberCard);
