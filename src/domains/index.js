import { combineReducers } from 'redux';
import { reducer as reduxAsyncReducer } from 'redux-connect';

import {
  actions as roomActions,
  actionTypes as roomActionTypes,
  selectors as roomSelectors,
  reducers as roomReducers
} from './room';

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

const actions = {
  ...roomActions,
  ...logsActions,
  ...uiActions
};

const actionTypes = {
  ...roomActionTypes,
  ...logsActionTypes,
  ...uiActionTypes
};

const selectors = {
  ...roomSelectors,
  ...logsSelectors,
  ...uiSelectors
};

const reducers = combineReducers({
  room: roomReducers,
  logs: logsReducers,
  ui: uiReducers,
  reduxAsyncConnect: reduxAsyncReducer
});

export {
  actionTypes,
  actions,
  reducers,
  selectors
};
