import React, { PropTypes } from 'react';
import config from 'config';
import { BOARD_HEIGHT } from '~/utils/constants';
import { isFoodPosition, generateFoodPosition } from '~/utils/position';
import { directions } from '~/utils/directions';
import Row from './Row';
import styles from './Board.css';

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      status: this.props.status,
      direction: this.props.direction,
      snake: config.games.snake.initialState.snakePosition,
      food: config.games.snake.initialState.foodPosition,
      speed: config.games.snake.initialState.speed
    };

    this.moveSnake = this.moveSnake.bind(this);
  }

  componentDidMount() {
    this.moveSnake();
  }

  componentWillReceiveProps({ direction, status }) {
    this.setState({ status, direction });
  }

  movePiece(piece) {
    switch (this.state.direction) {
      case directions.UP:
        return { x: piece.x, y: piece.y - 1 };
      case directions.RIGHT:
        return { x: piece.x + 1, y: piece.y };
      case directions.DOWN:
        return { x: piece.x, y: piece.y + 1 };
      case directions.LEFT:
        return { x: piece.x - 1, y: piece.y };
      default:
        return null;
    }
  }

  removeLastSnakePiece() {
    const { snake } = this.state;

    return snake.slice(0, snake.length - 1);
  }

  moveSnake() {
    const { snake, food } = this.state;
    const head = snake[0];
    const newHead = this.movePiece(head);
    let newSnake;
    if (isFoodPosition(food, newHead)) { // eat food
      newSnake = [newHead].concat(snake);
      this.setState({ snake: newSnake, food: generateFoodPosition(newSnake) });
    } else {
      newSnake = [newHead].concat(this.removeLastSnakePiece());
      this.setState({ snake: newSnake });
    }

    setTimeout(this.moveSnake, 5);
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

Board.propTypes = {
  status: PropTypes.string,
  direction: PropTypes.string
};

export default Board;
