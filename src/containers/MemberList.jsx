import React from 'react';
import { getRouteProps } from 'react-static';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

import imageUrl from '../assets/memberHeader.jpg';
import styles from './MemberList.css';
import ContentWrapper from '../components/ContentWrapper';
import HeaderImage from '../components/HeaderImage';
import MemberCardList from '../components/MemberCardList';

const MemberList = ({ page: { currentMembers, OBMembers } }) => (
  <div className={styles.base}>
    <HeaderImage fit="cover" blur={false} src={imageUrl} title="メンバー" />

    <ContentWrapper>
      <h2>現役メンバー</h2>
      <MemberCardList members={currentMembers} />
      <h2>OB・OG</h2>
      <MemberCardList members={OBMembers} />
    </ContentWrapper>
  </div>
);

export default getRouteProps(withStyles(styles)(MemberList));
