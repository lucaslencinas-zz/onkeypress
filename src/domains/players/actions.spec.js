import { expect } from 'chai';
import configureStore from 'redux-mock-store';
import { thunk } from '~/store/configureStore';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('Players actions', () => {
  let store;
  let initialState;

  beforeEach(() => {
    initialState = { players: {} };
    store = mockStore(initialState);
  });

  it('executes the expected actions', () => (
    expect(store.getActions()).to.deep.equal([])
  ));
});
