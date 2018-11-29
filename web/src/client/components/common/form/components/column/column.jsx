// @flow

import React from 'react';
import classnames from 'classnames';

import styles from './column.styles.pcss';

type PropsType = {
  children?: React$Node,
  className?: string,
};

const Column = ({ children, className }: PropsType): React$Node => (
  <div className={classnames(styles.column, className)}>
    {children}
  </div>
);

Column.defaultProps = {
  className: '',
  children: null,
};

export default Column;
