import React from 'react';
import { shallow } from 'enzyme';
import Logs from './Logs';

describe('Logs', () => {
  let logs;

  beforeEach(() => {
    logs = shallow(<Logs messages={[]} />);
  });

  it('renders the Logs', () => {
    logs.exists().should.eql(true);
  });
});
