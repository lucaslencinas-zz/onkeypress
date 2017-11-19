import React from 'react';
import { shallow } from 'enzyme';
import Button from './Button';

describe('Button', () => {
  let buttons;

  beforeEach(() => {
    buttons = shallow(<Button />);
  });

  it('renders the Button', () => {
    buttons.exists().should.eql(true);
  });
});
