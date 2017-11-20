import { connect } from 'react-redux';
import { Player } from '~/components';
import { selectors } from '~/domains';

const playerState = (state, { params }) => ({
  room: selectors.room(state, params.roomSlug),
  player: selectors.player(state, params.playerSlug)
});

const playerAction = () => ({});

export default connect(playerState, playerAction)(Player);
