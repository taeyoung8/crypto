import React, { useState } from 'react';
import Select from 'react-select';
import '../App.css'; // Ensure this path is correct
import CoinChart from './CoinChart';

const options = [
  { value: 'grid-1x1', label: '1x1', charts: 1 },
  { value: 'grid-2x2', label: '2x2', charts: 4 },
  { value: 'grid-3x3', label: '3x3', charts: 9 },
];

function Charts() {
  const [gridConfig, setGridConfig] = useState(options[0]);

  const handleChange = (selectedOption: any) => {
    setGridConfig(selectedOption);
  };

  return (
    <div className='page'>
      <Select
        options={options}
        defaultValue={options[0]}
        onChange={handleChange}
      />
      <div className={`container ${gridConfig.value}`}>
        {[...Array(gridConfig.charts)].map((_, index) => (
          <div className="grid-item" key={index}><CoinChart /></div>
        ))}
      </div>
    </div>
  );
}

export default Charts;
