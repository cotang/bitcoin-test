import React, { Component } from 'react';
import './currency-output.css';
import { BitcoinService } from '../helpers';

export default class CurrencyOutput extends Component {
  bitcoinService = new BitcoinService();
  state = {
    currencyData: null,
    historyCurrencyData: null,
  };

  componentDidMount() {
    this.loadCurrencyData();
    this.loadHistoryCurrencyData();
  }

  componentDidUpdate(prevProps) {
    if (this.props.selectedCurrency !== prevProps.selectedCurrency) {
      this.loadCurrencyData();
      this.loadHistoryCurrencyData();
    }
  }

  loadCurrencyData() {
    const { currency } = this.props.selectedCurrency;
    this.bitcoinService
      .getCurrencyData(currency)
      .then(currencyData => {
        this.setState({ currencyData });
      });
  }

  loadHistoryCurrencyData() {
    const { currency } = this.props.selectedCurrency;
    this.bitcoinService
      .getCurrencyHistoryData(currency)
      .then(historyCurrencyData => {
        this.setState({ historyCurrencyData });
      });
  }

  render() {
    const { currency, country } = this.props.selectedCurrency;
    const { currencyData, historyCurrencyData } = this.state;

    /* Block with current data */
    /* Condition that data is loaded 
    and renders only when props.selectedCurrency and state.currencyData corresponds */
    const isCurrencyReadyForRender = currencyData &&
      Object.keys(currencyData.bpi).includes(currency);

    const data = isCurrencyReadyForRender ?
      `1 bitcoin = ${currencyData.bpi[currency].rate_float} 
      ${currencyData.bpi[currency].description}
       (${currencyData.time.updated})` :
      null;

    /* Block with historical data */
    const historyTable = historyCurrencyData ?
      <table className="currency-table">
        <caption>Historical BPI data</caption>
        <tbody>
          {Object.keys(historyCurrencyData.bpi).map(key =>
            <tr key={key}>
              <td>{key}</td>
              <td>{historyCurrencyData.bpi[key]}</td>
            </tr>
          )}
        </tbody>
      </table> :
      null;

    return (
      <div className="currency-output">
        <p>Selected currency: {currency} ({country})</p>
        <hr />
        {data}
        <hr />
        {historyTable}
      </div>
    );
  }
};
