import { expect } from 'chai';
import configureStore from 'redux-mock-store';
import { thunk } from '~/store/configureStore';
import * as actions from './actions';
import actionTypes from './actionTypes';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('Rooms actions', () => {
  let store;
  let initialState;
  let expectedActions;

  beforeEach(() => {
    initialState = {
      rooms: {}
    };
  });

  describe('addPlayer()', () => {
    beforeEach(() => {
      store = mockStore(initialState);
    });

    context('When the message was added successfully', () => {
      let player;
      let room;

      beforeEach(() => {
        player = { slug: 'lucas', name: 'lucas' };
        room = { slug: 'room1', pass: 'room1' };
        expectedActions = [{ type: actionTypes.ADD_PLAYER, player, room }];
        return store.dispatch(actions.addPlayer({ player, room }));
      });

      it('executes the expected actions', () => (
        expect(store.getActions()).to.deep.equal(expectedActions)
      ));
    });
  });
});
