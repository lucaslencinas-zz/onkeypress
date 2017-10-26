import React from 'react';
import { shallow } from 'enzyme';
import Room from './Room';

describe('Room', () => {
  let room;

  beforeEach(() => {
    room = shallow(
      <Room />);
  });

  it('renders the Room', () => {
    room.exists().should.eql(true);
  });
});
