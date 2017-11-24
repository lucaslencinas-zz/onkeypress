import React from 'react';
import PropTypes from 'prop-types';
import * as socketio from '~/utils/socket.io';
import * as events from '~/utils/events';
import { directionKeyCodes, oppositeDirections } from '~/utils/directions';
import Board from '~/containers/Room/Board';
import Players from './Players';
import Buttons from './Buttons';
import Logs from './Logs';
import Header from './Header';
import styles from './Room.css';

class Room extends React.Component {
  constructor(props) {
    super(props);

    this.state = { connection: socketio.createConnection(), messages: [], direction: this.props.room.game.direction };
    this.initializeSocketClient(this.state.connection);
    this.setActionListeners = this.setActionListeners.bind(this);
  }

  componentDidMount() {
    this.setActionListeners();
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ direction: nextProps.room.game.direction });
  }

  setActionListeners() {
    const self = this;
    const { room, onChangeDirection } = self.props;

    window.addEventListener('keydown', (e) => {
      if (e.keyCode < 41 && e.keyCode > 36) {
        const newDirection = directionKeyCodes[e.keyCode];
        if (newDirection !== oppositeDirections[self.state.direction] && newDirection !== self.state.direction) {
          onChangeDirection({ room, direction: newDirection });
        }
      }
    }, false);
  }

  initializeSocketClient(connection) {
    const {
      room,
      onAddPlayer,
      onRemovePlayer,
      onButtonClicked,
      onCurrentPlayers,
      onButtonAssigned
    } = this.props;
    const handshake = { room };

    connection.emit(events.ROOM_CONNECTED, handshake);
    connection.on(events.PLAYER_CONNECTED, (player) => onAddPlayer({ room, player }));
    connection.on(events.PLAYER_DISCONNECTED, (player) => onRemovePlayer({ room, player }));
    connection.on(events.CURRENT_PLAYERS, (players) => onCurrentPlayers({ room, players }));
    connection.on(events.BUTTON_ASSIGNED, (assignment) => onButtonAssigned({ assignment, room }));
    connection.on(events.BUTTON_CLICKED, (action) => onButtonClicked({ action, room }));
  }

  render() {
    const { room, logs, onChangeStatus, onIncreaseScore, onRestart } = this.props;

    return (
      <div className={styles.room}>
        <div className={styles.main}>
          <Players players={room.players} />
          <div className={styles.center}>
            <Header room={room} />
            <Board
              roomSlug={room.slug}
              onRestart={onRestart}
              onChangeStatus={onChangeStatus}
              onIncreaseScore={onIncreaseScore}
            />
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
  onButtonClicked: PropTypes.func,
  onChangeDirection: PropTypes.func, // eslint-disable-line
  onRestart: PropTypes.func,
  onIncreaseScore: PropTypes.func,
  onChangeStatus: PropTypes.func,
  onCurrentPlayers: PropTypes.func,
  onButtonAssigned: PropTypes.func
};

export default Room;
