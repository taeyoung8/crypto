import React, { useState, useEffect } from 'react';
import Select from 'react-select';

const CurrencyRate: React.FC = () => {
  const [currencies, setCurrencies] = useState<{ [key: string]: string }>({});
  const [fromCurrency, setFromCurrency] = useState<{ value: string, label: string } | null>({ value: 'btc', label: 'Bitcoin (BTC)' });
  const [toCurrency, setToCurrency] = useState<{ value: string, label: string } | null>({ value: 'usd', label: 'United States Dollar (USD)' });
  const [amount, setAmount] = useState<number>(1);
  const [rate, setRate] = useState<number | null>(null);
  const [date, setDate] = useState<string | null>(null); // Date state
  const [decimalPlaces, setDecimalPlaces] = useState<number>(2); // Default decimal places
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCurrencies = async () => {
      try {
        const response = await fetch('https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies.min.json');
        const data = await response.json();
        setCurrencies(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching currencies:', error);
        setLoading(false);
      }
    };

    fetchCurrencies();
  }, []);

  useEffect(() => {
    const fetchRate = async () => {
      if (fromCurrency && toCurrency) {
        try {
          const response = await fetch(`https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${fromCurrency.value}.json`);
          const data = await response.json();
          setRate(data[fromCurrency.value][toCurrency.value]);
          setDate(data.date); // Set the date state
        } catch (error) {
          console.error('Error fetching rate:', error);
        }
      }
    };

    fetchRate();
  }, [fromCurrency, toCurrency]);

  const handleFromCurrencyChange = (selectedOption: any) => {
    setFromCurrency(selectedOption);
  };

  const handleToCurrencyChange = (selectedOption: any) => {
    setToCurrency(selectedOption);
  };

  const handleAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(parseFloat(event.target.value));
  };

  const handleDecimalPlacesChange = (selectedOption: any) => {
    setDecimalPlaces(selectedOption.value);
  };

  const handleSwitchCurrencies = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  if (loading) {
    return <p>Loading currencies...</p>;
  }

  const currencyOptions = Object.keys(currencies).map((currency) => ({
    value: currency,
    label: `${currencies[currency]} (${currency})`
  }));

  const decimalOptions = Array.from({ length: 11 }, (_, i) => ({
    value: i,
    label: `${i} decimal places`
  }));

  const convertedAmount = rate !== null ? (amount * rate).toFixed(decimalPlaces) : '';

  return (
    <div>
      {date && <h1>Exchange rate as of: {date}</h1>}
      <div>
        <label htmlFor="fromCurrency">From: </label>
        <Select
          id="fromCurrency"
          value={fromCurrency}
          onChange={handleFromCurrencyChange}
          options={currencyOptions}
          placeholder="Select base currency..."
          isClearable
        />
      </div>
      <div>
        <button onClick={handleSwitchCurrencies}>Switch</button>
      </div>
      <div>
        <label htmlFor="toCurrency">To: </label>
        <Select
          id="toCurrency"
          value={toCurrency}
          onChange={handleToCurrencyChange}
          options={currencyOptions}
          placeholder="Select target currency..."
          isClearable
        />
      </div>
      <div>
        <label htmlFor="amount">Amount: </label>
        <input
          type="number"
          id="amount"
          value={amount}
          onChange={handleAmountChange}
        />
      </div>
      {/* <div>
        <label htmlFor="decimalPlaces">Decimal Places: </label>
        <Select
          id="decimalPlaces"
          value={decimalOptions.find(option => option.value === decimalPlaces)}
          onChange={handleDecimalPlacesChange}
          options={decimalOptions}
          placeholder="Select decimal places..."
          isClearable
        />
      </div> */}
      <div>
        {fromCurrency && toCurrency && (
          <p>
            {amount} {fromCurrency.label} is approximately {convertedAmount} {toCurrency.label}
          </p>
        )}
      </div>
    </div>
  );
};

export default CurrencyRate;
