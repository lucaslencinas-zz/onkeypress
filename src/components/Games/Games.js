import React, { PropTypes } from 'react';
import { games } from '~/utils/games';
import styles from './Games.css';

console.log(games);
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
    <span>{game.img}</span>
    <span>{game.description}</span>
    <span>{game.status}</span>
  </div>
);

Card.propTypes = {
  game: PropTypes.object
};
