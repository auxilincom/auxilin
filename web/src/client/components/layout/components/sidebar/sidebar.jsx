// @flow

import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import type { LocationShape } from 'react-router-dom';
import { MdDashboard, MdPerson } from 'react-icons/md';
import classnames from 'classnames';

import Logo from 'assets/images/logo.svg';
import { indexPath, profilePath } from 'components/layout/layout.paths';

import styles from './sidebar.styles.pcss';

type LinkType = {
  label: string,
  to: LocationShape,
  icon: React$ComponentType<IconBaseProps>,
};

const links: Array<LinkType> = [
  {
    label: 'Dashboard',
    to: indexPath(),
    icon: MdDashboard,
  },
  {
    label: 'Profile',
    to: profilePath(),
    icon: MdPerson,
  },
];

class Sidebar extends Component<*> {
  static item(link: LinkType): React$Node {
    return (
      <li key={link.label} className={styles.navLink}>
        <NavLink
          to={link.to}
          exact
          activeClassName={styles.active}
        >
          <link.icon size="24px" className={styles.navLinkIcon} />
          {link.label}
        </NavLink>
      </li>
    );
  }

  render(): React$Node {
    const linkNodes = links.map((link: LinkType): React$Node => {
      return Sidebar.item(link);
    });

    return (
      <div className={classnames(styles.sidebar)}>
        <div className={styles.logo}>
          <NavLink to={indexPath()}>
            <Logo />
          </NavLink>
        </div>
        <ul className={styles.navLinks}>
          {linkNodes}
        </ul>
      </div>
    );
  }
}

export default Sidebar;
