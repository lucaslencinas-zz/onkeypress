import React from 'react';
import Link from 'react-router/lib/Link';
import styles from './TopBar.css';

const TopBar = () => (
  <div className={styles.topBar}>
    <div className={styles.left}>
      <span>onKeyPress()</span>
    </div>
    <div className={styles.right}>
      <Link to={'/games'}>All games</Link>
    </div>
  </div>
);

TopBar.propTypes = {};

export default TopBar;
