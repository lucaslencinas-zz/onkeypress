import React from 'react';
import PropTypes from 'prop-types';
import styles from './Buttons.css';

const Buttons = ({ players = [] }) => (
  <div className={styles.buttons}>
    <div className={styles.content}>
      {players.map((player) => (
        <div key={player.slug} className={styles.player}>
          <span className={styles.name}>
            {player.name}
          </span>
          <span className={styles.button} display-if={player.buttonAssigned}>
            {` - ${player.buttonAssigned || 'Waiting'}`}
          </span>
        </div>
      ))}
    </div>
  </div>
);

Buttons.propTypes = {
  players: PropTypes.arrayOf(PropTypes.object)
};

export default Buttons;
