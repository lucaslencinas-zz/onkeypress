import actionTypes from './actionTypes';

export function setAlert(alert) {
  return {
    type: actionTypes.SET_ALERT,
    alert
  };
}

export function closeAlert() {
  return {
    type: actionTypes.CLOSE_ALERT
  };
}
