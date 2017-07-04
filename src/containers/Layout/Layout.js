import { connect } from 'react-redux';
import { Layout } from '~/components';
import {
  actions,
  selectors
} from '~/domains';

const layoutState = (state) => ({
  alert: selectors.alert(state)
});

const layoutAction = (dispatch) => ({
  onCloseAlert: () => dispatch(actions.closeAlert())
});

export default connect(layoutState, layoutAction)(Layout);
