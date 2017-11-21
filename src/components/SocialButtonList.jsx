import React from 'react';
import { withRouter } from 'react-router';
import { getSiteProps, getRouteProps } from 'react-static';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import styles from './SocialButtonList.css';

import SocialButton from './SocialButton';

function generateTitle({ page, site }) {
  return `${page.title} | ${site.title}`;
}

const SocialButtonList = ({ page, site, location }) => {
  const pageTitle = encodeURIComponent(generateTitle({ page, site }));
  const pageUrl = encodeURIComponent(`${site.root}${location.pathname}`);
  const twitterUrl = `https://twitter.com/share?url=${pageUrl}&text=${pageTitle}`;
  const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${pageUrl}`;

  return (
    <div className={styles.base}>
      <SocialButton href={twitterUrl} color="#1DA1F2" service="Twitter" icon="twitter" />
      <SocialButton
        href={facebookUrl}
        color="#3B5998"
        service="Facebook"
        icon="facebook-official"
      />
    </div>
  );
};

export default getSiteProps(getRouteProps(withRouter(withStyles(styles)(SocialButtonList))));
