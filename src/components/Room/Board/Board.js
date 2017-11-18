import React from 'react';
import { BOARD_HEIGHT } from '~/utils/constants';
import Row from './Row';
import styles from './Board.css';

const INITIAL_SNAKE_POSITIONS = [{ x: 5, y: 1 }, { x: 4, y: 1 }, { x: 3, y: 1 }, { x: 2, y: 1 }, { x: 1, y: 1 }];
const INITIAL_FOOD_POSITION = { x: 20, y: 20 };

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
