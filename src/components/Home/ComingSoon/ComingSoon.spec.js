import React from 'react';
import { shallow } from 'enzyme';
import ComingSoon from './ComingSoon';

describe('ComingSoon', () => {
  let comingSoon;

  beforeEach(() => {
    comingSoon = shallow(<ComingSoon />);
  });

  it('renders the ComingSoon', () => {
    comingSoon.exists().should.eql(true);
  });
});
