import { expect } from 'chai';
import configureStore from 'redux-mock-store';
import { thunk } from '~/store/configureStore';
import * as actions from './actions';
import actionTypes from './actionTypes';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('UI actions', () => {
  let alert;
  let store;
  let initialState;
  let expectedActions;

  beforeEach(() => {
    initialState = {};
  });

  describe('setAlert()', () => {
    beforeEach(() => {
      initialState = {};
      store = mockStore(initialState);
      alert = {
        type: 'error',
        message: 'some error message'
      };
    });

    context('when the alert is set', () => {
      beforeEach(() => {
        expectedActions = [{ type: actionTypes.SET_ALERT, alert }];
        return store.dispatch(actions.setAlert(alert));
      });

      it('executes the expected actions', () => (
        expect(store.getActions()).to.deep.equal(expectedActions)
      ));
    });
  });

  describe('closeAlert()', () => {
    beforeEach(() => {
      initialState = {};
      store = mockStore(initialState);
      alert = {
        type: 'error',
        message: 'some error message'
      };
    });

    context('when the alert is deleted', () => {
      beforeEach(() => {
        expectedActions = [{ type: actionTypes.CLOSE_ALERT }];
        return store.dispatch(actions.closeAlert(alert));
      });

      it('executes the expected actions', () => (
        expect(store.getActions()).to.deep.equal(expectedActions)
      ));
    });
  });
});
