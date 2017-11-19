import React from 'react';
import { shallow } from 'enzyme';
import Row from './Row';

describe('Row', () => {
  let board;

  beforeEach(() => {
    board = shallow(<Row />);
  });

  it('renders the Row', () => {
    board.exists().should.eql(true);
  });
});
