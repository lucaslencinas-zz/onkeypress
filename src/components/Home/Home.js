import React from 'react';
import Hero from './Hero';
import Games from './Games';
import ComingSoon from './ComingSoon';
import Technologies from './Technologies';
import styles from './Home.css';

const Home = () => (
  <div className={styles.home}>
    <Hero />
    <Games />
    <ComingSoon />
    <Technologies />
  </div>
);

Home.propTypes = {};

export default Home;
