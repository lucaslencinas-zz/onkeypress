import React, { PropTypes } from 'react';
import config from 'config';
import { BOARD_HEIGHT, STATUS } from '~/utils/constants';
import {
  isFoodPosition,
  generateFoodPosition,
  isSnakePosition,
  isBorderPosition
} from '~/utils/position';
import { directions } from '~/utils/directions';
import Row from './Row';
import styles from './Board.css';

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      direction: this.props.direction,
      snake: config.games.snake.initialState.snakePosition,
      food: config.games.snake.initialState.foodPosition,
      speed: config.games.snake.initialState.speed
    };

    this.moveSnake = this.moveSnake.bind(this);
    this.restartGame = this.restartGame.bind(this);
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

  restartGame() {
    const { roomSlug, onChangeDirection, onChangeStatus } = this.props;

    this.setState({
      snake: config.games.snake.initialState.snakePosition,
      food: config.games.snake.initialState.foodPosition,
      speed: config.games.snake.initialState.speed
    });
    onChangeDirection({ room: { slug: roomSlug }, direction: directions.RIGHT });
    onChangeStatus({ room: { slug: roomSlug }, status: STATUS.STARTED });
    this.moveSnake();
  }

  moveSnake() {
    const { snake, food } = this.state;
    const { roomSlug, onChangeStatus } = this.props;
    const head = snake[0];
    const newHead = this.movePiece(head);
    let newSnake;

    if (isSnakePosition(snake, newHead) || isBorderPosition(newHead)) {
      onChangeStatus({ room: { slug: roomSlug }, status: STATUS.ENDED });
      this.setState({ snake: [newHead].concat(snake) });
      setTimeout(this.restartGame, 3000);
      return null;
    }

    if (isFoodPosition(food, newHead)) {
      newSnake = [newHead].concat(snake);
      this.setState({ snake: newSnake, food: generateFoodPosition(newSnake) });
    } else {
      newSnake = [newHead].concat(this.removeLastSnakePiece());
      this.setState({ snake: newSnake });
    }

    setTimeout(this.moveSnake, 5);
    return null;
  }

  render() {
    const { snake, food, status } = this.state;
    const rows = [];

    for (let rowIndex = 0; rowIndex < BOARD_HEIGHT; rowIndex += 1) {
      rows.push(
        <Row
          key={rowIndex}
          rowIndex={rowIndex}
          snake={snake}
          food={food}
          status={status}
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
  roomSlug: PropTypes.string,
  status: PropTypes.string,
  onChangeStatus: PropTypes.func,
  onChangeDirection: PropTypes.func,
  direction: PropTypes.string
};

export default Board;
