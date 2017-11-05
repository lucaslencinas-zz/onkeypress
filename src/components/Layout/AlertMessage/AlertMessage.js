import React from 'react';
import PropTypes from 'prop-types';
import styles from './AlertMessage.css';

const AlertMessage = ({
  alert = {},
  onCloseAlert
}) => (
  <div className={styles.alert}>
    <div className={styles.alertMessage}>
      {alert.message}
    </div>
    <div className={styles.alertClose} onClick={onCloseAlert}>
      X
    </div>
  </div>
);

AlertMessage.propTypes = {
  alert: PropTypes.object,
  onCloseAlert: PropTypes.func
};

export default AlertMessage;
