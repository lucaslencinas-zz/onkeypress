import actionTypes from './actionTypes';

const initialState = {
  room: {}
};

export default function reducers(state = initialState, action) {
  const updatePlayer = (players, playerContent) => (
    players.slice(0).map(
      (player) => (player.slug === playerContent.slug ? { ...playerContent, player } : player)
    )
  );

  switch (action.type) {
    case actionTypes.SET_ROOM:
      return {
        ...state,
        room: {
          name: action.name,
          password: action.password,
          slug: action.slug,
          players: []
        }
      };

    case actionTypes.SET_PLAYER:
      return {
        ...state,
        player: action.player
      };

    case actionTypes.ADD_PLAYER:
      return {
        ...state,
        room: {
          ...state.room,
          players: state.room.players.concat([action.player])
        }
      };

    case actionTypes.ASSIGN_BUTTON:
      return {
        ...state,
        room: {
          ...state.room,
          players: updatePlayer(state.room.players, { ...action.player, button: action.button })
        }
      };

    default:
      return state;
  }
}
