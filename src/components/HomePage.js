import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './HomePage.css';

const HomePage = () => {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const handleFind = async () => {
    if (!query) return;

    try {
      const response = await fetch('https://restcountries.com/v3.1/all');
      const data = await response.json();
      const country = data.find((c) => c.name.common.toLowerCase() === query.toLowerCase());

      if (country) {
        navigate('/country', { state: { country } });
      } else {
        alert('Country not found!');
      }
    } catch (error) {
      console.error('Error fetching country data:', error);
    }
  };

  return (
    <div className="home-container">
      <div className="form-container">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="text-input"
          placeholder="Enter country name"
        />
        <button onClick={handleFind} className="find-button">Find</button>
      </div>
    </div>
  );
};

export default HomePage;
