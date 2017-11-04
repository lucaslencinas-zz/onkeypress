import createError from 'http-errors';
import { adaptButtons } from '../utils/adapters';
import * as roomRepository from '../repositories/roomRepository';

/* room: { name, pass, slug, buttons, max_players, type, socketId } */
function create(room) {
  return roomRepository.doesRoomExists(room.slug)
  .then((alreadyExists) => {
    if (alreadyExists) throw createError(409, `Room ${room.slug} already exists`);
    Object.assign(room, { buttons: adaptButtons(room.buttons) });
    return roomRepository.saveRoom({ roomSlug: room.slug, room });
  })
  .then(() => room)
  .catch((err) => {
    console.log(err);
    return false;
  });
}

function roomConnected({ socketId, slug }) {
  return roomRepository.getRoom({ socketId })
    .then((roomBySocketValue) => {
      if (roomBySocketValue) throw createError(409, `Room ${roomBySocketValue} already connected`);
      return roomRepository.getRoom({ roomSlug: slug });
    })
    .then((room) => {
      if (!room) throw createError(404, `Room ${slug} does not exist`);
      const newRoomContent = { ...room, socketId };

      return roomRepository.saveRoom({ socketId, roomSlug: slug, room: newRoomContent })
        .then(() => newRoomContent);
    })
  ;
}
function roomDisconnected({ socketId, slug }) {
  return roomRepository.getRoom({ socketId })
    .then((roomSlug) => {
      if (!roomSlug) throw createError(404, `Room ${slug} not found`);
      return roomRepository.getRoom({ roomSlug });
    })
    .then((room) => {
      if (!room) throw createError(404, `Room ${slug} not found`);
      return roomRepository.deleteRoom({ socketId, roomSlug: slug })
        .then(() => ({ room }))
      ;
    })
  ;
}

function join(room, player) {
  return roomRepository.getRoom({ roomSlug: room.slug })
    .then(($room) => {
      if ($room && $room.password === room.password) {
        return roomRepository.getPlayer({ roomSlug: room.slug, playerSlug: player.slug });
      }
      throw createError(404, 'Incorrect room or password');
    })
    .then(($player) => {
      if (!$player) {
        return roomRepository.savePlayer({ roomSlug: room.slug, playerSlug: player.slug, player });
      }
      throw createError(409, `Player ${player.slug} already exists`);
    })
    .then(() => room);
}

function playerConnected({ socketId, player, room }) {
  return roomRepository.getPlayer({ socketId })
    .then((playerSlug) => {
      if (playerSlug) throw createError(409, `Player ${playerSlug} already connected`);
      return roomRepository.getPlayer({ roomSlug: room.slug, playerSlug: player.slug });
    })
    .then(($player) => {
      if (!$player) throw createError(404, `Player ${player.slug} not found`);
      const newPlayerContent = { ...$player, socketId };

      return roomRepository.savePlayer({ playerSlug: player.slug, roomSlug: room.slug, socketId, player: newPlayerContent })
        .then(() => newPlayerContent)
      ;
    })
  ;
}

function playerDisconnected({ socketId, playerSlug }) {
  return roomRepository.getRoom({ playerSlug })
    .then((roomSlug) => {
      if (!roomSlug) throw createError(404, `Room of player ${playerSlug} not found`);
      return roomRepository.getPlayer({ playerSlug, roomSlug })
        .then((player) => {
          if (!player) throw createError(404, `Player ${playerSlug} not found`);
          return roomRepository.getRoom({ roomSlug })
            .then((room) => {
              if (!room) throw createError(404, `Room ${roomSlug} not found`);
              const newButtons = unassignButton(room.buttons, player.button);

              return roomRepository.deletePlayer({ roomSlug, playerSlug: player.slug, socketId })
                .then(() => roomRepository.saveRoom({ roomSlug, room: { ...room, buttons: newButtons } }))
                .then(() => ({ room, disconnectedPlayer: { ...player, button: {} } }))
              ;
            });
        });
    })
  ;
}

function unassignButton(buttons, button) {
  if (button) {
    return buttons.map((b) => (b.name === (button || {}).name ? { ...b, assigned: false } : b));
  }
  return buttons;
}

function getDisconnected(socketId) {
  return roomRepository.getPlayer({ socketId })
  .then((playerSlug) => {
    if (playerSlug) return { slug: playerSlug, isPlayer: true };
    return roomRepository.getRoom({ socketId })
      .then((roomSlug) => {
        if (roomSlug) return { slug: roomSlug, isRoom: true };
        throw createError(404, 'Cannot find entity disconnected');
      })
    ;
  });
}

function getPlayerToAssignButton(room) {
  return roomRepository.getPlayers(room.slug)
    .then((players) => players.find((p) => (!(p.button || {}).assigned)));
}

function assignButtonToPlayer({ room, player }) {
  return roomRepository.getRoom({ roomSlug: room.slug })
    .then(($room) => {
      if (!$room) throw createError(404, `Room ${room.slug} not found`);
      const button = $room.buttons.find((b) => !b.assigned);
      if (!button) return { $room: room, $player: player };
      button.assigned = true;
      return roomRepository.getPlayer({ roomSlug: room.slug, playerSlug: player.slug })
      .then(($player) => {
        if (!$player) throw createError(404, `Player ${player.slug} not found`);
        $player.button = button; // eslint-disable-line

        return roomRepository.saveRoom({ roomSlug: $room.slug, room: $room })
          .then(() => roomRepository.savePlayer({ roomSlug: room.slug, playerSlug: $player.slug, player: $player }))
          .then(() => ({ $room, $player, button: $player.button }));
      });
    })
  ;
}

function currentPlayers(room) {
  return roomRepository.getPlayers(room.slug);
}

module.exports = {
  assignButtonToPlayer,
  currentPlayers,
  create,
  join,
  roomConnected,
  playerConnected,
  roomDisconnected,
  playerDisconnected,
  getDisconnected,
  getPlayerToAssignButton
};
