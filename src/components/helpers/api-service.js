/* separate service for api requests */

export default class BitcoinService {
  _apiBase = 'https://api.coindesk.com/v1/bpi/';
  _proxyBase = 'https://cors-anywhere.herokuapp.com/';

  async getResource(url, proxy) {
    const base = proxy ? this._proxyBase + this._apiBase : this._apiBase;
    const res = await fetch(`${base}${url}`);

    if (!res.ok) {
      throw new Error(`Could not fetch ${url}` +
        `, received ${res.status}`);
    }
    return await res.json();
  }

  /* Here I had to use proxy server, 
  because this route is unreachable without 'Access-Control-Allow-Origin' header */
  async getCurrencyList() {
    return await this.getResource('supported-currencies.json', true);
  }
  async getCurrencyData(currency) {
    return await this.getResource(`currentprice/${currency}.json`);
  }
  async getCurrencyHistoryData(currency) {
    return await this.getResource(`historical/close.json?currency=${currency}`);
  }
}