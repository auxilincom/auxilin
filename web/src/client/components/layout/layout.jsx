// @flow

import React, { Component } from 'react';

import Toast from 'components/common/toast';
import Header from './components/header';
import Footer from './components/footer';
import Sidebar from './components/sidebar';

import styles from './layout.styles.pcss';

type PropsType = {
  children: React$Node,
};

class Layout extends Component<PropsType> {
  render(): React$Node {
    const { children } = this.props;

    return (
      <div className={styles.page}>
        <Sidebar />

        <Header />

        <div className={styles.content}>
          {children}
        </div>

        <Footer />

        <Toast />
      </div>
    );
  }
}

export default Layout;
