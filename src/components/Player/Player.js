import React from 'react';
import PropTypes from 'prop-types';
import * as socketio from '~/utils/socket.io';
import * as events from '~/utils/events';
import styles from './Player.css';

class Player extends React.Component {
  constructor(props) {
    super(props);

    this.state = { connection: socketio.createConnection() };
    this.initializeSocketClient(this.state.connection);
    this.handleClick = this.handleClick.bind(this);
  }

  initializeSocketClient(connection) {
    const handshake = { player: this.props.player, room: this.props.room };

    connection.emit(events.PLAYER_CONNECTED, handshake);
    connection.on(events.ROOM_CONNECTED, (room) => { console.log(room); });
    connection.on(events.CURRENT_PLAYERS, (players) => { console.log(players); });
    connection.on(events.BUTTON_ASSIGNED, ({ button, player }) => {
      console.log(button);
      if (this.props.player.slug === player.slug) {
        this.setState({ button });
      }
    });
  }

  handleClick() {
    const { connection, button } = this.state;
    if (button) {
      connection.emit(events.BUTTON_CLICKED, { button, player: this.props.player });
    }
  }

  render() {
    return (
      <div className={styles.player}>
        <h3>Room - Snake - RoomName</h3>
        <div className={styles.content}>
          <button className={styles.gameButton} onClick={this.handleClick}>
            Button inside game
          </button>
          <button className={styles.button} disabled>
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
