import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import Header from './components/header';
import Section from './components/section';
import Footer from './components/footer';

import styles from './styles.pcss';

const Layout = ({ children, className }) => {
  return (
    <div className={classnames(styles.wrap, className)}>
      {children}
      <Footer />
    </div>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

Layout.defaultProps = {
  className: '',
};

Layout.Header = Header;
Layout.Section = Section;

export default Layout;
