import { push } from 'react-router-redux';
import * as roomService from '~/services/roomService';
import actionTypes from './actionTypes';

function setRoom(room) {
  return {
    type: actionTypes.SET_ROOM,
    room
  };
}

function setPlayer(player) {
  return {
    type: actionTypes.SET_PLAYER,
    player
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
        dispatch(setPlayer(joined.player));
        return dispatch(push(`/rooms/${joined.room.slug}/players/${joined.player.slug}`));
      })
  );
}
