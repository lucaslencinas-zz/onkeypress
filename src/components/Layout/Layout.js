import React from 'react';
import PropTypes from 'prop-types';
import TopBar from '~/components/TopBar';
import Footer from '~/components/Footer';
import AlertMessage from './AlertMessage';
import styles from './Layout.css';

const Layout = ({
  alert,
  children,
  onCloseAlert
}) => (
  <div className={styles.layout}>
    <TopBar />
    <AlertMessage display-if={alert} alert={alert} onClose={onCloseAlert} />
    <div className={styles.content}>
      {children}
    </div>
    <Footer />
  </div>
);

Layout.propTypes = {
  alert: PropTypes.object,
  children: PropTypes.object,
  onCloseAlert: PropTypes.func
};

export default Layout;
