// @flow

import React from 'react';
import classnames from 'classnames';

import styles from './row.styles.pcss';

type PropsType = {
  children: React$Node,
  className?: string,
};

const Row = ({ children, className }: PropsType): React$Node => (
  <div className={classnames(styles.row, className)}>
    {children}
  </div>
);

Row.defaultProps = {
  className: '',
};

export default Row;
