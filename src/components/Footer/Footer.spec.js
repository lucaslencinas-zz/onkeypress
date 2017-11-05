import React from 'react';
import { shallow } from 'enzyme';
import Footer from './Footer';

describe('Footer', () => {
  let footer;

  beforeEach(() => {
    footer = shallow(<Footer />);
  });

  it('renders the Footer', () => {
    footer.exists().should.eql(true);
  });
});
