import React from 'react';
import { getRouteProps } from 'react-static';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

import styles from './NewsList.css';
import HeaderImage from '../components/HeaderImage';
import ContentWrapper from '../components/ContentWrapper';
import ThumbnailCardList from '../components/ThumbnailCardList';
import Pagination from '../components/Pagination';
import withMetadata from '../util/withMetadata';

const NewsList = ({ page: { items, ...paginationProps } }) => {
  return (
    <div className={styles.base}>
      <HeaderImage fit="cover" src="" title="ニュース" />
      <ContentWrapper>
        <ThumbnailCardList wrap={true} items={items} />
        <Pagination {...paginationProps} />
      </ContentWrapper>
    </div>
  );
};

export default withMetadata(getRouteProps(withStyles(styles)(NewsList)));
