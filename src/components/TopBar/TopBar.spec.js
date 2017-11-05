import React from 'react';
import { shallow } from 'enzyme';
import TopBar from './TopBar';

describe('TopBar', () => {
  let topBar;

  beforeEach(() => {
    topBar = shallow(<TopBar />);
  });

  it('renders the TopBar', () => {
    topBar.exists().should.eql(true);
  });
});
