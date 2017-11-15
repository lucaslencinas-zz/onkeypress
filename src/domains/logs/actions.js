import actionTypes from './actionTypes';
import logTypes from './logTypes';

export function addLogEntry({ log, room }) {
  return {
    type: actionTypes.ADD_LOG_ENTRY,
    roomSlug: room.slug,
    log
  };
}

export function logPlayerConnected({ player, room }) {
  return addLogEntry({
    room,
    log: {
      event: logTypes.PLAYER_CONNECTED,
      entity: player.name
    }
  });
}

export function logPlayerDisconnected({ player, room }) {
  return addLogEntry({
    room,
    log: {
      event: logTypes.PLAYER_DISCONNECTED,
      entity: player.name
    }
  });
}

export function logRoomConnected({ room }) {
  return addLogEntry({
    room,
    log: {
      event: logTypes.ROOM_CONNECTED,
      entity: room.name
    }
  });
}

export function logRoomDisconnected({ room }) {
  return addLogEntry({
    room,
    log: {
      event: logTypes.ROOM_DISCONNECTED,
      entity: room.name
    }
  });
}

export function logCurrentPlayers({ room, players }) {
  const content = players
    .map((player) => `${player.name} - ${player.button ? player.button.name : 'Waiting'}`)
    .join(', ');

  return addLogEntry({
    room,
    log: {
      event: logTypes.CURRENT_PLAYERS,
      content
    }
  });
}

export function logButtonAssigned({ assignment, room }) {
  return addLogEntry({
    room,
    log: {
      event: logTypes.BUTTON_ASSIGNED,
      entity: assignment.player.name,
      content: `got button ${assignment.button.name}`
    }
  });
}

export function logButtonUnassigned({ assignment, player, room }) {
  return addLogEntry({
    room,
    log: {
      event: logTypes.BUTTON_ASSIGNED,
      entity: player.name,
      content: `loosed button ${assignment.button.name}`
    }
  });
}

export function logButtonClicked({ action, room }) {
  return addLogEntry({
    room,
    log: {
      event: logTypes.BUTTON_CLICKED,
      entity: action.player.name,
      content: `pressed button ${action.button.name}`
    }
  });
}
