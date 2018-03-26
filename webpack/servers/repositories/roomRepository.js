const ROOMS = 'rooms';

function storage() {
  return global.storage;
}

function doesRoomExists(roomSlug) {
  return storage().hexists(ROOMS, roomSlug);
}

function isRoom(socketId) {
  return getRoomBySocketId(socketId)
    .then((roomSlug) => !!roomSlug);
}

function getRoomBySocketId(socketId) {
  return storage().hgetall(ROOMS)
    .then((response) => Object.keys(response || {}).find((slug) => response[slug] === socketId));
}

function saveRoom(roomSlug, socketId) {
  return storage().hset(ROOMS, roomSlug, socketId);
}

function getRoom(roomSlug) {
  return storage().hget(ROOMS, roomSlug);
}

function deleteRoom(socketId) {
  return getRoomBySocketId(socketId)
    .then((roomSlug) => storage().hdel(ROOMS, roomSlug));
}

module.exports = {
  doesRoomExists,
  isRoom,
  saveRoom,
  getRoom,
  deleteRoom
};
