import createError from 'http-errors';
import * as roomRepository from '../repositories/roomRepository';

function create(room) {
  return roomRepository.doesRoomExists(room.slug)
  .then((alreadyExists) => {
    if (alreadyExists) throw createError(409, `Room ${room.slug} already exists`);
    return roomRepository.saveRoom(room.slug, 'connecting');
  })
  .then(() => room);
}

function roomConnected({ socketId, slug }) {
  return roomRepository.getRoom(slug)
    .then((room) => {
      if (!room) throw createError(404, `Room ${slug} does not exist`);

      return roomRepository.saveRoom(slug, socketId)
        .then(() => ({ slug, socketId }));
    })
  ;
}

function roomDisconnected({ socketId }) {
  return roomRepository.deleteRoom(socketId);
}

function join(room) {
  return roomRepository.getRoom(room.slug)
    .then(($room) => {
      if (!$room) throw createError(404, 'Room not Found');
      return room;
    });
}

function getDisconnected(socketId) {
  return roomRepository.isRoom(socketId);
}

module.exports = {
  create,
  join,
  roomConnected,
  roomDisconnected,
  getDisconnected
};
