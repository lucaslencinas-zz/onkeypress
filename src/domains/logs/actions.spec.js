import { expect } from 'chai';
import configureStore from 'redux-mock-store';
import { thunk } from '~/store/configureStore';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('Logs actions', () => {
  let store;
  let initialState;

  beforeEach(() => {
    initialState = { logs: {} };
    store = mockStore(initialState);
  });

  it('executes the expected actions', () => (
    expect(store.getActions()).to.deep.equal([])
  ));
});
