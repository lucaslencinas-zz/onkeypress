import React, { PropTypes } from 'react';
import {
  SNAKE_CONTENT,
  FOOD_CONTENT,
  BORDER_CONTENT,
  BOARD_WIDTH
} from '~/utils/constants';
import {
  isSnakePosition,
  isBorderPosition,
  isFoodPosition
} from '~/utils/position';
import Position from '../Position';
import styles from './Row.css';

const Row = ({ rowIndex, snake = [], food = {} }) => {
  const positions = [];
  const getPositionContent = (position) => {
    if (isSnakePosition(snake, position)) return SNAKE_CONTENT;
    if (isFoodPosition(food, position)) return FOOD_CONTENT;
    if (isBorderPosition(position)) return BORDER_CONTENT;

    return null;
  };

  for (let columnIndex = 0; columnIndex < BOARD_WIDTH; columnIndex += 1) {
    positions.push(<Position
      key={columnIndex}
      content={getPositionContent({ x: columnIndex, y: rowIndex })}
    />);
  }

  return (
    <div className={styles.row}>
      {positions}
    </div>
  );
};

Row.propTypes = {
  rowIndex: PropTypes.number,
  snake: PropTypes.arrayOf(PropTypes.object),
  food: PropTypes.object
};

export default Row;
