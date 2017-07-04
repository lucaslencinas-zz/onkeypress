import selectors from './selectors';

describe('Chat Selectors', () => {
  let state;

  beforeEach(() => {
    state = {
      chat: {
        user: { name: 'lucas' }
      }
    };
  });

  it('the user retrieves the user string', () => {
    selectors.user(state).should.eql({ name: 'lucas' });
  });
});
