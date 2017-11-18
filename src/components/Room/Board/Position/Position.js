import React, { PropTypes } from 'react';
import styles from './Position.css';

const Position = ({ content }) => (
  <div className={`${styles.position} ${styles[content]}`} />
);

Position.propTypes = {
  content: PropTypes.string
};

export default Position;
