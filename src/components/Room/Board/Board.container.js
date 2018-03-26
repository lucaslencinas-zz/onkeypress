import { connect } from 'react-redux';
import { selectors } from '~/domains';
import Board from './Board';

const boardState = (state, params) => ({
  ...params,
  status: selectors.game(state, params.roomSlug).status,
  direction: selectors.game(state, params.roomSlug).direction
});

const boardAction = () => ({});

export default connect(boardState, boardAction)(Board);
