import React from 'react';
import { shallow } from 'enzyme';
import Home from './Home';

describe('Home', () => {
  let home;
  let homeTitle;
  let onEnter;

  beforeEach(() => {
    homeTitle = 'A title';
    onEnter = sandbox.stub();

    home = shallow(
      <Home
        homeTitle={homeTitle}
        onEnter={onEnter}
      />);
  });

  it('renders the Home', () => {
    home.exists().should.eql(true);
  });
});
