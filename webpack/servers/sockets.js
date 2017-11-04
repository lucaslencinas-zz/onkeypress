import * as events from '~/utils/events';
import roomService from './services/roomService';

export function initializeSocketConnection(io) {
  io.on(events.CONNECTION, (socket) => {
    initialize(socket);
  });
}

function initialize(socket) {
  socket.on(events.PLAYER_CONNECTED, (handshake) => handlePlayerConnected(socket, handshake));
  socket.on(events.ROOM_CONNECTED, (handshake) => handleRoomConnected(socket, handshake));
  socket.on(events.BUTTON_CLICKED, (data) => handleButtonClicked(socket, data));
  socket.on(events.DISCONNECTION, () => handleDisconnection(socket));
}

/* handshake: { room: {slug, name} } */
function handleRoomConnected(socket, handshake) {
  return roomService.roomConnected({ socketId: socket.id, slug: handshake.room.slug })
    .then((room) => {
      socket.broadcast.emit(events.ROOM_CONNECTED, room);
      return Promise.resolve(room);
    })
    .then((room) => roomService.currentPlayers(room))
    .then((players) => Promise.resolve(socket.emit(events.CURRENT_PLAYERS, players)))
  ;
}

/* handshake: { room: {slug, name}, player: {slug, name} } */
function handlePlayerConnected(socket, handshake) {
  return roomService.playerConnected({ socketId: socket.id, player: handshake.player, room: handshake.room })
    .then((player) => {
      socket.broadcast.emit(events.PLAYER_CONNECTED, player);
      return Promise.resolve(player);
    })
    .then((player) => assignButtonToPlayer({ socket, room: handshake.room, player }))
    .then((room) => roomService.currentPlayers(room))
    .then((players) => Promise.resolve(socket.emit(events.CURRENT_PLAYERS, players)))
  ;
}

function assignButtonToPlayer({ socket, room, player }) {
  return roomService.assignButtonToPlayer({ room, player })
    .then(({ $room, button, $player }) => {
      if (button) {
        socket.broadcast.emit(events.BUTTON_ASSIGNED, { button, player: $player });
      }
      return Promise.resolve($room);
    })
  ;
}

/* data: { roomSlug, playerSlug, buttonId } */
function handleButtonClicked(socket, data) {
  return Promise.resolve(socket.broadcast.emit(events.BUTTON_CLICKED, data));
}

function handleDisconnection(socket) {
  return roomService.getDisconnected(socket.id)
    .then(({ slug, isPlayer }) => (
      isPlayer ?
        handlePlayerDisconnection({ socket, playerSlug: slug }) :
        handleRoomDisconnection({ socket, roomSlug: slug })
    ))
  ;
}

function handlePlayerDisconnection({ socket, playerSlug }) {
  return roomService.playerDisconnected({ socketId: socket.id, playerSlug })
    .then(({ room, disconnectedPlayer }) => {
      socket.broadcast.emit(events.PLAYER_DISCONNECTED, { player: disconnectedPlayer });
      return roomService.getPlayerToAssignButton(room)
        .then((player) => {
          if (player) return assignButtonToPlayer({ socket, room, player });
          return Promise.resolve();
        })
      ;
    })
  ;
}

function handleRoomDisconnection({ socket, roomSlug }) {
  return roomService.roomDisconnected({ socketId: socket.id, roomSlug })
    .then(({ room }) => socket.broadcast.emit(events.ROOM_DISCONNECTED, { room }))
  ;
}
