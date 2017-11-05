import React from 'react';
import Link from 'react-router/lib/Link';
import styles from './Hero.css';

const Hero = () => (
  <div className={styles.hero}>
    <div className={styles.content}>
      <div className={styles.heading}>
        <h3>Welcome to onKeyPress()</h3>
        <h4>A cooperative arcade/retro games portal</h4>
      </div>
      <div className={styles.buttons}>
        <Link to={'/create'} className={styles.button}>Create Room</Link>
        <Link to={'/join'} className={styles.button}>Join Room</Link>
      </div>
    </div>
  </div>
);

Hero.propTypes = {};

export default Hero;
