import actionTypes from './actionTypes';

const initialState = {
  user: {},
  members: [],
  messages: []
};

export default function reducers(state = initialState, action) {
  switch (action.type) {
    case actionTypes.SET_USER:
      return {
        ...state,
        user: action.user
      };
    case actionTypes.ADD_MEMBER_TO_LIST:
      return {
        ...state,
        members: [...state.members, action.member]
      };

    case actionTypes.REMOVE_MEMBER_FROM_LIST:
      return {
        ...state,
        members: state.members.filter((m) => m.id !== action.member.id)
      };

    case actionTypes.ADD_MESSAGE:
      return {
        ...state,
        messages: [...state.messages, action.message]
      };
    default:
      return state;
  }
}
