import React from 'react';
import { withRouter } from 'react-router';
import { getSiteProps, getRouteProps } from 'react-static';
import FontAwesome from 'react-fontawesome';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import styles from './SocialButton.css';

import Link from './Link';

const SocialButtonList = ({ href, color, service, icon }) => (
  <div className={styles.base}>
    <Link className={styles.button} href={href} style={{ backgroundColor: color }}>
      <FontAwesome className={styles.icon} name={icon} />
      <span>{service}</span>
    </Link>
  </div>
);

export default getSiteProps(getRouteProps(withRouter(withStyles(styles)(SocialButtonList))));
