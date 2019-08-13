// @flow

import React, { Component } from 'react';
import classnames from 'classnames';

import styles from './table.styles.pcss';

const tableColors = {
  purple: 'purple',
  green: 'green',
  blue: 'blue',
  orange: 'orange',
};

type ColorType = 'purple' | 'green' | 'blue' | 'orange';

type PropsType = {
  columns: Array<string>,
  rows: Array<Array<string>>,
  headerTitle: string,
  headerDescription?: string,
  className?: string,
  color?: ColorType,
  keyIndex: number,
};

class Table extends Component<PropsType> {
  static defaultProps = {
    headerDescription: '',
    className: '',
    color: 'green',
  };

  static tableColors = tableColors;

  render(): React$Node {
    const {
      className, headerTitle, headerDescription, color, columns, rows, keyIndex,
    } = this.props;

    return (
      <div className={classnames(styles.tableComponent, className)}>
        <div className={classnames(styles.tableHeader, styles[color])}>
          <span className={styles.headerTitle}>{headerTitle}</span>
          <span className={styles.headerDescription}>{headerDescription}</span>
        </div>
        <table className={classnames(styles.table, styles[color])} cellPadding="0" cellSpacing="0">
          <thead>
            <tr>
              {columns.map((column: string): React$Node => (
                <td key={column}>{column}</td>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row: Array<string>): React$Node => {
              return (
                <tr key={row[keyIndex]}>
                  {row.map((value: string, index: number): React$Node => (
                    <td key={`${row[keyIndex]}_${columns[index]}`}>{value}</td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
}

export default Table;
export { tableColors };
export type TableType = {
  columns: Array<string>,
  rows: Array<Array<string>>,
  headerTitle: string,
  headerDescription?: string,
  className: string,
  color: ColorType,
  keyIndex: number,
};
