import React from 'react';
import PropTypes from 'prop-types';
import styles from './Players.css';

const Players = ({ players = [] }) => (
  <div className={styles.players}>
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
);

Players.propTypes = {
  players: PropTypes.arrayOf(PropTypes.object)
};

export default Players;
