import React from 'react';
import PropTypes from 'prop-types';
import styles from './Join.css';

class Join extends React.Component {
  constructor(props) {
    super(props);

    this.handleJoin = this.handleJoin.bind(this);
    this.handleRoomNameChange = this.handleRoomNameChange.bind(this);
    this.handleRoomPasswordChange = this.handleRoomPasswordChange.bind(this);
    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.state = { room: { name: '', password: '' }, username: '' };
  }

  handleRoomNameChange(e) {
    this.setState({ room: { ...this.state.room, name: e.target.value } });
  }

  handleRoomPasswordChange(e) {
    this.setState({ room: { ...this.state.room, password: e.target.value } });
  }

  handleUsernameChange(e) {
    this.setState({ username: e.target.value });
  }

  handleJoin() {
    const { name, password, username } = this.state;
    this.props.onJoinRoom({ name, password, username });
  }

  render() {
    const { room, username } = this.state;

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
              Username:
            </div>
            <input
              placeholder={'Username'}
              className={styles.inputUsername}
              value={username}
              onChange={this.handleUsernameChange}
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
