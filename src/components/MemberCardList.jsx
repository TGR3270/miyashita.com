import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import styles from './MemberCardList.css';

import MemberCard from './MemberCard';

const MemberCardList = props => {
  const { members } = props;

  return (
    <div className={styles.base}>
      {members.map(member => <MemberCard key={member.title} info={member} />)}
    </div>
  );
};

export default withStyles(styles)(MemberCardList);
