import React, { PropTypes } from 'react';
import styles from './Header.css';

const Header = ({ room = {}, score = 0 }) => (
  <div className={styles.header}>
    <div className={styles.name}>
      <span>Room: {room.name}</span>
    </div>
    <div className={styles.center}>
      <div className={styles.gameType}>
        {room.gameType}
      </div>
      <div className={styles.score}>
        Score: {score}
      </div>
    </div>
    <div className={styles.pass}>
      <span>Pass: {room.password}</span>
    </div>
  </div>
);

Header.propTypes = {
  room: PropTypes.object,
  score: PropTypes.number
};

export default Header;
