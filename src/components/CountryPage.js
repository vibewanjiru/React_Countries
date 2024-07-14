import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './CountryPage.css';

const CountryPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const country = location.state?.country;

  const [dialogOpen, setDialogOpen] = useState(false);

  if (!country) {
    navigate('/');
    return null;
  }

  const handleDialogToggle = () => {
    setDialogOpen(!dialogOpen);
  };

  return (
    <div className="country-container">
      <button onClick={() => navigate('/')} className="back-button">←</button>
      <div className="cards-container">
        <div className="card small-card">
          <img src={country.flags.png} alt={`${country.name.common} flag`} className="country-flag" />
          <div className="flag-description">{country.flags.alt}</div>
        </div>
        <div className="card small-card">
        <h2>{country.name.common}</h2>
          <p>Capital: {country.capital}</p>
          <p>Area: {country.area} km²</p>
          <button className="see-more-button" onClick={handleDialogToggle}>See more</button>
        </div>
        <div className="card small-card">
        <h2>Bordering Countries</h2>
          {country.borders ? (
            <ul>
              {country.borders.map((border, index) => (
                <li key={index}>{border}</li>
              ))}
            </ul>
          ) : (
            <p>No bordering countries</p>
          )}
        </div>
      </div>
      <div className="card large-card">
      <iframe
            src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyCx4mG-cTwnJUu35bPraPCRBttW28Tr-HI&q=${country.latlng[0]},${country.latlng[1]}`}
            width="100%"
            height="100%"
            allowFullScreen
            loading="lazy"
          ></iframe>
      </div>
      {dialogOpen && (
        <div className="dialog-overlay" onClick={handleDialogToggle}>
          <div className="dialog-box" onClick={(e) => e.stopPropagation()}>
            <h2>{country.name.common}</h2>
            <p>Capital: {country.capital}</p>
            <p>Currency: {Object.values(country.currencies).map(currency => [currency.name, currency.symbol]).join(', ')}</p>
            <p>Continent: {country.continents.join(', ')}</p>
            <p>Independent: {country.independent ? 'Yes' : 'No'}</p>
            <p>Region: {country.region}</p>
            <p>Sub-region: {country.subregion}</p>
            <p>Population: {country.population}</p>
            <p>Languages: {Object.values(country.languages).join(', ')}</p>
            <p>Timezone: {country.timezones.join(', ')}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default CountryPage;
