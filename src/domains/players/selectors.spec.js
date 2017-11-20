import selectors from './selectors';

describe('Players Selectors', () => {
  let state;
  let player;

  beforeEach(() => {
    player = { name: 'lucas', slug: 'lucas' };
    state = {
      players: {
        somePlayerSlug: player
      }
    };
  });

  it('retrieves the players from a room', () => {
    selectors.player(state, 'somePlayerSlug').should.eql(player);
  });
});
