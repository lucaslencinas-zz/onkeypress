import { combineReducers } from 'redux';
import { reducer as reduxAsyncReducer } from 'redux-connect';

import {
  actions as roomActions,
  actionTypes as roomActionTypes,
  selectors as roomSelectors,
  reducers as roomReducers
} from './room';

import {
  actions as uiActions,
  actionTypes as uiActionTypes,
  selectors as uiSelectors,
  reducers as uiReducers
} from './ui';

const actions = {
  ...roomActions,
  ...uiActions
};

const actionTypes = {
  ...roomActionTypes,
  ...uiActionTypes
};

const selectors = {
  ...roomSelectors,
  ...uiSelectors
};

const reducers = combineReducers({
  room: roomReducers,
  ui: uiReducers,
  reduxAsyncConnect: reduxAsyncReducer
});

export {
  actionTypes,
  actions,
  reducers,
  selectors
};
