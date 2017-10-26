import { connect } from 'react-redux';
import { Player } from '~/components';
import { selectors } from '~/domains';

const playerState = (state) => ({
  room: selectors.room(state),
  player: selectors.player(state)
});

const playerAction = () => ({});

export default connect(playerState, playerAction)(Player);
