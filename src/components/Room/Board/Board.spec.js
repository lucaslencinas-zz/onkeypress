import React from 'react';
import { shallow } from 'enzyme';
import Board from './Board';

describe('Board', () => {
  let board;

  beforeEach(() => {
    board = shallow(<Board />);
  });

  it('renders the Board', () => {
    board.exists().should.eql(true);
  });
});
