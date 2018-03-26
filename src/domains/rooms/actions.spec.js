import { expect } from 'chai';
import configureStore from 'redux-mock-store';
import { thunk } from '~/store/configureStore';
import * as actions from './actions';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('Rooms actions', () => {
  let store;
  let initialState;

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
      let connection;

      beforeEach(() => {
        player = { slug: 'lucas', name: 'lucas' };
        room = {
          slug: 'room1',
          name: 'room1',
          players: [],
          buttons: ['UP', 'DOWN', 'LEFT', 'RIGHT']
        };
        connection = { on: () => {}, emit: () => {} };
        initialState.rooms = {
          room1: room
        };
        store = mockStore(initialState);
        return store.dispatch(actions.addPlayer({ connection, player, room }));
      });

      it('executes the expected actions', () => (
        expect(store.getActions().length).to.eql(3)
      ));
    });
  });
});
