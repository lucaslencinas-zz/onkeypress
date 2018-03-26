import React from 'react';
import { shallow } from 'enzyme';
import DirectionButton from './DirectionButton';

describe('DirectionButton', () => {
  let buttons;

  beforeEach(() => {
    buttons = shallow(<DirectionButton />);
  });

  it('renders the DirectionButton', () => {
    buttons.exists().should.eql(true);
  });
});
