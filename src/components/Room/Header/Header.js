import React, { PropTypes } from 'react';
import styles from './Header.css';

const Header = ({ room = {} }) => (
  <div className={styles.header}>
    <div className={styles.name}>
      <span>Room: {room.name}</span>
    </div>
    <div className={styles.center}>
      <div className={styles.gameType}>
        {room.gameType}
      </div>
      <div className={styles.score}>
        Score: {room.game.score}
      </div>
    </div>
    <div className={styles.pass}>
      <span>Pass: {room.password}</span>
    </div>
  </div>
);

Header.propTypes = {
  room: PropTypes.object
};

export default Header;
