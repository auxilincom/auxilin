import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

import styles from './styles.pcss';

const Input = ({
  className,
  value,
  onChange,
  required,
  placeholder,
  type,
}) => {
  return (
    <input
      className={classnames(styles.input, className)}
      value={value}
      onChange={onChange}
      required={required}
      placeholder={placeholder}
      type={type}
    />
  );
};

Input.propTypes = {
  className: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  required: PropTypes.bool,
  type: PropTypes.oneOf([
    'button',
    'checkbox',
    'file',
    'hidden',
    'image',
    'password',
    'radio',
    'reset',
    'submit',
    'text',
    'email',
  ]),
};

Input.defaultProps = {
  className: '',
  value: null,
  onChange() {},
  placeholder: null,
  required: false,
  type: 'text',
};

export default Input;
