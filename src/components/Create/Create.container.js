import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { actions } from '~/domains';
import Create from './Create';

const createState = () => ({});

const createAction = (dispatch) => ({
  onCancel: () => dispatch(push('/')),
  onCreateRoom: (payload) => dispatch(actions.createRoom(payload))
});

export default connect(createState, createAction)(Create);
