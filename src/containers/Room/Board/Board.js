import { connect } from 'react-redux';
import Board from '~/components/Room/Board';
import { selectors } from '~/domains';

const boardState = (state, params) => ({
  status: selectors.game(state, params.roomSlug).status,
  direction: selectors.game(state, params.roomSlug).direction
});

const boardAction = () => ({});

export default connect(boardState, boardAction)(Board);
