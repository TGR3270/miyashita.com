import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import Sticky from 'react-stickynode';
import classNames from 'classnames';

import styles from './Nav.css';
import logoImgPath from '../assets/logo.png';

import Link from './Link';
import SearchInput from './SearchInput';
import OptimizeImage from './OptimizeImage';

const Nav = () => (
  <Sticky>
    <nav className={styles.base}>
      <div className={styles.wrapper}>
        <div className={classNames(styles.col, styles.rightCol)}>
          <Link className={styles.logoImgWrapper} to="/">
            <OptimizeImage className={styles.logoImg} src={logoImgPath} alt="logo" />
          </Link>
        </div>
        <div className={classNames(styles.col, styles.leftCol)}>
          <div className={styles.searchInputWrapper}>
            <SearchInput />
          </div>
        </div>
      </div>
    </nav>
  </Sticky>
);

export default withStyles(styles)(Nav);
