import selectors from './selectors';

describe('UI Selectors', () => {
  let state;

  beforeEach(() => {
    state = {
      ui: {
        alert: {
          message: 'Hubo un error en el servidor'
        }
      }
    };
  });

  it('the alert selector retrieves the value of the variable alert', () => {
    selectors.alert(state).should.eql({ message: 'Hubo un error en el servidor' });
  });
});
