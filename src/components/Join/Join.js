import React from 'react';
import PropTypes from 'prop-types';
import styles from './Join.css';

class Join extends React.Component {
  constructor(props) {
    super(props);

    this.handleJoin = this.handleJoin.bind(this);
    this.handleRoomNameChange = this.handleRoomNameChange.bind(this);
    this.handleRoomPasswordChange = this.handleRoomPasswordChange.bind(this);
    this.handlePlayerNameChange = this.handlePlayerNameChange.bind(this);
    this.state = { room: { name: '', password: '' }, playerName: '' };
  }

  handleRoomNameChange(e) {
    this.setState({ room: { ...this.state.room, name: e.target.value } });
  }

  handleRoomPasswordChange(e) {
    this.setState({ room: { ...this.state.room, password: e.target.value } });
  }

  handlePlayerNameChange(e) {
    this.setState({ playerName: e.target.value });
  }

  handleJoin() {
    const { room, playerName } = this.state;
    this.props.onJoinRoom({
      room: { ...room, slug: room.name.replace(/ /g, '_') },
      player: { name: playerName, slug: playerName.replace(/ /g, '_') }
    });
  }

  render() {
    const { room, playerName } = this.state;

    return (
      <div className={styles.join}>
        <h3>Join Room</h3>
        <div className={styles.form}>
          <div className={styles.formRow}>
            <span className={styles.label}>
              Room name:
            </span>
            <input
              placeholder={'Name'}
              className={styles.inputRoomName}
              value={room.name}
              onChange={this.handleRoomNameChange}
              autoFocus
            />
          </div>
          <div className={styles.formRow}>
            <span className={styles.label}>
              Password:
            </span>
            <input
              placeholder={'Password'}
              className={styles.inputRoomPassword}
              value={room.password}
              onChange={this.handleRoomPasswordChange}
              autoFocus
            />
          </div>
          <div className={styles.formRow}>
            <span className={styles.label}>
              Player Name:
            </span>
            <input
              placeholder={'Player Name'}
              className={styles.inputPlayerName}
              value={playerName}
              onChange={this.handlePlayerNameChange}
              autoFocus
            />
          </div>
          <div className={styles.buttons}>
            <input
              type="button"
              className={styles.button}
              value={'Cancel'}
              onClick={this.props.onCancel}
              autoFocus
            />
            <input
              type="button"
              className={styles.button}
              value={'Join'}
              onClick={this.handleJoin}
              autoFocus
            />
          </div>
        </div>
      </div>
    );
  }
}

Join.propTypes = {
  onJoinRoom: PropTypes.func,
  onCancel: PropTypes.func
};

export default Join;
