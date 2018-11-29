import React from 'react';

import Logo from '~/static/auxilin-logo.svg';

import styles from './styles.pcss';

export default () => (
  <footer className={styles.footer}>
    <span className={styles.contactUs}>Contact us</span>
    <div className={styles.info}>
      <div>20196 Northbrook Square, 95014 Cupertino, California, USA</div>
      <strong>Email: </strong>
      <a href="mailto:launch@auxilin.com">launch@auxilin.com</a>
      <div className={styles.logo}>
        <Logo />
      </div>
      <span>{`© ${new Date().getFullYear()} Auxilin, all rights reserved.`}</span>
    </div>
  </footer>
);
