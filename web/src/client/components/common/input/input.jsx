// @flow

import React, { Component } from 'react';
import classnames from 'classnames';

import _uniq from 'lodash/uniq';

import styles from './input.styles.pcss';

type InputType = 'text' | 'search' | 'email' | 'number' | 'password' | 'url';

type PropsType = {
  onChange: (value: string) => void,
  value: string,
  className?: string,
  type: InputType,
  errors: Array<string>,
};

export default class Input extends Component<PropsType> {
  static defaultProps = {
    className: '',
    type: 'text',
    errors: [],
  };

  onChange = (e: SyntheticInputEvent<HTMLInputElement>) => {
    const { onChange } = this.props;
    onChange(e.target.value);
  };

  errors(): React$Node {
    const { errors } = this.props;
    if (!errors.length) {
      return null;
    }

    return <div className={styles.errors}>{_uniq(errors).join(', ')}</div>;
  }

  render(): React$Node {
    const {
      className,
      errors,
      type,
      value,
    } = this.props;

    return (
      <div>
        <input
          className={classnames(styles.input, className, {
            [styles.error]: errors.length,
          })}
          onChange={this.onChange}
          type={type}
          value={value}
        />
        <div className={styles.focusBorderWrap}>
          <div className={styles.focusBorder} />
        </div>
        {this.errors()}
      </div>
    );
  }
}
