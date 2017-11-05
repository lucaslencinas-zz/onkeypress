import React from 'react';
import { shallow } from 'enzyme';
import AlertMessage from './AlertMessage';

describe('AlertMessage', () => {
  let alertMessage;

  beforeEach(() => {
    alertMessage = shallow(<AlertMessage />);
  });

  it('renders the AlertMessage', () => {
    alertMessage.exists().should.eql(true);
  });
});
