import actionTypes from './actionTypes';

const initialState = {
  room: {}
};

const removePlayerFromList = (players, player) => players.filter((p) => p.slug !== player.slug);

export default function reducers(state = initialState, action) {
  const updatePlayerInList = (players, playerContent) => (
    players.slice(0).map(
      (player) => (player.slug === playerContent.slug ? { ...playerContent, player } : player)
    )
  );

  switch (action.type) {
    case actionTypes.SET_ROOM:
      return {
        ...state,
        room: { ...action.room, players: action.room.players || [] }
      };

    case actionTypes.SET_PLAYER:
      return {
        ...state,
        player: action.player
      };

    case actionTypes.SET_CURRENT_PLAYERS:
      return {
        ...state,
        room: {
          ...state.room,
          players: action.players
        }
      };

    case actionTypes.ADD_PLAYER:
      return {
        ...state,
        room: {
          ...state.room,
          players: state.room.players.concat([action.player])
        }
      };

    case actionTypes.REMOVE_PLAYER:
      return {
        ...state,
        room: {
          ...state.room,
          players: removePlayerFromList(state.room.players, action.player)
        }
      };

    case actionTypes.ASSIGN_BUTTON:
      return {
        ...state,
        room: {
          ...state.room,
          players: updatePlayerInList(state.room.players, { ...action.player, button: action.button })
        }
      };

    default:
      return state;
  }
}
