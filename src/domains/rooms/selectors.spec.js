import selectors from './selectors';

describe('Rooms Selectors', () => {
  let state;
  let room1;

  beforeEach(() => {
    room1 = { name: 'someRoomSlug', slug: 'someRoomSlug' };
    state = {
      rooms: {
        someRoomSlug: room1
      }
    };
  });

  it('the user retrieves the room', () => {
    selectors.room(state, room1.slug).should.eql(room1);
  });
});
