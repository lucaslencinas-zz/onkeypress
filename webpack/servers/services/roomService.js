const store = require('../storage/localStore')();
const createError = require('http-errors');

/*

room: {
  name,
  password,
  slug,
  availableButtons
}
*/

function create(room) {
  const rooms = store.get('rooms');
  const existingRoom = rooms.find((r) => r.slug === room.slug);

  if (existingRoom) {
    throw createError(409, `Room ${room.slug} already exists`);
  }

  store.set('rooms', rooms.concat([room]));

  return Promise.resolve(room);
}

/*
room: {
  name,
  password,
  slug
}
player: {
  name,
  slug
}
*/

function join(room, player) {
  const rooms = store.get('rooms');
  const joinedRoom = rooms.find((r) => r.slug === room.slug);

  if (joinedRoom && joinedRoom.password === room.password) {
    const $players = store.get('players');

    const existingPlayer = $players.find((p) => p.slug === player.slug);

    if (existingPlayer) {
      throw createError(409, `Player ${player.slug} already exists`);
    }

    store.set('players', $players.concat([{ ...player, roomSlug: room.slug }]));

    return Promise.resolve(joinedRoom);
  }

  const error = joinedRoom ?
    createError(401, 'Incorrect password') :
    createError(404, `Room ${room.name} not found`);
  throw error;
}

function roomConnected({ socketId, slug }) {
  const rooms = store.get('rooms');
  const index = rooms.findIndex((r) => r.slug === slug);

  if (index !== -1) {
    rooms[index] = { ...rooms[index], socketId };
    store.set('rooms', rooms);

    return Promise.resolve(rooms[index]);
  }

  throw createError(404, `Room ${slug} not found`);
}

function playerConnected({ socketId, player }) {
  const players = store.get('players');
  const index = players.findIndex((p) => p.slug === player.slug);

  if (index !== -1) {
    players[index] = { ...players[index], socketId };
    store.set('players', players);

    return Promise.resolve(players[index]);
  }

  throw createError(404, `Player ${player.slug} not found`);
}

function handleDisconnection(socketId) {
  const players = store.get('players');
  const index = players.findIndex((p) => p.socketId === socketId);

  if (index !== -1) {
    const newPlayers = players.filter((p) => p.socketio !== socketId);
    store.set('players', newPlayers);

    return Promise.resolve({ ...players[index], isPlayer: true });
  }

  // TODO hacer para que detecte que el servidor se desconecto.
}

function assignButtonToPlayer({ room, player }) {
  const players = store.get('players');
  const rooms = store.get('rooms');
  const indexPlayer = players.findIndex((p) => p.slug === player.slug);
  const indexRoom = rooms.findIndex((r) => r.slug === room.slug);

  if (indexPlayer === -1) {
    throw createError(404, `Player ${player.slug} not found`);
  }
  if (indexRoom === -1) {
    throw createError(404, `Room ${room.slug} not found`);
  }

  const wantedPlayer = players[indexPlayer];
  const wantedRoom = rooms[indexRoom];

  if (wantedRoom.availableButtons.length < 1) {
    throw createError(409, `Too many players in room: ${room.slug}`);
  }
  const button = wantedRoom.availableButtons.pop();
  wantedPlayer.buttonAssigned = button;

  return Promise.resolve({ $room: wantedRoom, $player: wantedPlayer, button });
}

module.exports = {
  assignButtonToPlayer,
  create,
  join,
  roomConnected,
  playerConnected,
  handleDisconnection
};
