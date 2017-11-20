import { combineReducers } from 'redux';
import { reducer as reduxAsyncReducer } from 'redux-connect';

import {
  actions as roomsActions,
  actionTypes as roomsActionTypes,
  selectors as roomsSelectors,
  reducers as roomsReducers
} from './rooms';

import {
  actions as logsActions,
  actionTypes as logsActionTypes,
  selectors as logsSelectors,
  reducers as logsReducers
} from './logs';

import {
  actions as uiActions,
  actionTypes as uiActionTypes,
  selectors as uiSelectors,
  reducers as uiReducers
} from './ui';

import {
  actions as playersActions,
  actionTypes as playersActionTypes,
  selectors as playersSelectors,
  reducers as playersReducers
} from './players';

const actions = {
  ...roomsActions,
  ...logsActions,
  ...uiActions,
  ...playersActions
};

const actionTypes = {
  ...roomsActionTypes,
  ...logsActionTypes,
  ...uiActionTypes,
  ...playersActionTypes
};

const selectors = {
  ...roomsSelectors,
  ...logsSelectors,
  ...uiSelectors,
  ...playersSelectors
};

const reducers = combineReducers({
  rooms: roomsReducers,
  logs: logsReducers,
  ui: uiReducers,
  players: playersReducers,
  reduxAsyncConnect: reduxAsyncReducer
});

export {
  actionTypes,
  actions,
  reducers,
  selectors
};
