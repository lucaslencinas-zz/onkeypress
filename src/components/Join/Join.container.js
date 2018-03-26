import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { actions } from '~/domains';
import Join from './Join';

const joinState = () => ({});

const joinAction = (dispatch) => ({
  onCancel: () => dispatch(push('/')),
  onJoinRoom: (payload) => dispatch(actions.joinRoom(payload))
});

export default connect(joinState, joinAction)(Join);
