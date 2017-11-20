import actionTypes from './actionTypes';

const initialState = {};

export default function reducers(state = initialState, action) {
  switch (action.type) {
    case actionTypes.SET_PLAYER:
      return {
        ...state,
        [action.player.slug]: { ...action.player }
      };

    case actionTypes.SET_SOCKET_ID:
      return {
        ...state,
        [action.player.slug]: {
          ...state[action.player.slug],
          socketId: action.socketId
        }
      };

    default:
      return state;
  }
}
