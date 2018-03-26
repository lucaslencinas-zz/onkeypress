import { connect } from 'react-redux';
import { actions, selectors } from '~/domains';
import Layout from './Layout';

const layoutState = (state) => ({
  alert: selectors.alert(state)
});

const layoutAction = (dispatch) => ({
  onCloseAlert: () => dispatch(actions.closeAlert())
});

export default connect(layoutState, layoutAction)(Layout);
