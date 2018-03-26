import React from 'react';
import PropTypes from 'prop-types';
import styles from './DirectionButton.css';

const coordinates = {
  UP: '50,10 10,40 10,90 90,90 90,40',
  LEFT: '10,50 30,90 90,90 90,10 40,10',
  DOWN: '10,10 10,60 50,90 90,60 90,10',
  RIGHT: '10,10 10,90 60,90 90,50 60,10',
  NONE: '10,10 10,90 90,90 90,10'
};

const DirectionButton = ({
  direction = 'NONE',
  isTaken = false,
  isClickable = false,
  onClick = () => false
}) => {
  const takenStyle = isTaken ? styles.taken : styles.empty;
  const clickableStyle = isClickable ? styles.clickable : '';

  return (
    <div className={`${styles.directionButton} ${takenStyle} ${clickableStyle}`}>
      <span className={styles.icon}>
        <svg viewBox="0 0 100 100" width="100%" height="100%" onClick={onClick}>
          <polygon points={coordinates[direction]} />
        </svg>
      </span>
    </div>
  );
};

DirectionButton.propTypes = {
  direction: PropTypes.string,
  isTaken: PropTypes.bool,
  isClickable: PropTypes.bool,
  onClick: PropTypes.func
};

export default DirectionButton;
