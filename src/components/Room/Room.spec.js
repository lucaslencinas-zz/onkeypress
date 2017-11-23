import React from 'react';
import { shallow } from 'enzyme';
import * as socketio from '~/utils/socket.io';
import Room from './Room';

describe('Room', () => {
  let room;

  beforeEach(() => {
    sandbox.stub(socketio, 'createConnection', () => ({ on: () => {}, emit: () => {} }));
    room = shallow(<Room room={{ game: {} }} />);
  });

  it('renders the Room', () => {
    room.exists().should.eql(true);
  });
});
