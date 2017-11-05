import React, { PropTypes } from 'react';
import { games } from '~/utils/games';
import styles from './Games.css';

const Games = () => (
  <div className={styles.games}>
    <div className={styles.header}>
      <h3>All games</h3>
    </div>
    <input
      placeholder={'Search...'}
      className={styles.input}
      autoFocus
    />
    <div className={styles.cards}>
      {games.map((game, i) => <Card game={game} key={`${i + 1}`} />)}
    </div>
  </div>
);

Games.propTypes = {};

export default Games;

const Card = ({ game }) => (
  <div className={styles.card}>
    <h5>{game.name}</h5>
    <div>{game.img}</div>
    <div>{game.description}</div>
    <div>{game.status}</div>
  </div>
);

Card.propTypes = {
  game: PropTypes.object
};
