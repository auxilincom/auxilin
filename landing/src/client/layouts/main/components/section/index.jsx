import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import styles from './styles.pcss';

const Section = ({
  children,
  className,
  isNoBorder,
  isWithShadow,
}) => {
  const cx = {
    [styles.noBorder]: isNoBorder,
    [styles.shadow]: isWithShadow,
  };
  return (
    <section className={classnames(styles.section, cx)}>
      <div className={classnames(styles.content, className)}>{children}</div>
    </section>
  );
};

Section.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  isNoBorder: PropTypes.bool,
  isWithShadow: PropTypes.bool,
};

Section.defaultProps = {
  className: '',
  isNoBorder: false,
  isWithShadow: false,
};


export default Section;
