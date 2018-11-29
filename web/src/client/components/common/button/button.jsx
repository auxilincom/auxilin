// @flow

import React, { Component } from 'react';
import classnames from 'classnames';

import styles from './button.styles.pcss';

const colors = {
  green: 'green',
  blue: 'blue',
  red: 'red',
  purple: 'purple',
};

type ColorType = 'green' | 'blue' | 'red' | 'purple' | null;

type PropsType = {
  children: React$Node,
  onClick?: (e: SyntheticEvent<HTMLDivElement>) => Promise<*> | void,
  onKeyDown?: (e: SyntheticKeyboardEvent<HTMLDivElement>) => Promise<*> | void,
  tabIndex?: string | number,
  color?: ColorType,
  className?: string,
};

const noop = () => {};

class Button extends Component<PropsType> {
  static defaultProps = {
    onClick: noop,
    onKeyDown: noop,
    tabIndex: 0,
    color: colors.blue,
    className: '',
  };

  onEnterDown = (e: SyntheticKeyboardEvent<HTMLDivElement>) => {
    const { onClick } = this.props;
    if (e.keyCode === 13 && onClick) {
      onClick(e);
    }
  };

  render(): React$Node {
    const {
      children, tabIndex, onClick, onKeyDown, color, className,
    } = this.props;

    return (
      <div
        className={classnames(styles.button, styles[color], className)}
        role="button"
        tabIndex={tabIndex}
        onClick={onClick}
        onKeyDown={onKeyDown || this.onEnterDown}
      >
        {children}
      </div>
    );
  }
}

export default Button;
export { colors };
