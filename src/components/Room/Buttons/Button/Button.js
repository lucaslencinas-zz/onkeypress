import React from 'react';
import PropTypes from 'prop-types';
import DirectionButton from '~/components/common/DirectionButton';
import styles from './Button.css';

const Button = ({ button, player }) => {
  const currentStyle = player ? styles.taken : '';

  return (
    <div className={`${styles.button} ${currentStyle}`}>
      <DirectionButton direction={button} isTaken={!!player} />
      <div className={styles.player}>
        {player ? player.name : 'Waiting'}
      </div>
    </div>
  );
};

Button.propTypes = {
  button: PropTypes.string,
  player: PropTypes.object
};

export default Button;
