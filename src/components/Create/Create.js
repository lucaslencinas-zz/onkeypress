import React from 'react';
import PropTypes from 'prop-types';
import styles from './Create.css';

class Create extends React.Component {
  constructor(props) {
    super(props);

    this.handleCreate = this.handleCreate.bind(this);
    this.handleRoomNameChange = this.handleRoomNameChange.bind(this);
    this.handleRoomPasswordChange = this.handleRoomPasswordChange.bind(this);
    this.state = { room: { name: '', password: '' } };
  }

  handleRoomNameChange(e) {
    this.setState({ room: { ...this.state.room, name: e.target.value } });
  }

  handleRoomPasswordChange(e) {
    this.setState({ room: { ...this.state.room, password: e.target.value } });
  }

  handleCreate() {
    const { name, password } = this.state.room;
    this.props.onCreateRoom({ name, password });
  }

  render() {
    const { room } = this.state;

    return (
      <div className={styles.create}>
        <h3>Create Room</h3>
        <div className={styles.form}>
          <div className={styles.formRow}>
            <span className={styles.label}>
              Room name:
            </span>
            <input
              placeholder={'Name'}
              className={styles.input}
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
              className={styles.input}
              value={room.password}
              onChange={this.handleRoomPasswordChange}
            />
          </div>
          <div className={styles.formRow}>
            <span className={styles.label}>
              Game:
            </span>
            <input
              placeholder={'Game'}
              className={styles.input}
              value={'Snake'}
              disabled
            />
          </div>
          <div className={styles.formRow}>
            <span className={styles.label}>
              Players:
            </span>
            <input
              placeholder={'Players'}
              className={styles.input}
              value={'4'}
              disabled
            />
          </div>
          <div className={styles.buttons}>
            <input
              type="button"
              className={styles.button}
              value={'Cancel'}
              onClick={this.props.onCancel}
            />
            <input
              type="button"
              className={styles.button}
              value={'Create'}
              onClick={this.handleCreate}
            />
          </div>
        </div>
      </div>
    );
  }
}

Create.propTypes = {
  onCreateRoom: PropTypes.func,
  onCancel: PropTypes.func
};

export default Create;
