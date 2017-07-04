import { expect } from 'chai';
import configureStore from 'redux-mock-store';
import { thunk } from '~/store/configureStore';
import * as actions from './actions';
import actionTypes from './actionTypes';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('Chat actions', () => {
  let store;
  let initialState;
  let expectedActions;

  beforeEach(() => {
    initialState = {
      user: {},
      members: [],
      messages: []
    };
  });

  describe('addMessage()', () => {
    beforeEach(() => {
      store = mockStore(initialState);
    });

    context('When the message was added successfully', () => {
      let message;
      let user;

      beforeEach(() => {
        user = { id: '456', name: 'lucas' };
        message = { id: '123', text: 'hola', user };
        expectedActions = [{ type: actionTypes.ADD_MESSAGE, message }];
        return store.dispatch(actions.addMessage(message));
      });

      it('executes the expected actions', () => (
        expect(store.getActions()).to.deep.equal(expectedActions)
      ));
    });
  });
});
