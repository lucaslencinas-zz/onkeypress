import config from 'config';
import actionTypes from './actionTypes';

const initialState = {};
const initialSnakeState = config.games.snake.initialState;

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
        [action.room.slug]: {
          ...action.room,
          players: action.room.players || [],
          game: {
            score: initialSnakeState.score,
            status: initialSnakeState.status,
            direction: initialSnakeState.direction
          }
        }
      };

    case actionTypes.SET_CURRENT_PLAYERS:
      return {
        ...state,
        [action.room.slug]: {
          ...state[action.room.slug],
          players: action.players
        }
      };

    case actionTypes.ADD_PLAYER:
      return {
        ...state,
        [action.room.slug]: {
          ...state[action.room.slug],
          players: state[action.room.slug].players.concat([action.player])
        }
      };

    case actionTypes.REMOVE_PLAYER:
      return {
        ...state,
        [action.room.slug]: {
          ...state[action.room.slug],
          players: removePlayerFromList(
            state[action.room.slug].players,
            action.player
          )
        }
      };

    case actionTypes.ASSIGN_BUTTON:
      return {
        ...state,
        [action.room.slug]: {
          ...state[action.room.slug],
          players: updatePlayerInList(
            state[action.room.slug].players,
            { ...action.player, button: action.button }
          )
        }
      };

    case actionTypes.CHANGE_DIRECTION:
      return {
        ...state,
        [action.room.slug]: {
          ...state[action.room.slug],
          game: {
            ...state[action.room.slug].game,
            direction: action.direction
          }
        }
      };

    default:
      return state;
  }
}
