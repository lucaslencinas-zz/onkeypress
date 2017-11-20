import actionTypes from './actionTypes';

export function setSocketId({ player, socketId }) {
  return {
    type: actionTypes.SET_SOCKET_ID,
    socketId,
    player
  };
}

export function setPlayer(player) {
  return {
    type: actionTypes.SET_PLAYER,
    player
  };
}
