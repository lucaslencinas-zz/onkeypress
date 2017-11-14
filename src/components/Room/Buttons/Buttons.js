import React from 'react';
import PropTypes from 'prop-types';
import styles from './Buttons.css';

const defaultButtons = ['LEFT', 'UP', 'DOWN', 'RIGHT'];

const renderIcon = (button) => (button === 'UPs' ? renderSVG(button) : button);
const renderPlayer = (button, players) => {
  const player = players.find((p) => p.button.name === button);

  return player ? player.name : 'Waiting';
};

const renderSVG = () => (
  <svg viewBox="0 0 50 50">
    <rect x="0" y="0" rx="5" ry="5" width="30" height="30" stroke="black" fill="black" strokeWidth="3" />
  </svg>
);

const Buttons = ({ players = [], buttons = defaultButtons }) => (
  <div className={styles.buttons}>
    <div className={styles.content}>
      {buttons.map((button, index) => (
        <div key={`${index + 1}`} className={styles.button}>
          <div className={styles.icon}>
            <span>{renderIcon(button)}</span>
          </div>
          <div className={styles.player}>
            {renderPlayer(button, players)}
          </div>
        </div>
      ))}
    </div>
  </div>
);

Buttons.propTypes = {
  buttons: PropTypes.arrayOf(PropTypes.object),
  players: PropTypes.arrayOf(PropTypes.object)
};

export default Buttons;
