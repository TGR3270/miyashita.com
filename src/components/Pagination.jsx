import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import classnames from 'classnames';
import FontAwesome from 'react-fontawesome';

import styles from './Pagination.css';
import Link from './Link';

function generatePath(basePath, count) {
  if (count <= 1) {
    return basePath;
  }
  return `${basePath}/page/${count}/`;
}

const PaginationLink = ({ children, to, current, ...rest }) => {
  const className = classnames(styles.link, {
    [styles.enabled]: to,
    [styles.disabled]: !to && !current,
    [styles.current]: current,
  });
  return (
    <li className={styles.linkWrapper}>
      {to ? (
        <Link {...rest} className={className} to={to}>
          {children}
        </Link>
      ) : (
        <span {...rest} className={className}>
          {children}
        </span>
      )}
    </li>
  );
};

const Pagination = ({ count: current, maxCount, basePath }) => {
  const startShowCount = Math.max(current - 2, 1);
  const lastShowCount = Math.min(current + 2, maxCount);
  const PaginationListJSX = [];

  for (let cnt = startShowCount; cnt <= lastShowCount; cnt++) {
    if (cnt !== current) {
      PaginationListJSX.push(
        <PaginationLink key={cnt} to={generatePath(basePath, cnt)}>
          {cnt}
        </PaginationLink>,
      );
    } else {
      PaginationListJSX.push(
        <PaginationLink key={cnt} current>
          {cnt}
        </PaginationLink>,
      );
    }
  }

  if (startShowCount > 1) {
    PaginationListJSX.unshift(<PaginationLink key="prev-dots">...</PaginationLink>);
  }
  if (lastShowCount < maxCount) {
    PaginationListJSX.push(<PaginationLink key="next-dots">...</PaginationLink>);
  }
  PaginationListJSX.unshift(
    <PaginationLink key="prev" to={1 < current && generatePath(basePath, current - 1)}>
      <FontAwesome name="angle-left" />
    </PaginationLink>,
  );
  PaginationListJSX.push(
    <PaginationLink key="next" to={current < maxCount && generatePath(basePath, current + 1)}>
      <FontAwesome name="angle-right" />
    </PaginationLink>,
  );

  return (
    <div className={styles.base}>
      <ul className={styles.wrapper}>{PaginationListJSX}</ul>
    </div>
  );
};

export default withStyles(styles)(Pagination);
