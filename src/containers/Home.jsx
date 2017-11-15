import React from 'react';
import { getRouteProps } from 'react-static';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { FaAngleRight } from 'react-icons/lib/fa';

import styles from './Home.css';
import headerImagePath from '../assets/header.jpg';
import Link from '../components/Link';
import HeaderImage from '../components/HeaderImage';
import ContentWrapper from '../components/ContentWrapper';
import ThumbnailCardList from '../components/ThumbnailCardList';
import MemberCardList from '../components/MemberCardList';

class Home extends React.Component {
  render() {
    const { news, projects, members } = this.props;

    return (
      <div className={styles.base}>
        <HeaderImage src={headerImagePath} alt="Miyashita Lab" />
        <div className={styles.contentWrapper}>
          <ContentWrapper style={{ padding: 15 }}>
            <h2 className={styles.headerWrapper}>
              <span className={styles.header}>最新情報</span>
              <Link href="https://news.miyashita.com" className={styles.more}>
                <span>すべて見る</span>
                <FaAngleRight />
              </Link>
            </h2>
            <ThumbnailCardList items={news} />
            <h2 className={styles.headerWrapper}>
              <span className={styles.header}>プロジェクト</span>
              <Link to="./projects" className={styles.more}>
                <span>すべて見る</span>
                <FaAngleRight />
              </Link>
            </h2>
            <ThumbnailCardList items={projects} />
            <h2 className={styles.headerWrapper}>
              <span className={styles.header}>メンバー</span>
              <Link to="./members" className={styles.more}>
                <span>すべて見る</span>
                <FaAngleRight />
              </Link>
            </h2>
            <MemberCardList members={members} />
          </ContentWrapper>
        </div>
      </div>
    );
  }
}
export default getRouteProps(withStyles(styles)(Home));
