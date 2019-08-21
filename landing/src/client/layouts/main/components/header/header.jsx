import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import { states } from '~/constants';

import ButtonLink from '~/components/button-link';
import Link from '~/components/link';

import Logo from '~/static/auxilin-logo.svg';
import ArrowSvg from './arrow.svg';

import styles from './styles.pcss';

const Header = ({ state }) => (
  <nav className={styles.nav}>
    <div className={styles.container}>
      <div className={styles.menu}>
        <div className={classnames(styles.item, styles.logo)}>
          <Link href="/">
            <Logo />
          </Link>
        </div>
        <div className={styles.item}>
          <ul className={styles.links}>
            <li className={styles.link}>About</li>

            <li className={styles.link}>Blog</li>

            <li className={styles.link}>
              <ButtonLink prefetch href="/signin" state={state} className={styles.login}>
                <span className={styles.text}>Log In</span>
                <div className={styles.arrow}>
                  <ArrowSvg />
                </div>
              </ButtonLink>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </nav>
);

Header.propTypes = {
  state: PropTypes.string,
};

Header.defaultProps = {
  state: states.transparent,
};

export default Header;
