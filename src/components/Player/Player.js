import React from 'react';
import PropTypes from 'prop-types';
import * as socketio from '~/utils/socket.io';
import styles from './Player.css';

class Player extends React.Component {
  constructor(props) {
    super(props);

    this.state = { connection: socketio.createConnection() };
    this.initializeSocketClient(this.state.connection);
  }

  initializeSocketClient(connection) {
    const handshake = { player: this.props.player, room: this.props.room };

    connection.emit('player-connected', handshake);
    connection.on('room-connected', (room) => { console.log(room); });
    connection.on('current-users', (members) => { console.log(members); });
    connection.on('button-assigned', (button) => { console.log(button); });
  }

  render() {
    return (
      <div className={styles.player}>
        <h3>Welcome to a random Player with React, Redux and SocketIO</h3>
        <div className={styles.content}>
          Content del Player
        </div>
      </div>
    );
  }
}

Player.propTypes = {
  player: PropTypes.object,
  room: PropTypes.object
};

export default Player;
