import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Title,
  Tooltip,
  Legend,
  ChartData,
  ChartOptions,
} from 'chart.js';

ChartJS.register(
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Title,
  Tooltip,
  Legend
);

const CoinChart: React.FC = () => {
  const [chartData, setChartData] = useState<ChartData<'line'>>({
    labels: [],
    datasets: [],
  });

  const [selectedCoin, setSelectedCoin] = useState('bitcoin');
  const [days, setDays] = useState('7');
  const [currency, setCurrency] = useState('usd');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchChartData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `https://api.coingecko.com/api/v3/coins/${selectedCoin}/market_chart`,
          {
            params: {
              vs_currency: currency,
              days: days,
            },
          }
        );

        const prices = response.data.prices;
        const dates = prices.map((price: [number, number]) =>
          new Date(price[0]).toLocaleDateString()
        );
        const values = prices.map((price: [number, number]) => price[1]);

        setChartData({
          labels: dates,
          datasets: [
            {
              label: `${selectedCoin.charAt(0).toUpperCase() + selectedCoin.slice(1)} Price`,
              data: values,
              fill: false,
              backgroundColor: 'rgba(75,192,192,0.2)',
              borderColor: 'rgba(75,192,192,1)',
            },
          ],
        });
      } catch (error) {
        console.error('Error fetching the chart data', error);
      } finally {
        setLoading(false);
      }
    };

    fetchChartData();
  }, [selectedCoin, days, currency]);

  const options: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        display: true,
        title: {
          display: true,
          text: 'Date',
        },
      },
      y: {
        display: true,
        title: {
          display: true,
          text: `Price (${currency.toUpperCase()})`,
        },
      },
    },
  };

  return (
    <div style={{ width: '95%', height: '80%' }}>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '1rem' }}>
        <h4 style={{ flex: 1, textAlign: 'center' }}>{selectedCoin.charAt(0).toUpperCase() + selectedCoin.slice(1)} Chart (Last {days} Days)</h4>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <div>
            <label>Select Coin: </label>
            <select value={selectedCoin} onChange={(e) => setSelectedCoin(e.target.value)}>
              <option value="bitcoin">Bitcoin</option>
              <option value="ethereum">Ethereum</option>
              <option value="litecoin">Litecoin</option>
              <option value="ripple">Ripple</option>
              <option value="cardano">Cardano</option>
              <option value="polkadot">Polkadot</option>
              <option value="stellar">Stellar</option>
              <option value="dogecoin">Dogecoin</option>
              <option value="chainlink">Chainlink</option>
              <option value="uniswap">Uniswap</option>
            </select>
          </div>
          <div>
            <label>Select Days: </label>
            <select value={days} onChange={(e) => setDays(e.target.value)}>
              <option value="1">1</option>
              <option value="7">7</option>
              <option value="14">14</option>
              <option value="30">30</option>
              <option value="90">90</option>
              <option value="180">180</option>
              <option value="365">365</option>
            </select>
          </div>
          <div>
            <label>Select Currency: </label>
            <select value={currency} onChange={(e) => setCurrency(e.target.value)}>
              <option value="usd">USD</option>
              <option value="eur">EUR</option>
              <option value="jpy">JPY</option>
              <option value="gbp">GBP</option>
              <option value="aud">AUD</option>
              <option value="cad">CAD</option>
              <option value="chf">CHF</option>
              <option value="cny">CNY</option>
              <option value="krw">KRW</option>
            </select>
          </div>
        </div>
      </div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <Line data={chartData} options={options} />
      )}
    </div>
  );
};

export default CoinChart;
