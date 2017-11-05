import React, { PropTypes } from 'react';
import styles from './Technologies.css';

const technologies = [
  {
    name: 'React',
    img: 'react.png'
  },
  {
    name: 'Node.js',
    img: 'node.png'
  },
  {
    name: 'Socket.io',
    img: 'socket.png'
  },
  {
    name: 'Redis',
    img: 'redis.png'
  }
];

const Technologies = () => (
  <div className={styles.technologies}>
    <div className={styles.title}>
      <h3>Technologies</h3>
    </div>
    <div className={styles.list}>
      {technologies.map((tech, i) => <Technology tech={tech} key={`${i + 1}`} />)}
    </div>
  </div>
);

Technologies.propTypes = {};

export default Technologies;

const Technology = ({ tech }) => (
  <div className={styles.card}>
    <h5>{tech.name}</h5>
    <span>{tech.img}</span>
  </div>
);

Technology.propTypes = {
  tech: PropTypes.object
};
