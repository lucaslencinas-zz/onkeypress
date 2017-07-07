import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { Create } from '~/components';
import { actions } from '~/domains';

const createState = () => ({});

const createAction = (dispatch) => ({
  onCancel: () => dispatch(push('/')),
  onCreateRoom: (payload) => dispatch(actions.createRoom(payload))
});

export default connect(createState, createAction)(Create);
