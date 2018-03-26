import { push } from 'react-router-redux';
import * as roomService from '~/services/roomService';
import { directions } from '~/utils/directions';
import { selectors } from '~/domains';
import * as events from '~/utils/events';
import { DEFAULT_INCREASE_SCORE, STATUS } from '~/utils/constants';
import actionTypes from './actionTypes';
import { actions as playersActions } from '../players/';
import { actions as logsActions } from '../logs/';

function setRoom(room) {
  return {
    type: actionTypes.SET_ROOM,
    room
  };
}

export function removePlayerFromList({ player, room }) {
  return {
    type: actionTypes.REMOVE_PLAYER,
    player,
    room
  };
}

export function assignButton({ player, button, room }) {
  return {
    type: actionTypes.ASSIGN_BUTTON,
    player,
    button,
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

export function addPlayerToList({ player, room }) {
  return {
    type: actionTypes.ADD_PLAYER,
    player,
    room
  };
}

export function removePlayer({ connection, player, room }) {
  return (dispatch, getState) => {
    const state = getState();
    const currentRoom = selectors.room(state, room.slug);
    return Promise.resolve(dispatch((removePlayerFromList({ player, room: currentRoom }))))
      .then(() => Promise.resolve(dispatch(assignButtonIfNecessary({ connection, room: currentRoom }))));
  };
}

export function addPlayer({ connection, player, room }) {
  return (dispatch, getState) => {
    const state = getState();
    const currentRoom = selectors.room(state, room.slug);
    return Promise.resolve(dispatch(addPlayerToList({ player, room: currentRoom })))
      .then(() => Promise.resolve(dispatch(assignButtonIfNecessary({ connection, player, room: currentRoom }))));
  };
}

function assignButtonIfNecessary({ connection, player, room }) {
  return (dispatch, getState) => {
    const state = getState();
    const currentRoom = selectors.room(state, room.slug);
    const button = availableButton(currentRoom);
    const playerToAssignButton = player || selectors.playerWithoutButton(state, currentRoom.slug);
    if (button && playerToAssignButton) {
      return Promise.resolve([
        dispatch(assignButton({ player: playerToAssignButton, button, room: currentRoom })),
        dispatch(logsActions.logButtonAssigned({ player: playerToAssignButton, button, room: currentRoom }))
      ])
        .then(() => connection.emit(events.BUTTON_ASSIGNED, { player: playerToAssignButton, button, room: currentRoom }));
    }
    return Promise.resolve();
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

export function createRoom({ name }) {
  return (dispatch) => (
    roomService.createRoom({ name })
      .then((room) => {
        dispatch(setRoom(room));
        return dispatch(push(`/rooms/${room.slug}`));
      })
  );
}

export function joinRoom({ room, player }) {
  return (dispatch) => (
    roomService.joinRoom({ room })
      .then((joined) => {
        dispatch(setRoom(joined.room));
        dispatch(playersActions.setPlayer(player));
        return dispatch(push(`/rooms/${joined.room.slug}/players/${player.slug}`));
      })
  );
}

function availableButton({ players, buttons }) {
  const playerButtons = players.map((p) => p.button);
  return buttons.find(((b) => !playerButtons.includes(b)));
}
