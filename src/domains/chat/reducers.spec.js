import reducers from './reducers';

describe('Chat reducers', () => {
  let state;
  let action;
  let result;

  context('when the state is empty', () => {
    beforeEach(() => {
      state = {
        user: {},
        members: [],
        messages: []
      };
    });

    context('and no action is triggered', () => {
      before(() => {
        action = {};
        result = reducers(state, action);
      });

      it('returns the initial state', () => (
        result.should.be.deep.equal(state)
      ));
    });
  });
});
