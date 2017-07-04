import { push } from 'react-router-redux';
import uuid from 'uuid';
import actionTypes from './actionTypes';

function setUser(user) {
  return {
    type: actionTypes.SET_USER,
    user
  };
}

function addMemberToList(member) {
  return {
    type: actionTypes.ADD_MEMBER_TO_LIST,
    member
  };
}

function removeMemberFromList(member) {
  return {
    type: actionTypes.REMOVE_MEMBER_FROM_LIST,
    member
  };
}

export function addCurrentMembers(members) {
  return (dispatch) => Promise.resolve(members.forEach((member) => dispatch(addMember(member))));
}

export function redirectHome() {
  return (dispatch) => Promise.resolve(dispatch(push('/')));
}

export function enter({ user }) {
  return (dispatch) => {
    const currentUser = { ...user, id: uuid.v4() };
    return Promise.all([
      dispatch(setUser(currentUser)),
      dispatch(push('/chat/'))
    ]);
  };
}

export function addMessage(message) {
  return {
    type: actionTypes.ADD_MESSAGE,
    message
  };
}

export function addMember(member) {
  return (dispatch) => (
    Promise.all([
      dispatch(addMemberToList(member)),
      dispatch(addMessage({ user: { id: 'server' }, text: `${member.name} has entered`, id: uuid.v4() }))
    ])
  );
}

export function removeMember(member) {
  return (dispatch) => (
    Promise.all([
      dispatch(removeMemberFromList(member)),
      dispatch(addMessage({ user: { id: 'server' }, text: `${member.name} has left`, id: uuid.v4() }))
    ])
  );
}
