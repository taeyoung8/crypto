import React, { useEffect, useState } from 'react';
import '../App.css';
import MarketTicker from './MarketTicker';
import axios from 'axios';

const Home: React.FC = () => {


  return (
    <div className='page'>
      <MarketTicker/>
    </div>
  );
};

export default Home;
