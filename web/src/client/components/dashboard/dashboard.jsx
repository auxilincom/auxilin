// @flow

import React, { Component } from 'react';

import {
  MdPeople, MdMessage, MdFileDownload, MdErrorOutline, MdDone, MdTrendingUp, MdStorage, MdWbSunny,
} from 'react-icons/md';

import Card, { iconColors } from './components/card';
import type { CardType } from './components/card';
import Table, { tableColors } from './components/table';
import type { TableType } from './components/table';

import styles from './dashboard.styles.pcss';

const cards: Array<CardType> = [
  {
    icon: MdPeople,
    value: 300,
    title: 'Users',
    footerIcon: MdDone,
    footerContent: 'Online more than 50%',
    className: styles.dashboardCard,
    iconColor: iconColors.green,
  },
  {
    icon: MdMessage,
    value: 1201,
    title: 'Messages',
    footerIcon: MdTrendingUp,
    footerContent: '50 posts per hour',
    className: styles.dashboardCard,
    iconColor: iconColors.purple,
  },
  {
    icon: MdFileDownload,
    value: 7652,
    title: 'Downloads',
    footerIcon: MdStorage,
    footerContent: '42gb downloaded',
    className: styles.dashboardCard,
    iconColor: iconColors.orange,
  },
  {
    icon: MdErrorOutline,
    value: 'live',
    title: 'API status',
    footerIcon: MdWbSunny,
    footerContent: 'No problems found',
    className: styles.dashboardCard,
    iconColor: iconColors.blue,
  },
];

const tables: Array<TableType> = [
  {
    headerTitle: 'Employees Stats',
    headerDescription: 'New employees on 15th November, 2018',
    color: tableColors.orange,
    columns: ['Id', 'Name', 'Salary', 'Country'],
    rows: [
      ['1', 'Dakota Rice', '$36,738', 'Niger'],
      ['2', 'Minerva Hooper', '$23,789', 'Curaçao'],
      ['3', 'Sage Rodriguez', '$56,142', 'Netherlands'],
      ['4', 'Philip Chaney', '$38,735', 'Korea, South'],
    ],
    keyIndex: 0,
    className: styles.dashboardTable,
  },
  {
    headerTitle: 'Global Sales by Top Locations',
    headerDescription: 'All Products That Were Shipped',
    color: tableColors.green,
    columns: ['Country', 'Money turnover', 'Market share'],
    rows: [['USA', '2.920', '53.23%'], ['Germany', '1.300', '20.43%'], ['Australia', '760', '10.35%'], ['United Kingdom', '690', '7.87%']],
    keyIndex: 0,
    className: styles.dashboardTable,
  },
];

class Dashboard extends Component<{}> {
  render(): React$Node {
    return (
      <div className={styles.dashboard}>
        <div className={styles.cards}>
          {cards.map((card: CardType): React$Node => {
            return (
              <Card
                key={card.title}
                icon={card.icon}
                value={card.value}
                title={card.title}
                footerIcon={card.footerIcon}
                footerContent={card.footerContent}
                className={card.className}
                iconColor={card.iconColor}
              />
            );
          })}
        </div>
        <div className={styles.tables}>
          {tables.map((table: TableType): React$Node => {
            return (
              <Table
                key={table.headerTitle}
                headerTitle={table.headerTitle}
                headerDescription={table.headerDescription}
                color={table.color}
                columns={table.columns}
                rows={table.rows}
                keyIndex={0}
                className={styles.dashboardTable}
              />
            );
          })}
        </div>
      </div>
    );
  }
}

export default Dashboard;
