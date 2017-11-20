import { connect } from 'react-redux';
import { Room } from '~/components';
import { selectors, actions } from '~/domains';

const roomState = (state, { params }) => ({
  room: selectors.room(state, params.roomSlug),
  logs: selectors.logs(state, params.roomSlug)
});

const roomAction = (dispatch) => ({
  onAddPlayer: (payload) => {
    dispatch(actions.addPlayer(payload));
    dispatch(actions.logPlayerConnected(payload));
  },
  onRemovePlayer: (payload) => {
    dispatch(actions.removePlayer(payload));
    dispatch(actions.logPlayerDisconnected(payload));
  },
  onButtonAssigned: (payload) => {
    dispatch(actions.assignButton(payload));
    dispatch(actions.logButtonAssigned(payload));
  },
  onButtonClicked: (payload) => {
    dispatch(actions.logButtonClicked(payload));
  },
  onCurrentPlayers: (payload) => {
    dispatch(actions.setCurrentPlayers(payload));
    dispatch(actions.logCurrentPlayers(payload));
  }
});

export default connect(roomState, roomAction)(Room);
