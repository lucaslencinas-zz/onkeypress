import React from 'react';
import PropTypes from 'prop-types';
import * as socketio from '~/utils/socket.io';
import uuid from 'uuid';
import styles from './Chat.css';

class Chat extends React.Component {
  constructor(props) {
    super(props);

    this.handleSend = this.handleSend.bind(this);
    this.handleMessageChange = this.handleMessageChange.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.state = { message: '', connection: socketio.createConnection() };
    this.initializeSocketClient(this.state.connection);
  }

  initializeSocketClient(connection) {
    const handshake = { user: this.props.user };

    connection.emit('user-connected', handshake);
    connection.on('user-connected', (member) => this.props.onAddMember(member));
    connection.on('current-users', (members) => this.props.onAddCurrentMembers(members));
    connection.on('new-message', (msg) => this.props.onAddMessage(msg));
    connection.on('user-disconnected', (member) => this.props.onRemoveMember(member));
  }

  handleSend() {
    const { user, onAddMessage } = this.props;
    const { message, connection } = this.state;
    const newMessage = { user, text: message.trim(), id: uuid.v4() };

    connection.emit('new-message', newMessage);
    onAddMessage(newMessage);
    this.setState({ message: '' });
  }

  handleMessageChange(e) {
    this.setState({ message: e.target.value });
  }

  handleKeyPress(e) {
    if (e.key === 'Enter' && this.state.message.trim()) {
      this.handleSend();
    }
  }

  render() {
    const { user, messages, members } = this.props;
    const { message } = this.state;

    return (
      <div className={styles.chat}>
        <h3>Welcome to a random Chat with React, Redux and SocketIO</h3>
        <div className={styles.content}>
          <div className={styles.members}>
            <div className={styles.list}>
              {members.map((member) => <Member key={member.id} user={user} member={member} />)}
            </div>
          </div>
          <div className={styles.panel}>
            <div className={styles.messages}>
              {messages.map((msg) => <Message key={msg.id} msg={msg} user={user} />)}
            </div>
            <div className={styles.form}>
              <div className={styles.inputContainer}>
                <input
                  placeholder={`Write your message here, ${user.name}`}
                  className={styles.inputMessage}
                  value={message}
                  onChange={this.handleMessageChange}
                  onKeyPress={this.handleKeyPress}
                  autoFocus
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Chat.propTypes = {
  user: PropTypes.object,
  messages: PropTypes.arrayOf(PropTypes.object),
  members: PropTypes.arrayOf(PropTypes.object),
  onAddMessage: PropTypes.func,
  onRemoveMember: PropTypes.func,
  onAddMember: PropTypes.func,
  onAddCurrentMembers: PropTypes.func
};

const Member = ({ user, member }) => (
  <div className={`${styles.member} ${member.id === user.id ? styles.currentUser : ''}`}>
    {member.name}
  </div>
);

Member.propTypes = {
  user: PropTypes.object,
  member: PropTypes.object
};

const Message = ({ msg, user }) => {
  const isServerMessage = msg.user.id === 'server';
  let messageClass;

  if (isServerMessage) {
    messageClass = 'serverMessage';
  } else {
    messageClass = msg.user.id === user.id ? 'myMessage' : 'othersMessage';
  }

  return (
    <div className={`${styles.messageContainer} ${styles[messageClass]}`}>
      <div className={styles.message}>
        <div display-if={!isServerMessage} className={styles.messageSender}>
          {msg.user.name}
        </div>
        <div className={styles.messageText}>
          {msg.text}
        </div>
      </div>
    </div>
  );
};

Message.propTypes = {
  msg: PropTypes.object,
  user: PropTypes.object
};

export default Chat;
