import { BOARD_HEIGHT, BOARD_WIDTH } from '~/utils/constants';

const boardWidthWithoutBorders = BOARD_WIDTH - 2;
const boardHeightWithoutBorders = BOARD_HEIGHT - 2;

export const isSamePosition = (pos1, pos2) =>
  pos1.x === pos2.x && pos1.y === pos2.y;

export const positionsInclude = (positions, position) =>
  !!positions.find((positionInList) => isSamePosition(positionInList, position));

export const hasCoordinates = (xCoordinates, yCoordinates, position) =>
  xCoordinates.includes(position.x) || yCoordinates.includes(position.y);

export const availablePosition = (snake, position) =>
  snake.every((piece) => !isSamePosition(position, piece));

export const randomPosition = () => {
  const x = Math.ceil(Math.random() * boardWidthWithoutBorders);
  const y = Math.ceil(Math.random() * boardHeightWithoutBorders);

  return { x, y };
};

export const randomAvailablePosition = (snake) => {
  let position = randomPosition();
  while (!availablePosition(snake, position)) {
    position = randomPosition();
  }
  return position;
};

export const generateFoodPosition = (snake) => randomAvailablePosition(snake);

export const isSnakePosition = (snake, position) => !!positionsInclude(snake, position);
export const isBorderPosition = (position) => hasCoordinates([0, BOARD_WIDTH - 1], [0, BOARD_HEIGHT - 1], position);
export const isFoodPosition = (food, position) => isSamePosition(food, position);
