import React from 'react';
import { shallow } from 'enzyme';
import Join from './Join';

describe('Join', () => {
  let join;
  let onCancel;
  let onJoinRoom;

  beforeEach(() => {
    onCancel = sandbox.stub();
    onJoinRoom = sandbox.stub();

    join = shallow(
      <Join
        onCancel={onCancel}
        onJoinRoom={onJoinRoom}
      />);
  });

  it('renders the Join', () => {
    join.exists().should.eql(true);
  });
});
