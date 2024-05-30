import React from "react";

const MarketTicker: React.FC = () => {
  return (
    <div>a</div>
  );
};

export default MarketTicker;

// import React, { useEffect, useState, useCallback } from 'react';
// import axios from 'axios';
// import '../App.css'; // CSS 파일 import

// const MarketTicker: React.FC = () => {
//   const [coinId, setCoinId] = useState('bitcoin');
//   const [currency, setCurrency] = useState('usd');
//   const [locale, setLocale] = useState('en');
//   const [upperLimit, setUpperLimit] = useState<number | null>(null);
//   const [lowerLimit, setLowerLimit] = useState<number | null>(null);
//   const [currentPrice, setCurrentPrice] = useState<number | null>(null);

//   const fetchCurrentPrice = useCallback(async () => {
//     try {
//       const response = await axios.get(`https://api.coingecko.com/api/v3/simple/price`, {
//         params: {
//           ids: coinId,
//           vs_currencies: currency,
//         },
//       });
//       const price = response.data[coinId][currency];
//       setCurrentPrice(price);
//       if (upperLimit !== null && price > upperLimit) {
//         alert(`Alert: ${coinId} price exceeds ${upperLimit} ${currency.toUpperCase()}`);
//       }
//       if (lowerLimit !== null && price < lowerLimit) {
//         alert(`Alert: ${coinId} price is below ${lowerLimit} ${currency.toUpperCase()}`);
//       }
//       console.log(currentPrice);
//     } catch (err) {
//       console.error('Failed to fetch current price:', err);
//     }
//   }, [coinId, currency, upperLimit, lowerLimit]);

//   useEffect(() => {
//     const script = document.createElement('script');
//     script.src = "https://widgets.coingecko.com/coingecko-coin-market-ticker-list-widget.js";
//     script.async = true;
//     document.body.appendChild(script);

//     return () => {
//       document.body.removeChild(script);
//     };
//   }, [coinId, currency, locale]);

//   useEffect(() => {
//     fetchCurrentPrice();
//     const interval = setInterval(fetchCurrentPrice, 10000); // 10초마다 가격 갱신
//     return () => clearInterval(interval);
//   }, [fetchCurrentPrice]);

//   return (
//     <div>
//       <h2>Market Ticker</h2>
//       <div className='row-container'>
//         <div>
//           <label className='select-label'>
//             <select className="styled-select" value={coinId} onChange={(e) => setCoinId(e.target.value)}>
//               <option value="bitcoin">Bitcoin</option>
//               <option value="ethereum">Ethereum</option>
//               <option value="litecoin">Litecoin</option>
//               <option value="ripple">Ripple</option>
//               <option value="cardano">Cardano</option>
//             </select>
//           </label>
//         </div>
//         <div>
//           <label className='select-label'>
//             <select className="styled-select" value={currency} onChange={(e) => setCurrency(e.target.value)}>
//               <option value="usd">USD</option>
//               <option value="eur">EUR</option>
//               <option value="gbp">GBP</option>
//               <option value="jpy">JPY</option>
//               <option value="krw">KRW</option>
//             </select>
//           </label>
//         </div>
//         <div>
//           <label className='select-label'>
//             <select className="styled-select" value={locale} onChange={(e) => setLocale(e.target.value)}>
//               <option value="en">English</option>
//               <option value="ko">Korean</option>
//               <option value="es">Spanish</option>
//               <option value="de">German</option>
//               <option value="fr">French</option>
//             </select>
//           </label>
//         </div>
//       </div>

//       <div className='row-container'>
//         <div>
//           <label>
//             Alert if {coinId} price exceeds:
//             <input type="number" value={upperLimit || ''} onChange={(e) => setUpperLimit(Number(e.target.value))} />
//           </label>
//         </div>
//         <div>
//           <label>
//             Alert if {coinId} price is below:
//             <input type="number" value={lowerLimit || ''} onChange={(e) => setLowerLimit(Number(e.target.value))} />
//           </label>
//         </div>
//       </div>
//       <div id="market-ticker-container">
//         <div dangerouslySetInnerHTML={{ __html: `<coingecko-coin-market-ticker-list-widget coin-id="${coinId}" currency="${currency}" locale="${locale}"></coingecko-coin-market-ticker-list-widget>` }}></div>
//       </div>
//     </div>
//   );
// };

// export default MarketTicker;
