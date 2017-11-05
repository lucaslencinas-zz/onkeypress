import React from 'react';
import styles from './Footer.css';

const Footer = () => (
  <div className={styles.footer}>
    <div className={styles.left}>
      <span>Made by Lucas Lencinas</span>
    </div>
    <div className={styles.right}>
      <span>Github</span>
      <span>LinkedIn</span>
      <span>Facebook</span>
      <span>Instagram</span>
      <span>Twitter</span>
      <span>Google +</span>
    </div>
  </div>
);

Footer.propTypes = {};

export default Footer;
