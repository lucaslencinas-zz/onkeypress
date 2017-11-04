// key que contiene el slug del room
const roomBySocket = (socketId) => `room-${socketId}`;
// hash que contiene una key (roomSlug) por room que contiene el tiene el contenido del room
const rooms = () => 'rooms';
// key que contiene el slug del player
const playerBySocket = (socketId) => `player-${socketId}`;
// hash que contiene todos los jugadores de un room. Una key (playerSlug) por player que tiene el contenido del player
const playersByRoomSlug = (roomSlug) => `room-${roomSlug}-players`;
// hash donde cada campo es un playerSlug que contiene su roomSlug en el que esta.
const roomByPlayerSlug = () => 'players-room';

module.exports = {
  roomBySocket,
  rooms,
  playerBySocket,
  playersByRoomSlug,
  roomByPlayerSlug
};
