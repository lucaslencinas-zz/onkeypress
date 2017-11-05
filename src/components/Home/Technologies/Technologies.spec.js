import React from 'react';
import { shallow } from 'enzyme';
import Technologies from './Technologies';

describe('Technologies', () => {
  let technologies;

  beforeEach(() => {
    technologies = shallow(<Technologies />);
  });

  it('renders the Technologies', () => {
    technologies.exists().should.eql(true);
  });
});
