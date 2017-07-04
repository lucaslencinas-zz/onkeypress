import React from 'react';
import { shallow } from 'enzyme';
import Layout from './Layout';

describe('Layout', () => {
  let layout;
  let onCloseAlert;

  beforeEach(() => {
    onCloseAlert = sandbox.stub();

    layout = shallow(<Layout onCloseAlert={onCloseAlert} />);
  });

  it('renders the Layout', () => {
    layout.exists().should.eql(true);
  });
});
