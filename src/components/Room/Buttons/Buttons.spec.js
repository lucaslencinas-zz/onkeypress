import React from 'react';
import { shallow } from 'enzyme';
import Buttons from './Buttons';

describe('Buttons', () => {
  let buttons;

  beforeEach(() => {
    buttons = shallow(<Buttons players={[]} />);
  });

  it('renders the Buttons', () => {
    buttons.exists().should.eql(true);
  });
});
