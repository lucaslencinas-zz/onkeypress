import React from 'react';
import PropTypes from 'prop-types';
import styles from './Logs.css';

const Logs = ({ messages = [] }) => (
  <div className={styles.messages}>
    log
    {messages.map((message, index) => (
      <div key={`${index + 1}`} className={styles.message}>
          [Type of Message] + [Message: [User || Nada] - Content]
      </div>
    ))}
  </div>
);

Logs.propTypes = {
  messages: PropTypes.arrayOf(PropTypes.object)
};

export default Logs;
