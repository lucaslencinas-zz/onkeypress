import React from 'react';
import { shallow } from 'enzyme';
import * as socketio from '~/utils/socket.io';
import Player from './Player';

describe('Player', () => {
  let player;

  beforeEach(() => {
    sandbox.stub(socketio, 'createConnection', () => ({ on: () => {}, emit: () => {} }));
    player = shallow(<Player player={{}} room={{}} />);
  });

  it('renders the Player', () => {
    player.exists().should.eql(true);
  });
});
