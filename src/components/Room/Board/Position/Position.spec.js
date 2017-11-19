import React from 'react';
import { shallow } from 'enzyme';
import Position from './Position';

describe('Position', () => {
  let board;

  beforeEach(() => {
    board = shallow(<Position />);
  });

  it('renders the Position', () => {
    board.exists().should.eql(true);
  });
});
