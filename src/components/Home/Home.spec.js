import React from 'react';
import { shallow } from 'enzyme';
import Home from './Home';

describe('Home', () => {
  let home;

  beforeEach(() => {
    home = shallow(<Home />);
  });

  it('renders the Home', () => {
    home.exists().should.eql(true);
  });
});
