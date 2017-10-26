import * as events from '~/utils/events';
import roomService from './services/roomService';
import playerService from './services/playerService';

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
  console.log('handleRoomConnected');
  console.log(handshake.room);
  return roomService.roomConnected({ socketId: socket.id, slug: handshake.room.slug })
    .then((room) => {
      socket.broadcast.emit(events.ROOM_CONNECTED, room);
      return Promise.resolve(room);
    })
    .then((room) => playerService.currentPlayers(room))
    .then((players) => Promise.resolve(socket.emit(events.CURRENT_PLAYERS, players)))
  ;
}

/* handshake: { room: {slug, name}, player: {slug, name} } */
function handlePlayerConnected(socket, handshake) {
  console.log('handlePlayerConnected');
  console.log(handshake.room);
  console.log(handshake.player);
  return roomService.playerConnected({ socketId: socket.id, player: handshake.player })
    .then((player) => {
      socket.broadcast.emit(events.PLAYER_CONNECTED, player);
      return Promise.resolve(player);
    })
    .then((player) => assignButtonToPlayer({ socket, room: handshake.room, player }))
    .then((room) => playerService.currentPlayers(room))
    .then((players) => Promise.resolve(socket.emit(events.CURRENT_PLAYERS, players)))
  ;
}

function assignButtonToPlayer({ socket, room, player }) {
  console.log('assignButtonToPlayer');
  return roomService.assignButtonToPlayer({ room, player })
    .then(({ $room, button, $player }) => {
      if (button) {
        console.log(`about to assign button ${button}`);
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
  return roomService.handleDisconnection(socket.id)
    .then((disconnected) => (
      disconnected.isPlayer ?
        handlePlayerDisconnection({ socket, player: disconnected.player }) :
        handleRoomDisconnection({ socket, room: disconnected.room })
    ))
  ;
}

function handlePlayerDisconnection({ socket, player }) {
  socket.broadcast.emit(events.PLAYER_DISCONNECTED, { player });

  return roomService.getPlayerWithoutButtonAssigned(player.roomSlug)
    .then(({ room, $player }) => assignButtonToPlayer({ socket, room, player: $player }))
  ;
}

function handleRoomDisconnection({ socket, room }) {
  return roomService.disableRoom(room.slug)
    .then(($room) => socket.broadcast.emit(events.ROOM_DISCONNECTED, { room: $room }))
  ;
}
