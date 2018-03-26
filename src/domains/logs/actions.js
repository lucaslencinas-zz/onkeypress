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
      entity: player.name || player.socketId
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

export function logButtonAssigned({ player, button, room }) {
  return addLogEntry({
    room,
    log: {
      event: logTypes.BUTTON_ASSIGNED,
      entity: player.name,
      content: `got button ${button}`
    }
  });
}

export function logButtonUnassigned({ button, player, room }) {
  return addLogEntry({
    room,
    log: {
      event: logTypes.BUTTON_ASSIGNED,
      entity: player.name,
      content: `loosed button ${button}`
    }
  });
}

export function logButtonClicked({ action, room }) {
  return addLogEntry({
    room,
    log: {
      event: logTypes.BUTTON_CLICKED,
      entity: action.player.name,
      content: `pressed button ${action.button}`
    }
  });
}
