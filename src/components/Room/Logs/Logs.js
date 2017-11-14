import React from 'react';
import PropTypes from 'prop-types';
import styles from './Logs.css';

const renderLog = ({ event, entity = '', content = '' }) => `[${event}]: ${entity} ${content}`;

const Logs = ({ logs = [] }) => (
  <div className={styles.logs}>
    <h4>Logs</h4>
    <div className={styles.messageList}>
      {logs.map((log, index) => (
        <div key={`${index + 1}`} className={styles.log}>
          {renderLog(log)}
        </div>
      ))}
    </div>
  </div>
);

Logs.propTypes = {
  logs: PropTypes.arrayOf(PropTypes.object)
};

export default Logs;
