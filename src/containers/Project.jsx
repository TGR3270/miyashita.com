import React from 'react';
import { getRouteProps } from 'react-static';
import Mikan from 'mikanjs';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

import styles from './Project.css';
import HeaderImage from '../components/HeaderImage';
import ContentWrapper from '../components/ContentWrapper';
import MarkdownContent from '../components/MarkdownContent';

const Project = ({ project }) => {
  const titleWordsJSX = Mikan.split(project.title).map((word, idx) => (
    <span key={idx} role="presentation" className={styles.titleWord}>
      {word}
    </span>
  ));

  return (
    <div className={styles.base}>
      <div className={styles.header}>
        <div className={styles.headerBlur}>
          <HeaderImage fit="cover" src={project.thumbnail} />
        </div>
        <div className={styles.headerWrapper}>
          <div className={styles.titleWrapper}>
            <h1 className={styles.title}>{titleWordsJSX}</h1>
          </div>
        </div>
      </div>
      <ContentWrapper>
        <div className={styles.content}>
          <MarkdownContent ast={project.content} />
        </div>
      </ContentWrapper>
    </div>
  );
};

export default getRouteProps(withStyles(styles)(Project));
