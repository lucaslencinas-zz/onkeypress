import React from 'react';
import Link from 'react-router/lib/Link';
import styles from './Home.css';

const Home = () => (
  <div className={styles.home}>
    <div className={styles.title}>
      <h3>Welcome to onKeyPress()</h3>
    </div>
    <div className={styles.form}>
      <Link to={'/join'} className={styles.button}>Join</Link>
      <Link to={'/create'} className={styles.button}>Create</Link>
    </div>
  </div>
);

Home.propTypes = {};

export default Home;
