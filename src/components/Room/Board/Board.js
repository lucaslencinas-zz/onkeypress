import React from 'react';
import {
  BOARD_HEIGHT,
  INITIAL_SNAKE_POSITIONS,
  INITIAL_FOOD_POSITION
} from '~/utils/constants';
import Row from './Row';
import styles from './Board.css';

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      snake: INITIAL_SNAKE_POSITIONS,
      food: INITIAL_FOOD_POSITION
    };
  }

  render() {
    const { snake, food } = this.state;
    const rows = [];

    for (let rowIndex = 0; rowIndex < BOARD_HEIGHT; rowIndex += 1) {
      rows.push(
        <Row
          key={rowIndex}
          rowIndex={rowIndex}
          snake={snake}
          food={food}
        />
      );
    }

    return (
      <div className={styles.board}>
        {rows}
      </div>
    );
  }
}

export default Board;
