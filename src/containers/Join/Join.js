import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { Join } from '~/components';
import { actions } from '~/domains';

const joinState = () => ({});

const joinAction = (dispatch) => ({
  onCancel: () => dispatch(push('/')),
  onJoinRoom: (payload) => dispatch(actions.joinRoom(payload))
});

export default connect(joinState, joinAction)(Join);
