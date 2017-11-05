import React from 'react';
import { shallow } from 'enzyme';
import Header from './Header';

describe('Header', () => {
  let header;

  beforeEach(() => {
    header = shallow(<Header room={{}} />);
  });

  it('renders the Header', () => {
    header.exists().should.eql(true);
  });
});
