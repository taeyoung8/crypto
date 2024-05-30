import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../App.css'; // CSS 파일 import

interface TrendingCoin {
  item: {
    id: string;
    coin_id: number;
    name: string;
    symbol: string;
    market_cap_rank: number;
    thumb: string;
    small: string;
    large: string;
    slug: string;
    price_btc: number;
    score: number;
  };
}

const Trend: React.FC = () => {
  const [trendingCoins, setTrendingCoins] = useState<TrendingCoin[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTrendingCoins = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get('https://api.coingecko.com/api/v3/search/trending');
      setTrendingCoins(response.data.coins);
    } catch (err) {
      setError('Failed to fetch trending coins');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTrendingCoins();
  }, []);

  return (
    <div className='page'>
      <h2>Trending Cryptocurrencies</h2>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <ul>
          {trendingCoins.map((coin) => (
            <li key={coin.item.id}>
              <img src={coin.item.thumb} alt={coin.item.name} />
              <a href={`https://www.coingecko.com/en/coins/${coin.item.id}`} target="_blank" rel="noopener noreferrer">
                {coin.item.name} ({coin.item.symbol.toUpperCase()})
              </a>
              <span>Rank: {coin.item.market_cap_rank}</span>
              <span>Price in BTC: {coin.item.price_btc.toFixed(8)}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Trend;
