import React from 'react';
import { shallow } from 'enzyme';
import Player from './Player';

describe('Player', () => {
  let player;

  beforeEach(() => {
    player = shallow(
      <Player />);
  });

  it('renders the Player', () => {
    player.exists().should.eql(true);
  });
});
