import { push } from 'react-router-redux';
import * as roomService from '~/services/roomService';
import { directions } from '~/utils/directions';
import { selectors } from '~/domains';
import { DEFAULT_INCREASE_SCORE, STATUS } from '~/utils/constants';
import actionTypes from './actionTypes';
import { actions as playersActions } from '../players/';

function setRoom(room) {
  return {
    type: actionTypes.SET_ROOM,
    room
  };
}

export function addPlayer({ player, room }) {
  return {
    type: actionTypes.ADD_PLAYER,
    player,
    room
  };
}

export function removePlayer({ player, room }) {
  return {
    type: actionTypes.REMOVE_PLAYER,
    player,
    room
  };
}

export function setCurrentPlayers({ players, room }) {
  return {
    type: actionTypes.SET_CURRENT_PLAYERS,
    players,
    room
  };
}

export function assignButton({ assignment, room }) {
  return {
    type: actionTypes.ASSIGN_BUTTON,
    ...assignment,
    room
  };
}

export function changeDirection({ room, direction }) {
  return {
    type: actionTypes.CHANGE_DIRECTION,
    room,
    direction
  };
}

export function changeStatus({ room, status }) {
  return {
    type: actionTypes.CHANGE_STATUS,
    room,
    status
  };
}

function changeScore({ room, score }) {
  return {
    type: actionTypes.CHANGE_SCORE,
    room,
    score
  };
}

export function increaseScore({ room }) {
  return (dispatch, getState) => {
    const state = getState();
    const score = selectors.game(state, room.slug).score;

    return dispatch(changeScore({ room, score: score + DEFAULT_INCREASE_SCORE }));
  };
}

export function restart({ room }) {
  return (dispatch) => {
    dispatch(changeStatus({ room, status: STATUS.STARTED }));
    dispatch(changeDirection({ room, direction: directions.RIGHT }));
    return dispatch(changeScore({ room, score: 0 }));
  };
}

export function createRoom({ name, password }) {
  return (dispatch) => (
    roomService.createRoom({ name, password })
      .then((room) => {
        dispatch(setRoom(room));
        return dispatch(push(`/rooms/${room.slug}`));
      })
  );
}

export function joinRoom({ room, player }) {
  return (dispatch) => (
    roomService.joinRoom({ room, player })
      .then((joined) => {
        dispatch(setRoom(joined.room));
        dispatch(playersActions.setPlayer(joined.player));
        return dispatch(push(`/rooms/${joined.room.slug}/players/${joined.player.slug}`));
      })
  );
}
