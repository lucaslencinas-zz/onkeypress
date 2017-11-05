import React from 'react';
import { shallow } from 'enzyme';
import Players from './Players';

describe('Players', () => {
  let players;

  beforeEach(() => {
    players = shallow(<Players players={[]} />);
  });

  it('renders the Players', () => {
    players.exists().should.eql(true);
  });
});
