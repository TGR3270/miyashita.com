import React from 'react';
import { Router } from 'react-static';
import Routes from 'react-static-routes';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

import ScrollToTop from './components/ScrollToTop';
import Nav from './components/Nav';
import Footer from './components/Footer';
import styles from './app.css';

const App = () => (
  <Router>
    <div className={styles.base}>
      <header className={styles.header}>
        <Nav />
      </header>
      <main className={styles.main}>
        <ScrollToTop>
          <Routes />
        </ScrollToTop>
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  </Router>
);

export default withStyles(styles)(App);