import React from 'react';
import PropTypes from 'prop-types';
import styles from './Players.css';

const renderPlayer = ({ name, button = 'Waiting' }) => `${name} - ${button}`;

const Players = ({ players = [] }) => (
  <div className={styles.players}>
    <h4>Players:</h4>
    <div className={styles.playerList}>
      {players.map((player) => (
        <div key={player.slug} className={styles.player}>
          {renderPlayer(player)}
        </div>
      ))}
    </div>
  </div>
);

Players.propTypes = {
  players: PropTypes.arrayOf(PropTypes.object)
};

export default Players;
