import selectors from './selectors';

describe('Room Selectors', () => {
  let state;

  beforeEach(() => {
    state = {
      room: {
        user: { name: 'lucas' }
      }
    };
  });

  it('the user retrieves the user string', () => {
    selectors.user(state).should.eql({ name: 'lucas' });
  });
});
