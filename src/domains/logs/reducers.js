import actionTypes from './actionTypes';

const initialState = {};

export default function reducers(state = initialState, action) {
  switch (action.type) {
    case actionTypes.ADD_LOG_ENTRY:
      return {
        ...state,
        [action.roomSlug]: (state[action.roomSlug] || []).concat([action.log])
      };

    default:
      return state;
  }
}
