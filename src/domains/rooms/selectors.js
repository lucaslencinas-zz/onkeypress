import { createSelector } from 'reselect';

const room = (state, roomSlug) => state.rooms[roomSlug];

const game = createSelector(
  room,
  ($room) => ($room || {}).game
);

export default {
  game,
  room
};
