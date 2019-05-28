import React, { Component } from 'react';
import './currency-list.css';
import { BitcoinService } from '../helpers';

export default class CurrencyList extends Component {
  bitcoinService = new BitcoinService();
  state = {
    currencyList: [],
  };

  componentDidMount() {
    this.loadCurrencyList();
  }

  loadCurrencyList() {
    this.bitcoinService
      .getCurrencyList()
      .then(currencyList => {
        this.setState({ currencyList });
      });
  }

  /* filtering loaded currency list on the run */
  search(items, searchText) {
    if (searchText) {
      return items.filter(item => {
        return item.currency.toLowerCase().indexOf(searchText.toLowerCase()) !== -1 ||
          item.country.toLowerCase().indexOf(searchText.toLowerCase()) !== -1;
      });
    } else {
      return items;
    }
  }

  render() {
    const { currencyList } = this.state;
    const visibleItems = this.search(currencyList, this.props.filter);

    const elements = visibleItems.map((item) => {
      return (
        <li
          onClick={() => this.props.onSelectCurrency(item)}
          key={item.currency}
          className="list-group-item">
          {item.currency} ({item.country})
        </li>
      );
    });

    return (
      <div className="currency-list">
        <ul>
          {elements}
        </ul>
      </div>
    );
  }
};
