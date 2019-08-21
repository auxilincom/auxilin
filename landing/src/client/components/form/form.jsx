import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import styles from './styles.pcss';

const Form = ({
  children,
  className,
  onSubmit,
}) => {
  return (
    <form
      className={classnames(styles.form, className)}
      onSubmit={onSubmit}
    >
      {children}
    </form>
  );
};

Form.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  onSubmit: PropTypes.func,
};

Form.defaultProps = {
  className: '',
  onSubmit() {},
};

export default Form;
