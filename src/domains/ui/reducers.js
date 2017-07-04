
import actionTypes from './actionTypes';

const initialState = {};

export default function reducers(state = initialState, action) {
  switch (action.type) {
    case actionTypes.SET_ALERT:
      return {
        ...state,
        alert: action.alert
      };

    case actionTypes.CLOSE_ALERT:
      return {
        ...state,
        alert: null
      };

    default:
      return state;
  }
}
