import { createSelector } from 'reselect';

const room = (state, roomSlug) => state.rooms[roomSlug];
const playerWithoutButton = createSelector(
  room,
  ($room) => $room.players.find((p) => !p.button)
);

const game = createSelector(
  room,
  ($room) => ($room || {}).game
);

export default {
  game,
  playerWithoutButton,
  room
};
