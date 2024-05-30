import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Select from 'react-select';
import '../App.css';

interface Coin {
  id: string;
  name: string;
  symbol: string;
}

const Home: React.FC = () => {
  const [coins, setCoins] = useState<{ label: string; value: string }[]>([]);
  const [selectedCoin, setSelectedCoin] = useState<{ label: string; value: string } | null>(null);
  const [coinDetails, setCoinDetails] = useState<any>(null);
  const [lastUpdated, setLastUpdated] = useState<string>('');

  useEffect(() => {
    const fetchCoins = async () => {
      try {
        const response = await axios.get('https://api.coinlore.net/api/tickers/');
        const coinList = response.data.data;
        const coinsArray = coinList.map((coin: Coin) => ({
          label: coin.name,
          value: coin.id,
        }));
        setCoins(coinsArray);
      } catch (error) {
        console.error('Error fetching the coin list:', error);
      }
    };

    fetchCoins();
  }, []);

  const fetchCoinDetails = async (coinId: string) => {
    try {
      const response = await axios.get(`https://api.coinlore.net/api/ticker/?id=${coinId}`);
      setCoinDetails(response.data[0]); // Assuming the response is an array with one element
      const currentTime = new Date().toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        timeZoneName: 'short'
      });
      setLastUpdated(currentTime);
    } catch (error) {
      console.error('Error fetching coin details:', error);
    }
  };

  const handleChange = async (selectedOption: { label: string; value: string } | null) => {
    setSelectedCoin(selectedOption);

    if (selectedOption) {
      fetchCoinDetails(selectedOption.value);
    } else {
      setCoinDetails(null);
    }
  };

  useEffect(() => {
    if (selectedCoin) {
      const interval = setInterval(() => {
        fetchCoinDetails(selectedCoin.value);
      }, 10000); // 60000ms = 1 minute

      // Cleanup interval on component unmount
      return () => clearInterval(interval);
    }
  }, [selectedCoin]);

  return (
    <div>
      <div className="container">
        <div className="inline-container">
          <label>Select Coin:</label>
          <Select
            className="crypto-select"
            value={selectedCoin}
            onChange={handleChange}
            options={coins}
            placeholder="Search for a coin..."
          />
        </div>
        {coinDetails && (
          <div>
            <h3>Overview of {coinDetails.name} ({coinDetails.symbol})</h3>
            {/* <p>Symbol: {coinDetails.symbol}</p> */}
            <p>Price: ${coinDetails.price_usd} <span>(Last updated: {lastUpdated})</span></p>
            <p>
              <span style={{ color: coinDetails.percent_change_1h >= 0 ? 'blue' : 'red' }}>
                {coinDetails.percent_change_1h > 0 ? `+${coinDetails.percent_change_1h}` : coinDetails.percent_change_1h}%
              </span> in 1h
            </p>
            <p>
              <span style={{ color: coinDetails.percent_change_24h >= 0 ? 'blue' : 'red' }}>
                {coinDetails.percent_change_24h > 0 ? `+${coinDetails.percent_change_24h}` : coinDetails.percent_change_24h}%
              </span> in 24h
            </p>
            <p>
              <span style={{ color: coinDetails.percent_change_7d >= 0 ? 'blue' : 'red' }}>
                {coinDetails.percent_change_7d > 0 ? `+${coinDetails.percent_change_7d}` : coinDetails.percent_change_7d}%
              </span> in 7d
            </p>
            <p>Market Cap: ${coinDetails.market_cap_usd}</p>
            <p>${coinDetails.volume24} traded in 24h</p>
          </div>
        )}
      </div>
      <button> hit </button>
    </div>
  );
};

export default Home;
