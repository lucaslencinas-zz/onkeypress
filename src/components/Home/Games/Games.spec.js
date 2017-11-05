import React from 'react';
import { shallow } from 'enzyme';
import Games from './Games';

describe('Games', () => {
  let game;

  beforeEach(() => {
    game = shallow(<Games />);
  });

  it('renders the Games', () => {
    game.exists().should.eql(true);
  });
});
