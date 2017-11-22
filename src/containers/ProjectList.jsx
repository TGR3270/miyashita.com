import React from 'react';
import { getRouteProps } from 'react-static';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

import styles from './ProjectList.css';
import HeaderImage from '../components/HeaderImage';
import ContentWrapper from '../components/ContentWrapper';
import ThumbnailCardList from '../components/ThumbnailCardList';
import withMetadata from '../util/withMetadata';

const ProjectList = ({ page: { projectsGroupByCategories } }) => {
  const categories = Object.keys(projectsGroupByCategories).sort((a, b) => a.localeCompare(b));
  const categoryJSXList = [];

  for (const category of categories) {
    const projects = projectsGroupByCategories[category];
    categoryJSXList.push(
      <div key={category} className={styles.wrapper}>
        <h2 className={styles.header}>{category}</h2>
        <ThumbnailCardList wrap={true} items={projects} />
      </div>,
    );
  }

  return (
    <div className={styles.base}>
      <HeaderImage fit="cover" src="" title="プロジェクト" />
      <ContentWrapper>{categoryJSXList}</ContentWrapper>
    </div>
  );
};

export default withMetadata(getRouteProps(withStyles(styles)(ProjectList)));
