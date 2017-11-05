import React, { PropTypes } from 'react';
import { games } from '~/utils/games';
import styles from './Games.css';

const Games = () => (
  <div className={styles.games}>
    <h3>Games</h3>
    <div className={styles.cards}>
      {games.slice(0, 3).map((game, i) => <Card game={game} key={`${i + 1}`} />)}
    </div>
  </div>
);

Games.propTypes = {};

export default Games;

const Card = ({ game }) => (
  <div className={styles.card}>
    <h5>{game.name}</h5>
    <div>{game.img}</div>
    <div>{game.status}</div>
  </div>
);

Card.propTypes = {
  game: PropTypes.object
};
