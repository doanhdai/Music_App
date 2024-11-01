// src/components/DateFilter.js

import React, { useState } from 'react';

const DateFilter = () => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [error, setError] = useState('');
  const [results, setResults] = useState([]);

  const handleSearch = async () => {
    // Reset error
    setError('');

    // Validate dates
    if (!startDate || !endDate) {
      setError('Both start date and end date are required');
      return;
    }
    if (new Date(startDate) > new Date(endDate)) {
      setError('Start date cannot be later than end date');
      return;
    }

    // Make API request
    try {
      const response = await fetch(`https://api.example.com/data?start=${startDate}&end=${endDate}`);
      const data = await response.json();
      setResults(data);
    } catch (err) {
      setError('Failed to fetch data');
    }
  };

  return (
    <div className="inline-flex py-auto gap-x-5  mr-auto rounded-xl shadow-md text-nowrap text-center ">
      <h2 className="  my-auto text-[#A4A298] ">Tìm kiếm </h2>
        <input
          type="date"
          placeholder="dd-mm-yyyy"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className="text-black px-2  w-full border border-gray-300  shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        />
      
      
        <label className="text-sm  my-auto font-medium text-[#A4A298]">đến</label>
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          className=" w-full px-2 text-black border border-gray-300  shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        />
      

      
    </div>
  );
};

export default DateFilter;