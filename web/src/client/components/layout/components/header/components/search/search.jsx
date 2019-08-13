// @flow

import React, { Component } from 'react';

import Input from 'components/common/input';

import Button from 'components/common/button';

import { MdSearch } from 'react-icons/md';

import styles from './search.styles.pcss';

type StateType = {
  search: string,
};

class Search extends Component<*, StateType> {
  state = {
    search: '',
  };

  onChangeSearchValue = (e: string) => {
    this.setState({ search: e });
  };

  render(): React$Node {
    const { search } = this.state;

    return (
      <div className={styles.search}>
        <Input placeholder="Search..." value={search} onChange={this.onChangeSearchValue} />
        <Button className={styles.searchButton} color={null}>
          <MdSearch size="20px" />
        </Button>
      </div>
    );
  }
}

export default Search;
