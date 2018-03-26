import * as events from '~/utils/events';
import roomService from './services/roomService';

export function initializeSocketConnection(io) {
  io.on(events.CONNECTION, (socket) => {
    initialize(io, socket);
  });
}

function initialize(io, socket) {
  socket.on(events.PLAYER_CONNECTED, (handshake) => handlePlayerConnected(io, socket, handshake));
  socket.on(events.ROOM_CONNECTED, (handshake) => handleRoomConnected(io, socket, handshake));
  socket.on(events.BUTTON_CLICKED, (data) => handleButtonClicked(io, socket, data));
  socket.on(events.DISCONNECTION, () => handleDisconnection(io, socket));
  socket.on(events.BUTTON_ASSIGNED, (data) => handleButtonAssigned(io, data));
}

/* handshake: { room: {slug, name} } */
function handleRoomConnected(io, socket, handshake) {
  return roomService.roomConnected({ socketId: socket.id, slug: handshake.room.slug })
    .then((room) => {
      socket.broadcast.emit(events.ROOM_CONNECTED, room);
      return Promise.resolve(room);
    })
  ;
}

/* handshake: { room: {slug, name}, player: {slug, name} } */
function handlePlayerConnected(io, socket, handshake) {
  socket.broadcast.emit(events.PLAYER_CONNECTED, { socketId: socket.id, ...handshake.player });
  return Promise.resolve(handshake.player);
}

function handleButtonAssigned(io, data) {
  io.emit(events.BUTTON_ASSIGNED, data);
  return Promise.resolve(data);
}

function handleButtonClicked(io, socket, data) {
  return Promise.resolve(socket.broadcast.emit(events.BUTTON_CLICKED, data));
}

function handleDisconnection(io, socket) {
  return roomService.getDisconnected(socket.id)
    .then((isRoom) => (
      isRoom ?
        handleRoomDisconnection({ socket }) :
        handlePlayerDisconnection({ socket })
    ))
  ;
}

function handlePlayerDisconnection({ socket }) {
  socket.broadcast.emit(events.PLAYER_DISCONNECTED, { socketId: socket.id });
  return Promise.resolve({ socket });
}

function handleRoomDisconnection({ socket }) {
  return roomService.roomDisconnected({ socketId: socket.id })
    .then(() => socket.broadcast.emit(events.ROOM_DISCONNECTED, { socketId: socket.id }))
  ;
}
