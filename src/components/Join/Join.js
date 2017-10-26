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
        <h3>Enter the name and password for the room you want to enter</h3>
        <div className={styles.form}>
          <div className={styles.formRow}>
            <div className={styles.label}>
              Room name:
            </div>
            <input
              placeholder={'Name'}
              className={styles.inputRoomName}
              value={room.name}
              onChange={this.handleRoomNameChange}
              autoFocus
            />
          </div>
          <div className={styles.formRow}>
            <div className={styles.label}>
              Password:
            </div>
            <input
              placeholder={'Password'}
              className={styles.inputRoomPassword}
              value={room.password}
              onChange={this.handleRoomPasswordChange}
              autoFocus
            />
          </div>
          <div className={styles.formRow}>
            <div className={styles.label}>
              Player Name:
            </div>
            <input
              placeholder={'Player Name'}
              className={styles.inputPlayerName}
              value={playerName}
              onChange={this.handlePlayerNameChange}
              autoFocus
            />
          </div>
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
    );
  }
}

Join.propTypes = {
  onJoinRoom: PropTypes.func,
  onCancel: PropTypes.func
};

export default Join;
