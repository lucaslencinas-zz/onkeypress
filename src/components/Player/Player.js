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
        <h3>Room - Snake - RoomName</h3>
        <div className={styles.content}>
          <button className={styles.gameButton}>
            Button inside game
          </button>
          <button className={styles.button}>
            Ready
          </button>
          <div className={styles.logs}>
            TextArea for logs
          </div>
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
