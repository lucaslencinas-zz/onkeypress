import { connect } from 'react-redux';
import { Room } from '~/components';
import { selectors, actions } from '~/domains';

const roomState = (state) => ({
  room: selectors.room(state)
});

const roomAction = (dispatch) => ({
  onAddPlayer: (payload) => dispatch(actions.addPlayer(payload)),
  onButtonAssigned: (payload) => dispatch(actions.assignButton(payload))
});

export default connect(roomState, roomAction)(Room);
