import React from 'react';
import PropTypes from 'prop-types';
import styles from './Button.css';

const coordinates = {
  UP: '50,10 10,40 10,90 90,90 90,40',
  LEFT: '10,50 30,90 90,90 90,10 40,10',
  DOWN: '10,10 10,60 50,90 90,60 90,10',
  RIGHT: '10,10 10,90 60,90 90,50 60,10'
};

const Button = ({ button, player }) => (
  <div className={styles.button}>
    <div className={styles.icon}>
      <span className={styles.innerIcon}>
        <svg viewBox="0 0 100 100" width="100%" height="100%">
          <polygon points={coordinates[button]} />
        </svg>
      </span>
    </div>
    <div className={styles.player}>
      {player ? player.name : 'Waiting'}
    </div>
  </div>
);

Button.propTypes = {
  button: PropTypes.string,
  player: PropTypes.object
};

export default Button;
