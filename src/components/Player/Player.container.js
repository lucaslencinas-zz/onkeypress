import { connect } from 'react-redux';
import { selectors } from '~/domains';
import Player from './Player';

const playerState = (state, { params }) => ({
  room: selectors.room(state, params.roomSlug),
  player: selectors.player(state, params.playerSlug)
});

const playerAction = () => ({});

export default connect(playerState, playerAction)(Player);
