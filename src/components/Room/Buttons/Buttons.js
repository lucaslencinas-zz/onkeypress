import React from 'react';
import PropTypes from 'prop-types';
import styles from './Buttons.css';
import Button from './Button';

const defaultButtons = ['LEFT', 'UP', 'DOWN', 'RIGHT'];

const playerForButton = (button, players) => (
  players.find((p) => (p.button || {}).name === button)
);

const Buttons = ({ players = [], buttons = defaultButtons }) => (
  <div className={styles.buttons}>
    <div className={styles.content}>
      {buttons.map((button, index) => (
        <Button
          key={`${index + 1}`}
          button={button}
          player={playerForButton(button, players)}
        />
      ))}
    </div>
  </div>
);

Buttons.propTypes = {
  buttons: PropTypes.arrayOf(PropTypes.string),
  players: PropTypes.arrayOf(PropTypes.object)
};

export default Buttons;
