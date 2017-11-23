
const directions = {
  UP: 'UP',
  LEFT: 'LEFT',
  RIGHT: 'RIGHT',
  DOWN: 'DOWN'
};

const directionKeyCodes = {
  37: directions.LEFT,
  38: directions.UP,
  39: directions.RIGHT,
  40: directions.DOWN
};

const oppositeDirections = {
  UP: directions.DOWN,
  LEFT: directions.RIGHT,
  RIGHT: directions.LEFT,
  DOWN: directions.UP
};

module.exports = {
  directions,
  oppositeDirections,
  directionKeyCodes
};
