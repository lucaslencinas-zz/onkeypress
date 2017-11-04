import * as keys from '../utils/redisHelper';

function storage() {
  return global.storage;
}

function doesRoomExists(roomSlug) {
  return storage().hexists(keys.rooms(), roomSlug);
}

function saveRoom({ roomSlug, room, socketId }) {
  let pipelinePromise = storage().pipeline();
  if (room) {
    pipelinePromise = pipelinePromise.hset(keys.rooms(), roomSlug, JSON.stringify(room));
  }
  if (socketId) {
    pipelinePromise = pipelinePromise.set(keys.roomBySocket(socketId), roomSlug);
  }
  return pipelinePromise.exec();
}

function getRoom({ socketId, roomSlug, playerSlug }) {
  if (playerSlug) {
    return storage().hget(keys.roomByPlayerSlug(), playerSlug);
  }
  if (socketId) {
    return storage().get(keys.roomBySocket(socketId));
  }
  return storage().hget(keys.rooms(), roomSlug)
    .then((room) => (room ? JSON.parse(room) : room));
}

function deleteRoom({ roomSlug, socketId }) {
  let pipelinePromise = storage().pipeline();
  if (socketId) {
    pipelinePromise = pipelinePromise.del(keys.roomBySocket(socketId));
  }
  if (roomSlug) {
    pipelinePromise = pipelinePromise.hdel(keys.rooms(), roomSlug);
  }
  return pipelinePromise.exec();
}

function savePlayer({ playerSlug, player, socketId, roomSlug }) {
  let pipelinePromise = storage().pipeline();
  if (player && roomSlug) {
    pipelinePromise = pipelinePromise.hset(keys.playersByRoomSlug(roomSlug), playerSlug, JSON.stringify(player));
  }
  if (socketId) {
    pipelinePromise = pipelinePromise.set(keys.playerBySocket(socketId), playerSlug);
  }
  return pipelinePromise.hset(keys.roomByPlayerSlug(), playerSlug, roomSlug).exec();
}

function getPlayer({ socketId, playerSlug, roomSlug }) {
  if (roomSlug) {
    if (playerSlug) {
      return storage().hget(keys.playersByRoomSlug(roomSlug), playerSlug)
        .then((player) => JSON.parse(player));
    }
  }
  return storage().get(keys.playerBySocket(socketId));
}

function getPlayers(roomSlug) {
  return storage().hgetall(keys.playersByRoomSlug(roomSlug))
    .then((response) => Object.keys(response || {}).map((slug) => JSON.parse(response[slug])));
}

function deletePlayer({ roomSlug, socketId, playerSlug }) {
  let pipelinePromise = storage().pipeline();
  if (socketId) {
    pipelinePromise = pipelinePromise.del(keys.playerBySocket(socketId));
  }
  if (roomSlug) {
    pipelinePromise = pipelinePromise.hdel(keys.playersByRoomSlug(roomSlug), playerSlug);
  }
  return pipelinePromise.hdel(keys.roomByPlayerSlug(), playerSlug).exec();
}

module.exports = {
  doesRoomExists,
  saveRoom,
  getRoom,
  deleteRoom,
  savePlayer,
  getPlayer,
  getPlayers,
  deletePlayer
};
