import React from 'react';
import { shallow } from 'enzyme';
import * as socketio from '~/utils/socket.io';
import Chat from './Chat';

describe('Chat', () => {
  let chat;
  let user;
  let messages;
  let members;
  let onAddMessage;
  let onRemoveMember;
  let onAddMember;
  let onAddCurrentMembers;
  let connectionStub;

  beforeEach(() => {
    user = { id: '123', name: 'lucas' };
    messages = [];
    members = [{ id: '123', name: 'lucas' }];
    onAddMessage = sandbox.stub();
    onRemoveMember = sandbox.stub();
    onAddMember = sandbox.stub();
    onAddCurrentMembers = sandbox.stub();

    connectionStub = {
      on: sandbox.stub(),
      emit: sandbox.stub()
    };
    sandbox.stub(socketio, 'createConnection').returns(connectionStub);

    chat = shallow(
      <Chat
        user={user}
        messages={messages}
        members={members}
        onAddMessage={onAddMessage}
        onRemoveMember={onRemoveMember}
        onAddMember={onAddMember}
        onAddCurrentMembers={onAddCurrentMembers}
      />);
  });

  it('renders the Chat', () => {
    chat.exists().should.eql(true);
  });
});
