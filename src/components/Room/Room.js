import React from 'react';
import PropTypes from 'prop-types';
import * as socketio from '~/utils/socket.io';
import Players from './Players';
import Buttons from './Buttons';
import Logs from './Logs';
import Header from './Header';
import Board from './Board';
import styles from './Room.css';

class Room extends React.Component {
  constructor(props) {
    super(props);

    this.state = { connection: socketio.createConnection() };
    this.initializeSocketClient(this.state.connection);
  }

  initializeSocketClient(connection) {
    const { room } = this.props;
    const handshake = { room };

    connection.emit('room-connected', handshake);
    connection.on('player-connected', (player) => {
      console.log(player);
      this.props.onAddPlayer({ player, room });
    });
    connection.on('current-players', (members) => { console.log(members); });

    connection.on('button-assigned', (assignment) => {
      console.log(assignment);
      this.props.onButtonAssigned({ assignment, room });
    });
  }

  render() {
    const { room } = this.props;
    return (
      <div className={styles.room}>
        <div className={styles.main}>
          <Players players={room.players} />
          <div className={styles.center}>
            <Header room={room} />
            <Board />
          </div>
          <Logs messages={room.messages} />
        </div>
        <Buttons players={room.players} />
      </div>
    );
  }
}

Room.propTypes = {
  room: PropTypes.object,
  onAddPlayer: PropTypes.func,
  onButtonAssigned: PropTypes.func
};

export default Room;
