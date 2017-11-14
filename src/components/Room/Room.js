import React from 'react';
import PropTypes from 'prop-types';
import * as socketio from '~/utils/socket.io';
import * as events from '~/utils/events';
import Players from './Players';
import Buttons from './Buttons';
import Logs from './Logs';
import Header from './Header';
import Board from './Board';
import styles from './Room.css';

class Room extends React.Component {
  constructor(props) {
    super(props);

    this.state = { connection: socketio.createConnection(), messages: [] };
    this.initializeSocketClient(this.state.connection);
  }

  initializeSocketClient(connection) {
    const {
      room,
      onAddPlayer,
      onRemovePlayer,
      onCurrentPlayers,
      onButtonAssigned
    } = this.props;
    const handshake = { room };

    connection.emit(events.ROOM_CONNECTED, handshake);
    connection.on(events.PLAYER_CONNECTED, (player) => onAddPlayer({ room, player }));
    connection.on(events.PLAYER_DISCONNECTED, (player) => onRemovePlayer({ room, player }));
    connection.on(events.CURRENT_PLAYERS, (players) => onCurrentPlayers({ room, players }));
    connection.on(events.BUTTON_ASSIGNED, (assignment) => onButtonAssigned({ assignment, room }));
  }

  render() {
    const { room, logs } = this.props;

    return (
      <div className={styles.room}>
        <div className={styles.main}>
          <Players players={room.players} />
          <div className={styles.center}>
            <Header room={room} />
            <Board />
          </div>
          <Logs logs={logs} />
        </div>
        <Buttons players={room.players} buttons={room.buttons} />
      </div>
    );
  }
}

Room.propTypes = {
  room: PropTypes.object,
  logs: PropTypes.arrayOf(PropTypes.object),
  onAddPlayer: PropTypes.func,
  onRemovePlayer: PropTypes.func,
  onCurrentPlayers: PropTypes.func,
  onButtonAssigned: PropTypes.func
};

export default Room;
