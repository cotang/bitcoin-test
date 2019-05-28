import React from 'react';
import './currency-input.css';

const CurrencyInput = ({ searchText, onInputFocus, onInputClear, onSearchFilter }) => {
  return (
    <div className="currency-input">
      <input
        type="text"
        className="form-control search-input"
        value={searchText}
        onFocus={onInputFocus}
        onChange={(event) => onSearchFilter(event.target.value)}
        placeholder="type to search" />
      <button onClick={onInputClear} type="button">Clear</button>
    </div>
  );
};
export default CurrencyInput;

