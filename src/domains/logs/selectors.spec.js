import selectors from './selectors';

describe('Logs Selectors', () => {
  let state;
  let log;

  beforeEach(() => {
    log = { event: 'ROOM CONNECTED', entity: 'lucas' };
    state = {
      logs: {
        someRoomSlug: [log]
      }
    };
  });

  it('retrieves the logs from a room', () => {
    selectors.logs(state, 'someRoomSlug').should.eql([log]);
  });
});
