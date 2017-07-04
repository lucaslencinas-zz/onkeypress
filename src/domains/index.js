import { combineReducers } from 'redux';
import { reducer as reduxAsyncReducer } from 'redux-connect';

import {
  actions as chatActions,
  actionTypes as chatActionTypes,
  selectors as chatSelectors,
  reducers as chatReducers
} from './chat';

import {
  actions as uiActions,
  actionTypes as uiActionTypes,
  selectors as uiSelectors,
  reducers as uiReducers
} from './ui';

const actions = {
  ...chatActions,
  ...uiActions
};

const actionTypes = {
  ...chatActionTypes,
  ...uiActionTypes
};

const selectors = {
  ...chatSelectors,
  ...uiSelectors
};

const reducers = combineReducers({
  chat: chatReducers,
  ui: uiReducers,
  reduxAsyncConnect: reduxAsyncReducer
});

export {
  actionTypes,
  actions,
  reducers,
  selectors
};
