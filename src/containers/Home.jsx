import React from 'react';
import { getRouteProps } from 'react-static';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

import styles from './Home.css';
import headerImagePath from '../assets/header.jpg';
import HomeHeader from '../components/HomeHeader';
import HeaderImage from '../components/HeaderImage';
import ContentWrapper from '../components/ContentWrapper';
import ThumbnailCardList from '../components/ThumbnailCardList';
import MemberCardList from '../components/MemberCardList';
import withMetadata from '../util/withMetadata';

const Home = ({ page: { news, projects, members } }) => {
  return (
    <div className={styles.base}>
      <HeaderImage src={headerImagePath} alt="Miyashita Lab" />
      <div className={styles.contentWrapper}>
        <ContentWrapper style={{ padding: 15 }}>
          <HomeHeader title="ニュース" to="/news/" />
          <ThumbnailCardList items={news} />

          <HomeHeader title="プロジェクト" to="/projects/" />
          <ThumbnailCardList items={projects} />

          <HomeHeader title="メンバー" to="/members/" />
          <MemberCardList members={members} />
        </ContentWrapper>
      </div>
    </div>
  );
};
export default withMetadata(getRouteProps(withStyles(styles)(Home)));
