import React from 'react';
import styles from './ComingSoon.css';

const ComingSoon = () => (
  <div className={styles.comingSoon}>
    <h3>Coming Soon</h3>
    <div className={styles.columns}>
      <div className={styles.column}>
        <ul>
          <li>Scores</li>
          <li>Teams</li>
          <li>Accounts</li>
          <li>More Effects</li>
          <li>Music</li>
        </ul>
      </div>
      <div className={styles.column}>
        <ul>
          <li>Pacman</li>
          <li>Tetris</li>
          <li>Simon</li>
          <li>Arkanoid</li>
        </ul>
      </div>
      <div className={styles.column}>
        Mobile App
      </div>
    </div>
  </div>
);

ComingSoon.propTypes = {};

export default ComingSoon;
