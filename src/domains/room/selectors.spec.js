import selectors from './selectors';

describe('Room Selectors', () => {
  let state;

  beforeEach(() => {
    state = {
      room: {
        player: { name: 'lucas' }
      }
    };
  });

  it('the user retrieves the player', () => {
    selectors.player(state).should.eql({ name: 'lucas' });
  });
});
