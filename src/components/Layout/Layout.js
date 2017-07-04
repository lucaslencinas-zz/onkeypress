import React from 'react';
import PropTypes from 'prop-types';
import styles from './Layout.css';

const Layout = ({
  alert,
  children,
  onCloseAlert
}) => (
  <div className={styles.layout}>
    <div display-if={alert} className={styles.alert}>
      <div className={styles.alertMessage}>
        {alert.message}
      </div>
      <div className={styles.alertClose} onClick={onCloseAlert}>
        X
      </div>
    </div>
    <div className={styles.content}>
      {children}
    </div>
  </div>
);

Layout.propTypes = {
  alert: PropTypes.object,
  children: PropTypes.object,
  onCloseAlert: PropTypes.func
};

export default Layout;
