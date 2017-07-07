import React from 'react';
// import PropTypes from 'prop-types';
// import * as socketio from '~/utils/socket.io';
import styles from './Room.css';

class Room extends React.Component {
  constructor(props) {
    super(props);

    // this.handleSend = this.handleSend.bind(this);
    // this.handleMessageChange = this.handleMessageChange.bind(this);
    // this.handleKeyPress = this.handleKeyPress.bind(this);
    // this.state = { message: '', connection: socketio.createConnection() };
    // this.initializeSocketClient(this.state.connection);
  }

  // initializeSocketClient(connection) {
    // const handshake = { user: this.props.user };

    // connection.emit('user-connected', handshake);
    // connection.on('user-connected', (member) => this.props.onAddMember(member));
    // connection.on('current-users', (members) => this.props.onAddCurrentMembers(members));
    // connection.on('new-message', (msg) => this.props.onAddMessage(msg));
    // connection.on('user-disconnected', (member) => this.props.onRemoveMember(member));
  // }

  render() {
    // const { user, messages, members } = this.props;
    // const { message } = this.state;

    return (
      <div className={styles.chat}>
        <h3>Welcome to a random Room with React, Redux and SocketIO</h3>
        <div className={styles.content}>
          Content del Room
        </div>
      </div>
    );
  }
}

Room.propTypes = {};

export default Room;
