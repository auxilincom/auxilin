// @flow

import React from 'react';

import { Switch, Route } from 'react-router-dom';
import { FaBell } from 'react-icons/fa';

import Search from './components/search';
import UserMenu from './components/user-menu';

import styles from './header.styles.pcss';

const renderPageTitle = (title: string): React$Node => <span className={styles.title}>{title}</span>;

const Header = (): React$Node => {
  return (
    <div className={styles.header}>
      <div>
        <Switch>
          <Route path="/" exact render={(): React$Node => renderPageTitle('Dashboard')} />
          <Route path="/profile" render={(): React$Node => renderPageTitle('Profile')} />
        </Switch>
      </div>
      <div className={styles.headerItems}>
        <Search className={styles.search} />

        <FaBell size={20} className={styles.notificationsBtn} />

        <UserMenu />
      </div>
    </div>
  );
};

export default Header;
