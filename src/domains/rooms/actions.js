import { push } from 'react-router-redux';
import * as roomService from '~/services/roomService';
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
