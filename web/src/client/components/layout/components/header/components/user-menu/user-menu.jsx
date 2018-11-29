// @flow

import React, { Component } from 'react';
import classnames from 'classnames';

import type { LocationShape } from 'react-router-dom';

import { Link } from 'react-router-dom';

import {
  FaAngleDown,
} from 'react-icons/fa';
import { MdPerson } from 'react-icons/md';

import {
  profilePath,
  changePasswordPath,
  logoutPath,
} from 'components/layout/layout.paths';

import styles from './user-menu.styles.pcss';

type StateType = {
  menuOpen: boolean,
};

type LinkType = {
  label: string,
  to: LocationShape,
  routerLink: boolean,
};

const linksList: Array<LinkType> = [
  {
    label: 'Profile',
    to: profilePath(),
    routerLink: true,
  },
  {
    label: 'Change Password',
    to: changePasswordPath(),
    routerLink: true,
  },
  {
    label: 'Log Out',
    to: logoutPath(),
    routerLink: false,
  },
];

class UserMenu extends Component<*, StateType> {
  static links(): Array<React$Node> {
    return linksList.map((link: LinkType): React$Node => {
      const linkContent: React$Node = (
        <>
          <span>
            {link.label}
          </span>
        </>
      );

      const linkEl: React$Node = link.routerLink
        ? (
          <Link to={link.to} className={styles.link}>
            {linkContent}
          </Link>
        )
        : (
          <a href={link.to.pathname} className={styles.link}>
            {linkContent}
          </a>
        );

      return (
        <li key={link.label}>
          {linkEl}
        </li>
      );
    });
  }

  state = {
    menuOpen: false,
  };

  componentDidMount() {
    document.addEventListener('click', this.onDocumentClick);
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.onDocumentClick);
  }

  onToggleMenu = () => {
    const { menuOpen } = this.state;

    this.setState({ menuOpen: !menuOpen });
  };

  onDocumentClick = (e: MouseEvent) => {
    const el = e.target;
    if (!(this.menu && el instanceof Node && this.menu.contains(el))) {
      this.setState({ menuOpen: false });
    }
  };

  onEnterDown = (e: SyntheticKeyboardEvent<HTMLSpanElement>) => {
    if (e.keyCode === 13) {
      this.closeMenu();
    }
  };

  menu: ?HTMLSpanElement;

  closeMenu() {
    this.setState({ menuOpen: false });
  }

  render(): React$Node {
    const { menuOpen } = this.state;

    return (
      <span className={styles.user}>
        <span
          className={styles.userBtn}
          role="button"
          tabIndex="0"
          onClick={this.onToggleMenu}
          onKeyDown={this.onEnterDown}
          ref={(menu: ?HTMLSpanElement) => {
            this.menu = menu;
          }}
        >
          <MdPerson size={25} />
          <FaAngleDown
            size={20}
            className={classnames(styles.angle, { [styles.open]: menuOpen })}
          />
        </span>

        <div
          className={classnames(styles.menu, {
            [styles.open]: menuOpen,
          })}
        >
          <ul className={styles.list}>
            {UserMenu.links()}
          </ul>
        </div>
      </span>
    );
  }
}

export default UserMenu;
