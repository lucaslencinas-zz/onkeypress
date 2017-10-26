import React from 'react';
import PropTypes from 'prop-types';
import * as socketio from '~/utils/socket.io';
import styles from './Room.css';

class Room extends React.Component {
  constructor(props) {
    super(props);

    // this.handleSend = this.handleSend.bind(this);
    // this.handleMessageChange = this.handleMessageChange.bind(this);
    // this.handleKeyPress = this.handleKeyPress.bind(this);
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
    connection.on('current-players', (members) => {
      console.log(members);
      // this.props.onAddCurrentMembers(members)
    });

    connection.on('button-assigned', (assignment) => {
      console.log(assignment);
      this.props.onButtonAssigned({ assignment, room });
    });
    // connection.on('new-message', (msg) => this.props.onAddMessage(msg));
    // connection.on('user-disconnected', (member) => this.props.onRemoveMember(member));
  }

  render() {
    const { room } = this.props;
    return (
      <div className={styles.room}>
        <h3>Welcome to a random Room with React, Redux and SocketIO</h3>
        <div className={styles.content}>
          <div className={styles.topPanel}>
            Board vacio...
          </div>
          <div className={styles.bottomPanel}>
            <div className={styles.players}>
              {room.players.map((player) => (
                <div key={player.slug} className={styles.player}>
                  <span className={styles.name}>
                    {player.name}
                  </span>
                  <span className={styles.button} display-if={player.buttonAssigned}>
                    {player.buttonAssigned}
                  </span>
                </div>
              ))}
            </div>
            <div className={styles.logs}>
              logs
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Room.propTypes = {
  room: PropTypes.object,
  onAddPlayer: PropTypes.func
};

export default Room;
