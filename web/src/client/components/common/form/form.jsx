// @flow

import React from 'react';
import classnames from 'classnames';

import styles from './form.styles.pcss';

type PropsType = {
  children: React$Node,
  className?: string,
};

const Form = ({ className, children }: PropsType): React$Node => {
  return (
    <div className={classnames(styles.form, className)}>
      {children}
    </div>
  );
};

Form.defaultProps = {
  className: '',
};

export default Form;
