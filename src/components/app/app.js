import React, { Component } from 'react';
import './app.css';
import CurrencyInput from '../currency-input';
import CurrencyList from '../currency-list';
import CurrencyOutput from '../currency-output';
import { ClickOutside } from '../helpers';
import { debounce } from 'lodash';

export default class App extends Component {
  state = {
    searchText: '',
    searching: false,
    selectedCurrency: null
  };

  onInputClear = () => {
    this.setState({
      searchText: '',
      searching: false,
      selectedCurrency: null
    });
  };
  onSearchFilter = (searchText) => {
    this.setState({
      searchText: searchText
    });
  };
  onSelectCurrency = (item) => {
    this.setState({
      searchText: item.currency,
      searching: false,
      selectedCurrency: item,
    });
  }
  showDropdown = () => {
    this.setState({
      searching: true
    });
  }
  hideDropdown = () => {
    this.setState({
      searching: false
    });
  }


  render() {
    const { searchText, searching, selectedCurrency } = this.state;

    /* Block with input */
    const input = <CurrencyInput
      /* debounce here */
      onSearchFilter={debounce(this.onSearchFilter, 250)}
      onInputFocus={this.showDropdown}
      onInputClear={this.onInputClear}
      searchText={searchText}
    />;

    /* block with dropdown list */
    const list = searching ?
      <CurrencyList filter={searchText} onSelectCurrency={this.onSelectCurrency} /> :
      null;

    /* block with results */
    const results = selectedCurrency ?
      <div className="currency-results">
        <CurrencyOutput selectedCurrency={selectedCurrency} />
      </div> :
      null;

    return (
      <div className="currency">
        <div className="currency-container">
          <h1>Bitcoin rate</h1>
          <ClickOutside onInputBlur={this.hideDropdown}>
            <div className="currency-intake">
              {input}
              {list}
            </div>
          </ClickOutside>
          {results}
        </div>
      </div>
    );
  }
};

